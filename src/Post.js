import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({username, caption,imageURL}) {
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
        </div>
    )
}

export default Post
