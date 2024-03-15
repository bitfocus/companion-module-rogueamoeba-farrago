import { InstanceBase, Regex, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { getActions } from './actions.js'
import { getPresets } from './presets.js'
import { getVariables } from './variables.js'
import { getFeedbacks } from './feedbacks.js'
import UpgradeScripts from './upgrades.js'

import OSC from 'osc'

class FarragoInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Connecting)

		this.initOSC()

		this.initActions()
		this.initFeedbacks()
		this.initVariables()
		this.initPresets()
	}

	async destroy() {
		if (this.listener) {
			this.listener.close()
		}

		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
		this.initOSC()
	}

	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				width: 4,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Farrago Input Port',
				width: 4,
				default: '8090',
				regex: Regex.PORT,
			},
			{
				type: 'textinput',
				id: 'feedbackPort',
				label: 'Farrago Output Port',
				width: 4,
				default: '8091',
				regex: Regex.PORT,
			},
		]
	}

	initVariables() {
		const variables = getVariables.bind(this)()
		this.setVariableDefinitions(variables)
	}

	initFeedbacks() {
		const feedbacks = getFeedbacks.bind(this)()
		this.setFeedbackDefinitions(feedbacks)
	}

	initPresets() {
		const presets = getPresets.bind(this)()
		this.setPresetDefinitions(presets)
	}

	initActions() {
		const actions = getActions.bind(this)()
		this.setActionDefinitions(actions)
	}

	sendCommand(command, value) {
		if (value || value === 0) {
			this.oscSend(this.config.host, this.config.port, `${command}`, [
				{
					type: 'i',
					value: value,
				},
			])
		} else {
			this.oscSend(this.config.host, this.config.port, `${command}`, [])
		}
	}

	initOSC() {
		this.tiles = []
		this.sets = []
		this.status = {}
		if (this.listener) {
			this.listener.close()
		}

		this.listener = new OSC.UDPPort({
			localAddress: '0.0.0.0',
			localPort: this.config.feedbackPort,
			broadcast: true,
			metadata: true,
		})

		this.listener.open()
		this.listener.on('ready', () => {
			this.updateStatus(InstanceStatus.Ok)
			this.sendCommand('/ping')
		})
		this.listener.on('error', (err) => {
			if (err.code == 'EADDRINUSE') {
				this.log('error', `Error: Selected feedback port ${err.message.split(':')[1]} is already in use.`)
				this.updateStatus('bad_config', 'Feedback port conflict')
			}
		})

		this.listener.on('message', (message) => {
			if (message) {
				let value = message.args[0]?.value
				let address = message.address

				if (address.match(/\/set\/\d+\/tile\/\d+\/\d+\/[A-Za-z]+$/)) {
					let info = message.address.match(/(\/set\/\d+\/tile\/\d+\/\d+)\/([A-Za-z]+)$/)
					let id = info[1]
					let prop = info[2]
					let index = this.tiles.findIndex((tile) => tile.id === id)
					let variableName = id.replaceAll('/', '_').slice(1)

					if (index > -1) {
						switch (prop) {
							case 'title':
								if (this.tiles[index].label !== value) {
									this.tiles[index].label = value
									this.updateCompanionInternals()
									this.setVariableValues({ [`${variableName}_name`]: value })
								}
								break
							case 'play':
								if (this.tiles[index].play !== value) {
									this.tiles[index].play = value
									this.checkFeedbacks('tilePlaying')
									this.checkFeedbacks('playing')
								}
								break
							case 'color':
								if (this.tiles[index].color !== value) {
									this.tiles[index].color = value
									this.checkFeedbacks('tileColor')
								}
								break
							case 'icon':
								if (this.tiles[index].icon !== value) {
									this.tiles[index].icon = value
									this.setVariableValues({ [`${variableName}_icon`]: value })
								}
								break
							default:
							/* if (this.tiles[index][`${prop}`] !== value) {
									this.tiles[index][`${prop}`] = value
								} */
						}
					} else if (index === -1) {
						this.tiles.push({
							id: id,
							[`${prop}`]: value,
						})
					}
				} else if (address.match(/\/set\/selected\/tile\/\d+\/\d+\/select+$/) && value) {
					let info = message.address.match(/(\/set\/selected\/tile\/)(\d+\/\d+)\/(select+)$/)
					let tile = info[2]

					this.status.selected = tile
				} else if (address.match(/\/set\/\d+\/title+$/) && value) {
					let info = message.address.match(/\/set\/(\d+)\/title+$/)
					let setPosition = parseInt(info[1])
					let index = this.sets.findIndex((set) => set.id === setPosition)

					if (index > -1) {
						this.sets[index].label = value
					} else {
						this.sets.push({
							id: setPosition,
							label: value,
						})
						this.updateCompanionInternals()
					}
				}
			}
		})
	}

	updateCompanionInternals() {
		//Sort tiles by set, then x position, then y position
		this.tiles.sort((a, b) =>
			a.id.localeCompare(b.id, undefined, {
				numeric: true,
			})
		)

		this.sets.sort((a, b) => a.id - b.id)

		this.initActions()
		this.initPresets()
		this.initFeedbacks()
		this.initVariables()
	}
}

runEntrypoint(FarragoInstance, UpgradeScripts)
