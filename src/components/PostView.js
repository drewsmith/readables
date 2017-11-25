import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Post from './Post'
import Comment from './Comment'
import Loading from './Loading'
import AddCommentModal from './modal/AddCommentModal'

import Add from 'material-ui-icons/Add'

import * as actions from '../actions/posts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { sortByVoteScore } from '../util'

const iconStyles = {
  plus: {
    width: 14,
    height: 14,
    verticalAlign: 'middle'
  },
  text: {
    lineHeight: '20px',
    padding: '4px 5px 0 5px'
  }
}

class CommentsHeader extends Component {
  state = {
    openNewCommentModal: false
  }

  toggleModal = () => this.setState((state) => ({ openNewCommentModal: !state.openNewCommentModal }))

  render() {
    let { totalComments, postId } = this.props
    let { openNewCommentModal } = this.state

    return (
      <div className="comments-divider">
        Comments ({totalComments})
        <button className="add-comment-button" onClick={this.toggleModal}>
          <Add color="#455A64" style={iconStyles.plus} />
          <span style={iconStyles.text}>Add Comment</span>
        </button>
        <AddCommentModal
          isOpen={openNewCommentModal}
          onClose={this.toggleModal}
          postId={postId}
        />
      </div>
    )
  }
}

CommentsHeader.propTypes = {
  totalComments: PropTypes.number,
  postId: PropTypes.string.isRequired
}

CommentsHeader.defaultProps =  {
  totalComments: 0
}

const CommentList = ({ comments, postId, onAddComment }) => (
  <div>
    <CommentsHeader
      totalComments={comments.length}
      postId={postId}
    />
    {comments.sort(sortByVoteScore).map(comment => (
      <Comment
        key={comment.id}
        comment={comment}
        postId={postId}
      />
    ))}
  </div>
)

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  onAddComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}

const PostDisplay = ({post, comments, votePost, deletePost, addComment}) => (
  (!post || !post.id)
    ? <div className="no-data-found">The post could not be found.</div>
    : (
      <div>
        <Post
          post={post}
          comments={comments[post.id]}
          onVotePost={votePost}
          onDeletePost={deletePost}
        />
        {comments[post.id] && (
          <CommentList
            comments={comments[post.id]}
            postId={post.id}
            onAddComment={addComment}
          />
        )}
      </div>
    )
)

class PostView extends Component {
  componentDidMount() {
    let { postId } = this.props.match.params
    let { fetchPost } = this.props

    fetchPost(postId)
  }
  render() {
    let { loading } = this.props
    return (
      <div>
        {loading
          ? <Loading />
          : <PostDisplay {...this.props} />
        }
      </div>
    )
  }
}

PostView.propTypes = {
  loading: PropTypes.bool,
  post: PropTypes.object,
  comments: PropTypes.object,
  votePost: PropTypes.func.isRequired
}

export default connect(
  (state) => ({
    loading: state.posts.loading,
    post: state.posts.post,
    comments: state.posts.comments
  }),
  (dispatch) => bindActionCreators(actions, dispatch)
)(PostView)
