import { createSlice } from '@reduxjs/toolkit';


const taskSlice = createSlice({
  name: 'tasks',
  initialState:  {
    tasks: [],
  },
  reducers: {
    fetchInitialTask(state, action){
        state.tasks = action.payload
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    deleteTaskAction(state, action) {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task._id !== taskId);
    },
  },
});

// Export actions and reducer
export const { addTask, updateTask, deleteTaskAction, fetchInitialTask } = taskSlice.actions;
export default taskSlice.reducer;
