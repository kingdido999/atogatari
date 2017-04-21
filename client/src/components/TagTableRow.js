import React, { Component, PropTypes } from 'react'
import { Table } from 'semantic-ui-react'

import Tag from './Tag'
import TagTypesDropdown from './TagTypesDropdown'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	tag: PropTypes.object.isRequired
}

export class TagTableRow extends Component {
	render() {
		const { tag } = this.props
		const { name, type } = tag

		return (
			<Table.Row>
				<Table.Cell>
					<Tag type={type} name={name} count={tag.screenshots.length} />
				</Table.Cell>
				<Table.Cell collapsing>
					<TagTypesDropdown {...this.props} name={name} type={type} />
				</Table.Cell>
			</Table.Row>
		)
	}
}

TagTableRow.propTypes = propTypes

export default TagTableRow
