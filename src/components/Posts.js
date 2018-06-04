/**
 *   Posts Component
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

import React, { Component } from 'react';
//React-Redux
import { connect } from 'react-redux'
//Material-UI
import List from 'material-ui/List';


//Local
import { addCategories, ALL_CATEGORIES } from '../actions/categoryActions'
import { addPosts, selectPost } from '../actions/postActions'
import { show404, hide404 } from '../actions'
import * as PostsAPI from '../services'
import Post from './Post'
import My404 from './My404';


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

    render() {

        //Props
        const { posts, show404Flag } = this.props


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
                                    commentCount={post.commentCount}
                                    category={post.category} 
                                    getPosts={this.getPosts}/>
                            ))
                        )}
                </List>
            </div>
        )
    }
}





const mapStateToProps = ({ appState: { categorySelected, posts, postSelected, show404Flag } }) => {
    return {
        categorySelected,
        posts,
        postSelected,
        show404Flag
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