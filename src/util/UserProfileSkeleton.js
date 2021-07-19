
///All Lesson 39////////

import React, { Fragment } from 'react'
import avatar from '../Images/avatar.jpg'

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import withStyles from '@material-ui/core/styles/withStyles';



const styles = theme => ({
    ...theme.shared,
    profileImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        textAlign: 'center',
        position: 'relative',
    },
    card: {
        display: "flex",
        marginBottom: 20,
    },
    cardContent: {
        width: '100%',
        flexDirection: 'colum',
        padding: 25,
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover'
    },
    username: {
        width: 60,
        height:20,
        backgroundColor: "rgb(220,220,220)",
        marginBottom: 7
    
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: "rgb(220,220,220)",
        marginBottom: 10,
    },
    fullLine: {
        height: 15,
        width: '90%',
        marginBottom: 10,
        backgroundColor: "rgb(220,220,220)",
    },
    halfLine: {
        height: 15,
        width: '50%',
        marginBottom: 10,
        backgroundColor: "rgb(220,220,220)",
    },
     dummyButton: {
    width: 30,
    height:30,
    backgroundColor: "rgb(220,220,220)",
    marginBottom: 7,
    },

  })




const UserProfileSkeleton = (props) => {
const { classes } = props;


const content =  (
    <Card className={classes.card} >
        <CardMedia className={classes.profileImage} 
        image={avatar}/>
        <CardContent className={classes.cardContent}>
       <div className={classes.user}></div> 
       <div className={classes.date}></div>
       <br/>
              <br/>
       <div className={classes.fullLine}></div>
       <div className={classes.fullLine}></div>
       <div className={classes.halfLine}></div>
       <br/>
              <br/>
       <div className={classes.dummyButton}></div>

        </CardContent>
    </Card>
)


return <Fragment>
    {content}
</Fragment> 
}





export default withStyles(styles)(UserProfileSkeleton)
