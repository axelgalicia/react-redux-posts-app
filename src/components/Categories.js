import React, { Component } from 'react'
//React-Redux
import { connect } from 'react-redux'
import { compose } from 'recompose'

//Material-UI
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import { MenuItem, MenuList } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';

//Icons
import StarIcon from '@material-ui/icons/Star';
import SortByVotesIcon from '@material-ui/icons/ThumbsUpDown';
import TimeIcon from '@material-ui/icons/Today';

//Local
import { ALL_CATEGORIES, selectCategory, addPosts } from '../actions'
import Posts from './Posts'
import * as PostsAPI from '../services'

const styles = theme => ({
    menuItem: {
        '&:focus': {
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
});


class Categories extends Component {

    clickCategory = (category) => {
        this.props.selectCategory({ category: category });
        this.getPosts(category);
    }


    getPosts = (category) => {
        if (category === ALL_CATEGORIES) {
            this.getAllPosts()
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
        const { categories, classes } = this.props
        // Props actions
        const { selectCategory } = this.props

        return (
            <div>
                <MenuList role="menu" subheader={<ListSubheader>Categories</ListSubheader>}>
                    <MenuItem className={classes.menuItem} onClick={() => this.clickCategory(ALL_CATEGORIES)}>
                        <ListItemIcon className={classes.icon}>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="All" />

                    </MenuItem>

                    {categories.map((category) => ([
                        <Divider />,
                        <MenuItem key={category.path} className={classes.menuItem} onClick={() => this.clickCategory(category.path)}>
                            <ListItemIcon className={classes.icon}>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary={category.name} />

                        </MenuItem>
                    ]))}
                    <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button}>
                        <AddIcon />
                    </Button>

                    <Button variant="fab" mini color="secondary" aria-label="sortByVotes" className={classes.button}>
                        <SortByVotesIcon />
                    </Button>

                    <Button variant="fab" mini color="secondary" aria-label="sortByTimestamp" className={classes.button}>
                        <TimeIcon />
                    </Button>




                    TimeIcon

                </MenuList>
            </div >
        )
    }

}

const mapStateToProps = ({ appState }) => {
    return {
        categories: appState.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectCategory: (data) => dispatch(selectCategory(data)),
        addPosts: (data) => dispatch(addPosts(data))
    }
}

export default compose(withStyles(styles), connect(
    mapStateToProps,
    mapDispatchToProps
))(Categories)