{
	// ===== EXPORT MENU LOGIC =====
	const exportOverlay = document.getElementById('export-overlay')
	const menuFile = document.getElementById('menuFile')
	const btnExport = document.getElementById('btnExport')
	const closeExport = document.getElementById('closeExport')

	// Кнопки экспорта
	const exportWinBtn = document.getElementById('exportWindows')
	const exportExeBtn = document.getElementById('exportExe')

	if (exportOverlay && btnExport) {
		btnExport.addEventListener('click', e => {
			e.stopPropagation()
			if (menuFile) menuFile.classList.remove('open')
			exportOverlay.classList.add('active')
		})

		if (closeExport) {
			closeExport.onclick = () => {
				exportOverlay.classList.remove('active')
			}
		}

		// 1. Экспорт чистого HTML
		if (exportWinBtn) {
			exportWinBtn.onclick = () => {
				const html = generateGameHTML()
				downloadFile('ecrous-game.html', html, 'text/html')
			}
		}

		// 2. Экспорт ZIP пакета (Windows Launcher)
		if (exportExeBtn) {
			exportExeBtn.onclick = () => {
				exportProjectAsZip()
			}
		}
	}

	// ===== ГЕНЕРАТОР HTML КОДА =====
	function generateGameHTML() {
		if (typeof saveCurrentWorkspace === 'function') {
			saveCurrentWorkspace()
		}

		const buildData = {
			project:
				typeof projectData !== 'undefined' ? projectData : { scenes: [] },
			exportedAt: new Date().toISOString(),
		}

		// --- ВСТРАИВАЕМЫЙ ДВИЖОК (RUNTIME) ---
		// Это "мозги" игры, которые попадают внутрь файла
		const runtimeScript = `
        const PROJECT = ${JSON.stringify(buildData.project)};
        
        let gameVariables = {};
        let physicsObjects = {};
        let staticObjects = [];
        let controlledObjects = {};
        let activeKeys = {};
        let joystickData = { active: false, x: 0, y: 0 };
        let cameraState = { target: null, x: 400, y: 300, zoom: 1.0 };
        let runtimeFunctions = {};
        let isRunning = true;
        let GAME_WIDTH = 800;
        let GAME_HEIGHT = 600;

        window.onload = function() {
            initGame();
            requestAnimationFrame(updatePhysics);
        };

        function initGame() {
            const world = document.getElementById('game-world');
            const scene = PROJECT.scenes[0];
            if(!scene) return;

            // 1. Инициализация функций
            scene.objects.forEach(obj => {
                if (obj.scripts) {
                    obj.scripts.filter(b => b.type === 'func_def').forEach(b => {
                        runtimeFunctions[b.values[0]] = { block: b, script: obj.scripts }
                    })
                }
            });

            // 2. Запуск стартовых блоков
            scene.objects.forEach(obj => {
                if (obj.scripts) {
                    obj.scripts.filter(b => b.type === 'evt_start').forEach(startBlockData => {
                        executeChain(startBlockData, obj.scripts);
                    });
                    obj.scripts.filter(b => b.type === 'evt_add_listener').forEach(b => {
                         executeBlockLogic(b);
                    });
                }
            });

            // Ввод с клавиатуры
            window.addEventListener('keydown', e => {
                activeKeys[e.code] = true;
                triggerEventGlobal('evt_key', e.code);
            });
            window.addEventListener('keyup', e => activeKeys[e.code] = false);
            
            // Клик по объектам
            document.getElementById('game-stage').addEventListener('click', e => {
                 if (e.target) {
                    const target = e.target.closest('.game-sprite');
                    if (target) triggerEventGlobal('evt_click_obj', target.id);
                }
            });
        }

        function triggerEventGlobal(type, param) {
            const scene = PROJECT.scenes[0];
            scene.objects.forEach(obj => {
                const events = obj.scripts.filter(b => b.type === type);
                events.forEach(evtBlock =>
                    executeChain(evtBlock, obj.scripts, { target: param })
                );
            });
        }

        async function executeChain(currentBlock, allBlocks, context = {}) {
            if (!isRunning) return;

            let nextBlock = allBlocks.find(b => {
                const dx = Math.abs(b.x - currentBlock.x);
                const dy = b.y - currentBlock.y;
                if (b.type === 'func_def') return false;
                return dx < 40 && dy > 10 && dy < 150;
            });

            if (currentBlock.type === 'ctrl_loop') {
                const count = parseInt(currentBlock.values[0]) || 1;
                if (nextBlock) {
                    for (let i = 0; i < count; i++) {
                        await executeBlockLogic(nextBlock, context);
                    }
                }
                return;
            }
            
            if (currentBlock.type === 'ctrl_if' || currentBlock.type === 'ctrl_if_else') {
                let v = currentBlock.values;
                let cV = parseFloat(gameVariables[v[0]]) || gameVariables[v[0]] || 0;
                let tV = parseFloat(v[2]) || v[2];
                let ok = false;
                if (v[1] == '=') ok = cV == tV;
                if (v[1] == '>') ok = cV > tV;
                if (v[1] == '<') ok = cV < tV;

                if (!ok) {
                    if (currentBlock.type === 'ctrl_if_else') {
                        const labelName = v[3];
                        const labelBlock = allBlocks.find(b => b.type === 'ctrl_label' && b.values[0] === labelName);
                        if (labelBlock) await executeChain(labelBlock, allBlocks, context);
                    }
                    return;
                }
            }
            
            if (currentBlock.type === 'ctrl_wait') {
                 await new Promise(r => setTimeout(r, parseFloat(currentBlock.values[0]) * 1000));
            }

            if(!['ctrl_loop', 'ctrl_if', 'ctrl_if_else', 'ctrl_wait', 'evt_start', 'func_def'].includes(currentBlock.type)) {
                 await executeBlockLogic(currentBlock, context);
            }

            if (nextBlock) {
                executeChain(nextBlock, allBlocks, context);
            }
        }

        function executeBlockLogic(blockData, context) {
            return new Promise(resolve => {
                setTimeout(async () => {
                    try {
                        const type = blockData.type;
                        const v = blockData.values;
                        const world = document.getElementById('game-world');

                        switch (type) {
                            case 'ui_button':
                            case 'ui_input':
                            case 'ui_textarea':
                                 if (!document.getElementById(v[0])) {
                                    let el;
                                    if (type === 'ui_button') {
                                        el = document.createElement('button');
                                        el.innerText = v[1];
                                        el.style.border = '1px solid #444';
                                        el.style.background = '#222';
                                        el.style.color = '#fff';
                                        el.style.padding = '5px 10px';
                                        el.style.borderRadius = '4px';
                                        el.style.cursor = 'pointer';
                                    } else if (type === 'ui_input') {
                                        el = document.createElement('input');
                                        el.placeholder = v[1];
                                    } else {
                                        el = document.createElement('textarea');
                                        el.placeholder = v[1];
                                    }
                                    el.id = v[0];
                                    el.className = 'game-sprite';
                                    el.style.pointerEvents = 'auto';
                                    el.style.left = '50px';
                                    el.style.top = '50px';
                                    world.appendChild(el);
                                }
                                break;
                            case 'func_call':
                                const def = runtimeFunctions[v[0]];
                                if (def) await executeChain(def.block, def.script, context);
                                break;
                            case 'var_set':
                                const pS = parseFloat(v[1]);
                                gameVariables[v[0]] = isNaN(pS) ? v[1] : pS;
                                break;
                            case 'var_add':
                                let cVar = parseFloat(gameVariables[v[0]]) || 0;
                                gameVariables[v[0]] = cVar + parseFloat(v[1]);
                                break;
                            case 'sys_log':
                                console.log("LOG:", v[0], gameVariables[v[0]] || "");
                                break;
                            case 'looks_create':
                            case 'looks_create_circle':
                                 if (!document.getElementById(v[0])) {
                                    const d = document.createElement('div');
                                    d.id = v[0];
                                    d.className = 'game-sprite';
                                    d.style.backgroundColor = v[1];
                                    d.style.width = v[2] + 'px';
                                    d.style.height = v[2] + 'px';
                                    d.style.left = '50px';
                                    d.style.top = '50px';
                                    if (type === 'looks_create_circle') d.style.borderRadius = '50%';
                                    world.appendChild(d);
                                }
                                break;
                            case 'looks_set_wh':
                                const oWh = document.getElementById(v[0]);
                                if (oWh) { oWh.style.width = v[1] + 'px'; oWh.style.height = v[2] + 'px'; }
                                break;
                            case 'looks_set_color':
                                const oCol = document.getElementById(v[0]);
                                if (oCol) oCol.style.backgroundColor = v[1];
                                break;
                            case 'mot_setpos':
                            case 'txt_setpos':
                                const oPos = document.getElementById(v[0]);
                                if (oPos) { oPos.style.left = v[1] + 'px'; oPos.style.top = v[2] + 'px'; }
                                break;
                            case 'mot_anchor':
                                const oAnc = document.getElementById(v[0]);
                                if(oAnc) {
                                    let tx = 0, ty = 0;
                                    if (v[1] === 'center') tx = '-50%';
                                    if (v[2] === 'middle' || v[2] === 'center') ty = '-50%';
                                    oAnc.style.transform = \`translate(\${tx}, \${ty})\`;
                                }
                                break;
                            case 'txt_create':
                                let t = document.getElementById(v[0]);
                                let content = v[1];
                                if (gameVariables.hasOwnProperty(content)) content = gameVariables[content];
                                if (!t) {
                                    t = document.createElement('div');
                                    t.id = v[0];
                                    t.className = 'game-sprite';
                                    world.appendChild(t);
                                }
                                t.innerText = content;
                                t.style.color = '#fff';
                                t.style.fontSize = v[2] + 'px';
                                t.style.whiteSpace = 'nowrap';
                                break;
                            case 'txt_update':
                                let tUpd = document.getElementById(v[0]);
                                if (tUpd) {
                                    let val = v[1];
                                    if (gameVariables.hasOwnProperty(val)) val = gameVariables[val];
                                    tUpd.innerText = val;
                                }
                                break;
                            case 'input_wasd':
                                if (!controlledObjects[v[0]]) controlledObjects[v[0]] = { speed: 5 };
                                controlledObjects[v[0]].useWasd = true;
                                controlledObjects[v[0]].speed = parseFloat(v[1]);
                                break;
                            case 'input_joystick_bind':
                                if (!controlledObjects[v[0]]) controlledObjects[v[0]] = { speed: 5 };
                                controlledObjects[v[0]].useJoy = true;
                                controlledObjects[v[0]].speed = parseFloat(v[1]);
                                createJoystickHTML();
                                break;
                             case 'phys_enable':
                                physicsObjects[v[0]] = {
                                    vx: 0, vy: 0, grav: parseFloat(v[1]), bounce: parseFloat(v[2]), grounded: false
                                };
                                break;
                            case 'phys_static':
                                if (!staticObjects.includes(v[0])) staticObjects.push(v[0]);
                                break;
                             case 'phys_jump':
                                if (physicsObjects[v[0]] && physicsObjects[v[0]].grounded) {
                                    physicsObjects[v[0]].vy = -parseFloat(v[1]);
                                    physicsObjects[v[0]].grounded = false;
                                }
                                break;
                            case 'cam_follow':
                                cameraState.target = v[0];
                                break;
                            case 'evt_add_listener':
                                 const lObj = v[0];
                                 const lFunc = v[2];
                                 setTimeout(() => {
                                     const elL = document.getElementById(lObj);
                                     if(elL) {
                                         elL.onclick = (e) => {
                                             e.stopPropagation(); 
                                             const def = runtimeFunctions[lFunc];
                                             if(def) executeChain(def.block, def.script);
                                         }
                                         elL.style.cursor = 'pointer';
                                     }
                                 }, 200);
                                 break;
                            case 'win_size':
                                GAME_WIDTH = parseInt(v[0]);
                                GAME_HEIGHT = parseInt(v[1]);
                                document.getElementById('game-container').style.width = GAME_WIDTH + 'px';
                                document.getElementById('game-container').style.height = GAME_HEIGHT + 'px';
                                break;
                            case 'win_bg':
                                document.getElementById('game-stage').style.background = v[0];
                                break;
                        }
                    } catch(e) { console.error(e); }
                    resolve();
                }, 0); 
            });
        }

        function createJoystickHTML() {
            // Упрощенная логика джойстика для экспорта (без настроек цвета пока что)
            const base = document.createElement('div');
            base.style.position = 'absolute';
            base.style.bottom = '30px';
            base.style.left = '30px';
            base.style.width = '120px';
            base.style.height = '120px';
            base.style.borderRadius = '50%';
            base.style.border = '2px solid rgba(255,255,255,0.3)';
            base.style.background = 'rgba(255,255,255,0.1)';
            base.style.zIndex = '999';
            
            const stick = document.createElement('div');
            stick.style.position = 'absolute';
            stick.style.top = '50%';
            stick.style.left = '50%';
            stick.style.width = '50px';
            stick.style.height = '50px';
            stick.style.background = '#00e676';
            stick.style.borderRadius = '50%';
            stick.style.transform = 'translate(-50%, -50%)';
            base.appendChild(stick);
            document.getElementById('game-stage').appendChild(base);

            let startX, startY;
            const handleStart = e => {
                joystickData.active = true;
                const touch = e.touches ? e.touches[0] : e;
                const rect = base.getBoundingClientRect();
                startX = rect.left + rect.width / 2;
                startY = rect.top + rect.height / 2;
            }
            const handleMove = e => {
                if (!joystickData.active) return;
                const touch = e.touches ? e.touches[0] : e;
                let dx = touch.clientX - startX;
                let dy = touch.clientY - startY;
                const maxDist = 60 * 0.7; // Radius
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > maxDist) {
                    dx = (dx / dist) * maxDist;
                    dy = (dy / dist) * maxDist;
                }
                stick.style.transform = \`translate(calc(-50% + \${dx}px), calc(-50% + \${dy}px))\`;
                joystickData.x = dx / maxDist;
                joystickData.y = dy / maxDist;
            }
            const handleEnd = () => {
                joystickData.active = false;
                joystickData.x = 0;
                joystickData.y = 0;
                stick.style.transform = \`translate(-50%, -50%)\`;
            }

            base.addEventListener('mousedown', handleStart);
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleEnd);
            base.addEventListener('touchstart', handleStart);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('touchend', handleEnd);
        }

        function updatePhysics() {
            // INPUT
            for (let id in controlledObjects) {
                let ctrl = controlledObjects[id];
                let p = physicsObjects[id];
                let mx = 0, my = 0;
                if (ctrl.useWasd) {
                    if (activeKeys['KeyW'] || activeKeys['ArrowUp']) my -= 1;
                    if (activeKeys['KeyS'] || activeKeys['ArrowDown']) my += 1;
                    if (activeKeys['KeyA'] || activeKeys['ArrowLeft']) mx -= 1;
                    if (activeKeys['KeyD'] || activeKeys['ArrowRight']) mx += 1;
                }
                if (ctrl.useJoy) {
                    mx += joystickData.x;
                    my += joystickData.y;
                }
                
                if (p) {
                    p.vx = mx * ctrl.speed;
                    if (p.grav === 0) p.vy = my * ctrl.speed;
                } else {
                     let el = document.getElementById(id);
                     if(el) {
                         el.style.left = (parseFloat(el.style.left)||0) + mx * ctrl.speed + 'px';
                         el.style.top = (parseFloat(el.style.top)||0) + my * ctrl.speed + 'px';
                     }
                }
            }

            // PHYSICS
            for (let id in physicsObjects) {
                let p = physicsObjects[id];
                let el = document.getElementById(id);
                if (el) {
                    p.vy += p.grav;
                    let x = parseFloat(el.style.left) || 0;
                    let y = parseFloat(el.style.top) || 0;
                    let w = el.offsetWidth;
                    let h = el.offsetHeight;
                    
                    x += p.vx;
                    for(let sid of staticObjects) {
                        let plat = document.getElementById(sid);
                        if(plat && id !== sid) {
                             let px = parseFloat(plat.style.left)||0, py = parseFloat(plat.style.top)||0;
                             let pw = plat.offsetWidth, ph = plat.offsetHeight;
                             if (x < px + pw && x + w > px && y < py + ph && y + h > py) x -= p.vx; 
                        }
                    }
                    el.style.left = x + 'px';

                    y += p.vy;
                    if (y + h > GAME_HEIGHT) { y = GAME_HEIGHT - h; p.vy = 0; p.grounded = true; }
                    let onPlatform = false;
                    for(let sid of staticObjects) {
                         let plat = document.getElementById(sid);
                         if(plat && id !== sid) {
                             let px = parseFloat(plat.style.left)||0, py = parseFloat(plat.style.top)||0;
                             let pw = plat.offsetWidth, ph = plat.offsetHeight;
                             if (x < px + pw && x + w > px && y < py + ph && y + h > py) {
                                 if(p.vy > 0) { y = py - h; p.vy = 0; p.grounded = true; onPlatform = true; } 
                                 else if (p.vy < 0) { y = py + ph; p.vy = 0; }
                             }
                         }
                    }
                    el.style.top = y + 'px';
                }
            }

            const world = document.getElementById('game-world');
            if (cameraState.target) {
                let el = document.getElementById(cameraState.target);
                if (el) {
                    let x = parseFloat(el.style.left) || 0;
                    let y = parseFloat(el.style.top) || 0;
                    let camX = -x - el.offsetWidth/2 + GAME_WIDTH/2;
                    let camY = -y - el.offsetHeight/2 + GAME_HEIGHT/2;
                    world.style.transform = \`translate(\${camX}px, \${camY}px)\`;
                }
            }
            requestAnimationFrame(updatePhysics);
        }
        `

		const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Ecrous Game Build</title>
    <style>
        body { margin: 0; background: #111; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; overflow: hidden; }
        #game-container { position: relative; width: 800px; height: 600px; background: #000; overflow: hidden; box-shadow: 0 0 50px rgba(0,0,0,0.5); }
        #game-stage { width: 100%; height: 100%; position: relative; overflow: hidden; }
        #game-world { width: 100%; height: 100%; position: absolute; transform-origin: 0 0; }
        .game-sprite { position: absolute; display: flex; align-items: center; justify-content: center; user-select: none; box-sizing: border-box; }
        button.game-sprite:active { transform: translateY(1px); }
    </style>
</head>
<body>
    <div id="game-container">
        <div id="game-stage">
            <div id="game-world"></div>
        </div>
    </div>
    <script>
    ${runtimeScript}
    <\/script>
</body>
</html>
        `

		return htmlContent
	}

	// ===== СКАЧИВАНИЕ ФАЙЛОВ =====

	function downloadFile(filename, content, mimeType) {
		const blob = new Blob([content], { type: mimeType })
		const a = document.createElement('a')
		a.href = URL.createObjectURL(blob)
		a.download = filename
		a.click()
		URL.revokeObjectURL(a.href)
	}

	function exportProjectAsZip() {
		if (typeof JSZip === 'undefined') {
			alert('Ошибка: Библиотека JSZip не найдена. Проверьте index.html.')
			return
		}

		const html = generateGameHTML()
		const zip = new JSZip()

		// Файл игры
		zip.file('Game.html', html)

		// Обновленный файл запуска для всех браузеров
		const batContent = `
@echo off
title Ecrous Game Launcher
echo Starting Game...

REM 1. Сначала ищем Edge (есть у всех на Windows) - открывает красивое окно
start msedge --app="file://%cd%\\Game.html" && exit

REM 2. Если Edge нет, пробуем Chrome в режиме приложения
start chrome --app="file://%cd%\\Game.html" && exit

REM 3. Если и Chrome нет, пробуем Yandex Browser (обычно browser.exe)
start browser --app="file://%cd%\\Game.html" && exit

REM 4. Если ничего не нашли - открываем просто в браузере по умолчанию (Firefox и др.)
start "" "Game.html"
exit
        `

		zip.file('Start_Game.bat', batContent)
		zip.file(
			'README.txt',
			"Для запуска игры откройте 'Start_Game.bat'.\nСкрипт попытается открыть игру в отдельном окне без рамок.\nСоздано в Ecrous Engine."
		)

		zip.generateAsync({ type: 'blob' }).then(function (content) {
			const a = document.createElement('a')
			a.href = URL.createObjectURL(content)
			a.download = 'My_Ecrous_Game.zip'
			a.click()
			URL.revokeObjectURL(a.href)
		})
	}
}
