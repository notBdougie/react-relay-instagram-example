import React from 'react'
import Relay from 'react-relay'

class Post extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
  }

  render () {
    return (
      <div>
        <img src={this.props.post.imageUrl} />
        <div>
          {this.props.post.description}
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(Post, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id
        imageUrl
        description
      }
    `,
  },
})
