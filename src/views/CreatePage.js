import React from 'react'
import Relay from 'react-relay'
import { withRouter } from 'react-router'
import CreatePostMutation from '../mutations/CreatePostMutation'

class CreatePage extends React.Component {

  static propTypes = {
    viewer: React.PropTypes.object,
    router: React.PropTypes.object,
  }

  constructor () {
    super()
    this.state = {
      description: '',
      imageUrl: '',
    }
  }

  render () {
    return (
      <div>
        <input
          value={this.state.description}
          placeholder={'description'}
          onChange={(e) => this.setState({description: e.target.value})}
        />
        <input
          value={this.state.imageUrl}
          placeholder={'Image Url'}
          onChange={(e) => this.setState({imageUrl: e.target.value})}
        />
        <img src={this.state.imageUrl} />
        {this.state.description && this.state.imageUrl &&
          <button onClick={this.handlePost}>
            post
          </button>
        }
      </div>
    )
  }

  handlePost = () => {
    const {description, imageUrl} = this.state
    const viewerId = this.props.viewer.id
    Relay.Store.commitUpdate(
      new CreatePostMutation({viewerId, description, imageUrl}),
      {
        onSuccess: () => this.props.router.replace('/'),
      }
    )
  }
}

export default Relay.createContainer(withRouter(CreatePage), {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  },
})
