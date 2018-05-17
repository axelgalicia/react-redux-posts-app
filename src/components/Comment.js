import React, { Component } from 'react';
//React-Redux
import { connect } from 'react-redux';
//Compose
import { compose } from 'recompose';

//Material-UI
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';

//Icons
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';


import IconButton from 'material-ui/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import ModeEditIcon from '@material-ui/icons/ModeEdit';
import GradeIcon from '@material-ui/icons/Grade';

//Timestamp
import Timestamp from 'react-timestamp';

//Local
import { addCategories, addPosts, addPost } from '../actions';



const styles = {
    card: {
        left: 100,
        minWidth: 275,
        maxWidth: 2000,
        maxHeight: 400,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


class Comment extends Component {

    render() {

        const { classes, title, timestamp, body, author, voteScore } = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <div>
                <Card className={classes.card}>

                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            {author}
                </Typography>
                        <Typography className={classes.title} color="textSecondary">
                            <Timestamp time={new Date(timestamp).toISOString()} format='full' />
                        </Typography>
                        <Typography component="p">
                            {body}
                </Typography>
                    </CardContent>
                    <CardActions>
    
                        <IconButton aria-label="ModeEditIcon">
                            <ModeEditIcon />
                        </IconButton>
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="Vote Up">
                            <ThumbUp />
                        </IconButton>
                        <IconButton aria-label="Vote Down">
                            <ThumbDown />
                        </IconButton>
                        <IconButton aria-label="Votes">
                            <Badge className={classes.margin} badgeContent={voteScore} color="primary" >
                                <GradeIcon />
                            </Badge>
                        </IconButton>
                    </CardActions>

                </Card>
            </div>
        )
    }
}

const mapStateToProps = ({ appState }) => {
    return {
        categorySelected: appState.categorySelected,
        postSelected: appState.postSelected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategories: (data) => dispatch(addCategories(data))
    }
}

export default compose(withStyles(styles), connect(
    mapStateToProps,
    mapDispatchToProps
))(Comment)
