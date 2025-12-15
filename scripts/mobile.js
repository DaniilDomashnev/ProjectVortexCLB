// ==========================================
// MOBILE TOUCH SUPPORT (Ecrous Engine)
// ==========================================

;(function () {
	// Проверка на мобильное устройство
	const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0
	if (!isMobile) return

	console.log('[Mobile] Touch mode enabled')

	let activeBlock = null
	let touchOffset = { x: 0, y: 0 }
	let isPanning = false
	let panStart = { x: 0, y: 0 }

	// Ссылка на DOM элементы
	const canvasEl = document.getElementById('mainCanvas')

	// ---------- HELPERS ----------
	function getTouch(e) {
		return e.touches[0] || e.changedTouches[0]
	}

	// ---------- BLOCK DRAG (Перетаскивание блоков) ----------
	document.addEventListener(
		'touchstart',
		e => {
			// Ищем, на что нажали
			const header = e.target.closest('.node-header')
			const block = e.target.closest('.node-block')
			const isCanvas =
				e.target.id === 'mainCanvas' ||
				e.target.id === 'canvas-container' ||
				e.target.classList.contains('canvas')

			// 1. Если нажали на крестик закрытия - ничего не делаем (пусть работает клик)
			if (e.target.classList.contains('ri-close-line')) return

			// 2. Если нажали на шапку блока -> ТАЩИМ БЛОК
			if (header && block) {
				e.preventDefault() // Запрещаем скролл страницы
				e.stopPropagation()

				activeBlock = block
				block.classList.add('dragging')

				const t = getTouch(e)
				const blockRect = block.getBoundingClientRect()

				// Вычисляем смещение пальца относительно угла блока
				touchOffset.x = t.clientX - blockRect.left
				touchOffset.y = t.clientY - blockRect.top
			}
			// 3. Если нажали просто на фон -> ДВИГАЕМ КАМЕРУ (PAN)
			else if (isCanvas) {
				isPanning = true
				const t = getTouch(e)
				// Запоминаем точку старта относительно текущего сдвига (panX)
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

			// А. Двигаем блок
			if (activeBlock) {
				e.preventDefault() // Важно: блокируем скролл страницы

				// Получаем границы самого холста (canvas), чтобы считать координаты относительно него
				const canvasRect = canvasEl.getBoundingClientRect()

				// Формула: (Позиция пальца) - (Отступ холста от края экрана) - (Сдвиг камеры) - (Сдвиг хвата)
				const newX = t.clientX - canvasRect.left - window.panX - touchOffset.x
				const newY = t.clientY - canvasRect.top - window.panY - touchOffset.y

				activeBlock.style.left = newX + 'px'
				activeBlock.style.top = newY + 'px'
				return
			}

			// Б. Двигаем камеру
			if (isPanning) {
				e.preventDefault()
				window.panX = t.clientX - panStart.x
				window.panY = t.clientY - panStart.y

				// Вызываем обновление трансформации (функция из script.js)
				if (window.updateTransform) window.updateTransform()
			}
		},
		{ passive: false }
	)

	document.addEventListener('touchend', () => {
		if (activeBlock) {
			activeBlock.classList.remove('dragging')
			// Магнит (Snap), если есть
			if (window.snapBlock) window.snapBlock(activeBlock)
		}

		activeBlock = null
		isPanning = false
	})

	// Инициализация библиотеки (меню добавления)
	// Ждем полной загрузки, чтобы script.js успел отработать
	setTimeout(() => {
		if (typeof initMobileLibrary === 'function') {
			initMobileLibrary()
		}
	}, 500)
})()

// Эта функция должна быть глобальной, чтобы script.js мог её видеть (если нужно)
// Но так как она вызывается внутри mobile.js, оставляем её доступной
