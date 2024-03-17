import { combineRgb } from '@companion-module/base'

export function getPresets() {
	const ColorWhite = combineRgb(255, 255, 255)
	const ColorBlack = combineRgb(0, 0, 0)
	const ColorRed = combineRgb(200, 0, 0)
	const ColorGreen = combineRgb(0, 200, 0)
	const ColorOrange = combineRgb(255, 102, 0)

	let presets = {
		//Transport Controls
		previous: {
			type: 'button',
			category: 'Transport Controls',
			name: 'Previous',
			options: {},
			style: {
				text: '⏪\\nPrevious',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'previous',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		next: {
			type: 'button',
			category: 'Transport Controls',
			name: 'Next',
			options: {},
			style: {
				text: '⏩\\nNext',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'next',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		playPauseAll: {
			type: 'button',
			category: 'Transport Controls',
			name: 'Pause All',
			options: {},
			style: {
				text: '⏯️\\nPlay/Pause All',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'playPauseAll',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		playSelected: {
			type: 'button',
			category: 'Transport Controls',
			name: 'Play Selected',
			options: {},
			style: {
				text: '▶️\\nPlay',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'playSelected',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'playing',
					options: {},
					style: {
						bgcolor: ColorGreen,
					},
				},
			],
		},
		stopAll: {
			type: 'button',
			category: 'Transport Controls',
			name: 'Stop All',
			options: {},
			style: {
				text: '⏹️\\nStop All',
				size: 'auto',
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
			category: 'Transport Controls',
			name: 'Fade All',
			options: {},
			style: {
				text: '📐\\nFade All',
				size: 'auto',
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
		//Master Controls
		volumeDown: {
			type: 'button',
			category: 'Master Controls',
			name: 'Volume Down',
			options: {},
			style: {
				text: '🔽\\nVolume',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'volumeDown',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		volumeUp: {
			type: 'button',
			category: 'Master Controls',
			name: 'Volume Up',
			options: {},
			style: {
				text: '🔼\\nVolume',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'volumeUp',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		toggleAB: {
			type: 'button',
			category: 'Master Controls',
			name: 'Toggle A/B',
			options: {},
			style: {
				text: '🅰️🅱️\\nToggle A/B',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'toggleAB',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		toggleABFeedback: {
			type: 'button',
			category: 'Master Controls',
			name: 'Toggle A/B Feedback',
			options: {},
			style: {
				text: '🅰️\\nSet to A',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'toggleAB',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'volumeAB',
					options: {
						char: 0,
					},
					style: {
						text: '🅱️\\nSet to B',
					},
				},
				{
					feedbackId: 'volumeAB',
					options: { char: 1 },
					style: {
						text: '🅰️\\nSet to A',
					},
				},
			],
		},
		mute: {
			type: 'button',
			category: 'Master Controls',
			name: 'Mute',
			options: {},
			style: {
				text: '🔇\\nMute',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'mute',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'mute',
					options: {},
					style: {
						bgcolor: ColorRed,
					},
				},
			],
		},
		unmute: {
			type: 'button',
			category: 'Master Controls',
			name: 'Unmute',
			options: {},
			style: {
				text: '🔈\\nUnmute',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'unmute',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'mute',
					options: {},
					style: {
						bgcolor: ColorGreen,
					},
					isInverted: true,
				},
			],
		},
		toggleMute: {
			type: 'button',
			category: 'Master Controls',
			name: 'Toggle Mute',
			options: {},
			style: {
				text: 'Toggle Mute',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'toggleMute',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'mute',
					options: {},
					style: {
						bgcolor: ColorRed,
						text: '🔇\\nMuted',
					},
				},
				{
					feedbackId: 'mute',
					options: {},
					style: {
						bgcolor: ColorGreen,
						text: '🔈\\nUnmuted',
					},
					isInverted: true,
				},
			],
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
