export function getActions() {
	let tileChoices = this.tiles.filter(({ label }) => label)
	let tileDefault = tileChoices?.[0] ? this.tiles[0].id : ''

	let actions = {
		//Tile Actions
		playTile: {
			name: 'Play / Stop Tile',
			options: [
				{
					id: 'tile',
					type: 'dropdown',
					label: 'Tile',
					default: tileDefault,
					choices: tileChoices,
				},
			],
			callback: (action) => {
				this.sendCommand(`${action.options.tile}/play`, 1)
			},
		},
		backTile: {
			name: 'Back Tile',
			options: [
				{
					id: 'tile',
					type: 'dropdown',
					label: 'Tile',
					default: tileDefault,
					choices: tileChoices,
				},
			],
			callback: (action) => {
				this.sendCommand(`${action.options.tile}/back`, 1)
			},
		},
		muteTile: {
			name: 'Mute Tile',
			options: [
				{
					id: 'tile',
					type: 'dropdown',
					label: 'Tile',
					default: tileDefault,
					choices: tileChoices,
				},
			],
			callback: (action) => {
				this.sendCommand(`${action.options.tile}/mute`, 1)
			},
		},
		//Transport Actions
		playPauseAll: {
			name: 'Pause / Unpause All Tiles',
			options: [],
			callback: () => {
				this.sendCommand(`/transport/playPauseAll`, 1)
			},
		},
		stopAll: {
			name: 'Stop All Tiles',
			options: [],
			callback: () => {
				this.sendCommand(`/transport/stopAll`, 1)
			},
		},
		previous: {
			name: 'Previous',
			options: [],
			callback: () => {
				this.sendCommand(`/transport/previous`, 1)
			},
		},
		next: {
			name: 'Next',
			options: [],
			callback: () => {
				this.sendCommand(`/transport/next`, 1)
			},
		},
		//Master Actions
		volumeUp: {
			name: 'Master Volume Up',
			options: [],
			callback: () => {
				this.sendCommand(`/master/volumeUp`, 1)
			},
		},
		volumeDown: {
			name: 'Master Volume Down',
			options: [],
			callback: () => {
				this.sendCommand(`/master/volumeDown`, 1)
			},
		},
		mute: {
			name: 'Master Mute',
			options: [],
			callback: () => {
				this.sendCommand(`/master/mute`, 1)
			},
		},
		fadeAll: {
			name: 'Fade All',
			options: [],
			callback: () => {
				this.sendCommand(`/master/fadeAll`, 1)
			},
		},
		toggleAB: {
			name: 'Toggle A/B',
			options: [],
			callback: () => {
				this.sendCommand(`/master/toggleAB`, 1)
			},
		},
		//Global Actions
		bringForward: {
			name: 'Bring App Forward',
			options: [],
			callback: () => {
				this.sendCommand(`/global/bringForward`, 1)
			},
		},
	}

	return actions
}
