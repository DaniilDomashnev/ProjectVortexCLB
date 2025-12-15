// ==========================================
// MOBILE TOUCH SUPPORT (Ecrous Engine)
// ==========================================

;(function () {
	const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0

	if (!isMobile) return

	console.log('[Mobile] Touch mode enabled')

	let activeBlock = null
	let touchOffset = { x: 0, y: 0 }
	let isPanning = false
	let panStart = { x: 0, y: 0 }

	// ---------- HELPERS ----------
	function getTouch(e) {
		return e.touches[0] || e.changedTouches[0]
	}

	// ---------- BLOCK DRAG ----------
	document.addEventListener(
		'touchstart',
		e => {
			const header = e.target.closest('.node-header')
			const block = e.target.closest('.node-block')

			// Закрытие по крестику
			if (e.target.classList.contains('ri-close-line')) return

			if (header && block) {
				e.preventDefault()

				activeBlock = block
				block.classList.add('dragging')

				const rect = block.getBoundingClientRect()
				const t = getTouch(e)

				touchOffset.x = t.clientX - rect.left
				touchOffset.y = t.clientY - rect.top
			} else if (
				e.target.id === 'mainCanvas' ||
				e.target.id === 'canvas-container'
			) {
				// PAN CANVAS
				isPanning = true
				const t = getTouch(e)
				panStart.x = t.clientX - window.panX
				panStart.y = t.clientY - window.panY
			}
		},
		{ passive: false }
	)

	document.addEventListener(
		'touchmove',
		e => {
			const t = getTouch(e)

			if (activeBlock) {
				e.preventDefault()

				activeBlock.style.left =
					t.clientX - 260 - window.panX - touchOffset.x + 'px'
				activeBlock.style.top =
					t.clientY - 54 - window.panY - touchOffset.y + 'px'
				return
			}

			if (isPanning) {
				e.preventDefault()
				window.panX = t.clientX - panStart.x
				window.panY = t.clientY - panStart.y
				window.updateTransform()
			}
		},
		{ passive: false }
	)

	document.addEventListener('touchend', () => {
		if (activeBlock) {
			activeBlock.classList.remove('dragging')
			if (window.snapBlock) window.snapBlock(activeBlock)
		}

		activeBlock = null
		isPanning = false
	})

	// ---------- TOOLBOX DRAG (TAP TO ADD) ----------
	document.querySelectorAll('.tool-item').forEach(item => {
		item.addEventListener('touchstart', e => {
			e.preventDefault()
			const type = item.innerText.trim()
			const rect = document.getElementById('mainCanvas').getBoundingClientRect()

			if (window.createBlock) {
				window.createBlock(type, rect.left + 100, rect.top + 100)
			}
		})
	})
})()

// ==========================================
// --- 5. МОБИЛЬНАЯ БИБЛИОТЕКА ---
// ==========================================

