import React, { Component } from 'react'
//React-Redux
import { connect } from 'react-redux'
//Material-UI
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
//Icons
import StarIcon from '@material-ui/icons/Star';

//Local
import * as PostsAPI from '../services'
import { ALL_CATEGORIES,addCategories, selectCategory, addPost } from '../actions'

class Categories extends Component {

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
           // console.log(posts)
        })
    }

    render() {

        //console.log(this.props)

        const { categories, categorySelected, addPost, selectCategory } = this.props

        const style = {
            margin: 10,
            textAlign: 'left',
            display: 'inline-block'
        };

        return (
            <div>

                <Paper style={style}>

                    <Menu value={categorySelected} onItemClick={(event, menuItem, index) => selectCategory({ category: menuItem.props.value })}>
                        <Subheader>Categories</Subheader>
                        <MenuItem primaryText="All" leftIcon={<StarIcon />} value={ALL_CATEGORIES} key="all"/>                        
                        {categories.map((category) => ([                            
                            <Divider/>,
                            <MenuItem primaryText={category.name} leftIcon={<StarIcon />} value={category.path} key={category.path} />
                        ]))}
                    </Menu>
                </Paper>
            </div>
        )
    }

}



const mapStateToProps = ({ appState }) => {
    return {
        categorySelected: appState.categorySelected,
        categories: appState.categories,
        posts: appState.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategories: (data) => dispatch(addCategories(data)),
        addPost: (data) => dispatch(addPost(data)),
        selectCategory: (data) => dispatch(selectCategory(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories);