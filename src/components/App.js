//React
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

//Material-UI
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';

//Local
import Categories from './Categories'
import Posts from './Posts'
import * as PostsAPI from '../services'
import { addCategories, addPosts, addPost } from '../actions'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
});

class App extends Component {

  componentDidMount = () => {
    this.getAllCategories()
    this.getAllPosts()

  }

  getAllCategories = () => {
    PostsAPI.getAllCategories().then((categories) => {
      this.props.addCategories({
        categories: categories
      })
    })
  }

  getAllPosts = () => {
    PostsAPI.getAllPosts().then((posts) => {
      this.props.addPosts({
        posts: posts
      })
    })
  }

  render() {

    //Prop Actions
    const { addPost } = this.props
    //Props
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Readable
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Categories />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Posts />
        </main>
      </div>

    )
  }
}


const mapStateToProps = ({ appState }) => {
  return {
    categorySelected: appState.categorySelected,
    categories: appState.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCategories: (data) => dispatch(addCategories(data)),
    addPosts: (data) => dispatch(addPosts(data)),
    addPost: (data) => dispatch(addPost(data))
  }
}

export default compose(withStyles(styles), connect(
  mapStateToProps,
  mapDispatchToProps
))(App)
