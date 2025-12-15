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
