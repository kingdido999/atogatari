import React, { Component, PropTypes } from 'react'
import { Dropdown } from 'semantic-ui-react'

import { updateTag } from '../actions/authed'
import { TAG_TYPE_COLOR_MAP } from '../constants/tag'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
}

const generateTypeOption = type => {
	return {
		text: type,
		value: type,
		label: { color: TAG_TYPE_COLOR_MAP[type], empty: true, circular: true }
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
		const types = ['General', 'Anime', 'Character'].filter(t => t !== type)
		const options = types.map(generateTypeOption)

		return (
			<Dropdown
				disabled={!isAuthenticated}
				text={type}
				selectOnBlur={false}
				options={options}
				onChange={this.handleChangeType}
			/>
		)
	}
}

TagTypesDropdown.propTypes = propTypes

export default TagTypesDropdown
