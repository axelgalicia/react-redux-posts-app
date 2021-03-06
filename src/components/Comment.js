/**
 * Comment Component 
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

import React, { Component } from 'react';
//Compose
import { compose } from 'recompose';

//Material-UI
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';
import Tooltip from '@material-ui/core/Tooltip';

//Icons
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';


import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ModeEditIcon from '@material-ui/icons/ModeEdit';
import GradeIcon from '@material-ui/icons/Grade';

//Timestamp
import Timestamp from 'react-timestamp';

//Local
import CommentForm from './CommentForm';
import { dateFormatter } from '../utils/helpers'



const styles = {
    card: {
        marginLeft: 100,
        left: 100,
        minWidth: 275,
        maxWidth: 1000,
        maxHeight: 200,
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

    state = {
        showCommentForm: false
    }

    editComment = (e) => {
        this.setState({ showCommentForm: true })
        e.stopPropagation()

    }

    close = () => {
        this.setState({ showCommentForm: false })
    }


    render() {

        const { classes, id, parentId, timestamp, body, author, voteScore, deleteComment, voteComment, getComments } = this.props;


        const { showCommentForm } = this.state

        const commentObj = {
            id: id,
            parentId: parentId,
            body: body,
            author: author,
            timestamp: timestamp

        }

        return (
            <div>
                <CommentForm comment={commentObj} open={showCommentForm} close={this.close} editMode={true} getComments={getComments} />
                <Card className={classes.card}>

                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            {author}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary">
                            <Timestamp time={dateFormatter(timestamp)} format='full' />
                        </Typography>
                        <Typography component="p">
                            {body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Tooltip title="Edit" placement='top'>
                            <IconButton aria-label="ModeEditIcon" onClick={(e) => this.editComment(e)}>
                                <ModeEditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" placement='top'>
                            <IconButton aria-label="Delete" onClick={(e) => deleteComment(e, id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Vote up" placement='top'>
                            <IconButton aria-label="Vote Up" onClick={(e) => voteComment(e, id, '+')}>
                                <ThumbUp />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Vote Down" placement='top'>
                            <IconButton aria-label="Vote Down" onClick={(e) => voteComment(e, id, '-')}>
                                <ThumbDown />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Votes" placement='top'>
                            <IconButton aria-label="Votes">
                                <Badge className={classes.margin} badgeContent={voteScore} color="primary" >
                                    <GradeIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </CardActions>

                </Card>
            </div>
        )
    }
}



export default compose(withStyles(styles))(Comment)
