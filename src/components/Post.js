import React from 'react'

const post = {
    "id": 1,
    "description": "Me playing squash a few years ago",
    "likes": 20,
    "author": null,
    "published_at": "2021-01-26T22:17:28.642Z",
    "created_at": "2021-01-26T22:17:22.117Z",
    "updated_at": "2021-01-26T22:17:28.672Z",
    "image": {
        "url": "/uploads/sample_f33df657b7.jpg",
    }
}

const API_URL = 'http://localhost:1337'

const formatImageUrl = (url) => `${API_URL}${url}`

const Post = ({likes, description, url}) => {

    return (
        <div>
            <div className="Post">
                <img className="Post__Image" src={formatImageUrl(url)} />
                <h4>{description}</h4>
                <div>
                   <span>Likes: {likes}</span> 
                </div>
            </div>
        </div>
    )
}

export default Post
