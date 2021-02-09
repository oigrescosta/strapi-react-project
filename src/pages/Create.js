import React, {useState, useContext} from 'react'
import {UserContext} from '../context/UserContext'

const Create = () => {

    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    console.log(file)

    const {user} = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('Please log in first')
            return
        }

        if(!description) {
            setError('Please add a descripiton')
            return
        }

        if(!file) {
            setError('Please add a file')
            return
        }

        const formData = new FormData()
        formData.append('data', JSON.stringify({description}))
        formData.append('files.image', file)
        
        try {
            const response = await fetch('http://localhost:1337/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: formData
            }) 

            const data = await response.json()

            console.log("data", data)
            
        } catch (err) {
            console.log("Exception", err)
            setError(err)
        }
    }
    
    return (
        <div className="Create">
            <h2>Create</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Description" 
                    value={description}
                    onChange={(e) => {
                        setError('')
                        setDescription(e.target.value)
                    }}
                />
                <input  
                    type="file"
                    placeholder="Add a image"
                    onChange={(e) => {
                        setError('')
                        setFile(e.target.files[0])
                    }}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Create
