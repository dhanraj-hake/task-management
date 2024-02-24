import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { Routes, Route, Navigate } from "react-router-dom";
import { setCurrentUser } from './store/reducers/authReducer';
import DashBoard from './components/DashBoard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);

  
  useEffect(()=>{
    const verifyToken = async()=>{
        const response = await fetch("http://127.0.0.1:8000/auth/verify-token/",{
            method : 'POST',
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                token : user.token
            })
        });
        const result = await response.json();

        if(!response.ok){
          dispatch(setCurrentUser(null));
        }
        else{
          
        }
    }

    if(user){
      verifyToken();
    }

},[]);

  return (

    <div>
      <Routes>

        <Route path='/' element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path='/dashboard' element={user ? <DashBoard /> : <Navigate to="/login" />} />
        <Route path='/login' element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path='/signup' element={user ?<Navigate to="/dashboard" /> : <SignUp />} />

      </Routes>
    </div>

  );
}

export default App;
