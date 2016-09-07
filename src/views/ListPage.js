import React from 'react'
import Relay from 'react-relay'
import Post from '../components/Post'

class ListPage extends React.Component {

  static propTypes = {
    viewer: React.PropTypes.object,
  }

  render () {
    return (
      <div>
        {this.props.viewer.allPosts.edges.reverse().map(({node}) =>
          <Post key={node.id} post={node} />
        )}
      </div>
    )
  }
}

export default Relay.createContainer(ListPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allPosts(first: 1000000) {
          edges {
            node {
              id
              ${Post.getFragment('post')}
            }
          }
        }
      }
    `,
  },
})
