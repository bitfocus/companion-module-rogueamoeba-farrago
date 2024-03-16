import { combineRgb } from '@companion-module/base'

export function getFeedbacks() {
	const feedbacks = {}

	const ColorWhite = combineRgb(255, 255, 255)
	const ColorBlack = combineRgb(0, 0, 0)
	const ColorRed = combineRgb(200, 0, 0)
	const ColorGreen = combineRgb(0, 200, 0)
	const ColorOrange = combineRgb(255, 102, 0)

	let tileChoices = this.tiles.filter(({ label }) => label)
	let tileDefault = tileChoices?.[0] ? this.tiles[0].id : ''
	let setChoices = this.sets.filter(({ label }) => label)

	const FarragoColors = {
		0: combineRgb(169, 78, 255),
		0.125: combineRgb(252, 41, 231),
		0.25: combineRgb(252, 58, 41),
		0.375: combineRgb(252, 90, 9),
		0.5: combineRgb(253, 170, 9),
		0.625: combineRgb(57, 208, 28),
		0.75: combineRgb(23, 178, 186),
		0.875: combineRgb(52, 123, 254),
		1: combineRgb(255, 255, 255),
	}

	feedbacks['tilePlaying'] = {
		type: 'boolean',
		name: 'Title Playing',
		description: 'Change style if the selected tile is playing',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [
			{
				id: 'tile',
				type: 'dropdown',
				label: 'Tile',
				default: tileDefault,
				choices: tileChoices,
			},
		],
		callback: (feedback) => {
			let index = this.tiles.findIndex((tile) => tile.id === feedback.options.tile)
			if (index > -1) {
				return this.tiles[index].play
			} else {
				return false
			}
		},
	}

	feedbacks['tileColor'] = {
		type: 'advanced',
		name: 'Title Color',
		description: 'Change the background color to match the tile color',
		options: [
			{
				id: 'tile',
				type: 'dropdown',
				label: 'Tile',
				default: tileDefault,
				choices: tileChoices,
			},
		],
		callback: (feedback) => {
			let index = this.tiles.findIndex((tile) => tile.id === feedback.options.tile)
			if (index > -1) {
				let tile = this.tiles[index]
				let color = FarragoColors[tile.color] ? FarragoColors[tile.color] : ColorBlack
				return { bgcolor: color ? color : ColorBlack, color: tile.color === 1 ? ColorBlack : ColorWhite }
			} else {
				return ColorBlack
			}
		},
	}

	feedbacks['playing'] = {
		type: 'boolean',
		name: 'Playing',
		description: 'Change style if any tile is playing',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [],
		callback: (feedback) => {
			let index = this.tiles.find(({ play }) => play === true)
			if (index) {
				return true
			} else {
				return false
			}
		},
	}

	feedbacks['setSelected'] = {
		type: 'boolean',
		name: 'Set Selected',
		description: 'Change style if a set is selected',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [
			{
				id: 'set',
				type: 'dropdown',
				label: 'Set',
				default: 0,
				choices: setChoices,
			},
		],
		callback: (feedback) => {
			return feedback.options.set === this.status.selectedSet
		},
	}

	return feedbacks
}
