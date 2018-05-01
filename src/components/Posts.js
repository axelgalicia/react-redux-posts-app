import React, { Component } from 'react';
//React-Redux
import { connect } from 'react-redux'
//Compose
import { compose } from 'recompose'
//Material-UI
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import Badge from 'material-ui/Badge';

//Local
import { addCategories, addPosts, addPost } from '../actions'

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 1,
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class Posts extends Component {
    render() {

        //Props
        const { classes, posts } = this.props
        return (
            <div className={classes.root}>
                <List>
                    
                </List>
            </div>
        )
    }
}



const mapStateToProps = ({ appState }) => {
    return {
        categorySelected: appState.categorySelected,
        posts: appState.posts
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
))(Posts)