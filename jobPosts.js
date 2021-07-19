

const { db, admin } = require('../util/admin')


const { uuid } = require('uuidv4');



const config = require('../util/config');
const firebase = require('firebase');




//lesson 43/////////////
//change folder to db.collection('JobPosts').doc("Queensland").collection("electrical").orderBy('createdAt','desc').get()
exports.getAllJobPosts = (req, res) => {
  db.collection('JobPosts').doc("Queensland").collection("electrical").orderBy('createdAt','desc').get()
    .then(data => {
        let jobPosts = [];
        data.forEach(doc => {
            jobPosts.push({
                jobId: doc.id,
                ...doc.data()
            });
        });
    return res.json(jobPosts);
    })
    .catch(err => console.error(err));
    }



    //lesson 43/////////////
exports.getSearchFilteredJobPosts = (req, res) => {


  db.collection('JobPosts').doc(`${req.params.region}`).collection(`${req.params.category}`).orderBy('createdAt','desc').get()
    .then(data => {
        let jobPosts = [];
        data.forEach(doc => {
            jobPosts.push({
                jobId: doc.id,
                ...doc.data()
            });
        });
    return res.json(jobPosts);
    })
    .catch(err => console.error(err));
    }

    const jobPostDefaultImage = "hammer.jpg"  

    exports.createJobPost  = (req, res) => {


const errors = {};
let valid = Boolean;

        if (req.body.jobDescription.trim() === '') {
            errors.jobDescription = 'Job Description must not be empty';
          }

          if (req.body.jobTitle.trim() === '') {
            errors.jobTitle = 'Job Title must not be empty';
            //return res.status(400).json({ jobTitle: 'Job Description must not be empty' });
          }

          ////lesson 42///////////
          if (req.body.jobAddress.trim() === '') {
            errors.jobAddress = 'Job Address must not be empty';
          }
      

 ////lesson 42///////////

          valid = Object.keys(errors).length === 0 ? true : false

          if(!valid){ 
              return res.status(400).json(errors)
          }

         

        const newJob = {
            jobAddress: req.body.jobAddress,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            jobPostDefaultImage: req.body.jobPostDefaultImage,
            jobDescription: req.body.jobDescription,
            jobTitle: req.body.jobTitle,
             createdAt: req.body.createdAt,
            username: req.user.username,
            userImageUrl: "",
            jobPostOwnersUsername: req.body.jobPostOwnersUsername,
            expired:"false",
        };

        
db.collection('users').doc(newJob.username).get()
.then(doc => {
    if(!doc.exists){
        //404 NOT FOUND
        return res.status(404).json({error: 'user Not Found'})
        console.log("User Not Found ")
    } 
    user = doc.data();
     
    newJob.userImageUrl = user.userImageUrl        
    
 })
 .then(() => {

        db.collection('JobPosts').add(newJob)
        .then(docRef => {
            const job = newJob
            job.jobId = docRef.id
              
            res.json(job);
        //res.json({message: `document ${docRef.id} created succesfully`})
        console.log("Job Post document created successfully ")
        })
        .catch(err => {
           return res.status(500).json({error: err.code});
      
        })
    })
            }

     

           exports.getJobPostAndReplys = (req, res) => {
      
              let jobData = {};

              db.collection("JobPosts").doc(`${req.params.state}`).collection(`${req.params.category}`).doc(`${req.params.jobPostId}`).get()

              .then(doc => {
           if(!doc.exists){
               return res.status(404).json({error: 'Job Post Not Found'})
           } 
           
           jobData = doc.data();
           jobData.jobPostId = doc.id;           
        
            return res.json(jobData);
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({error: err.code});
              })
           }



           

           exports.replyToJobPost  = (req, res) => {
            
            const jobReply = {

                email: req.body.email,
                number: req.body.number,
                replyText: req.body.replyText,
                jobPostId: req.params.jobPostId,
                createdAt: new Date().toISOString(),
                username: req.user.username,      
                userImage: req.body.userImage,
                senderId:req.body.senderId,
                  receiverId: req.body.receiverId,
            };
            
            db.collection('jobReplys').add(jobReply)
        .then(docRef => {
        res.json({message: `document ${docRef.id} created succesfully`})
        })
        .catch(err => {
            //500 server error
            res.status(500).json({error: 'something went wrong'})
            console.error(err)
        })
            }






