export function getActions() {
	let tileChoices = this.tiles.filter(({ label }) => label)
	let tileDefault = tileChoices?.[0] ? this.tiles[0].id : ''
	let setChoices = this.sets.filter(({ label }) => label)

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
		unmute: {
			name: 'Master Unmute',
			options: [],
			callback: () => {
				this.sendCommand(`/master/mute`, 0)
			},
		},
		toggleMute: {
			name: 'Master Mute Toggle',
			options: [],
			callback: () => {
				let value = this.status.mute ? 0 : 1
				this.sendCommand(`/master/mute`, value)
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
				let value = this.status.toggleAB === 1 ? 0 : 1
				this.sendCommand(`/master/toggleAB`, value)
			},
		},
		playSelected: {
			name: 'Play Selected',
			options: [],
			callback: () => {
				let selected = this.status.selected
				this.sendCommand(`/set/selected/tile/${selected}/play`, 1)
			},
		},
		selectTile: {
			name: 'Select Tile in Current Set',
			options: [
				{
					id: 'tile',
					type: 'textinput',
					label: 'Tile Position',
					default: '0/0',
				},
			],
			callback: (action) => {
				let tile = action.options.tile
				this.sendCommand(`/set/selected/tile/${tile}/select`, 1)
			},
		},
		setPosition: {
			name: 'Select Set',
			options: [
				{
					id: 'set',
					type: 'dropdown',
					label: 'Set',
					choices: setChoices,
					default: 0,
				},
			],
			callback: (action) => {
				let set = action.options.set
				this.sendCommand(`/set/${set}/`, 1)
			},
		},
		playSet: {
			name: 'Play Set',
			options: [
				{
					id: 'set',
					type: 'dropdown',
					label: 'Set',
					choices: setChoices,
					default: 0,
				},
			],
			callback: (action) => {
				let set = action.options.set
				this.sendCommand(`/set/${set}/tile/0/0/play`, 1)
			},
		},
		listReset: {
			name: 'Reset List',
			options: [],
			callback: () => {
				this.sendCommand(`/list/reset`, 1)
			},
		},
		playbackMode: {
			name: 'List Playback Mode',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: [
						{ id: 0, label: 'Queued' },
						{ id: 1, label: 'Continuous' },
					],
					default: 0,
				},
			],
			callback: (action) => {
				const mode = action.options.mode
				this.sendCommand(`/set/selected/playbackMode`, mode)
			},
		},
		setLayout: {
			name: 'Set Layout',
			options: [
				{
					id: 'layout',
					type: 'dropdown',
					label: 'Mode',
					choices: [
						{ id: 0, label: 'Grid' },
						{ id: 1, label: 'List' },
					],
					default: 0,
				},
			],
			callback: (action) => {
				const layout = action.options.layout
				this.sendCommand(`/set/selected/layout`, layout)
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
		customCommand: {
			name: 'Custom Command',
			options: [
				{
					id: 'command',
					type: 'textinput',
					label: 'Command',
					default: '/set/selected/tile/0/0/play',
					useVariables: true,
				},
				{
					id: 'value',
					type: 'textinput',
					label: 'Value',
					default: '1',
					useVariables: true,
				},
			],
			callback: async (action) => {
				let command = await this.parseVariablesInString(action.options.command)
				let value = await this.parseVariablesInString(action.options.value)
				this.sendCommand(command, value)
			},
		},
	}

	return actions
}
