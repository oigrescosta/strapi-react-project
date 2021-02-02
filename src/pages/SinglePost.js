import React, {useState, useEffect} from 'react'
import Post from '../components/Post'

const SinglePost = ({match}) => {
    const {id} = match.params
    console.log("id", id)

    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:1337/posts/${id}`)
            const data = await response.json()
            console.log("data", data)
            setPost(data)
            setLoading(false)
        }
        fetchPost()
    }, [])

    return (
        <div className="Post">
            {loading && <p>Loading...</p>}

            {!loading &&   
                <>    
                    {post.id && 
                        <Post 
                            description={post.description}
                            url={post.image && post.image.url}
                            likes={post.likes} 
                        />
                    }  

                    {!post.id && <p>404 - Page not found</p>}      
                </>
            }
        </div>
    )
}

export default SinglePost
