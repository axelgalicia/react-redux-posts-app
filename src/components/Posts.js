import React, { Component, PropTypes } from 'react';
//React-Redux
import { connect } from 'react-redux'
//Compose
import { compose } from 'recompose'
//Material-UI
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';


//Local
import { addCategories, addPosts, selectPost, ALL_CATEGORIES, show404, hide404 } from '../actions'
import * as PostsAPI from '../services'
import Post from './Post'
import My404 from './My404';

const styles = theme => ({

});

class Posts extends Component {

    componentDidMount = () => {
        let match = this.props.match;
        if (match && match.params.postId) {
            this.getPostById(match.params.postId);
        }
    }

    getPostById = (postId) => {
        PostsAPI.getPostById(postId).then((post) => {
            this.props.selectPost(postId);
            if (post.length < 1) {
                this.props.addPosts({ posts: [] });
                this.props.show404()
            }
            else {
                this.props.addPosts({ posts: [post] });
                this.setState(({ showNotExist: false }));
                this.props.hide404()
            }
        })
    }

    render() {

        //Props
        const { classes, posts, categorySelected, show404Flag } = this.props


        return (
            <div>
                <List>
                    {
                        show404Flag ? (<My404 />) : (
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
                        )}
                </List>
            </div>
        )
    }
}





const mapStateToProps = ({ appState }) => {
    return {
        categorySelected: appState.categorySelected,
        posts: appState.posts,
        postSelected: appState.postSelected,
        show404Flag: appState.show404
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategories: (data) => dispatch(addCategories(data)),
        selectPost: (data) => dispatch(selectPost(data)),
        addPosts: (data) => dispatch(addPosts(data)),
        show404: () => dispatch(show404()),
        hide404: () => dispatch(hide404())

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts)