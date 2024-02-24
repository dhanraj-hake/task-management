import React, { useState } from 'react'
import "./Login.css"
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/reducers/authReducer';
import { Link } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [errormsg, setErrormsg] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        setErrormsg("");
        try{    
            console.log(email, password);
            const response = await fetch("http://127.0.0.1:8000/auth/login",{
                method : 'POST',
                headers : {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({ email, password})
            });
            const result = await response.json();
            if(response.ok){
                console.log(result);
                dispatch(setCurrentUser({
                    ...result.user,
                    token : result.token
                }));
            }
            else{
                setErrormsg(result.message);
            }
        }
        catch(error){
            setErrormsg("Error");
        }

    };


    return (
        <div className="container">
            <h2>Task Management</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login </h2>
                <p className='error-msg'>{errormsg}</p>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <Link to="/signup" className='sign-up-link'>Dont have a account  Sign Up</Link>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
