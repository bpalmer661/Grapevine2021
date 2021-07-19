
//npm i busboy
//npm i react
//npm i react-redux


const { uuid } = require("uuidv4");


const functions = require('firebase-functions');


const app = require('express')();

const cors = require('cors');
app.use(cors());

const { signup, login, uploadImage,addUserDetails, getOurJobPosts,getUserDetails, markNotificationsAsRead,getAuthenticatedUsersDetails,addImageToProfile, getAccounts, reportUser} = require('./handlers/users')

//lesson 43 add getSearchFilteredJobPosts////
const { getRealtimeMessages, getJobPost, uploadJobPostImage,
   getAllJobPosts,createJobPost,getJobPostAndReplys, replyToJobPost,
  deleteJobPost,deleteJobPostReply,getAllJobPostsReplys
  ,getSearchFilteredJobPosts,sendMessage,
  addImageToJobPost,deleteConversation,reportJobPost} = require('./handlers/jobPosts')


const { fbAuth } = require('./util/fbAuth');





const { db } = require('./util/admin')


//Job Routes
app.get('/JobPosts',getAllJobPosts );
app.post('/createJobPost',fbAuth,createJobPost);


app.get('/JobPost/:state/:category/:jobPostId',getJobPostAndReplys)
app.post('/JobPost/:jobPostId',fbAuth,replyToJobPost )
app.post('/Message/:jobPostId',fbAuth,sendMessage )
// app.get('/getRealtimeMessages/:currentUser/:conversationId',getRealtimeMessages)


app.delete('/JobPost/:jobPostId',fbAuth,deleteJobPost)
app.delete('/deleteJobPostReply/:jobPostReplyId',fbAuth,deleteJobPostReply)
app.get('/JobPostReplys/:jobPostId',fbAuth,getAllJobPostsReplys)



app.delete('/conversation/:conversationId',fbAuth,deleteConversation)



app.get('/FilteredJobPosts/:region/:category',getSearchFilteredJobPosts );


app.get('/getAccounts/:region/:category',getAccounts );



//user routes 
app.post('/signup', signup);
app.post('/login',login);
app.post('/user/image',fbAuth, uploadImage)
app.post('/user/uploadJobPostImage',fbAuth, uploadJobPostImage)
app.post('/user/addImageToJobPost/:state/:category/:jobId',fbAuth, addImageToJobPost)
app.post('/user/addImageToProfile',fbAuth, addImageToProfile)



app.post('/user',fbAuth,addUserDetails)
app.get('/getOurJobPosts',fbAuth,getOurJobPosts)
app.get('/user',fbAuth,getAuthenticatedUsersDetails)
app.get('/user/:username',getUserDetails)

app.post('/notifications',fbAuth,markNotificationsAsRead)



app.post('/reportJobPost',fbAuth,reportJobPost)

app.post('/reportUser',fbAuth,reportUser)







  exports.api = functions.region('australia-southeast1').https.onRequest(app);





  // exports.createNotificationOnJobPostReply = functions
  // .region('australia-southeast1')
  // .firestore.document('jobReplys/{id}')
  // .onCreate((snapshot) => {
  //   console.log("this is snapshot.data(): " + JSON.stringify(snapshot.data()))

  //   return db.collection("JobPosts").doc(`${snapshot.data().jobPostId}`)
  //     .get()
  //     .then((doc) => {

  //       console.log("xxx this is doc.data(): " + JSON.stringify(doc.data()))
  //       console.log("sender and reciever =" + doc.data().username + "" + snapshot.data().username)
  //       if (
  //         doc.exists &&
  //         doc.data().username !== snapshot.data().username
  //       ) {
         
  //         return db.collection("notifications").doc(`${snapshot.id}`).set({
  //           createdAt: new Date().toISOString(),
  //           recipient: doc.data().username,
  //           sender: snapshot.data().username,
  //           read: false,
  //           jobPostId: doc.id
  //         });
  //       } else {
  //         console.log("document does not exists or sender and receiver are the same")
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // });




  exports.deleteJobReplyNotificationOnJobReplyDelete = functions
  .region('australia-southeast1')
  .firestore.document('jobReplys/{id}')
  .onDelete((snapshot) => {

    return db.collection("notifications").doc(`${snapshot.id}`).delete().
    then(() => {
return;
    })
    .catch((err) => {
      console.error(err);
      return;
    });
  });







