import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux'


const styles = (theme) => ({
    ...theme.shared,
    button: {
        float: 'right'
    },
    content:{
      display: "flex"
    },
    paper: {
        
        color:"white",
        backgroundColor:"red",
    },
     paperTwo: {
        
        color:"white",
        backgroundColor:"blue",
     },
     paperThree:{
        color:"white",
        backgroundColor:"yellow",
     }

  })
  



//grid container 
//direction = order of items
//justify = behavior on horizontal access 
//alignItems = behavior on vertical access 

export class gridExample extends Component {
    
    render() {
      
        const { classes } = this.props
        return (

            <div>
                
            {/* ///only a Grid container can have spacing */}
            <Grid container spacing={1}>

<Grid item xs={12} md={6} lg={1}> 
<Paper className={classes.paper}>xs=12</Paper>
</Grid>




{/* <Grid container spacing={0}> */}

<Grid item xs={3} >
<Paper className={classes.paperTwo} >xs=3</Paper>
 </Grid>

<Grid item   xs={3} > 
<Paper className={classes.paperThree}  >xs=3</Paper>
</Grid>

{/* </Grid> */}


<Grid item xs={6}> 
<Paper>xs=6</Paper>
</Grid>

<Grid item xs={3}> 
<Paper>xs=3</Paper>
</Grid>

<Grid item xs={3}> 
<Paper>xs=3</Paper>
</Grid>

<Grid item xs={3}> 
<Paper>xs=3</Paper>
</Grid>

<Grid item xs={3}> 
<Paper>xs=3</Paper>
</Grid>

            </Grid>
            </div>
        )
    }
}


export default connect(null,null)(withStyles(styles)(gridExample));


