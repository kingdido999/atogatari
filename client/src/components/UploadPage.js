import React, { Component, PropTypes } from 'react'
import {
  Container,
  Segment,
  Grid,
  Form,
  Image,
  Label,
  Card,
  Divider,
  Button
} from 'semantic-ui-react'
import { browserHistory } from 'react-router'
import { uniqBy, union } from 'lodash'

import { uploadScreenshot } from '../actions/authed'
import { search, resetScreenshotLists } from '../actions/entities'
import { resetErrorMessageIfNeeded } from '../actions/common'
import { MIN_CHARACTERS, DONE_TYPING_INTERVAL } from '../constants/search'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired
}

class UploadPage extends Component {
  state = {
    files: [],
    tagSuggestions: [],
    tags: [],
    nsfw: false,
    typingTimer: null
  }

  render() {
    return (
      <div>
        {this.renderInstructions()}

        <Divider section horizontal>Upload</Divider>

        {this.renderPreview()}

        <Container text>
          <Segment>{this.renderForm()}</Segment>

        </Container>

      </div>
    )
  }

  renderInstructions = () => {
    const { files } = this.state
    if (files.length > 0) return null

    return (
      <Segment color="pink" padded vertical inverted>
        <Grid columns="equal" stackable divided>
          <Grid.Row textAlign="center">
            <Grid.Column>
              <h2>No Character, No Game</h2>
              <p>Make sure to have character(s) in your screenshot.</p>
            </Grid.Column>
            <Grid.Column>
              <h2>Hi-Res Image Only</h2>
              <p>
                Image quality below 1080p is not accepted.
              </p>
            </Grid.Column>
            <Grid.Column>
              <h2>Multiple Uploads</h2>
              <p>
                You may submit up to 9 files at one time.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }

  renderPreview = () => {
    const { files } = this.state
    if (files.length === 0) return
    let itemsPerRow

    switch (files.length) {
      case 1:
        itemsPerRow = 1
        break
      case 2:
      case 4:
        itemsPerRow = 2
        break
      default:
        itemsPerRow = 3
        break
    }

    return (
      <Container text={[1, 2, 4].includes(files.length)}>
        <Card.Group itemsPerRow={itemsPerRow} stackable>
          {files.map((file, index) => (
            <Card key={index}>
              <Image
                src={file.preview}
                label={{
                  corner: 'right',
                  onRemove: () => this.handleRemoveImage(index)
                }}
              />

              <Card.Content extra>
                <Card.Meta>{file.name}</Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        <Divider horizontal />
      </Container>
    )
  }

  renderForm = () => {
    const { files } = this.state
    return (
      <Form onSubmit={this.handleSubmit} size="large">
        {files.length === 0 && this.renderInputFile()}
        {files.length > 0 && this.renderInputTags()}
        {files.length > 0 && this.renderCheckboxNSFW()}
        {files.length > 0 && this.renderButtonSubmit()}
      </Form>
    )
  }

  renderInputFile = () => {
    return (
      <Form.Field>
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={this.handleImageChange}
          ref="files"
          multiple
          required
        />
      </Form.Field>
    )
  }

  renderInputTags = () => {
    const { tags, tagSuggestions } = this.state

    return (
      <Form.Dropdown
        options={tagSuggestions}
        placeholder="Enter tags"
        additionLabel=""
        additionPosition="bottom"
        icon={null}
        search
        selection
        fluid
        multiple
        allowAdditions
        noResultsMessage={'Type to show suggestions...'}
        name="tags"
        value={tags}
        onAddItem={this.handleAddTag}
        onChange={this.handleInputChange}
        onSearchChange={this.handleSearchChange}
      />
    )
  }

  renderCheckboxNSFW = () => {
    return (
      <Form.Checkbox
        label="NSFW (Not Safe For Work)"
        name="nsfw"
        onChange={this.handleInputToggle}
      />
    )
  }

  renderButtonSubmit = () => {
    const { isUploading } = this.props

    return (
      <Form.Field>
        <Button.Group fluid>
          <Button content="Reset" onClick={this.handleReset} />
          <Button.Or />
          <Button type="submit" loading={isUploading} primary>Submit</Button>
        </Button.Group>
      </Form.Field>
    )
  }

  renderTagLabels = () => {
    const { tags } = this.state

    return (
      <Label.Group>
        {tags.map((tag, index) => (
          <Label key={index}>
            {tag}
          </Label>
        ))}
      </Label.Group>
    )
  }

  handleInputChange = (event, { value }) => {
    this.setState({
      tags: value
    })
  }

  handleSearchChange = (event, value) => {
    clearTimeout(this.state.typingTimer)
    this.setState({
      typingTimer: setTimeout(
        () => this.handleDoneTyping(value),
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

  handleAddTag = (event, { value }) => {
    const trimmedValue = value.trim()
    this.setState({
      tagSuggestions: uniqBy(
        [
          { text: trimmedValue, value: trimmedValue },
          ...this.state.tagSuggestions
        ],
        'text'
      )
    })
  }

  handleImageChange = e => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(resetErrorMessageIfNeeded())

    this.setState({ files: [] })
    const files = e.target.files

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      let reader = new FileReader()

      reader.onloadend = () => {
        file.preview = reader.result

        this.setState({
          files: [...this.state.files, file]
        })
      }

      reader.readAsDataURL(file)
    }
  }

  handleRemoveImage = index => {
    this.setState(
      {
        files: this.state.files.filter((_, i) => i !== index)
      },
      () => {
        if (this.state.files.length === 0) {
          this.handleReset()
        }
      }
    )
  }

  handleReset = () => {
    const { dispatch } = this.props
    dispatch(resetErrorMessageIfNeeded())
    this.setState({
      files: [],
      tagSuggestions: [],
      tags: [],
      nsfw: false
    })
  }

  handleInputToggle = (event, data) => {
    const { name, checked } = data

    this.setState({
      [name]: checked
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { dispatch } = this.props
    const { files, tags, nsfw } = this.state

    const data = new FormData()
    files.forEach(file => data.append('file[]', file))
    data.append('tags', JSON.stringify(tags))
    data.append('nsfw', nsfw)

    dispatch(uploadScreenshot(data)).then(() => {
      dispatch(resetScreenshotLists())
      browserHistory.push('/')
    })
  }
}

UploadPage.propTypes = propTypes

export default UploadPage
