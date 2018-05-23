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
import Tooltip from '@material-ui/core/Tooltip';

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
});


class Categories extends Component {

    componentDidMount = () => {
        let match = this.props.match;
        if(match && match.params.category) {
            this.clickCategory(match.params.category);
        } else {
            this.clickCategory(ALL_CATEGORIES);
        }
    }

    clickCategory = (category) => {
        this.props.selectCategory({ category: category });
        this.getPosts(category);
    }


    getPosts = (category) => {
        if (category === ALL_CATEGORIES) {
            this.getAllPosts()
        } else {
            console.log('################################### ###', category)
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
        const { categories, classes, categorySelected } = this.props
        // Props actions
        const { selectCategory } = this.props

        return (
            <div>
                <MenuList role="menu" subheader={<ListSubheader>Categories</ListSubheader>}>
                    <MenuItem className={classes.menuItem} onClick={() => this.clickCategory(ALL_CATEGORIES)} selected={categorySelected === ALL_CATEGORIES}>
                        <ListItemIcon className={classes.icon}>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="All" />

                    </MenuItem>

                    {categories.map((category) => ([
                        <Divider />,
                        <MenuItem key={category.path} className={classes.menuItem} onClick={() => this.clickCategory(category.path)} selected={categorySelected === category.path}>
                            <ListItemIcon className={classes.icon}>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary={category.name} />

                        </MenuItem>
                    ]))}
                    <Tooltip title="Add posts">
                        <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button}>
                            <AddIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Sort by votes">
                        <Button variant="fab" mini color="secondary" aria-label="sortByVotes" className={classes.button}>
                            <SortByVotesIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Sort by date">
                        <Button variant="fab" mini color="secondary" aria-label="sortByTimestamp" className={classes.button}>
                            <TimeIcon />
                        </Button>
                    </Tooltip>



                    TimeIcon

                </MenuList>
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
        addPosts: (data) => dispatch(addPosts(data))
    }
}

export default compose(withStyles(styles), connect(
    mapStateToProps,
    mapDispatchToProps
))(Categories)