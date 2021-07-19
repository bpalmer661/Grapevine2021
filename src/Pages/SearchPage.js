// //All Lesson 40

// import React, { Component } from 'react'
//  import Grid from '@material-ui/core/Grid'

 
//  import JobPost from '../Components/Job Posts/JobPost'

// import { connect } from 'react-redux';
// import { getAllJobPosts } from '../redux/actions/dataActions';
// import PropTypes from 'prop-types';
// import withStyles from '@material-ui/core/styles/withStyles';




// const styles = {
   
//     ['@media (max-width:5500px)']:{
//     searchBarInput:{
//       width: "100%",
//      backgroundColor: 'red',
//      marginLeft: "auto",
//     marginRight: "auto",
//     },
    
//     },

//     //screens smaller than 780px
//     ['@media (max-width:780px)']:{
//         searchBarInput:{
//             width: "100%",
//             backgroundColor: 'blue',
//            },
//            JobPostGrid:{
//             margin:30,
//                },
//     },
//      //screens smaller than 600px
//      ['@media (max-width:600px)']:{
//         searchBarInput:{
//             minWidth:900,
//             backgroundColor: 'green',
//            },
//            JobPostGrid:{
//             margin:30,
//                },
//     },
// }


// export class SearchPage extends Component {

//     state = {
//         searchText: ""
//     }
    
//     onchange = e => {
//         this.setState({searchText : e.target.value })
//     }
    


// componentDidMount(){
// this.props.getAllJobPosts();
// }

//     render() {

// const { jobPosts, loading } = this.props.data;

// const { classes
// } = this.props



//        let jobPostMarkup = !loading ? (
//      jobPosts.filter((jobPost) => {
// if (this.state.searchText === ""){
//    return jobPost
// } else if (jobPost.username.toLowerCase().includes(this.state.searchText.toLowerCase())){
// return jobPost
// }
//      })
//      .map((jobPost) => 
//      <JobPost key={jobPost.jobId} jobPost={jobPost}  />
    
//      )

//     ) : ( 
  
// <p> loading </p>

    
//     )
//         return (

// <div>





    
//     <Grid container >
//             </Grid>
//             <Grid container spacing={10}>
//                 <Grid className={classes.JobPostGrid} item sm={12} xs={12}>
//                 <input className={classes.searchBarInput} placeholder="Search Bar Placeholder" label="Search User" icon="search" type="text" onChange={this.onchange}/>
//                 </Grid>
//             </Grid>
        

//     <p>Jobs Near Me</p>

//     <Grid container >
//             </Grid>
//             <Grid container spacing={10}>
//                 <Grid className={classes.JobPostGrid} item sm={12} xs={12}>
// {jobPostMarkup}
//                 </Grid>
//             </Grid>

//             </div>
//         )
//     }
// }


// SearchPage.propTypes = {
//     getAllJobPosts: PropTypes.func.isRequired,
//     data: PropTypes.object.isRequired,
// }

// //takes in global state
// const mapStateToProps = (state) => ({
//     data: state.data,
// })

// const mapActionsToProps = {
//     getAllJobPosts
// }


// export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(SearchPage));


