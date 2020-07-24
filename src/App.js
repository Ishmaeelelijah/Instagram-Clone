import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post'
import {db,auth} from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn , setOpenSignIn] = useState(false)
  const [email, setEmail] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  

// useEffect 

useEffect(() => {
 const unsubscribe = auth.onAuthStateChanged((authUser) =>{
    if (authUser) {
      // user hass logged in...
      console.log(authUser)
      setUser(authUser)

    } else {
      // user loggd out
      setUser(null);
      
    }
  }) 

  return () => {
    // perform some cleanup actions
    unsubscribe();
  }
   
},[user,username])


useEffect(() => {
  // Code goes here
  db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    // everytime time a post is added,this code fires off
    setPost(snapshot.docs.map(doc => ({ id: doc.id,
      post: doc.data()
    })));
  })
}, [])
// Sign up
const signUp = (event) => {
  event.preventDefault();

  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser) => {
    return authUser.user.updateProfile({
      displayName: username
    })
  })
  .catch((error) => alert(error.message))
  setOpen(false);
}

// Sign In
const signIn = (event) => {
  event.preventDefault();

  auth
  .signInWithEmailAndPassword(email,password)
  .catch((error) => alert(error.message))

  setOpenSignIn(false);
}


  return (
    <div className="App">

     

     

       <Modal
        open={open}
        onClose={() => setOpen(false)}
       
      >
      <div style={modalStyle} className={classes.paper}>
        <center>
        <h1 className="logo">Instagram</h1>
        </center>

{/* sign up modal */}
      <form className="app__signup">
      <Input 
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUserName((e.target.value))} />
       
        <Input 
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail((e.target.value))} />
       
        <Input placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword((e.target.value))} />
        <Button type="submit" onClick={signUp}>Sign Up</Button>
        </form> 
  
    </div>
      </Modal>

      {/* Sign In Modal */}

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
       
      >
      <div style={modalStyle} className={classes.paper}>
        <center>
        <h1 className="logo">Instagram</h1>
        </center>

{/* sign up modal */}
      <form className="app__signup">
      
        <Input 
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail((e.target.value))} />
       
        <Input placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword((e.target.value))} />
        <Button type="submit" onClick={signIn}>Sign In</Button>
        </form> 
  
    </div>
      </Modal>
    


      {/* Header */}
      <div className="app__header">
        <h2 className="logo">Instagram</h2>
     
      { user ? (
         <Button onClick={() => auth.signOut()}>Log Out</Button>
         
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
        
      )}
       </div>
      

      <h1>Come home to me </h1>
 
    {
      post.map(({ id,post}) =>(
        <Post key={id} username={post.username} caption={post.caption} imageURL={post.imageURL} />
      ))
    }

{user?.displayName ? (
         <ImageUpload  username={user.displayName}/>
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}

      
    </div>
  );
}

export default App;
