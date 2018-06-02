/**
 * Categories Component which holds the menu of the Categories
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

import React, { Component } from 'react'
//React-Redux
import { connect } from 'react-redux'
import { compose } from 'recompose'
//Router
import { Link } from 'react-router-dom'

//Material-UI
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import { MenuItem, MenuList } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

//Icons
import StarIcon from '@material-ui/icons/Star';
import SortByVotesIcon from '@material-ui/icons/ThumbsUpDown';
import TimeIcon from '@material-ui/icons/Today';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


//Local
import { ALL_CATEGORIES, selectCategory, addPosts, filterByTimestamp, filterByVotes, orderBy, show404, hide404 } from '../actions'
import Posts from './Posts'
import PostForm from './PostForm'
import * as PostsAPI from '../services'

const styles = theme => ({
    menuItem: {
        '&:selected': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {},
    button: {
        margin: theme.spacing.unit,
    },
    link: {
        textDecoration: 'none',
    },
});


class Categories extends Component {


    state = {
        showPostForm: false,
        showMessage: false,
        message: null
    }

    componentDidMount = () => {
        let match = this.props.match;
        if (match && match.params.category) {
            this.clickCategory(match.params.category);
        } else {
            this.clickCategory(ALL_CATEGORIES);
        }
    }

    clickCategory = (category) => {
        this.props.selectCategory({ category: category });
        this.getPosts(category);
        this.props.hide404();
    }


    getPosts = (category) => {
        if (category === ALL_CATEGORIES) {
            this.getAllPosts();
        } else {
            this.getPostsByCategory(category)
        }
    }

    getPostsByCategory = (category) => {
        PostsAPI.getPostsByCategory(category).then(posts => {
            this.props.addPosts({
                posts: posts
            });
        })
    }

    getAllPosts = () => {
        PostsAPI.getAllPosts().then((posts) => {
            this.props.addPosts({
                posts: posts
            });
        })
    }

    filterByVotes = () => {
        this.props.orderBy()
        this.props.filterByVotes()
    }

    filterByTimestamp = () => {
        this.props.orderBy()
        this.props.filterByTimestamp()
    }


    addNewPost = () => {
        if (this.props.categorySelected !== ALL_CATEGORIES) {
            this.setState({ showPostForm: true })
          
        } else {
            this.setState({
                showMessage: true,
                message: 'You need to chose a category first'
            })
        }

    }

    close = () => {
        this.setState({ showPostForm: false })
    }

    closeMessage = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ showMessage: false })
    }


    render() {

        //Props
        const { categories, classes, categorySelected, filterByTimestamp } = this.props
        // Props actions
        const { selectCategory } = this.props

        //State 
        const { showPostForm } = this.state

        return (

            <div id="mainApp">
                <div id="postForm">
                    <PostForm open={showPostForm} post={null} close={this.close} editMode={false} />
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.showMessage}
                        onClose={this.closeMessage}
                        autoHideDuration={2000}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">You need to chose a category first!</span>}
                        action={[
                            <Button key="undo" color="secondary" size="small" onClick={this.closeMessage}>
                                OK
            </Button>
                        ]}
                    />
                </div>


                <div id="menu">

                    <MenuList role="menu" subheader={<ListSubheader>Categories</ListSubheader>}>
                        <Link to="/" className={classes.link}>
                            <MenuItem className={classes.menuItem} onClick={() => this.clickCategory(ALL_CATEGORIES)} selected={categorySelected === ALL_CATEGORIES}>
                                <ListItemIcon className={classes.icon}>
                                    <StarIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="All" />

                            </MenuItem>
                        </Link>

                        {categories.map((category) => ([
                            <Divider />,
                            <Link to={category.path} className={classes.link}>
                                <MenuItem key={category.path} className={classes.menuItem} onClick={() => this.clickCategory(category.path)} selected={categorySelected === category.path}>
                                    <ListItemIcon className={classes.icon}>
                                        <StarIcon />
                                    </ListItemIcon>
                                    <ListItemText classes={{ primary: classes.primary }} inset primary={category.name} />

                                </MenuItem>
                            </Link>
                        ]))}
                        <Tooltip title="Add posts">
                            <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button} onClick={this.addNewPost}>
                                <AddIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Sort by votes">
                            <Button variant="fab" mini color="secondary" aria-label="sortByVotes" className={classes.button} onClick={() => this.filterByVotes()}>
                                <SortByVotesIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Sort by date">
                            <Button variant="fab" mini color="secondary" aria-label="sortByTimestamp" className={classes.button} onClick={() => this.filterByTimestamp()}>
                                <TimeIcon />
                            </Button>
                        </Tooltip>

                    </MenuList>
                </div >

            </div >

        )
    }

}

const mapStateToProps = ({ appState }) => {
    return {
        categories: appState.categories,
        categorySelected: appState.categorySelected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectCategory: (data) => dispatch(selectCategory(data)),
        addPosts: (data) => dispatch(addPosts(data)),
        filterByTimestamp: () => dispatch(filterByTimestamp()),
        filterByVotes: () => dispatch(filterByVotes()),
        orderBy: () => dispatch(orderBy()),
        show404: () => dispatch(show404()),
        hide404: () => dispatch(hide404())
    }
}



export default compose(withStyles(styles), connect(
    mapStateToProps,
    mapDispatchToProps
))(Categories)