import React, { Component, PropTypes } from 'react'
import { Dropdown } from 'semantic-ui-react'

import { updateTagType } from '../actions/authed'
import { TAG_TYPE_COLOR_MAP } from '../constants/tag'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	item: PropTypes.bool,
	upward: PropTypes.bool
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
			dispatch(updateTagType(name, type, value))
		}
	}

	render() {
		const { isAuthenticated, type, item, upward } = this.props
		const types = ['General', 'Anime', 'Character'].filter(t => t !== type)
		const options = types.map(generateTypeOption)

		return (
			<Dropdown
				disabled={!isAuthenticated}
				text=" "
				selectOnBlur={false}
				options={options}
				onChange={this.handleChangeType}
				item={item}
				upward={upward}
			/>
		)
	}
}

TagTypesDropdown.propTypes = propTypes

export default TagTypesDropdown
