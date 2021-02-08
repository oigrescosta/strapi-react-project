import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../context/UserContext'

const Signup = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        if(user) {
            history.push('/')
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:1337/auth/local/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: email, 
                    email,
                    password
                })
            })

            const data = await response.json()

            if(data.message) {
                setError(data.message[0].messages[0].message)

                return
            }

            setUser(data)

            console.log("data", data)
        } catch(err) {
            setError('Something went wrong' + err)
        }
    }

    return (
        <div>
        <h2>Sign up</h2>

        <form  onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign up</button>
        </form>

        {error && <p>{error}</p>}
        </div>
    )
}

export default Signup
