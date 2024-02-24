import React, { useEffect, useState } from 'react'
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errormsg, setErrormsg] = useState('');


    const handleSignUp = async (e) => {
        e.preventDefault();
        setErrormsg("")
        try{    
            console.log(email, password);
            const response = await fetch("http://127.0.0.1:8000/auth/signup",{
                method : 'POST',
                headers : {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({name, email, password})
            });
            const result = await response.json();
            console.log(response.ok)
            if(response.ok){
                console.log(result);
                navigate("/login")
            }
            else{
                setErrormsg(result.message);
            }
        }
        catch(error){
            setErrormsg("Error")
        }
    };


    return (
        <div className="container">
            <h2>Task Management</h2>
            <form className="login-form" onSubmit={handleSignUp}>
                <h2>Sign Up </h2>
                <p className='error-msg'>{errormsg}</p>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input  value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" placeholder="Enter your Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <Link to="/login" className='sign-up-link'>Have a account Login</Link>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp
