// ===== FILE MENU =====
const menuFile = document.getElementById('menuFile')

menuFile.addEventListener('click', e => {
	e.stopPropagation()
	menuFile.classList.toggle('open')
})

document.addEventListener('click', () => {
	menuFile.classList.remove('open')
})
