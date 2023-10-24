import React, { useState } from 'react';
import './App.css';
// @ts-ignore
import TaskComponent from './components/Task';

interface Task {
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj: Task = { text: newTask, completed: false };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  }

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  const handleToggleTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  }); // <-- Closing parenthesis added here

  return (
    <div className="task-container">
      <h1>Task Management App</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('active')}>Active</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <TaskComponent
              task={task}
              onDelete={() => handleDeleteTask(index)}
              onToggle={() => handleToggleTask(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
