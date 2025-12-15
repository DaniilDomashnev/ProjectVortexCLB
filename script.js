// ==========================================
// --- 1. КОНФИГУРАЦИЯ БЛОКОВ ---
// ==========================================
const BLOCK_DEFINITIONS = [
	// ----------------------------------------------------
	// 1. СОБЫТИЯ
	// ----------------------------------------------------
	{
		id: 'evt_start',
		category: 'События',
		label: 'При старте',
		icon: 'ri-flag-fill',
		color: '#00E676',
	},
	{
		id: 'evt_click_obj',
		category: 'События',
		label: 'Клик по объекту',
		icon: 'ri-cursor-line',
		color: '#00E676',
		inputs: [{ label: 'ID', default: 'btn' }],
	},
	{
		id: 'evt_key',
		category: 'События',
		label: 'Клавиша нажата',
		icon: 'ri-keyboard-line',
		color: '#00E676',
		inputs: [{ label: 'Key', default: 'Space' }],
	},
	{
		id: 'evt_add_listener',
		category: 'События',
		label: 'Слушать событие',
		icon: 'ri-volume-up-line',
		color: '#00E676',
		inputs: [
			{ label: 'Obj ID', default: 'btn' },
			{ label: 'Тип (tap/touch)', default: 'tap' },
			{ label: 'Функция', default: 'onClick' },
		],
	},
	{
		id: 'evt_rem_listener',
		category: 'События',
		label: 'Убрать событие',
		icon: 'ri-volume-mute-line',
		color: '#00E676',
		inputs: [
			{ label: 'Obj ID', default: 'btn' },
			{ label: 'Тип', default: 'tap' },
		],
	},

	// ----------------------------------------------------
	// 2. ОКНО И СИСТЕМА
	// ----------------------------------------------------
	{
		id: 'win_title',
		category: 'Окно',
		label: 'Название окна',
		icon: 'ri-window-line',
		color: '#00B0FF',
		inputs: [{ label: 'Текст', default: 'My Game' }],
	},
	{
		id: 'win_size',
		category: 'Окно',
		label: 'Размер окна',
		icon: 'ri-aspect-ratio-line',
		color: '#00B0FF',
		inputs: [
			{ label: 'Ширина', default: '800' },
			{ label: 'Высота', default: '600' },
		],
	},
	{
		id: 'win_bg',
		category: 'Окно',
		label: 'Фон (Выбор)',
		icon: 'ri-paint-fill',
		color: '#00B0FF',
		inputs: [{ label: 'Цвет', type: 'color', default: '#111111' }],
	},
	{
		id: 'win_bg_url',
		category: 'Окно',
		label: 'Фон (Картинка URL)',
		icon: 'ri-image-line',
		color: '#00B0FF',
		inputs: [{ label: 'URL', default: 'https://' }],
	},
	{
		id: 'sys_console_hide',
		category: 'Окно',
		label: 'Скрыть консоль',
		icon: 'ri-eye-off-line',
		color: '#00B0FF',
	},

	// ----------------------------------------------------
	// 3. КАМЕРА
	// ----------------------------------------------------
	{
		id: 'cam_follow',
		category: 'Камера',
		label: 'Следить за...',
		icon: 'ri-camera-lens-line',
		color: '#6200EA',
		inputs: [{ label: 'ID', default: 'player' }],
	},
	{
		id: 'cam_move',
		category: 'Камера',
		label: 'Перейти в X, Y',
		icon: 'ri-drag-move-line',
		color: '#6200EA',
		inputs: [
			{ label: 'X', default: '0' },
			{ label: 'Y', default: '0' },
		],
	},
	{
		id: 'cam_zoom',
		category: 'Камера',
		label: 'Зум (Масштаб)',
		icon: 'ri-zoom-in-line',
		color: '#6200EA',
		inputs: [{ label: 'x (1.0)', default: '1.0' }],
	},

	// ----------------------------------------------------
	// 4. УПРАВЛЕНИЕ
	// ----------------------------------------------------
	{
		id: 'input_wasd',
		category: 'Управление',
		label: 'Подключить WASD',
		icon: 'ri-keyboard-box-line',
		color: '#FF3D00',
		inputs: [
			{ label: 'ID', default: 'player' },
			{ label: 'Скорость', default: '5' },
		],
	},
	{
		id: 'input_joystick_bind',
		category: 'Управление',
		label: 'Подключить Джойстик',
		icon: 'ri-gamepad-line',
		color: '#FF3D00',
		inputs: [
			{ label: 'ID', default: 'player' },
			{ label: 'Скорость', default: '5' },
		],
	},
	{
		id: 'input_joy_cfg',
		category: 'Управление',
		label: 'Настройка Джойстика',
		icon: 'ri-settings-4-line',
		color: '#FF3D00',
		inputs: [
			{ label: 'Сторона (L/R)', default: 'L' },
			{ label: 'Размер (px)', default: '120' },
			{ label: 'Отступ', default: '30' },
			{ label: 'Цвет', type: 'color', default: '#00e676' },
		],
	},

	// ----------------------------------------------------
	// 5. ЛОГИКА И ФУНКЦИИ
	// ----------------------------------------------------
	{
		id: 'ctrl_if',
		category: 'Логика',
		label: 'Если (Var ? Val)',
		icon: 'ri-question-mark',
		color: '#FFD600',
		inputs: [
			{ label: 'Var', default: 'score' },
			{ label: 'Знак (=,>,<)', default: '=' },
			{ label: 'Val', default: '5' },
		],
	},
	{
		id: 'ctrl_if_else',
		category: 'Логика',
		label: 'Если/Иначе (Ветка)',
		icon: 'ri-git-branch-line',
		color: '#FFD600',
		inputs: [
			{ label: 'Var', default: 'x' },
			{ label: 'Cond', default: '>' },
			{ label: 'Val', default: '0' },
			{ label: 'Else Label', default: 'my_else' },
		],
	},
	{
		id: 'ctrl_label',
		category: 'Логика',
		label: 'Метка (Label)',
		icon: 'ri-bookmark-fill',
		color: '#FFD600',
		inputs: [{ label: 'Имя', default: 'my_else' }],
	},
	{
		id: 'ctrl_wait',
		category: 'Логика',
		label: 'Ждать (сек)',
		icon: 'ri-timer-line',
		color: '#FFD600',
		inputs: [{ label: 'Сек', default: '1' }],
	},
	{
		id: 'ctrl_wait_until',
		category: 'Логика',
		label: 'Ждать до...',
		icon: 'ri-hourglass-line',
		color: '#FFD600',
		inputs: [
			{ label: 'Var', default: 'score' },
			{ label: 'Знак', default: '>' },
			{ label: 'Val', default: '10' },
		],
	},
	{
		id: 'ctrl_loop',
		category: 'Логика',
		label: 'Повторить N раз',
		icon: 'ri-refresh-line',
		color: '#FFD600',
		inputs: [{ label: 'Раз', default: '5' }],
	},
	{
		id: 'ctrl_while',
		category: 'Логика',
		label: 'Цикл Пока (While)',
		icon: 'ri-loop-left-line',
		color: '#FFD600',
		inputs: [
			{ label: 'Var', default: 'hp' },
			{ label: 'Знак', default: '>' },
			{ label: 'Val', default: '0' },
		],
	},
	{
		id: 'ctrl_for',
		category: 'Логика',
		label: 'Цикл Для (For i)',
		icon: 'ri-list-ordered',
		color: '#FFD600',
		inputs: [
			{ label: 'Var i', default: 'i' },
			{ label: 'От', default: '1' },
			{ label: 'До', default: '10' },
		],
	},
	{
		id: 'func_def',
		category: 'Логика',
		label: 'Функция (Def)',
		icon: 'ri-function-line',
		color: '#FFD600',
		inputs: [
			{ label: 'Имя', default: 'onTap' },
			{ label: 'Параметры', default: 'event' },
		],
	},
	{
		id: 'func_call',
		category: 'Логика',
		label: 'Вызвать Функцию',
		icon: 'ri-play-circle-line',
		color: '#FFD600',
		inputs: [
			{ label: 'Имя', default: 'onTap' },
			{ label: 'Аргументы', default: '{}' },
		],
	},
	{
		id: 'sys_comment',
		category: 'Логика',
		label: 'Комментарий',
		icon: 'ri-sticky-note-line',
		color: '#FDD835', // Желтый цвет заметки
		inputs: [
            { label: 'Заметка', default: 'Описание логики...' }
        ],
	},

	// ----------------------------------------------------
	// 6. ФИЗИКА
	// ----------------------------------------------------
	{
		id: 'phys_enable',
		category: 'Физика',
		label: 'Вкл. Физику',
		icon: 'ri-basketball-line',
		color: '#FF9100',
		inputs: [
			{ label: 'ID', default: 'player' },
			{ label: 'Грав (0-1)', default: '0.5' },
			{ label: 'Отскок', default: '0.0' },
		],
	},
	{
		id: 'phys_props',
		category: 'Физика',
		label: 'Параметры Вел.',
		icon: 'ri-speed-line',
		color: '#FF9100',
		inputs: [
			{ label: 'ID', default: 'obj' },
			{ label: 'VX', default: '0' },
			{ label: 'VY', default: '0' },
			{ label: 'AngVel', default: '0' },
		],
	},
	{
		id: 'phys_static',
		category: 'Физика',
		label: 'Сделать Платформой',
		icon: 'ri-stop-circle-line',
		color: '#FF9100',
		inputs: [{ label: 'ID', default: 'ground' }],
	},
	{
		id: 'phys_jump',
		category: 'Физика',
		label: 'Прыжок (С земли)',
		icon: 'ri-arrow-up-double-line',
		color: '#FF9100',
		inputs: [
			{ label: 'ID', default: 'player' },
			{ label: 'Сила', default: '15' },
		],
	},
	{
		id: 'phys_force',
		category: 'Физика',
		label: 'Толчок (X, Y)',
		icon: 'ri-flight-takeoff-line',
		color: '#FF9100',
		inputs: [
			{ label: 'ID', default: 'player' },
			{ label: 'Сила X', default: '0' },
			{ label: 'Сила Y', default: '-15' },
		],
	},
	{
		id: 'phys_collide',
		category: 'Физика',
		label: 'Касается?',
		icon: 'ri-collision-line',
		color: '#FF9100',
		inputs: [
			{ label: 'ID 1', default: 'player' },
			{ label: 'ID 2', default: 'coin' },
			{ label: 'В перем.', default: 'isHit' },
		],
	},

	// ----------------------------------------------------
	// 7. ТЕКСТ
	// ----------------------------------------------------
	{
		id: 'txt_create',
		category: 'Текст',
		label: 'Создать Текст',
		icon: 'ri-text',
		color: '#E040FB',
		inputs: [
			{ label: 'ID', default: 'txt' },
			{ label: 'Текст', default: 'Hello' },
			{ label: 'Размер', default: '24' },
		],
	},
	{
		id: 'txt_color',
		category: 'Текст',
		label: 'Цвет (Hex/RGB)',
		icon: 'ri-palette-line',
		color: '#E040FB',
		inputs: [
			{ label: 'ID', default: 'txt' },
			{ label: 'Color', default: '#ffffff' },
		],
	},
	{
		id: 'txt_update',
		category: 'Текст',
		label: 'Обновить текст',
		icon: 'ri-edit-line',
		color: '#E040FB',
		inputs: [
			{ label: 'ID', default: 'txt' },
			{ label: 'Новое знач.', default: 'score' },
		],
	},
	{
		id: 'txt_setsize',
		category: 'Текст',
		label: 'Размер шрифта',
		icon: 'ri-fontSize',
		color: '#E040FB',
		inputs: [
			{ label: 'ID', default: 'txt' },
			{ label: 'Размер', default: '30' },
		],
	},
	{
		id: 'txt_setpos',
		category: 'Текст',
		label: 'Позиция текста',
		icon: 'ri-map-pin-line',
		color: '#E040FB',
		inputs: [
			{ label: 'ID', default: 'txt' },
			{ label: 'X', default: '20' },
			{ label: 'Y', default: '20' },
		],
	},

	// ----------------------------------------------------
	// 8. ВНЕШНОСТЬ И ТЕКСТУРЫ
	// ----------------------------------------------------
	{
		id: 'looks_create',
		category: 'Внешность',
		label: 'Создать Квадрат',
		icon: 'ri-checkbox-blank-line',
		color: '#D500F9',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: 'Цвет', type: 'color', default: '#ff0055' },
			{ label: 'Размер', default: '50' },
		],
	},
	{
		id: 'looks_create_circle',
		category: 'Внешность',
		label: 'Создать Круг',
		icon: 'ri-checkbox-circle-line',
		color: '#D500F9',
		inputs: [
			{ label: 'ID', default: 'ball' },
			{ label: 'Цвет', type: 'color', default: '#00b0ff' },
			{ label: 'Размер', default: '50' },
		],
	},
	{
		id: 'looks_texture_file',
		category: 'Внешность',
		label: 'Текстура (Файл)',
		icon: 'ri-image-add-line',
		color: '#D500F9',
		inputs: [{ label: 'ID', default: 'box' }],
	},
	{
		id: 'looks_texture_url',
		category: 'Внешность',
		label: 'Текстура (URL)',
		icon: 'ri-link',
		color: '#D500F9',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: 'URL', default: 'https://' },
		],
	},
	{
		id: 'looks_set_color',
		category: 'Внешность',
		label: 'Цвет (Hex/RGB)',
		icon: 'ri-palette-fill',
		color: '#D500F9',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: 'Color', default: '#ff0000' },
		],
	},
	{
		id: 'looks_set_wh',
		category: 'Внешность',
		label: 'Задать W / H',
		icon: 'ri-aspect-ratio-fill',
		color: '#D500F9',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: 'Ширина', default: '100' },
			{ label: 'Высота', default: '50' },
		],
	},
	{
		id: 'looks_opacity',
		category: 'Внешность',
		label: 'Прозрачность',
		icon: 'ri-drop-line',
		color: '#D500F9',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: '0.0 - 1.0', default: '0.5' },
		],
	},
	{
		id: 'looks_destroy',
		category: 'Внешность',
		label: 'Удалить объект',
		icon: 'ri-delete-bin-line',
		color: '#D500F9',
		inputs: [{ label: 'ID', default: 'box' }],
	},

	// ----------------------------------------------------
	// 9. ДВИЖЕНИЕ
	// ----------------------------------------------------
	{
		id: 'mot_bounds',
		category: 'Движение',
		label: 'Границы экрана',
		icon: 'ri-stop-mini-fill',
		color: '#2979FF',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: 'Режим (stop/bounce/wrap/none)', default: 'stop' },
		],
	},
	{
		id: 'mot_setpos',
		category: 'Движение',
		label: 'Позиция X, Y',
		icon: 'ri-drag-move-line',
		color: '#2979FF',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: 'X', default: '100' },
			{ label: 'Y', default: '100' },
		],
	},
	{
		id: 'mot_anchor',
		category: 'Движение',
		label: 'Якорь (Anchor)',
		icon: 'ri-anchor-line',
		color: '#2979FF',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: 'Horz (L/C/R)', default: 'center' },
			{ label: 'Vert (T/M/B)', default: 'middle' },
		],
	},
	{
		id: 'mot_align',
		category: 'Движение',
		label: 'Выровнять',
		icon: 'ri-layout-line',
		color: '#2979FF',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: 'Гор (L/C/R)', default: 'center' },
			{ label: 'Верт (T/C/B)', default: 'center' },
		],
	},
	{
		id: 'mot_shift',
		category: 'Движение',
		label: 'Сдвиг (dX, dY)',
		icon: 'ri-arrow-right-line',
		color: '#2979FF',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: 'dX', default: '10' },
			{ label: 'dY', default: '0' },
		],
	},
	{
		id: 'mot_rotate',
		category: 'Движение',
		label: 'Вращение (+)',
		icon: 'ri-refresh-line',
		color: '#2979FF',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: 'Градус', default: '15' },
		],
	},
	{
		id: 'mot_set_rot',
		category: 'Движение',
		label: 'Задать Угол',
		icon: 'ri-compass-3-line',
		color: '#2979FF',
		inputs: [
			{ label: 'ID', default: 'box' },
			{ label: 'Градус', default: '0' },
		],
	},

	// ----------------------------------------------------
	// 10. ПЕРЕМЕННЫЕ
	// ----------------------------------------------------
	{
		id: 'var_set',
		category: 'Переменные',
		label: 'Задать перем.',
		icon: 'ri-save-line',
		color: '#FF1744',
		inputs: [
			{ label: 'Имя', default: 'score' },
			{ label: 'Знач', default: '0' },
		],
	},
	{
		id: 'var_add',
		category: 'Переменные',
		label: 'Прибавить',
		icon: 'ri-add-line',
		color: '#FF1744',
		inputs: [
			{ label: 'Имя', default: 'score' },
			{ label: 'Сколько', default: '1' },
		],
	},
	{
		id: 'sys_log',
		category: 'Переменные',
		label: 'Лог в консоль',
		icon: 'ri-terminal-line',
		color: '#FF1744',
		inputs: [{ label: 'Сообщ', default: 'Info' }],
	},

	// ----------------------------------------------------
	// 11. ВИДЖЕТЫ
	// ----------------------------------------------------
	{
		id: 'ui_scroll',
		category: 'Виджеты',
		label: 'ScrollView',
		icon: 'ri-layout-row-line',
		color: '#00C853',
		inputs: [
			{ label: 'ID', default: 'scroll' },
			{ label: 'W', default: '200' },
			{ label: 'H', default: '300' },
		],
	},
	{
		id: 'ui_input',
		category: 'Виджеты',
		label: 'TextField',
		icon: 'ri-input-cursor-move',
		color: '#00C853',
		inputs: [
			{ label: 'ID', default: 'inp' },
			{ label: 'Placeholder', default: 'Text...' },
		],
	},
	{
		id: 'ui_textarea',
		category: 'Виджеты',
		label: 'TextArea',
		icon: 'ri-file-text-line',
		color: '#00C853',
		inputs: [
			{ label: 'ID', default: 'area' },
			{ label: 'Placeholder', default: 'Content...' },
		],
	},

	// ----------------------------------------------------
	// 12. UI ЭЛЕМЕНТЫ
	// ----------------------------------------------------
	{
		id: 'ui_button',
		category: 'UI',
		label: 'Кнопка',
		icon: 'ri-toggle-line',
		color: '#2962FF',
		inputs: [
			{ label: 'ID', default: 'btn' },
			{ label: 'Текст', default: 'Click Me' },
		],
	},

	// ----------------------------------------------------
	// 13. ШАБЛОНЫ
	// ----------------------------------------------------
	{
		id: 'tmpl_clicker',
		category: 'Шаблоны',
		label: 'Кликер (Быстрый старт)',
		icon: 'ri-cursor-fill',
		color: '#E040FB',
	},
	{
		id: 'tmpl_platformer',
		category: 'Шаблоны',
		label: 'Платформер + Камера',
		icon: 'ri-run-line',
		color: '#E040FB',
	},
]

// ==========================================
// --- 2. ШАБЛОНЫ (PRESETS) ---
// ==========================================
const TEMPLATES = {
	tmpl_clicker: [
		{ type: 'evt_start', x: 20, y: 20, values: [] },
		{ type: 'sys_console_hide', x: 20, y: 80, values: [] },
		{ type: 'var_set', x: 20, y: 140, values: ['score', '0'] },
		{ type: 'ui_button', x: 20, y: 200, values: ['btn', 'Tap Me!'] },
		{ type: 'mot_anchor', x: 20, y: 260, values: ['btn', 'center', 'center'] },
		{ type: 'mot_setpos', x: 20, y: 320, values: ['btn', '400', '300'] },
		{ type: 'txt_create', x: 20, y: 380, values: ['txt', '0', '50'] },
		{ type: 'txt_setpos', x: 20, y: 440, values: ['txt', '400', '100'] },
		{ type: 'mot_anchor', x: 20, y: 500, values: ['txt', 'center', 'center'] },

		// Event listener style
		{
			type: 'evt_add_listener',
			x: 300,
			y: 20,
			values: ['btn', 'tap', 'onClick'],
		},

		// Function def
		{ type: 'func_def', x: 300, y: 80, values: ['onClick', 'e'] },
		{ type: 'var_add', x: 300, y: 140, values: ['score', '1'] },
		{ type: 'txt_update', x: 300, y: 200, values: ['txt', 'score'] },
		{ type: 'looks_set_wh', x: 300, y: 260, values: ['btn', '110', '40'] },
		{ type: 'ctrl_wait', x: 300, y: 320, values: ['0.1'] },
		{ type: 'looks_set_wh', x: 300, y: 380, values: ['btn', '100', '30'] },
	],
	tmpl_platformer: [
		{ type: 'evt_start', x: 20, y: 20, values: [] },
		{ type: 'win_bg', x: 20, y: 80, values: ['#87CEEB'] },
		{ type: 'win_size', x: 20, y: 140, values: ['800', '600'] },
		{ type: 'sys_console_hide', x: 20, y: 200, values: [] },
		{
			type: 'looks_create',
			x: 250,
			y: 20,
			values: ['ground', '#4CAF50', '100'],
		},
		{ type: 'looks_set_wh', x: 250, y: 80, values: ['ground', '2000', '100'] },
		{ type: 'mot_setpos', x: 250, y: 140, values: ['ground', '0', '500'] },
		{ type: 'phys_static', x: 250, y: 200, values: ['ground'] },
		{ type: 'looks_create', x: 250, y: 280, values: ['p1', '#388E3C', '50'] },
		{ type: 'looks_set_wh', x: 250, y: 340, values: ['p1', '200', '30'] },
		{ type: 'mot_setpos', x: 250, y: 400, values: ['p1', '400', '350'] },
		{ type: 'phys_static', x: 250, y: 460, values: ['p1'] },
		{ type: 'looks_create', x: 500, y: 20, values: ['hero', '#FF5722', '50'] },
		{ type: 'mot_setpos', x: 500, y: 80, values: ['hero', '100', '300'] },
		{ type: 'phys_enable', x: 500, y: 140, values: ['hero', '0.6', '0.0'] },
		{ type: 'mot_bounds', x: 500, y: 200, values: ['hero', 'none'] },
		{ type: 'input_wasd', x: 500, y: 260, values: ['hero', '8'] },
		{ type: 'cam_follow', x: 500, y: 320, values: ['hero'] },
		{ type: 'evt_key', x: 750, y: 20, values: ['Space'] },
		{ type: 'phys_jump', x: 750, y: 80, values: ['hero', '18'] },
	],
}

