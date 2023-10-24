import React from 'react';

interface Task {
  text: string;
  completed: boolean;
}

interface TaskProps {
  task: Task;
  onDelete: () => void;
  onToggle: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onToggle }) => {
  return (
    <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      <span>{task.text}</span>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onToggle}>{task.completed ? 'Uncomplete' : 'Complete'}</button>
    </div>
  );
};

export default Task;
