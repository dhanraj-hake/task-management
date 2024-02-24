import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import "./DashBoard.css"
import Task from './Task';
import CreateTask from './CreateTask';
import { fetchInitialTask } from '../store/reducers/taskReducer';
import { setCurrentUser } from '../store/reducers/authReducer';

const DashBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const tasks = useSelector(state => state.task.tasks);

  useEffect(() => {

    const fetchTasks = async () => {
      const response = await fetch("http://127.0.0.1:8000/task/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "token": user.token
        },
      });
      const result = await response.json();
      if (response.ok) {
        dispatch(fetchInitialTask(result));
      }
    }

    fetchTasks();

  }, []);

  const handalLogout = () => {
    dispatch(setCurrentUser(null));
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <span className="navbar-brand">Task Dashboard </span>
        <div>
          <span className="username">{user.name}</span>
          <button className="logout-btn" onClick={handalLogout}>Logout</button>
        </div>
      </nav>
      <CreateTask />
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default DashBoard
