
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';


const styles = (theme) => ({
    ...theme.shared,
  

    replyImage:{
maxWidth: '100%',
height: 100,
width: 100,
objectFit: 'cover',
borderRadius: '50%',
   },

   replyData:{
       marginLeft: 20,
   }
   
})



export class Replys extends Component {

    
    render() {

        const drake="https://firebasestorage.googleapis.com/v0/b/workservices-e4506.appspot.com/o/100846351935.png?alt=media&token=b5490b00-ba72-4663-934b-6a921627fcd0"

        const {JobReplys, classes} = this.props;

        return (
           
          <Grid container>
              {JobReplys.map((jobReply,index) => {
            const {
                username,
                createdAt,
                // email,
                replyText,
                // number,
                userImage,
            } = jobReply;

            


            const image = userImage ? (<img src={userImage} alt="jobImage" className={classes.replyImage} />) : (
            <img src={drake} alt="jobImage" className={classes.replyImage} />
            )
          
            return  (  
<Fragment key={createdAt}>
    <Grid item sm={12}>
    <Grid container>
    <Grid item sm={2}>
        
        {image}
       
        </Grid>
        
        <Grid item sm={9}>
            <div  className={classes.replyData}>
            <Typography
            variant="h5"
            component={Link}
            to={`/users/${username}`}
            color="primary"
            >
                {username}
            </Typography>

            <Typography
            variant="body2"
            color="textSecondary"
            >
                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
            </Typography>



<Typography
            variant="body1"
            >
                {replyText}
            </Typography>

            </div >
        </Grid>
        </Grid>
        {index !== JobReplys.length -1 && (
            <hr className={classes.invisibleSeparator}/>
        )}
       </Grid>

</Fragment>
            )
              })}
              </Grid>
        )
            }
        }


Replys.propTypes = {
    JobReplys: PropTypes.array.isRequired,
}

export default withStyles(styles)(Replys);
