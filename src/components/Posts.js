import React, { Component } from 'react'

import CloseIcon from 'material-ui/svg-icons/content/clear'

import { lightGreen500, lightGreen800, white, blueGrey400, blueGrey500, blueGrey900, blueGrey800, blueGrey300, grey700, cyan800, cyan900, grey100, grey300, grey500 } from 'material-ui/styles/colors'

import SelectField from 'material-ui/SelectField'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

import ArrowUp from 'material-ui/svg-icons/navigation/arrow-drop-up'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import CommentIcon from 'material-ui/svg-icons/communication/comment'
import LabelIcon from 'material-ui/svg-icons/action/label'
import UserIcon from 'material-ui/svg-icons/action/account-circle'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'

import { connect } from 'react-redux'

import { addPost, getPosts } from '../actions/posts'
import { getCategories } from '../actions/categories'

import '../css/Posts.css'

const styles = {
  dropdown: {
    fontSize: '14px',
    textTransform: 'uppercase',
    color: blueGrey900,
    margin: '0 auto',
    textAlign: 'center'
  },
  nav: {
    paddingBottom: '30px',
    fontSize: '16px',
    fontWeight: '100',
    color: grey700
  },
  drawerLink: {
    color: cyan900,
    textDecoration: 'underline',
    fontWeight: '400',
    cursor: 'pointer'
  },
  icon: {
    verticalAlign: 'middle',
    marginRight: '4px'
  },
  container: {
    padding: '30px'
  },
  vote: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    fontSize: '24px',
    color: cyan900
  },
  postWrapper: {
    display: 'flex',
    flexGrow: '1',
    marginLeft: '20px'
  },
  postContainer: {
    display: 'flex'
  },
  card: {
    flexGrow: 1
  },
  arrowIcon: {
    height: '36px !important',
    weight: '36px !important',
    cursor: 'pointer'
  },
  cardHeader: {
    padding: '12px 16px'
  },
  post: {
    title: {
      fontSize: '18px',
      fontWeight: 100,
      color: cyan900
    }
  }
}

const Title = ({post}) => (
  <div style={styles.post.title}>
    {post.title}
  </div>
)

class Posts extends Component {
  state = {
    openDrawer: false
  }

  toggleDrawer = () => this.setState((state) => ({openDrawer: !state.openDrawer}))

  render() {
    let { openDrawer } = this.state
    let { posts, categories } = this.props
    return (
      <div style={styles.container}>
        <div style={styles.nav}>
          {posts.length} posts for <span style={styles.drawerLink} onClick={this.toggleDrawer}>Category</span>
        </div>
        {posts.map(post => (
          <div style={styles.postContainer}>
            <div style={styles.vote}>
              <ArrowUp color={cyan900} style={styles.arrowIcon} />
              {post.votes}
              <ArrowDown color={cyan900} style={styles.arrowIcon} />
            </div>
            <div style={styles.postWrapper}>
              <Card style={styles.card}>
                <CardHeader
                  title={<Title post={post} />}
                  style={styles.cardHeader}
                />
                <CardText>
                  Text
                </CardText>
                <CardActions className="reset0">
                  <div className="post-footer">
                    <ul>
                      <li><CommentIcon color={blueGrey500} className="icon" /> 0 Comments</li>
                      <li><LabelIcon color={blueGrey500} className="icon" />Category</li>
                      <li><UserIcon color={blueGrey500} className="icon" />{post.createdOn} by {post.creator}</li>
                    </ul>
                  </div>
                </CardActions>
              </Card>
            </div>
          </div>
        ))}
        <Drawer
          open={openDrawer}
          openSecondary={true}>
          <MenuItem onClick={this.toggleDrawer}>
            <CloseIcon style={styles.icon} />
            Close
          </MenuItem>
          <Divider />
          {categories.map(category => (
            <MenuItem key={category}>{category}</MenuItem>
          ))}
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (post) => dispatch(addPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
