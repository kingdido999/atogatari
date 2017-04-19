import React, { Component, PropTypes } from 'react'
import { Dropdown } from 'semantic-ui-react'

import { updateTag } from '../actions/user'
import { TAG_TYPE_COLOR_MAP } from '../utils'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
}

const generateTypeOption = text => {
	return {
		text,
		value: text,
		label: { color: TAG_TYPE_COLOR_MAP[text], empty: true, circular: true }
	}
}

class TagTypesDropdown extends Component {
	handleChangeType = (event, { value }) => {
		const { dispatch, name, type } = this.props

		if (value !== type) {
			dispatch(updateTag(name, { type: value }))
		}
	}

	render() {
		const { isAuthenticated, type } = this.props
		const options = [
			generateTypeOption('General'),
			generateTypeOption('Anime'),
			generateTypeOption('Character')
		]
		return (
			<Dropdown
				disabled={!isAuthenticated}
				defaultValue={type}
				options={options}
				onChange={this.handleChangeType}
			/>
		)
	}
}

TagTypesDropdown.propTypes = propTypes

export default TagTypesDropdown
