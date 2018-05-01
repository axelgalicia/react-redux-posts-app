import React, { Component } from 'react'
//React-Redux
import { connect } from 'react-redux'
import { compose } from 'recompose'

//Material-UI
import { MenuItem, MenuList } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';

//Icons
import StarIcon from '@material-ui/icons/Star';

//Local
import * as PostsAPI from '../services'
import { ALL_CATEGORIES, addCategories, selectCategory, addPost } from '../actions'


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
});


class Categories extends Component {

    render() {

        //Props
        const { categories, categorySelected, classes } = this.props
        // Props actions
        const { selectCategory } = this.props

        return (
            <div>
                <MenuList role="menu" subheader={<ListSubheader>Categories</ListSubheader>}>
                    <MenuItem className={classes.menuItem} onClick={() => selectCategory({ category: ALL_CATEGORIES })}>
                        <ListItemIcon className={classes.icon}>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="All" />
                    </MenuItem>

                    {categories.map((category) => ([
                        <Divider />,
                        <MenuItem key={category.path} className={classes.menuItem} onClick={() => selectCategory({ category: category.path })}>
                            <ListItemIcon className={classes.icon}>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary={category.name} />
                        </MenuItem>
                    ]))}
                </MenuList>
            </div>
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
        selectCategory: (data) => dispatch(selectCategory(data))
    }
}

export default compose(withStyles(styles), connect(
    mapStateToProps,
    mapDispatchToProps
))(Categories)