import React, { Component, PropTypes } from 'react';
//React-Redux
import { connect } from 'react-redux'
//Compose
import { compose } from 'recompose'
//Material-UI
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';


//Local
import { addCategories, addPosts, addPost, addComments, ALL_CATEGORIES } from '../actions'
import * as PostsAPI from '../services'
import Post from './Post'

const styles = theme => ({

});

class Posts extends Component {

    componentDidMount = () => {
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', this.props.posts)
    }

    render() {

        //Props
        const { classes, posts, categorySelected } = this.props

        return (
            <div>
                <List>
                    {
                        posts.map((post) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                timestamp={post.timestamp}
                                body={post.body}
                                author={post.author}
                                voteScore={post.voteScore}
                                commentCount={post.commentCount} />
                        ))
                    }
                </List>
            </div>
        )
    }
}





const mapStateToProps = ({ appState }) => {
    return {
        categorySelected: appState.categorySelected,
        posts: appState.posts,
        postSelected: appState.postSelected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategories: (data) => dispatch(addCategories(data)),
        addPosts: (data) => dispatch(addPosts(data)),
        addComments: (data) => dispatch(addComments(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts)