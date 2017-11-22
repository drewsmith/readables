import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Post from './Post'
import Comment from './Comment'
import Loading from './Loading'
import CommentModal from './modal/CommentModal'

import Add from 'material-ui-icons/Add'

import { connect } from 'react-redux'
import { fetchPost, votePost, addComment } from '../actions/posts'
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

  saveComment = (comment) => this.props.onAddComment(comment).then(this.toggleModal)

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
        <CommentModal
          isOpen={openNewCommentModal}
          onClose={this.toggleModal}
          postId={postId}
          onSave={this.saveComment}
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

class CommentList extends Component {
  render() {
    let { comments, postId, onAddComment } = this.props

    return (
      <div>
        <CommentsHeader
          totalComments={comments.length}
          postId={postId}
          onAddComment={onAddComment}
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
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  onAddComment: PropTypes.func.isRequired
}

class PostView extends Component {
  componentDidMount() {
    let { postId } = this.props.match.params
    let { loadPost } = this.props

    if(postId) {
      loadPost(postId)
    }
  }

  render() {
    let { loading, post, comments, onVotePost, onAddComment } = this.props
    return (
      <div>
        {loading && <Loading />}
        {post && !loading && (
          <div>
            <Post
              post={post}
              comments={comments[post.id]}
              onVote={onVotePost}
            />
            {comments[post.id] && (
              <CommentList
                comments={comments[post.id]}
                postId={post.id}
                onAddComment={onAddComment}
              />
            )}
          </div>
        )}
      </div>
    )
  }
}

PostView.propTypes = {
  loading: PropTypes.bool,
  post: PropTypes.object,
  comments: PropTypes.object,
  onVotePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    loading: state.posts.loading,
    post: state.posts.post,
    comments: state.posts.comments
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadPost: (postId) => dispatch(fetchPost(postId)),
  onVotePost: (postId, direction) => dispatch(votePost(postId, direction)),
  onAddComment: (comment) => dispatch(addComment(comment))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
