import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import {storage,db} from './firebase'
import firebase from 'firebase'
import './ImageUpload.css'

function ImageUpload({username}) {
    const [image,setImage] = useState(null);
    // const [url, setUrl] = useState("");
    const [progress, setProgess] = useState(0)
    const [caption, setCaption] = useState("")


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgess(progress)
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            // complete fuction...
            () =>{
                storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageURL: url,
                    username:username
                })

                setProgess(0);
                setCaption("");
                setImage(null);
            })

            }
        )
    }


    return (
        <div className ="imageupload">
            <progress className="imageupload__progress" value={progress} max="100"/>
            <input type="text" placeholder="ENTER A GOOD CAPTION" onChange={ event => setCaption(event.target.value)}  value={caption} />
            <input type="file" onChange={handleChange}  className="input"/>
            <Button clasName="image" onClick={handleUpload}>
                UPLOAD IMAGE
            </Button>



        </div>
    )
}

export default ImageUpload

