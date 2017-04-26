import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'

import Tag from './Tag'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	tagNames: PropTypes.array.isRequired,
	tags: PropTypes.object.isRequired,
	isAdmin: PropTypes.bool,
	deletable: PropTypes.bool,
	screenshotId: PropTypes.string.isRequired
}

class Tags extends Component {
	render() {
		const { tagNames, tags } = this.props

		return (
			<Label.Group>
				{tagNames.map((name, index) => (
					<Tag
						{...this.props}
						key={index}
						type={tags[name] ? tags[name].type : 'General'}
						name={name}
						count={tags[name] ? tags[name].screenshots.length : 1}
					/>
				))}
			</Label.Group>
		)
	}
}

Tags.propTypes = propTypes

export default Tags
