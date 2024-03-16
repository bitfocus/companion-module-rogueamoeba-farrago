import { combineRgb } from '@companion-module/base'

export function getPresets() {
	const ColorWhite = combineRgb(255, 255, 255)
	const ColorBlack = combineRgb(0, 0, 0)
	const ColorRed = combineRgb(200, 0, 0)
	const ColorGreen = combineRgb(0, 200, 0)
	const ColorOrange = combineRgb(255, 102, 0)

	let presets = {
		stopAll: {
			type: 'button',
			category: 'Master Controls',
			name: 'Stop All',
			options: {},
			style: {
				text: '⏹ Stop All',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'stopAll',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		stopAllIcon: {
			type: 'button',
			category: 'Master Controls',
			name: 'Stop All Icon',
			options: {},
			style: {
				text: '⏹',
				size: '44',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'stopAll',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		fadeAll: {
			type: 'button',
			category: 'Master Controls',
			name: 'Fade All',
			options: {},
			style: {
				text: 'Fade All',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'fadeAll',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		bringForward: {
			type: 'button',
			category: 'Master Controls',
			name: 'Bring App Forward',
			options: {},
			style: {
				text: 'Bring App Forward',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'bringForward',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
	}

	//Tile Presets
	this.tiles.forEach((tile) => {
		if (tile.label) {
			let id = tile.id
			let variableName = tile.id.replaceAll('/', '_').slice(1)

			presets[`${id}`] = {
				type: 'button',
				category: 'Tile Buttons',
				name: `${id}`,
				options: {},
				style: {
					text: `$(farrago:${variableName}_icon)\\n$(farrago:${variableName}_name)`,
					size: '14',
					color: ColorWhite,
					bgcolor: ColorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'playTile',
								options: {
									tile: `${id}`,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'tileColor',
						options: {
							tile: `${id}`,
						},
					},
					{
						feedbackId: 'tilePlaying',
						options: {
							tile: `${id}`,
						},
						style: {
							bgcolor: ColorRed,
						},
					},
				],
			}
		}
	})

	//Set Presets
	this.sets.forEach((set) => {
		if (set.label) {
			let id = set.id
			let variableName = `set_${set.id}`

			presets[`${variableName}`] = {
				type: 'button',
				category: 'Set Buttons',
				name: `${variableName}`,
				options: {},
				style: {
					text: `$(farrago:${variableName}_name)`,
					size: '14',
					color: ColorWhite,
					bgcolor: ColorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'setPosition',
								options: {
									set: id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'setSelected',
						options: {
							set: id,
						},
						style: {
							bgcolor: ColorGreen,
						},
					},
				],
			}
		}
	})

	return presets
}
