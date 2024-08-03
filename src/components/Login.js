import React, { useState } from 'react';
import axios from 'axios';
import "../App.css";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://live-chat-be.onrender.com/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            if(response.data.token){
                navigate('/chat');
            }
            // Redirect or show success message
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <div className='login'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
        </div>
    );
};

export default Login;
