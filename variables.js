export function getVariables() {
	const variables = []

	//Title Variables
	this.tiles.forEach((tile) => {
		if (tile.label) {
			let variableName = tile.id.replaceAll('/', '_').slice(1)
			variables.push({
				name: `Tile ${variableName} - Name`,
				variableId: `${variableName}_name`,
			})
			variables.push({
				name: `Tile ${variableName} - Icon`,
				variableId: `${variableName}_icon`,
			})
			variables.push({
				name: `Tile ${variableName} - Duration`,
				variableId: `${variableName}_duration`,
			})
			variables.push({
				name: `Tile ${variableName} - Remaining Time`,
				variableId: `${variableName}_remainingTime`,
			})
			this.setVariableValues({
				[`${variableName}_`]: tile.label,
				[`${variableName}_icon`]: tile.icon,
				[`${variableName}_duration`]: this.secondsToMS(tile.duration),
				[`${variableName}_remainingTime`]: this.secondsToMS(tile.remainingTime),
			})
		}
	})

	//Set Variables
	this.sets.forEach((set) => {
		if (set.label) {
			let variableName = `set_${set.id}`
			variables.push({
				name: `Set ${set.id} - Name`,
				variableId: `${variableName}_name`,
			})
			this.setVariableValues({ [`${variableName}_name`]: set.label })
		}
	})

	return variables
}