exports.onUserImageChange = functions
  .region('australia-southeast1')
  .firestore.document('/users/{userId}')
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());
    if (change.before.data().userImageUrl !== change.after.data().userImageUrl) {
      console.log('image has changed');
      const batch = db.batch();
      return db
        .collection('JobPosts')
        .where('username', '==', change.before.data().username)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const JobPosts = db.doc(`/JobPosts/${doc.id}`);
            batch.update(JobPosts, { userImageUrl: change.after.data().userImageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });





exports.onJobPostDelete = functions
.region('australia-southeast1')
  .firestore.document('/JobPosts/{JobPostId}')
  .onDelete((snapshot, context) => {
    const JobPostId = context.params.JobPostId;
    const batch = db.batch();

    return db
      .collection('jobReplys')
      .where('jobPostId', '==', JobPostId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.collection("jobReplys").doc(`${doc.id}`));
        });


        return db
          .collection('notifications')
          .where('jobPostId', '==', JobPostId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.collection("notifications").doc(`${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });












  exports.createNotificationOnJobPostInArea = functions
  .region('australia-southeast1')
   .firestore.document('JobPosts/{state}/{category}/{id}') 
  .onCreate((snapshot) => {

    return db.collection(`${snapshot.data().state}`).where(`${snapshot.data().category}`, '==', true)
      .get()
        .then((data) => {
          data.forEach((doc) => {


        if (
          doc.exists &&
          doc.data().username !== snapshot.data().username
        ) { 

          return db.collection("users").doc(`${doc.data().username}`).collection("notifications").doc(`${snapshot.id}`).set({
          //return db.collection("notifications").doc(`${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().username,
            sender: snapshot.data().username,
            read: false,
            jobPostId: doc.id,
            type: "New Job",
            ...snapshot.data(),
          });
        } else {
          console.log("document does not exists or sender and receiver are the same")
        }
      })
      .catch((err) => console.error(err));
  })
});






















// onWrite(), which triggers when data is created, updated, or deleted in Realtime Database.
// onCreate(), which triggers when new data is created in Realtime Database.
// onUpdate(), which triggers when data is updated in Realtime Database .
// onDelete(), which triggers when data is deleted from Realtime Database .


exports.createNotificationOnJobPostReply = functions
.region('australia-southeast1')
 .firestore.document('users/{username}/conversations/{conversationId}/messages/{messageId}') 
.onCreate((snapshot,context) => {

  //sender jim
  //reciever jimmy


  console.log('createNotificationOnJobPostReply called this is snapshot.data().username  :', snapshot.data().receiverId + " and this is context.params.username " +  context.params.username );
  
  //sender doc
  //return db.collection("users").doc(jim).collection("conversations").doc(context.params.conversationId).collection("messages").doc(context.params.messageId)

   //reciever doc
  //return db.collection("users").doc(jimmy).collection("conversations").doc(context.params.conversationId).collection("messages").doc(context.params.messageId)

if (context.params.username === snapshot.data().receiverId){

  console.log("this is snapshot.data().receiverId : " + snapshot.data().receiverId)

  console.log("this is context.params.username : " + context.params.username)
  
          return db.collection("users")
          .doc(context.params.username)
          .collection("notifications").add({
    
          createdAt: new Date().toISOString(),
          read: false,
          type: "New Message",
          ...snapshot.data(),
          
        });
      } else {
        console.log("else called in createNotificationOnJobPostReply  context.params.username === snapshot.data().receiverId was not true ")
      }

})