// ==========================================
// --- 3. ДАННЫЕ И СОСТОЯНИЕ ---
// ==========================================

let projectData = {
	scenes: [
		{
			id: 'scene_1',
			name: 'Главная сцена',
			objects: [{ id: 'obj_1', name: 'GameManager', scripts: [] }],
		},
	],
}

let activeSceneId = 'scene_1'
let activeObjectId = 'obj_1'

let panX = 0,
	panY = 0
let draggedBlock = null
let dragOffset = { x: 0, y: 0 }
let isPanning = false
let panStart = { x: 0, y: 0 }
let gameVariables = {}
let isRunning = false
let customTemplates = {}

// --- ФИЗИКА, УПРАВЛЕНИЕ, КАМЕРА ---
let physicsObjects = {}
let staticObjects = []
let animationFrameId = null
let controlledObjects = {}
let activeKeys = {}
let joystickData = { active: false, x: 0, y: 0 }
let joystickConfig = { side: 'L', size: 120, margin: 30, color: '#00e676' }
// CENTER CAMERA on (0,0) is top left
let cameraState = { target: null, x: 0, y: 0, zoom: 1.0 }
let runtimeFunctions = {}
let runtimeListeners = {}
let objectProps = {}

let GAME_WIDTH = 800
let GAME_HEIGHT = 600

// DOM
const canvas = document.getElementById('mainCanvas')
const container = document.getElementById('canvas-container')
const toolbox = document.getElementById('toolboxContent')
const sceneListEl = document.getElementById('sceneList')
const objectListEl = document.getElementById('objectList')

// ==========================================
// --- 4. ИНИЦИАЛИЗАЦИЯ ---
// ==========================================

window.addEventListener('DOMContentLoaded', () => {
	loadCustomTemplates()
	initToolbox()
	initMobileLibrary()
	initCanvasEvents()
	renderSidebar()
	loadWorkspace()

	window.addEventListener('keydown', e => (activeKeys[e.code] = true))
	window.addEventListener('keyup', e => (activeKeys[e.code] = false))

	document.getElementById('btnRun').onclick = runProject
	document.getElementById('btnCloseGame').onclick = stopGame
	document.getElementById('btnAddScene').onclick = addScene
	document.getElementById('btnAddObject').onclick = addObject
	document.getElementById('btnSave').onclick = saveProjectToLocal
	document.getElementById('btnLoad').onclick = loadProjectFromLocal
	document.getElementById('resetView').onclick = () => {
		panX = 0
		panY = 0
		updateTransform()
	}
})

function loadCustomTemplates() {
	const raw = localStorage.getItem('ecrous_custom_templates')
	if (raw) {
		try {
			customTemplates = JSON.parse(raw)
		} catch (e) {
			console.error('Ошибка загрузки шаблонов', e)
			customTemplates = {}
		}
	}
}

function initToolbox() {
	toolbox.innerHTML = ''
	const categories = {}
	BLOCK_DEFINITIONS.forEach(b => {
		if (!categories[b.category]) categories[b.category] = []
		categories[b.category].push(b)
	})
	const order = [
		'События',
		'Окно',
		'Камера',
		'Управление',
		'Логика',
		'Физика',
		'Текст',
		'Внешность',
		'Движение',
		'Виджеты',
		'UI',
		'Переменные',
		'Шаблоны',
	]
	order.forEach(cat => {
		if (categories[cat]) {
			const title = document.createElement('div')
			title.className = 'category-title'
			title.innerText = cat
			toolbox.appendChild(title)
			categories[cat].forEach(def => {
				const el = document.createElement('div')
				el.className = 'tool-item'
				el.draggable = true
				el.innerHTML = `<i class="${def.icon}" style="color:${def.color}"></i> ${def.label}`
				el.ondragstart = e => e.dataTransfer.setData('type', def.id)
				toolbox.appendChild(el)
			})
		}
	})
	const customKeys = Object.keys(customTemplates)
	if (customKeys.length > 0) {
		const title = document.createElement('div')
		title.className = 'category-title'
		title.innerText = 'Мои шаблоны'
		title.style.marginTop = '20px'
		title.style.borderTop = '1px solid #333'
		title.style.paddingTop = '10px'
		toolbox.appendChild(title)
		customKeys.forEach(key => {
			const tmpl = customTemplates[key]
			const el = document.createElement('div')
			el.className = 'tool-item'
			el.draggable = true
			el.innerHTML = `
                <span style="display:flex; align-items:center; gap:5px;">
                    <i class="ri-star-fill" style="color:#FFD700"></i> ${tmpl.name}
                </span>
                <i class="ri-close-circle-line remove-tmpl" 
                   style="color:#ff5252; cursor:pointer; margin-left:auto;"
                   title="Удалить шаблон"></i>
            `
			el.ondragstart = e => e.dataTransfer.setData('type', key)
			el.querySelector('.remove-tmpl').onclick = e => {
				e.stopPropagation()
				if (confirm(`Удалить шаблон "${tmpl.name}"?`)) {
					deleteTemplate(key)
				}
			}
			toolbox.appendChild(el)
		})
	}
}