///// this sendMessage function is yet to be made
            exports.sendMessage  = (req, res) => {

              console.log(`sendId is: ${req.body.senderId}   JobPostId is: ${req.body.jobPostId}  receiverId is:  ${req.body.receiverId}`)
            
              const jobReply = {
                  email: req.body.email, number: req.body.number,replyText: req.body.replyText,jobPostId: req.body.jobPostId, createdAt: new Date().toISOString(), username: req.user.username, userImage: req.body.userImage,
                  senderId:req.body.senderId,receiverId: req.body.receiverId,read: false,
                  mainImage: req.body.mainImage, jobTitle:req.body.jobTitle, jobPostOwnersUsername: req.body.jobPostOwnersUsername,
              };

       
        db.collection('users').doc(req.body.receiverId).collection("conversations").doc(`${req.body.senderId}${req.body.jobPostId}`).collection("messages").add(jobReply)
        .then(docRef => {

          db.collection('users').doc(req.body.senderId).collection("conversations").doc(`${req.body.receiverId}${req.body.jobPostId}`).collection("messages").doc(docRef.id).set(jobReply)
          .then(() => {

            db.collection('users').doc(req.body.receiverId).collection("conversations").doc(`${req.body.senderId}${req.body.jobPostId}`).set(jobReply).then(() => {

              db.collection('users').doc(req.body.senderId).collection("conversations").doc(`${req.body.receiverId}${req.body.jobPostId}`).set(jobReply).then(() => {
                res.json({message: ` Message Sent Successfully`}) ;
              })
          })
        })
        })
        .catch(err => {
            //500 server error
            res.status(500).json({error: 'something went wrong'})
            console.error(err)
        })
          }
            











          









            exports.deleteJobPost = (req,res) => {
               
              const document = db.collection("users").doc(req.user.username).collection("MyJobPosts").doc(req.params.jobPostId)
          
              document.get().then(doc => {
          
                  if(!doc.exists){
                      return res.status(404).json({error: "Job Post Not Found"})
                  }
          
          
                  if(doc.data().username !== req.user.username){
                      //403 Forbidden
                      return res.status(403).json({error: "unauthorised"})
                  } else {
                       
                       const state = doc.data().state
                       const  category = doc.data().category
          
                       const secondDocument = db.collection("JobPosts").doc(state).collection(category).doc(req.params.jobPostId);

                       document.delete().then(() => {
                   
                           secondDocument.delete().then(() => {
                               res.json({message: `Job Post Deleted Successfully`}) ;
                           });
                       })
                     
                  }
              })
          }





            

    




           exports.deleteJobPostReply = (req,res) => {
               
            const document = db.doc(`/jobReplys/${req.params.jobPostReplyId}`);

            document.get()
            .then(doc => {
                if(!doc.exists){
                return res.status(404).json({error: "Job Post Reply Not Found"})
            }
            if(doc.data().username !== req.user.username){
                //403 Forbidden
                return res.status(403).json({error: "unauthorised"})
            } else {
                return document.delete();
            }
        })
        .then(() => {
            res.json({message: `Job Post Deleted Successfully`})
        })
           }









     exports.getAllJobPostsReplys = (req,res) => {
               

     db.collection("jobReplys").where("jobPostId" , '==' ,req.params.jobPostId).get()
     .then(data => {
               
        let jobPostReplys = [];
          data.forEach(doc => {
            jobPostReplys.push({
              jobReplyId: doc.id,
              ...doc.data()
                 });
                 });
        return res.json(jobPostReplys);
        })
        .catch(err => console.error(err));
                    }

                    
  exports.uploadJobPostImage = (req, res) => {
    const BusBoy = require("busboy");
    const path = require("path");
    const os = require("os");
    const fs = require("fs");
  
    const busboy = new BusBoy({ headers: req.headers });
  
    let imageToBeUploaded = {};
    let imageFileName;
    let generatedToken = uuid(); 
    
  
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log(fieldname, file, filename, encoding, mimetype);
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        return res.status(400).json({ error: "Wrong file type submitted" });
      }

      // my.image.png => ['my', 'image', 'png']
      const imageExtension = filename.split(".")[filename.split(".").length - 1];
      // 32756238461724837.png
      imageFileName = `${Math.round(
        Math.random() * 1000000000000
      ).toString()}.${imageExtension}`;
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
      admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
              //Generate token to be appended to imageUrl
              /////////lesson 26////////////
              firebaseStorageDownloadTokens: generatedToken,
               /////////lesson 26////////////
            },
          },
        })
        .then(() => {
           /////////lesson 26///////// // Append token to url and insure updated value matches your data base value///
          const userImageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
          return db.doc(`/users/${req.user.username}`).update({ userImageUrl });
        })
        
        .then(() => {
          return res.json({ message: "image uploaded successfully" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: "something went wrong" });
        });
    });
    busboy.end(req.rawBody);
  };



  


   
  


  exports.addImageToJobPost = (req, res) => {

    let state = req.params.state
    let category = req.params.category
    let jobId = req.params.jobId
  
  
    console.log("this is req.params.jobId: " + req.params.jobId + "req.params.category: " + req.params.category + "this is req.params.state: " + req.params.state)
  


    const BusBoy = require("busboy");
    const path = require("path");
    const os = require("os");
    const fs = require("fs");
  
    const busboy = new BusBoy({ headers: req.headers });
  
    let imageToBeUploaded = {};
    let imageFileName;
    let generatedToken = uuid(); 


 
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log(fieldname, file, filename, encoding, mimetype);
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        return res.status(400).json({ error: "Wrong file type submitted" });
      }

      // my.image.png => ['my', 'image', 'png']
      const imageExtension = filename.split(".")[filename.split(".").length - 1];
      // 32756238461724837.png
      imageFileName = `${Math.round(
        Math.random() * 1000000000000
      ).toString()}.${imageExtension}`;
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
      admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
              //Generate token to be appended to imageUrl
              /////////lesson 26////////////
              firebaseStorageDownloadTokens: generatedToken,
               /////////lesson 26////////////
            },
          },
        })
        .then(() => {
           ///add to my job post images 
          const userImageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;

          // var ref = db.doc(`/users/${req.user.username}/MyJobPosts/${req.params.jobId}`)
          var ref = db.collection("users").doc(`${req.user.username}`).collection("MyJobPosts").doc(`${req.params.jobId}`)

ref.update({
  images: admin.firestore.FieldValue.arrayUnion(userImageUrl)
});
        })
        .then(() => {

          const userImageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;

          // var ref = db.doc(`/JobPosts/${req.user.username}/MyJobPosts/${req.params.state}/${req.params.category}/${req.params.jobId}`)
          var ref = db.collection("JobPosts").doc(`${req.params.state}`).collection(`${req.params.category}`).doc(`${req.params.jobId}`)

ref.update({
    images: admin.firestore.FieldValue.arrayUnion(userImageUrl)
});
       })
        .then(() => {
          return res.json({ message: "image uploaded successfully" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: "something went wrong" });
        });
    });
    busboy.end(req.rawBody);
  };








