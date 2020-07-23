import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post'
import {db} from './firebase'


function App() {

  const [post, setPost] = useState([]);

// useEffect

useEffect(() => {
  // Code goes here
  db.collection('posts').onSnapshot(snapshot => {
    // everytime time a post is added,this code fires off
    setPost(snapshot.docs.map(doc => ({ id: doc.id,
      post: doc.data()
    })));
  })
}, [])


  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <h2 className="logo">Instagram</h2>
      </div>
      <h1>Come home to me </h1>

    {
      post.map(({ id,post}) =>(
        <Post key={id} username={post.username} caption={post.caption} imageURL={post.imageURL} />
      ))
    }

      {/* Post */}
      
     
      
      {/* Post */}
    </div>
  );
}

export default App;