// ==========================================
// --- 5. МОБИЛЬНАЯ БИБЛИОТЕКА (БИБЛИОТЕКА БЛОКОВ) ---
// ==========================================

function initMobileLibrary() {
    // Проверка на наличие элементов перед работой
    const fab = document.getElementById('fabAddBlock');
    const overlay = document.getElementById('library-overlay');
    const closeBtn = document.getElementById('btnCloseLib');
    const catContainer = document.getElementById('libCategories');
    const gridContainer = document.getElementById('libGrid');

    if (!fab || !overlay) return; // Если элементов нет в HTML, выходим

    // Открытие меню
    fab.onclick = () => {
        overlay.classList.remove('hidden');
        renderLibCategories(); 
    }

    // Закрытие меню
    if (closeBtn) closeBtn.onclick = () => overlay.classList.add('hidden');

    // Рендер категорий (Слева)
    function renderLibCategories() {
        catContainer.innerHTML = '';
        
        const categories = [...new Set(BLOCK_DEFINITIONS.map(b => b.category))];
        if(!categories.includes('Шаблоны')) categories.push('Шаблоны');

        let isFirst = true;

        categories.forEach(cat => {
            const el = document.createElement('div');
            el.className = 'lib-cat-item';
            
            let icon = 'ri-function-line';
            if(cat === 'События') icon = 'ri-flag-fill';
            if(cat === 'Окно') icon = 'ri-window-line';
            if(cat === 'Физика') icon = 'ri-basketball-line';
            if(cat === 'Логика') icon = 'ri-git-branch-line';
            if(cat === 'Внешность') icon = 'ri-palette-line';
            if(cat === 'Управление') icon = 'ri-gamepad-line';
            if(cat === 'Текст') icon = 'ri-text';
            if(cat === 'Шаблоны') icon = 'ri-layout-masonry-line';

            el.innerHTML = `<i class="${icon}"></i><span>${cat}</span>`;
            
            el.onclick = () => {
                document.querySelectorAll('.lib-cat-item').forEach(i => i.classList.remove('active'));
                el.classList.add('active');
                renderLibBlocks(cat);
            };

            catContainer.appendChild(el);

            if(isFirst) {
                el.click(); 
                isFirst = false;
            }
        });
    }

    // Рендер блоков (Справа)
    function renderLibBlocks(category) {
        gridContainer.innerHTML = '';

        let blocks = BLOCK_DEFINITIONS.filter(b => b.category === category);
        
        // Добавляем кастомные шаблоны
        if(category === 'Шаблоны') {
            Object.keys(customTemplates).forEach(key => {
                const tmpl = customTemplates[key];
                blocks.push({
                    id: key,
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
            
            // ПРИ КЛИКЕ - СОЗДАЕМ БЛОК В ЦЕНТРЕ
            card.onclick = () => {
                addBlockToCenter(def);
                overlay.classList.add('hidden');
            };

            gridContainer.appendChild(card);
        });
    }

    // Логика добавления в центр экрана
    function addBlockToCenter(def) {
        // Получаем размеры холста
        const rect = canvas.getBoundingClientRect();
        
        // Центр видимой области с учетом сдвига камеры (panX, panY)
        // Формула: (Половина экрана) - (Текущий сдвиг) - (Половина ширины блока ~100px)
        const centerX = (-panX + rect.width / 2) - 90; 
        const centerY = (-panY + rect.height / 2) - 30;

        if (def.isCustom) {
            // Пользовательский шаблон
            const templateData = customTemplates[def.id].data;
            let minX = Infinity, minY = Infinity;
            templateData.forEach(b => {
                if (b.x < minX) minX = b.x;
                if (b.y < minY) minY = b.y;
            });
            templateData.forEach(blockData => {
                createBlock(blockData.type, 0, 0, {
                    ...blockData,
                    x: centerX + (blockData.x - minX),
                    y: centerY + (blockData.y - minY)
                });
            });
        } else if (TEMPLATES[def.id]) {
            // Встроенный шаблон
             TEMPLATES[def.id].forEach((b, i) => {
                 createBlock(b.type, 0, 0, {
                     ...b,
                     x: centerX + (b.x || i*10), 
                     y: centerY + (b.y || i*10)
                 });
             })
        } else {
            // Обычный блок
            createBlock(def.id, 0, 0, {
                values: def.inputs ? def.inputs.map(i => i.default) : [],
                x: centerX,
                y: centerY
            });
        }
    }
}

function getActiveScene() {
	return projectData.scenes.find(s => s.id === activeSceneId)
}
function getActiveObject() {
	const scene = getActiveScene()
	return scene ? scene.objects.find(o => o.id === activeObjectId) : null
}
function renderSidebar() {
	sceneListEl.innerHTML = ''
	projectData.scenes.forEach(scene => {
		const el = document.createElement('div')
		el.className = `list-item ${scene.id === activeSceneId ? 'active' : ''}`
		el.innerHTML = `<i class="ri-movie-line"></i> ${scene.name}`
		el.onclick = () => switchScene(scene.id)
		sceneListEl.appendChild(el)
	})
	objectListEl.innerHTML = ''
	const currentScene = getActiveScene()
	if (currentScene) {
		currentScene.objects.forEach(obj => {
			const el = document.createElement('div')
			el.className = `list-item ${obj.id === activeObjectId ? 'active' : ''}`
			el.innerHTML = `<i class="ri-cube-line"></i> ${obj.name}`
			el.onclick = () => switchObject(obj.id)
			objectListEl.appendChild(el)
		})
	}
	const objName = getActiveObject() ? getActiveObject().name : '---'
	document.getElementById(
		'current-context'
	).innerText = `${currentScene.name} > ${objName}`
}
function saveCurrentWorkspace() {
	const currentObj = getActiveObject()
	if (!currentObj) return
	const data = []
	document.querySelectorAll('.node-block').forEach(el => {
		const inputs = Array.from(el.querySelectorAll('input')).map(i => i.value)
		data.push({
			type: el.dataset.type,
			x: parseFloat(el.style.left),
			y: parseFloat(el.style.top),
			values: inputs,
		})
	})
	currentObj.scripts = data
}
function loadWorkspace() {
	container.innerHTML = ''
	const currentObj = getActiveObject()
	if (!currentObj) return
	currentObj.scripts.forEach(b => createBlock(b.type, 0, 0, b))
}
function switchScene(sceneId) {
	saveCurrentWorkspace()
	activeSceneId = sceneId
	const scene = getActiveScene()
	activeObjectId = scene.objects.length > 0 ? scene.objects[0].id : null
	renderSidebar()
	loadWorkspace()
}
function switchObject(objId) {
	saveCurrentWorkspace()
	activeObjectId = objId
	renderSidebar()
	loadWorkspace()
}
function addScene() {
	const name = prompt(
		'Название сцены:',
		`Уровень ${projectData.scenes.length + 1}`
	)
	if (!name) return
	const newId = 'scene_' + Date.now()
	projectData.scenes.push({ id: newId, name: name, objects: [] })
	switchScene(newId)
	addObject()
}
function addObject() {
	const scene = getActiveScene()
	if (!scene) return alert('Создайте сцену!')
	const name = prompt('Название объекта:', `Объект ${scene.objects.length + 1}`)
	if (!name) return
	const newId = 'obj_' + Date.now()
	scene.objects.push({ id: newId, name: name, scripts: [] })
	switchObject(newId)
}

function initCanvasEvents() {
	canvas.addEventListener('dragover', e => e.preventDefault())
	canvas.addEventListener('drop', e => {
		e.preventDefault()
		const type = e.dataTransfer.getData('type')
		if (TEMPLATES[type]) {
			TEMPLATES[type].forEach(blockData =>
				createBlock(blockData.type, 0, 0, blockData)
			)
		} else if (customTemplates[type]) {
			const blocks = customTemplates[type].data
			let minX = Infinity,
				minY = Infinity
			blocks.forEach(b => {
				if (b.x < minX) minX = b.x
				if (b.y < minY) minY = b.y
			})
			blocks.forEach(blockData => {
				const rect = canvas.getBoundingClientRect()
				const offsetX = blockData.x - minX
				const offsetY = blockData.y - minY
				const finalX = e.clientX - rect.left - panX + offsetX
				const finalY = e.clientY - rect.top - panY + offsetY
				createBlock(blockData.type, 0, 0, {
					...blockData,
					x: finalX,
					y: finalY,
				})
			})
		} else if (type) {
			createBlock(type, e.clientX, e.clientY)
		}
	})
	canvas.addEventListener('mousedown', e => {
		if (e.target === canvas || e.target === container) {
			isPanning = true
			panStart = { x: e.clientX - panX, y: e.clientY - panY }
			canvas.style.cursor = 'grabbing'
		}
	})
	document.addEventListener('mousemove', e => {
		if (isPanning) {
			panX = e.clientX - panStart.x
			panY = e.clientY - panStart.y
			updateTransform()
			return
		}
		if (draggedBlock) {
			draggedBlock.style.left = e.clientX - 260 - panX - dragOffset.x + 'px'
			draggedBlock.style.top = e.clientY - 54 - panY - dragOffset.y + 'px'
		}
	})
	document.addEventListener('mouseup', () => {
		if (draggedBlock) {
			draggedBlock.classList.remove('dragging')
			snapBlock(draggedBlock)
			draggedBlock = null
		}
		isPanning = false
		canvas.style.cursor = 'default'
	})
}
function updateTransform() {
	container.style.transform = `translate(${panX}px, ${panY}px)`
	canvas.style.backgroundPosition = `${panX}px ${panY}px`
}
function createBlock(typeId, clientX, clientY, restoreData = null) {
	const def = BLOCK_DEFINITIONS.find(b => b.id === typeId)
	if (!def) return
	const el = document.createElement('div')
	el.className = 'node-block'
	el.dataset.type = typeId
	if (restoreData) {
		el.style.left = restoreData.x + 'px'
		el.style.top = restoreData.y + 'px'
	} else {
		const rect = canvas.getBoundingClientRect()
		el.style.left = clientX - rect.left - panX + 'px'
		el.style.top = clientY - rect.top - panY + 'px'
	}
	let inputsHTML = ''
	if (def.inputs) {
		def.inputs.forEach((inp, idx) => {
			const val = restoreData ? restoreData.values[idx] : inp.default
			let field =
				inp.type === 'color'
					? `<input type="color" value="${val}">`
					: `<input type="text" class="node-input" value="${val}">`
			inputsHTML += `<div class="input-row"><span>${inp.label}</span>${field}</div>`
		})
	}
	el.innerHTML = `<div class="node-header" style="border-left: 4px solid ${def.color}"><div style="display:flex; align-items:center; gap:8px;"><i class="${def.icon}"></i> <span>${def.label}</span></div><i class="ri-close-line" style="opacity:0.5; cursor:pointer;" onclick="this.closest('.node-block').remove()"></i></div><div class="node-content">${inputsHTML}</div>`
	el.querySelector('.node-header').addEventListener('mousedown', e => {
		if (e.target.classList.contains('ri-close-line')) return
		draggedBlock = el
		el.classList.add('dragging')
		const r = el.getBoundingClientRect()
		dragOffset = { x: e.clientX - r.left, y: e.clientY - r.top }
	})
	container.appendChild(el)
}
function snapBlock(block) {
	const rect = block.getBoundingClientRect()
	const all = Array.from(document.querySelectorAll('.node-block'))
	for (let other of all) {
		if (other === block) continue
		const oRect = other.getBoundingClientRect()
		if (
			Math.abs(rect.left - oRect.left) < 30 &&
			Math.abs(rect.top - oRect.bottom) < 40
		) {
			block.style.left = other.style.left
			block.style.top =
				parseFloat(other.style.top) + other.offsetHeight + 5 + 'px'
			break
		}
	}
}
function saveProjectToLocal() {
	saveCurrentWorkspace()
	localStorage.setItem('ecrous_project_v3', JSON.stringify(projectData))
	const btn = document.getElementById('btnSave')
	btn.innerHTML = '<i class="ri-check-line" style="color:#00e676"></i>'
	setTimeout(() => (btn.innerHTML = '<i class="ri-save-3-line"></i>'), 1000)
}
function loadProjectFromLocal() {
	const json = localStorage.getItem('ecrous_project_v3')
	if (!json) return alert('Нет сохранений!')
	projectData = JSON.parse(json)
	activeSceneId = projectData.scenes[0].id
	activeObjectId = projectData.scenes[0].objects[0]?.id
	renderSidebar()
	loadWorkspace()
}

// ==========================================
// --- RUNTIME ---
// ==========================================

function runProject() {
	saveCurrentWorkspace()
	document.getElementById('game-overlay').classList.remove('hidden')
	const stage = document.getElementById('game-stage')

	GAME_WIDTH = 800
	GAME_HEIGHT = 600
	document.querySelector('.game-window').style.width = GAME_WIDTH + 'px'
	document.querySelector('.game-window').style.height = GAME_HEIGHT + 'px'
	stage.style.background = '#050505'
	stage.style.backgroundImage = 'none'
	stage.innerHTML = ''
	stage.style.position = 'relative'

	const consoleEl = document.getElementById('game-console')
	consoleEl.style.display = 'block'
	consoleEl.innerHTML = ''

	const worldLayer = document.createElement('div')
	worldLayer.id = 'game-world'
	worldLayer.style.width = '100%'
	worldLayer.style.height = '100%'
	worldLayer.style.position = 'absolute'
	worldLayer.style.transformOrigin = '0 0'
	stage.appendChild(worldLayer)

	const uiLayer = document.createElement('div')
	uiLayer.id = 'game-ui'
	uiLayer.style.width = '100%'
	uiLayer.style.height = '100%'
	uiLayer.style.position = 'absolute'
	uiLayer.style.pointerEvents = 'none'
	stage.appendChild(uiLayer)

	gameVariables = {}
	physicsObjects = {}
	staticObjects = []
	controlledObjects = {}
	worldBounds = {}
	activeKeys = {}
	joystickData = { active: false, x: 0, y: 0 }
	joystickConfig = { side: 'L', size: 120, margin: 30, color: '#00e676' }
	// CENTER CAMERA LOGIC
	cameraState = {
		target: null,
		x: GAME_WIDTH / 2,
		y: GAME_HEIGHT / 2,
		zoom: 1.0,
	}
	runtimeFunctions = {}
	runtimeListeners = {}
	objectProps = {}

	isRunning = true

	const scene = getActiveScene()
	if (!scene) return

	// Scan functions
	scene.objects.forEach(obj => {
		if (obj.scripts) {
			obj.scripts
				.filter(b => b.type === 'func_def')
				.forEach(b => {
					runtimeFunctions[b.values[0]] = { block: b, script: obj.scripts }
				})
		}
	})

	// Run starts
	scene.objects.forEach(obj => {
		if (obj.scripts && obj.scripts.length > 0) {
			// Main entry points
			obj.scripts
				.filter(b => b.type === 'evt_start')
				.forEach(startBlockData => {
					executeChainFromData(startBlockData, obj.scripts)
				})
			// Standalone listeners (Solar2D style)
			obj.scripts
				.filter(b => b.type === 'evt_add_listener')
				.forEach(b => {
					executeBlockLogic(b)
				})
		}
	})

	updatePhysics()

	window.onkeydown = e => {
		activeKeys[e.code] = true
		triggerEventGlobal('evt_key', e.code)
	}
	window.onkeyup = e => (activeKeys[e.code] = false)
	worldLayer.onclick = e => {
		if (e.target) {
			const target = e.target.closest('.game-sprite')
			if (target) triggerEventGlobal('evt_click_obj', target.id)
		}
	}
}

function stopGame() {
	isRunning = false
	if (animationFrameId) cancelAnimationFrame(animationFrameId)
	document.getElementById('game-overlay').classList.add('hidden')
	const headerTitle = document.querySelector('.game-header span')
	if (headerTitle) headerTitle.innerText = 'ИГРОВОЙ ПРОЦЕСС'
	const joy = document.querySelector('.joystick-base')
	if (joy) joy.remove()
}

function createJoystickHTML() {
	const oldJoy = document.querySelector('.joystick-base')
	if (oldJoy) oldJoy.remove()

	const base = document.createElement('div')
	base.className = 'joystick-base'
	base.style.borderColor = joystickConfig.color
	base.style.width = joystickConfig.size + 'px'
	base.style.height = joystickConfig.size + 'px'
	base.style.bottom = joystickConfig.margin + 'px'
	base.style.pointerEvents = 'auto'

	if (
		joystickConfig.side.toUpperCase() === 'R' ||
		joystickConfig.side === 'П'
	) {
		base.style.right = joystickConfig.margin + 'px'
		base.style.left = 'auto'
	} else {
		base.style.left = joystickConfig.margin + 'px'
		base.style.right = 'auto'
	}

	const stick = document.createElement('div')
	stick.className = 'joystick-stick'
	stick.style.background = joystickConfig.color
	const stickSize = joystickConfig.size * 0.4
	stick.style.width = stickSize + 'px'
	stick.style.height = stickSize + 'px'

	base.appendChild(stick)
	document.getElementById('game-ui').appendChild(base)
	base.style.display = 'block'

	let startX, startY
	const handleStart = e => {
		joystickData.active = true
		const touch = e.touches ? e.touches[0] : e
		const rect = base.getBoundingClientRect()
		startX = rect.left + rect.width / 2
		startY = rect.top + rect.height / 2
	}
	const handleMove = e => {
		if (!joystickData.active) return
		const touch = e.touches ? e.touches[0] : e
		let dx = touch.clientX - startX
		let dy = touch.clientY - startY
		const maxDist = (joystickConfig.size / 2) * 0.7
		const dist = Math.sqrt(dx * dx + dy * dy)
		if (dist > maxDist) {
			dx = (dx / dist) * maxDist
			dy = (dy / dist) * maxDist
		}
		stick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`
		joystickData.x = dx / maxDist
		joystickData.y = dy / maxDist
	}
	const handleEnd = () => {
		joystickData.active = false
		joystickData.x = 0
		joystickData.y = 0
		stick.style.transform = `translate(-50%, -50%)`
	}
	base.addEventListener('mousedown', handleStart)
	document.addEventListener('mousemove', handleMove)
	document.addEventListener('mouseup', handleEnd)
	base.addEventListener('touchstart', handleStart)
	document.addEventListener('touchmove', handleMove)
	document.addEventListener('touchend', handleEnd)
}

function parseColor(c) {
	if (!c) return '#ffffff'
	if (c.startsWith('#')) return c
	if (c.includes('rgb')) return c
	return c
}

function updatePhysics() {
	if (!isRunning) return

	// 1. INPUT
	for (let id in controlledObjects) {
		let ctrlData = controlledObjects[id]
		let p = physicsObjects[id]
		let moveX = 0,
			moveY = 0

		if (ctrlData.useWasd) {
			if (activeKeys['KeyW'] || activeKeys['ArrowUp']) moveY -= 1
			if (activeKeys['KeyS'] || activeKeys['ArrowDown']) moveY += 1
			if (activeKeys['KeyA'] || activeKeys['ArrowLeft']) moveX -= 1
			if (activeKeys['KeyD'] || activeKeys['ArrowRight']) moveX += 1
		}
		if (ctrlData.useJoy) {
			moveX += joystickData.x
			moveY += joystickData.y
		}
		if (moveX > 1) moveX = 1
		if (moveX < -1) moveX = -1
		if (moveY > 1) moveY = 1
		if (moveY < -1) moveY = -1

		if (p) {
			p.vx = moveX * ctrlData.speed
			if (p.grav === 0) p.vy = moveY * ctrlData.speed
		} else {
			let el = document.getElementById(id)
			if (el) {
				let x = parseFloat(el.style.left) || 0
				let y = parseFloat(el.style.top) || 0
				el.style.left = x + moveX * ctrlData.speed + 'px'
				el.style.top = y + moveY * ctrlData.speed + 'px'
			}
		}
	}

	// 2. PHYSICS
	for (let id in physicsObjects) {
		let p = physicsObjects[id]
		let el = document.getElementById(id)
		if (el) {
			p.grounded = false
			p.vy += p.grav
			let x = parseFloat(el.style.left) || 0
			let y = parseFloat(el.style.top) || 0
			let w = el.offsetWidth
			let h = el.offsetHeight
			let prevY = y

			x += p.vx
			let boundsMode = worldBounds[id] || 'stop'
			if (boundsMode !== 'none') {
				if (boundsMode === 'stop' || boundsMode === 'bounce') {
					if (x < 0) {
						x = 0
						boundsMode === 'bounce' ? (p.vx *= -p.bounce) : (p.vx = 0)
					} else if (x + w > GAME_WIDTH) {
						x = GAME_WIDTH - w
						boundsMode === 'bounce' ? (p.vx *= -p.bounce) : (p.vx = 0)
					}
				} else if (boundsMode === 'wrap') {
					if (x + w < 0) x = GAME_WIDTH
					else if (x > GAME_WIDTH) x = -w
				}
			}

			for (let staticId of staticObjects) {
				let plat = document.getElementById(staticId)
				if (plat) {
					let px = parseFloat(plat.style.left) || 0
					let py = parseFloat(plat.style.top) || 0
					let pw = plat.offsetWidth
					let ph = plat.offsetHeight
					if (y + h > py + 5 && y < py + ph - 5) {
						if (p.vx > 0 && x + w >= px && x < px) {
							x = px - w
							p.vx = 0
						} else if (p.vx < 0 && x <= px + pw && x + w > px + pw) {
							x = px + pw
							p.vx = 0
						}
					}
				}
			}
			el.style.left = Math.round(x) + 'px'

			y += p.vy
			if (p.vy >= 0) {
				let hitFloor = false
				if (boundsMode !== 'none' && boundsMode !== 'wrap') {
					if (y + h >= GAME_HEIGHT) {
						y = GAME_HEIGHT - h
						p.vy *= -p.bounce
						if (Math.abs(p.vy) < 1) p.vy = 0
						p.vx *= 0.95
						p.grounded = true
						hitFloor = true
					}
				}
				if (!hitFloor) {
					for (let staticId of staticObjects) {
						let plat = document.getElementById(staticId)
						if (plat) {
							let px = parseFloat(plat.style.left) || 0
							let py = parseFloat(plat.style.top) || 0
							let pw = plat.offsetWidth
							if (x + w > px && x < px + pw) {
								if (prevY + h <= py + 20 && y + h >= py) {
									y = py - h
									p.vy = 0
									p.vx *= 0.95
									p.grounded = true
								}
							}
						}
					}
				}
			} else {
				if (y < 0 && (boundsMode === 'stop' || boundsMode === 'bounce')) {
					y = 0
					boundsMode === 'bounce' ? (p.vy *= -p.bounce) : (p.vy = 0)
				} else if (boundsMode === 'wrap' && y + h < 0) {
					y = GAME_HEIGHT
				}
			}
			el.style.top = Math.round(y) + 'px'

			if (p.angVel) {
				if (!objectProps[id]) objectProps[id] = { rot: 0 }
				objectProps[id].rot = (objectProps[id].rot || 0) + p.angVel
				applyTransforms(id, el)
			}
		}
	}

	// 3. CAMERA
	if (cameraState.target) {
		let el = document.getElementById(cameraState.target)
		if (el) {
			let x = parseFloat(el.style.left) || 0
			let y = parseFloat(el.style.top) || 0
			let w = el.offsetWidth
			let h = el.offsetHeight
			let camX = -x - w / 2 + GAME_WIDTH / 2 / cameraState.zoom
			let camY = -y - h / 2 + GAME_HEIGHT / 2 / cameraState.zoom
			const world = document.getElementById('game-world')
			if (world)
				world.style.transform = `scale(${cameraState.zoom}) translate(${camX}px, ${camY}px)`
		}
	} else {
		const world = document.getElementById('game-world')
		if (world) {
			let camX = -cameraState.x + GAME_WIDTH / 2 / cameraState.zoom
			let camY = -cameraState.y + GAME_HEIGHT / 2 / cameraState.zoom
			world.style.transform = `scale(${cameraState.zoom}) translate(${camX}px, ${camY}px)`
		}
	}
	animationFrameId = requestAnimationFrame(updatePhysics)
}

function applyTransforms(id, el) {
	if (!el) return
	let props = objectProps[id] || {}
	let rot = props.rot || 0
	let tx = props.transX || '0%'
	let ty = props.transY || '0%'

	let transform = ''
	if (tx !== '0%' || ty !== '0%') transform += `translate(${tx}, ${ty}) `
	if (rot !== 0) transform += `rotate(${rot}deg)`
	el.style.transform = transform
}

function triggerEventGlobal(type, param) {
	if (!isRunning) return
	const scene = getActiveScene()
	scene.objects.forEach(obj => {
		const events = obj.scripts.filter(b => b.type === type)
		events.forEach(evtBlock =>
			executeChainFromData(evtBlock, obj.scripts, { target: param })
		)
	})
}

async function executeChainFromData(
	currentBlockData,
	allBlocksData,
	context = {}
) {
	if (!isRunning) return

	let nextBlock = allBlocksData.find(b => {
		const dx = Math.abs(b.x - currentBlockData.x)
		const dy = b.y - currentBlockData.y
		if (b.type === 'func_def') return false // Skip over definitions
		return dx < 40 && dy > 10 && dy < 150
	})

	if (currentBlockData.type === 'ctrl_loop') {
		const count = parseInt(currentBlockData.values[0]) || 1
		if (nextBlock) {
			for (let i = 0; i < count; i++) {
				if (!isRunning) break
				await executeBlockLogic(nextBlock, context)
			}
		}
		return
	}
	if (currentBlockData.type === 'ctrl_while') {
		if (nextBlock) {
			let s = 0
			while (isRunning && s < 5000) {
				s++
				let v = currentBlockData.values
				let cV = parseFloat(gameVariables[v[0]]) || gameVariables[v[0]] || 0
				let tV = parseFloat(v[2]) || v[2]
				let ok = false
				if (v[1] == '=') ok = cV == tV
				if (v[1] == '>') ok = cV > tV
				if (v[1] == '<') ok = cV < tV
				if (!ok) break
				await executeBlockLogic(nextBlock, context)
				await new Promise(r => setTimeout(r, 10))
			}
		}
		return
	}
	if (currentBlockData.type === 'ctrl_for') {
		let iName = currentBlockData.values[0]
		let f = parseInt(currentBlockData.values[1])
		let t = parseInt(currentBlockData.values[2])
		if (nextBlock) {
			for (let i = f; i <= t; i++) {
				if (!isRunning) break
				gameVariables[iName] = i
				await executeBlockLogic(nextBlock, context)
				await new Promise(r => setTimeout(r, 10))
			}
		}
		return
	}
	if (
		currentBlockData.type === 'ctrl_if' ||
		currentBlockData.type === 'ctrl_if_else'
	) {
		let v = currentBlockData.values
		let cV = parseFloat(gameVariables[v[0]]) || gameVariables[v[0]] || 0
		let tV = parseFloat(v[2]) || v[2]
		let ok = false
		if (v[1] == '=') ok = cV == tV
		if (v[1] == '>') ok = cV > tV
		if (v[1] == '<') ok = cV < tV

		if (!ok) {
			if (currentBlockData.type === 'ctrl_if_else') {
				const labelName = v[3]
				const labelBlock = allBlocksData.find(
					b => b.type === 'ctrl_label' && b.values[0] === labelName
				)
				if (labelBlock)
					await executeChainFromData(labelBlock, allBlocksData, context)
			}
			return
		}
	}
	if (currentBlockData.type === 'ctrl_wait_until') {
		while (isRunning) {
			let v = currentBlockData.values
			let cV = parseFloat(gameVariables[v[0]]) || gameVariables[v[0]] || 0
			let tV = parseFloat(v[2]) || v[2]
			let ok = false
			if (v[1] == '=') ok = cV == tV
			if (v[1] == '>') ok = cV > tV
			if (v[1] == '<') ok = cV < tV
			if (ok) break
			await new Promise(r => setTimeout(r, 100))
		}
	}
	if (nextBlock) {
		await executeBlockLogic(nextBlock, context)
		executeChainFromData(nextBlock, allBlocksData, context)
	}
}

function executeBlockLogic(blockData, context) {
	return new Promise(resolve => {
		if (!isRunning) return resolve()
		setTimeout(async () => {
			try {
				const type = blockData.type
				const v = blockData.values
				const stage = document.getElementById('game-stage')
				const world = document.getElementById('game-world')

				switch (type) {
					case 'func_call':
						const funcName = v[0]
						const def = runtimeFunctions[funcName]
						if (def) await executeChainFromData(def.block, def.script, context)
						break

					case 'evt_add_listener':
						const lObj = v[0]
						const lType = v[1]
						const lFunc = v[2]
						// RETRY LOGIC (The Fix)
						const attachListener = retries => {
							const elL = document.getElementById(lObj)
							if (elL) {
								const handler = e => {
									e.stopPropagation()
									const evtData = { target: lObj, x: e.clientX, y: e.clientY }
									const def = runtimeFunctions[lFunc]
									if (def) executeChainFromData(def.block, def.script, evtData)
								}
								if (!elL._handlers) elL._handlers = {}
								// Remove old if exists
								if (elL._handlers[lType])
									elL.removeEventListener(
										lType === 'tap' ? 'click' : lType,
										elL._handlers[lType]
									)
								elL._handlers[lType] = handler

								let domType = lType === 'tap' ? 'click' : lType
								if (lType === 'touch') domType = 'touchstart'
								elL.addEventListener(domType, handler)
								elL.style.cursor = 'pointer'
								console.log(`Listener attached: ${lObj} -> ${lFunc}`)
							} else if (retries > 0) {
								setTimeout(() => attachListener(retries - 1), 100)
							} else {
								console.warn(`Failed to attach listener to ${lObj}`)
							}
						}
						attachListener(20) // Try for 2 seconds
						break

					case 'ui_input':
					case 'ui_textarea':
					case 'ui_button':
						if (!document.getElementById(v[0])) {
							let el
							if (type === 'ui_button') {
								el = document.createElement('button')
								el.innerText = v[1]
								el.style.border = '1px solid #444'
								el.style.background = '#222'
								el.style.color = '#fff'
								el.style.padding = '5px 10px'
								el.style.borderRadius = '4px'
								el.style.cursor = 'pointer'
							} else if (type === 'ui_input') {
								el = document.createElement('input')
								el.placeholder = v[1]
							} else {
								el = document.createElement('textarea')
								el.placeholder = v[1]
							}
							el.id = v[0]
							el.className = 'game-sprite'
							el.style.position = 'absolute'
							el.style.left = '50px'
							el.style.top = '50px'
							el.style.pointerEvents = 'auto'
							world.appendChild(el)
						}
						break
					case 'ui_scroll':
						if (!document.getElementById(v[0])) {
							const d = document.createElement('div')
							d.id = v[0]
							d.className = 'game-sprite'
							d.style.position = 'absolute'
							d.style.left = '50px'
							d.style.top = '50px'
							d.style.width = v[1] + 'px'
							d.style.height = v[2] + 'px'
							d.style.overflow = 'auto'
							d.style.background = 'rgba(255,255,255,0.1)'
							d.style.pointerEvents = 'auto'
							world.appendChild(d)
						}
						break
					case 'mot_anchor':
						if (!objectProps[v[0]]) objectProps[v[0]] = {}
						let tx = 0,
							ty = 0
						if (v[1] === 'center') tx = '-50%'
						if (v[1] === 'right') tx = '-100%'
						if (v[2] === 'middle' || v[2] === 'center') ty = '-50%'
						if (v[2] === 'bottom') ty = '-100%'
						objectProps[v[0]].transX = tx
						objectProps[v[0]].transY = ty
						applyTransforms(v[0], document.getElementById(v[0]))
						break
					case 'mot_set_rot':
						if (!objectProps[v[0]]) objectProps[v[0]] = {}
						objectProps[v[0]].rot = parseFloat(v[1])
						applyTransforms(v[0], document.getElementById(v[0]))
						break
					case 'phys_props':
						if (physicsObjects[v[0]]) {
							physicsObjects[v[0]].vx = parseFloat(v[1])
							physicsObjects[v[0]].vy = parseFloat(v[2])
							physicsObjects[v[0]].angVel = parseFloat(v[3])
						}
						break
					case 'looks_texture_url':
						let objT = document.getElementById(v[0])
						if (objT) {
							objT.style.backgroundImage = `url('${v[1]}')`
							objT.style.backgroundSize = 'cover'
						}
						break
					case 'looks_texture_file':
						let fi = document.createElement('input')
						fi.type = 'file'
						fi.accept = 'image/*'
						fi.onchange = e => {
							const f = e.target.files[0]
							if (f) {
								const r = new FileReader()
								r.onload = evt => {
									let ot = document.getElementById(v[0])
									if (ot) {
										ot.style.backgroundImage = `url('${evt.target.result}')`
										ot.style.backgroundSize = 'cover'
									}
								}
								r.readAsDataURL(f)
							}
						}
						fi.click()
						break
					case 'looks_set_color':
					case 'txt_color':
						let elC = document.getElementById(v[0])
						if (elC) {
							let c = parseColor(v[1])
							if (type === 'txt_color') elC.style.color = c
							else elC.style.backgroundColor = c
						}
						break
					case 'input_wasd':
						if (!controlledObjects[v[0]]) controlledObjects[v[0]] = { speed: 5 }
						controlledObjects[v[0]].useWasd = true
						controlledObjects[v[0]].speed = parseFloat(v[1])
						break
					case 'input_joystick_bind':
						if (!controlledObjects[v[0]]) controlledObjects[v[0]] = { speed: 5 }
						controlledObjects[v[0]].useJoy = true
						controlledObjects[v[0]].speed = parseFloat(v[1])
						createJoystickHTML()
						break
					case 'input_joy_cfg':
						joystickConfig.side = v[0]
						joystickConfig.size = parseFloat(v[1])
						joystickConfig.margin = parseFloat(v[2])
						joystickConfig.color = v[3]
						if (document.querySelector('.joystick-base')) createJoystickHTML()
						break
					case 'win_size':
						GAME_WIDTH = parseInt(v[0])
						GAME_HEIGHT = parseInt(v[1])
						const win = document.querySelector('.game-window')
						win.style.width = GAME_WIDTH + 'px'
						win.style.height = GAME_HEIGHT + 'px'
						cameraState.x = GAME_WIDTH / 2
						cameraState.y = GAME_HEIGHT / 2
						break
					case 'win_title':
						const ht = document.querySelector('.game-header span')
						if (ht) ht.innerText = v[0]
						break
					case 'win_bg':
						stage.style.background = v[0]
						break
					case 'win_bg_url':
						stage.style.backgroundImage = `url('${v[0]}')`
						stage.style.backgroundSize = 'cover'
						stage.style.backgroundPosition = 'center'
						break
					case 'sys_console_hide':
						const ce = document.getElementById('game-console')
						if (ce) ce.style.display = 'none'
						break
					case 'sys_log':
						const c = document.getElementById('game-console')
						if (c && c.style.display !== 'none') {
							let msg = v[0]
							if (gameVariables.hasOwnProperty(msg))
								msg = `${msg}: ${gameVariables[msg]}`
							c.innerHTML += `<div class="console-line">> ${msg}</div>`
							c.scrollTop = c.scrollHeight
						}
						break
					case 'cam_follow':
						cameraState.target = v[0]
						break
					case 'cam_move':
						cameraState.target = null
						cameraState.x = parseFloat(v[0])
						cameraState.y = parseFloat(v[1])
						break
					case 'cam_zoom':
						cameraState.zoom = parseFloat(v[0])
						break
					case 'ctrl_wait':
						setTimeout(resolve, parseFloat(v[0]) * 1000)
						return
					case 'phys_enable':
						physicsObjects[v[0]] = {
							vx: 0,
							vy: 0,
							grav: parseFloat(v[1]),
							bounce: parseFloat(v[2]),
							grounded: false,
							angVel: 0,
						}
						break
					case 'phys_static':
						if (!staticObjects.includes(v[0])) staticObjects.push(v[0])
						break
					case 'phys_force':
						if (physicsObjects[v[0]]) {
							physicsObjects[v[0]].vx += parseFloat(v[1])
							physicsObjects[v[0]].vy += parseFloat(v[2])
						}
						break
					case 'phys_jump':
						if (physicsObjects[v[0]] && physicsObjects[v[0]].grounded) {
							physicsObjects[v[0]].vy = -parseFloat(v[1])
							physicsObjects[v[0]].grounded = false
						}
						break
					case 'phys_collide':
						const o1 = document.getElementById(v[0])
						const o2 = document.getElementById(v[1])
						let hit = 0
						if (o1 && o2) {
							const r1 = o1.getBoundingClientRect()
							const r2 = o2.getBoundingClientRect()
							if (
								!(
									r1.right < r2.left ||
									r1.left > r2.right ||
									r1.bottom < r2.top ||
									r1.top > r2.bottom
								)
							)
								hit = 1
						}
						gameVariables[v[2]] = hit
						break
					case 'looks_create':
					case 'looks_create_circle':
						if (!document.getElementById(v[0])) {
							const d = document.createElement('div')
							d.id = v[0]
							d.className = 'game-sprite'
							d.style.backgroundColor = v[1]
							d.style.width = v[2] + 'px'
							d.style.height = v[2] + 'px'
							d.style.position = 'absolute'
							d.style.left = '50px'
							d.style.top = '50px'
							if (type === 'looks_create_circle') d.style.borderRadius = '50%'
							world.appendChild(d)
						}
						break
					case 'txt_create':
						let t = document.getElementById(v[0])
						let content = v[1]
						if (gameVariables.hasOwnProperty(content))
							content = gameVariables[content]
						if (!t) {
							t = document.createElement('div')
							t.id = v[0]
							t.className = 'game-sprite'
							t.style.position = 'absolute'
							t.style.left = '20px'
							t.style.top = '20px'
							world.appendChild(t)
						}
						t.innerText = content
						t.style.color = '#fff'
						t.style.fontSize = v[2] + 'px'
						t.style.whiteSpace = 'nowrap'
						break
					case 'txt_update':
						let tUpd = document.getElementById(v[0])
						if (tUpd) {
							let val = v[1]
							if (gameVariables.hasOwnProperty(val)) val = gameVariables[val]
							tUpd.innerText = val
						}
						break
					case 'txt_setsize':
						let tSz = document.getElementById(v[0])
						if (tSz) tSz.style.fontSize = v[1] + 'px'
						break
					case 'looks_destroy':
						const dead = document.getElementById(v[0])
						if (dead) dead.remove()
						delete physicsObjects[v[0]]
						delete controlledObjects[v[0]]
						staticObjects = staticObjects.filter(id => id !== v[0])
						break
					case 'mot_bounds':
						worldBounds[v[0]] = v[1].toLowerCase()
						break
					case 'mot_setpos':
					case 'looks_setpos':
					case 'txt_setpos':
						const o = document.getElementById(v[0])
						if (o) {
							o.style.left = v[1] + 'px'
							o.style.top = v[2] + 'px'
						}
						break
					case 'mot_align':
						break
					case 'mot_shift':
						const os = document.getElementById(v[0])
						if (os) {
							os.style.left =
								(parseFloat(os.style.left) || 0) + parseFloat(v[1]) + 'px'
							os.style.top =
								(parseFloat(os.style.top) || 0) + parseFloat(v[2]) + 'px'
						}
						break
					case 'mot_rotate':
						if (!objectProps[v[0]]) objectProps[v[0]] = {}
						objectProps[v[0]].rot =
							(objectProps[v[0]].rot || 0) + parseFloat(v[1])
						applyTransforms(v[0], document.getElementById(v[0]))
						break
					case 'looks_opacity':
						const oOp = document.getElementById(v[0])
						if (oOp) oOp.style.opacity = v[1]
						break
					case 'looks_set_wh':
						const oWh = document.getElementById(v[0])
						if (oWh) {
							oWh.style.width = v[1] + 'px'
							oWh.style.height = v[2] + 'px'
						}
						break
					case 'var_set':
						const pS = parseFloat(v[1])
						if (!isNaN(pS)) gameVariables[v[0]] = pS
						else gameVariables[v[0]] = v[1]
						break
					case 'var_add':
						let cVar = parseFloat(gameVariables[v[0]])
						if (isNaN(cVar)) cVar = 0
						gameVariables[v[0]] = cVar + parseFloat(v[1])
						break
				}
			} catch (e) {
				console.error(e)
			}
			resolve()
		}, 20)
	})
}

// ==========================================
// --- УПРАВЛЕНИЕ ШАБЛОНАМИ ---
// ==========================================

function createTemplateFromCurrent() {
	saveCurrentWorkspace()
	const obj = getActiveObject()

	if (!obj || !obj.scripts || obj.scripts.length === 0) {
		// Можно тоже заменить на кастомный alert, если захотите
		alert('Рабочее поле пусто!')
		return
	}

	// ВМЕСТО prompt вызываем наше красивое окно
	showCustomPrompt(
		'Создание шаблона', // Заголовок
		'Название нового шаблона:', // Сообщение
		'Мой скрипт', // Дефолтное значение
		name => {
			// Функция, которая сработает ПОСЛЕ нажатия "Продолжить"
			if (!name) return

			const id = 'tmpl_user_' + Date.now()
			customTemplates[id] = {
				name: name,
				data: JSON.parse(JSON.stringify(obj.scripts)),
			}
			saveTemplatesToStorage()
			initToolbox()

			// Лог в консоль движка для красоты
			const consoleEl = document.getElementById('game-console')
			if (consoleEl) {
				consoleEl.innerHTML += `<div class="console-line system">> Шаблон "${name}" сохранен.</div>`
			}
		}
	)
}
function deleteTemplate(id) {
	delete customTemplates[id]
	saveTemplatesToStorage()
	initToolbox()
}
function saveTemplatesToStorage() {
	localStorage.setItem(
		'ecrous_custom_templates',
		JSON.stringify(customTemplates)
	)
}
function exportTemplates() {
	const dataStr =
		'data:text/json;charset=utf-8,' +
		encodeURIComponent(JSON.stringify(customTemplates, null, 2))
	const downloadAnchorNode = document.createElement('a')
	downloadAnchorNode.setAttribute('href', dataStr)
	downloadAnchorNode.setAttribute('download', 'my_templates.json')
	document.body.appendChild(downloadAnchorNode)
	downloadAnchorNode.click()
	downloadAnchorNode.remove()
}
function importTemplates() {
	const input = document.createElement('input')
	input.type = 'file'
	input.accept = '.json'
	input.onchange = e => {
		const file = e.target.files[0]
		if (!file) return
		const reader = new FileReader()
		reader.onload = event => {
			try {
				const imported = JSON.parse(event.target.result)
				let count = 0
				for (let key in imported) {
					if (!customTemplates[key]) {
						customTemplates[key] = imported[key]
						count++
					} else {
						const newKey = key + '_' + Date.now()
						customTemplates[newKey] = imported[key]
						count++
					}
				}
				saveTemplatesToStorage()
				initToolbox()
				alert(`Успешно импортировано: ${count}`)
			} catch (err) {
				alert('Ошибка чтения файла!')
				console.error(err)
			}
		}
		reader.readAsText(file)
	}
	input.click()
}

// ==========================================
// --- CUSTOM PROMPT LOGIC ---
// ==========================================

let activePromptCallback = null;

function showCustomPrompt(title, message, defaultValue, callback) {
    const overlay = document.getElementById('custom-prompt-overlay');
    const titleEl = document.getElementById('modalTitle');
    const msgEl = document.getElementById('modalMessage');
    const inputEl = document.getElementById('modalInput');
    const btnConfirm = document.getElementById('btnModalConfirm');
    const btnCancel = document.getElementById('btnModalCancel');

    // Установка текстов
    titleEl.innerText = title;
    msgEl.innerText = message;
    inputEl.value = defaultValue || '';
    
    // Сохраняем коллбек
    activePromptCallback = callback;

    // Показываем
    overlay.classList.remove('hidden');
    // Небольшая задержка для анимации opacity
    requestAnimationFrame(() => {
        overlay.classList.add('active');
        inputEl.focus(); // Фокус сразу в поле
        inputEl.select(); // Выделяем текст
    });

    // Очистка старых событий (чтобы не дублировались)
    const close = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.classList.add('hidden'), 200);
        activePromptCallback = null;
    };

    // Логика подтверждения
    btnConfirm.onclick = () => {
        const val = inputEl.value;
        if (activePromptCallback) activePromptCallback(val);
        close();
    };

    // Логика отмены
    btnCancel.onclick = () => {
        close();
    };
    
    // Enter в поле ввода = подтверждение
    inputEl.onkeydown = (e) => {
        if (e.key === 'Enter') btnConfirm.click();
        if (e.key === 'Escape') btnCancel.click();
    };
}
