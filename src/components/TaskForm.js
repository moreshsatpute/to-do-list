import React, { useState } from 'react';

const TaskForm = ({ onClose, addTask, editTask, taskToEdit }) => {
  // Initial task data, using taskToEdit if available (for edit mode)
  const [taskData, setTaskData] = useState(taskToEdit || {
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      editTask(taskData); // Call editTask if editing an existing task
    } else {
      addTask(taskData); // Call addTask if creating a new task
    }
    onClose(); // Close the form after submission
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title mx-auto">{taskToEdit ? 'Edit Task' : 'New Task'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="assignedTo" className="form-label">Assigned To</label>
                  <input
                    type="text"
                    className="form-control"
                    id="assignedTo"
                    name="assignedTo"
                    value={taskData.assignedTo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={taskData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Complete">Complete</option>
                    <option value="Progress">In Progress</option>
                    <option value="Not Started">Not Started</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="dueDate" className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="priority" className="form-label">Priority</label>
                  <select
                    className="form-select"
                    id="priority"
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="comments" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="comments"
                  name="comments"
                  value={taskData.comments}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
