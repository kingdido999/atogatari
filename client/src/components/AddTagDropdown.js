import React, { Component, PropTypes } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { uniqBy, union } from 'lodash'

import { search } from '../actions/entities'
import { addTag } from '../actions/authed'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	screenshotId: PropTypes.string.isRequired,
	fluid: PropTypes.bool
}

class AddTagDropdown extends Component {
	state = {
		tagSuggestions: []
	}

	render() {
		const { fluid } = this.props

		return (
			<Dropdown
				options={this.state.tagSuggestions}
				placeholder="Enter a new tag"
				additionLabel=""
				additionPosition="bottom"
				icon={null}
				fluid={fluid}
				search
				selection
				allowAdditions
				selectOnBlur={false}
				noResultsMessage={'Type to show suggestions...'}
				onSearchChange={this.handleSearchChange}
				onChange={this.handleChange}
			/>
		)
	}

	handleSearchChange = (event, value) => {
		const { dispatch } = this.props

		dispatch(search({ query: value })).then(res => {
			const { value } = res
			const { data } = value
			const newSuggestions = data.map(({ name }) => {
				return { text: name, value: name }
			})

			this.setState({
				tagSuggestions: uniqBy(
					union(this.state.tagSuggestions, newSuggestions),
					'text'
				)
			})
		})
	}

	handleChange = (e, { value }) => {
		const { dispatch, screenshotId } = this.props
		dispatch(addTag(value, screenshotId)).then(() =>
			this.setState({ tagSuggestions: [] })
		)
	}
}

AddTagDropdown.propTypes = propTypes

export default AddTagDropdown
