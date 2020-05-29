import React, { useContext } from 'react';
import './taskItem.scss';
import { updateTaskStatusToDone } from '../../services/task.service';
import { TaskContext } from '../../contexts/taskContext';

function TaskItem({ task }) {
  const { tasks, setTasks } = useContext(TaskContext);

  const updateStatus = async (id) => {
    const data = await updateTaskStatusToDone(id);
    const index = tasks.findIndex(task => task.id === id);
    console.log(index)
    const clonedTasks = [...tasks];
    setTasks([
      ...clonedTasks.slice(0, index),
      data,
      ...clonedTasks.slice(index + 1, clonedTasks.length),
    ])
  }

  return (
    <div className={`taskItem taskItem--${task.status} mb-3 p-2`}>
      <div className='taskItem__title'>{task.title}</div>
      <div className='taskItem__description'>{task.description}</div>
      {
        task.status === 'OPEN' && <button onClick={() => { updateStatus(task.id) }} className='mt-3 btn btn-secondary'>{task.status}</button>
      }
      {
        task.status === 'DONE' && <div className='mt-3'>{task.status}</div>
      }
    </div>
  )
}

export default TaskItem;