import React, { useState, useEffect } from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase';
import firebase from 'firebase'


function Post({user,  postId , username, caption,imageURL}) {
    const [ comments, setCommments] = useState([]);
    const [ comment, setCommment] = useState("");


        useEffect(() => {
            let unsubscribe;
            if (postId) {
                unsubscribe = db
                .collection("posts")
                .doc(postId) // this is the problem its not fetching the post id  look here 
                // .orderBy('timestamp','desc') but then when i add the timestamp it stops working 
                .collection("comments")
                .onSnapshot((snapshot) => {
                    setCommments(snapshot.docs.map((doc) => doc.data()));
                });
            }
        
            return () => {
                unsubscribe();
            }
        }, [postId])

      const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setCommment('');
      }




    return (
        <div className="post">
            {/* header -> avatar + username */}
            <div className="post__header">
            <Avatar className="post__avatar" alt="Elie" src="/static/images/avatar/1.jpg"/>
            <h3>{username}</h3>
            </div>
            
            {/* image */}
            <img className="post__image" src={imageURL} alt="cat" />

            {/* username + caption */}
            <h4 className="post__text"><strong>{username}:</strong>{caption}</h4>

            <div className="posts__commets">
                {comments.map((comment)=> (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>
                    {user && (
                        <form className="post__commentBox">
                        <input
                        className="post__input"
                        placeholder="Add a comment"
                        type="text"
                        value={comment}
                        onChange={(e) => setCommment(e.target.value)}
                        />
                        <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                        >
                            Post 
                        </button>
                    </form>
                    )}
          
        </div>
        
    )
}

export default Post
