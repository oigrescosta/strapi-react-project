import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import './App.css';
import Post from './components/Post'

const mockPosts = [
  {
    likes: 20, 
    description: "This is a post",
    image: {
      url: "/uploads/sample_f33df657b7.jpg"
    }
  },
  {
    likes: 33, 
    description: "The second post",
    image: {
      url: "/uploads/sample_f33df657b7.jpg"
    }
  }
]

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:1337/posts')
      const data = await response.json()
      setPosts(data)
    }

    getPosts()
  }, [])

  return (
    <div className="App">
      {posts.map(post => (
        <Post 
          likes={post.likes} 
          description={post.description}
          url={post.image && post.image.url}
        />
      ))}
    </div>
  );
}

export default App;
