// App.js
import React from 'react';
import TaskList from './components/TaskList'; 

const App = () => {
  const tasks = [
    // Sample tasks data
    { id: 1, assignedTo: 'John Doe', status: 'Pending', dueDate: '2024-09-30', priority: 'High', comments: 'First task' },
    { id: 2, assignedTo: 'Jane Smith', status: 'Completed', dueDate: '2024-09-28', priority: 'Medium', comments: 'Second task' },
    // Add more tasks as needed
  ];

  const handleEditTask = (task) => {
    console.log("Edit task:", task);
    // Implement edit logic
  };

  const handleDeleteTask = (taskId) => {
    console.log("Delete task with id:", taskId);
    // Implement delete logic
  };

  return (
    <div className="App">
      <TaskList
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default App;
