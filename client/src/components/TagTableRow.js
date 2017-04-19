import React, { Component, PropTypes } from 'react'
import { Table, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router'

import { setTagType } from '../actions/user'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	tag: PropTypes.object.isRequired,
	types: PropTypes.array.isRequired
}

export class TagTableRow extends Component {
	handleChangeType = (event, { value }) => {
		const { dispatch, tag } = this.props
		const { name, type } = tag

		if (value !== type) {
			dispatch(setTagType(name, value))
		}
	}

	render() {
		const { isAuthenticated, tag, types } = this.props
		const { name, type } = tag

		return (
			<Table.Row>
				<Table.Cell collapsing>
					{tag.screenshots.length}
				</Table.Cell>
				<Table.Cell>
					<Link to={`/tag/${name}`}>
						{name}
					</Link>
				</Table.Cell>
				<Table.Cell collapsing>
					<Dropdown
						selection
						disabled={!isAuthenticated}
						defaultValue={type}
						options={types}
						onChange={this.handleChangeType}
					/>
				</Table.Cell>
			</Table.Row>
		)
	}
}

TagTableRow.propTypes = propTypes

export default TagTableRow