exports.deleteConversation = (req,res) => {
console.log("this is req.user.username: " +  req.user.username +  "  this is req.params.conversationId:  "  + req.params.conversationId)
  const document = db.collection("users").doc(req.user.username).collection("conversations").doc(req.params.conversationId).collection("messages")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            db.collection("users").doc(req.user.username).collection("conversations").doc(req.params.conversationId).collection("messages").doc(doc.id).delete()

        });

        db.collection("users").doc(req.user.username).collection("conversations").doc(req.params.conversationId).delete().then(() => {
                           res.json({message: `Job Post Deleted Successfully`}) ;
                       });  
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

 
}




exports.reportJobPost  = (req, res) => {

  console.log(`sendId is: ${req.body.senderId}   JobPostId is: ${req.body.jobPostId}  receiverId is:  ${req.body.receiverId}`)


  const jobReply = {

    reportersUsername: req.body.reportersUsername,
     reportText: req.body.reportText,
     jobPostId: req.body.jobPostId, 
     createdAt: new Date().toISOString(), 
      read: false, jobTitle:req.body.jobTitle,
      jobDescription:req.body.jobDescription,
       jobPostOwnersUsername: req.body.jobPostOwnersUsername, 
       mainImage: req.body.mainImage,
      category: req.body.category,
      state: req.body.state,
  };

db.collection('Reported Job Posts').add(jobReply)
.then(docRef => {
  console.log("Report Job Post Complete")
})

.catch(err => {
//500 server error
res.status(500).json({error: 'something went wrong'})
console.error(err)
})
}

