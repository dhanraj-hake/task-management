import React from 'react';
import './Task.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskAction } from '../store/reducers/taskReducer';

const Task = ({ task }) => {
    const user = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();

    const deleteTask = async () => {

        const response = await fetch("http://127.0.0.1:8000/task/" + task._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "token": user.token
            },
        });

        const result = await response.json();

        if(response.ok){
            dispatch(deleteTaskAction(task._id));
        }


    }
    return (
        <div className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <button className="delete-btn" onClick={deleteTask}>Delete</button>
        </div>
    );
}

export default Task;
