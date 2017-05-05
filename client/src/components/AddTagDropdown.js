import React, { Component, PropTypes } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { uniqBy, union } from 'lodash'

import { search } from '../actions/entities'
import { addTag } from '../actions/authed'
import { MIN_CHARACTERS, DONE_TYPING_INTERVAL } from '../constants/search'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	screenshotId: PropTypes.string.isRequired,
	fluid: PropTypes.bool,
	disabled: PropTypes.bool
}

class AddTagDropdown extends Component {
	state = {
		tagSuggestions: [],
		typingTimer: null
	}

	render() {
		const { fluid, disabled } = this.props
		const placeholder = disabled ? 'Login to add a tag' : 'Add a tag'

		return (
			<Dropdown
				options={this.state.tagSuggestions}
				placeholder={placeholder}
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
				disabled={disabled}
			/>
		)
	}

	handleSearchChange = (event, value) => {
		clearTimeout(this.state.typingTimer)
		this.setState({
			typingTimer: setTimeout(
				() => this.handleDoneTyping(value.trim()),
				DONE_TYPING_INTERVAL
			)
		})
	}

	handleDoneTyping = value => {
		if (value.length < MIN_CHARACTERS) return
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
