import React from 'react';
import './taskItem.scss';

function TaskItem({ task }) {
  return (
    <div className={`taskItem taskItem--${task.status} mb-3 p-2`}>
      <div className='taskItem__title'>{task.title}</div>
      <div className='taskItem__description'>{task.description}</div>
      <div className='mt-3'>{task.status}</div>
    </div>
  )
}

export default TaskItem;