function initMobileLibrary() {
    const fab = document.getElementById('fabAddBlock');
    const overlay = document.getElementById('library-overlay');
    const closeBtn = document.getElementById('btnCloseLib');
    const catContainer = document.getElementById('libCategories');
    const gridContainer = document.getElementById('libGrid');

    // Открытие
    fab.onclick = () => {
        overlay.classList.remove('hidden');
        renderLibCategories(); // Рисуем категории при открытии
    }

    // Закрытие
    closeBtn.onclick = () => overlay.classList.add('hidden');

    // Функция рендера категорий
    function renderLibCategories() {
        catContainer.innerHTML = '';
        
        // Получаем уникальные категории
        const categories = [...new Set(BLOCK_DEFINITIONS.map(b => b.category))];
        // Добавляем Шаблоны вручную в конец, если их нет
        if(!categories.includes('Шаблоны')) categories.push('Шаблоны');

        let isFirst = true;

        categories.forEach(cat => {
            const el = document.createElement('div');
            el.className = 'lib-cat-item';
            
            // Иконка для категории (условная логика)
            let icon = 'ri-function-line';
            if(cat === 'События') icon = 'ri-flag-fill';
            if(cat === 'Окно') icon = 'ri-window-line';
            if(cat === 'Физика') icon = 'ri-basketball-line';
            if(cat === 'Логика') icon = 'ri-git-branch-line';
            if(cat === 'Внешность') icon = 'ri-palette-line';

            el.innerHTML = `<i class="${icon}"></i><span>${cat}</span>`;
            
            el.onclick = () => {
                // Подсветка активной
                document.querySelectorAll('.lib-cat-item').forEach(i => i.classList.remove('active'));
                el.classList.add('active');
                renderLibBlocks(cat);
            };

            catContainer.appendChild(el);

            if(isFirst) {
                el.click(); // Выбираем первую категорию сразу
                isFirst = false;
            }
        });
    }

    // Функция рендера блоков
    function renderLibBlocks(category) {
        gridContainer.innerHTML = '';

        // Фильтруем блоки
        let blocks = BLOCK_DEFINITIONS.filter(b => b.category === category);
        
        // Если категория Шаблоны - добавляем кастомные
        if(category === 'Шаблоны') {
            // Стандартные шаблоны уже есть в BLOCK_DEFINITIONS с category='Шаблоны'
            // Добавим пользовательские
            Object.keys(customTemplates).forEach(key => {
                const tmpl = customTemplates[key];
                blocks.push({
                    id: key, // Ключ шаблона
                    label: tmpl.name,
                    icon: 'ri-star-fill',
                    color: '#FFD700',
                    isCustom: true
                });
            });
        }

        blocks.forEach(def => {
            const card = document.createElement('div');
            card.className = 'lib-block-card';
            card.innerHTML = `
                <div class="lib-block-icon">
                    <i class="${def.icon}" style="color:${def.color}"></i>
                </div>
                <div class="lib-block-name">${def.label}</div>
            `;
            
            // КЛИК ПО БЛОКУ -> ДОБАВИТЬ В ЦЕНТР ЭКРАНА
            card.onclick = () => {
                addBlockToCenter(def);
                overlay.classList.add('hidden'); // Закрыть меню
            };

            gridContainer.appendChild(card);
        });
    }

    function addBlockToCenter(def) {
        // Вычисляем центр видимой области холста с учетом панорамирования (panX, panY)
        // container rect не нужен, считаем от центра окна браузера
        const rect = canvas.getBoundingClientRect();
        
        // Центр экрана относительно canvas-container
        const centerX = (-panX + rect.width / 2) - 100; // -100 смещение чтобы встал ровно
        const centerY = (-panY + rect.height / 2) - 50;

        if (def.isCustom) {
            // Это пользовательский шаблон
            const templateData = customTemplates[def.id].data;
             // Находим левую верхнюю точку шаблона
            let minX = Infinity, minY = Infinity;
            templateData.forEach(b => {
                if (b.x < minX) minX = b.x;
                if (b.y < minY) minY = b.y;
            });
            // Создаем
            templateData.forEach(blockData => {
                const offsetX = blockData.x - minX;
                const offsetY = blockData.y - minY;
                createBlock(blockData.type, 0, 0, {
                    ...blockData,
                    x: centerX + offsetX,
                    y: centerY + offsetY
                });
            });
        } else if (TEMPLATES[def.id]) {
            // Это встроенный шаблон (Clicker и т.д.)
            TEMPLATES[def.id].forEach(blockData => {
                 createBlock(blockData.type, 0, 0, {
                    ...blockData,
                     // Просто спавним их кучей в центре, или используем их относительные координаты
                     // Для простоты, если у них есть координаты в конфиге, они переопределят это
                     // Но в createBlock мы передаем restoreData, если хотим точные.
                     // Здесь просто перезапишем координаты со смещением
                 });
                 // Фикс: для встроенных шаблонов лучше использовать их родные координаты + смещение, 
                 // но пока просто создадим как есть (логика createBlock обработает).
                 // Чтобы работало корректно, лучше пройтись по массиву и добавить смещение:
            });
            // Перезапуск для корректной вставки шаблона
             TEMPLATES[def.id].forEach((b, i) => {
                 // хак: сдвигаем их немного
                 createBlock(b.type, 0, 0, {
                     ...b,
                     x: centerX + (i*10), 
                     y: centerY + (i*10)
                 });
             })
        } else {
            // Обычный блок
            createBlock(def.id, 0, 0, {
                values: def.inputs ? def.inputs.map(i => i.default) : [], // Дефолтные значения
                x: centerX,
                y: centerY
            });
        }
    }
}
