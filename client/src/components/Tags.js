import React, { Component, PropTypes } from 'react'
import { List } from 'semantic-ui-react'

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
			<List>
				{tagNames.map((name, index) => (
					<List.Item key={index}>
						<Tag
							{...this.props}
							type={tags[name] ? tags[name].type : 'General'}
							name={name}
							count={tags[name] ? tags[name].screenshots.length : 1}
						/>
					</List.Item>
				))}
			</List>
		)
	}
}

Tags.propTypes = propTypes

export default Tags
