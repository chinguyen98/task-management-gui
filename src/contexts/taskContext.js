import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

function TaskContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const contextValue = {
    tasks,
    setTasks
  }

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContextProvider;