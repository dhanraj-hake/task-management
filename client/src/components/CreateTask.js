import React, { useState } from 'react';
import './CreateTask.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/reducers/taskReducer';

const CreateTask = ({ onCreate }) => {
    const user = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/task/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "token": user.token
                },
                body: JSON.stringify({ title, description, dueDate })
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result);
                dispatch(addTask(result));
            }
        }
        catch (error) {
            console.log(error.message);
        }


        setTitle('');
        setDescription('');
        setDueDate('');
    };

    return (
        <div className="create-task">
            <h3 className='title-heading'>Create Task</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group flex-row">
                    <div className="flex-item title">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-item">
                        <label>Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                            style={{ width: '100px' }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;
