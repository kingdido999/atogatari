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
import Zooming from 'zooming'

import { upload } from '../actions/user'
import { search } from '../actions/entities'
import { resetErrorMessageIfNeeded } from '../actions/common'

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
    zooming: new Zooming({
      bgColor: '#000'
    })
  }

  handleInputChange = (event, { value }) => {
    this.setState({
      tags: value
    })
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

  handleAddTag = (event, { value }) => {
    this.setState({
      tagSuggestions: uniqBy(
        [{ text: value, value }, ...this.state.tagSuggestions],
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

        this.state.zooming.listen('.img-preview')
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
        this.refs.files.length = this.state.files.length
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

    dispatch(upload(data)).then(() => browserHistory.push('/'))
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
              <Image src={file.preview} className="img-preview" />

              <Card.Content extra>
                <Card.Meta>{file.name}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Button
                  icon="remove"
                  onClick={() => this.handleRemoveImage(index)}
                  basic
                  fluid
                />
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        <Divider horizontal />
      </Container>
    )
  }

  renderForm = () => {
    const { isUploading } = this.props
    const size = 'large'

    return (
      <Form onSubmit={this.handleSubmit} loading={isUploading} size={size}>
        {this.renderInputFile()}
        {this.renderInputTags()}
        {this.renderCheckboxNSFW()}
        {this.renderButtonSubmit()}
      </Form>
    )
  }

  renderInputFile = () => {
    const { files } = this.state
    if (files.length > 0) return null

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
    const { files, tags, tagSuggestions } = this.state
    if (files.length === 0) return null

    return (
      <Form.Dropdown
        options={tagSuggestions}
        placeholder="Enter tags"
        additionLabel=""
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
    const { files } = this.state
    if (files.length === 0) return null

    return (
      <Form.Checkbox
        label="NSFW (Not Safe For Work)"
        name="nsfw"
        onChange={this.handleInputToggle}
      />
    )
  }

  renderButtonSubmit = () => {
    const { files } = this.state
    if (files.length === 0) return null
    return (
      <Form.Field>
        <Button.Group fluid>
          <Button content="Reset" onClick={this.handleReset} />
          <Button.Or />
          <Button type="submit" primary>Submit</Button>
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
}

UploadPage.propTypes = propTypes

export default UploadPage
