import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { Modal, Button } from "react-bootstrap";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showOptionsForTask, setShowOptionsForTask] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTask = (taskData) => {
    const newTask = { ...taskData, id: Date.now() };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setShowForm(false);
  };

  const editTask = (taskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskData.id ? taskData : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setShowForm(false);
  };

  const handleDeleteConfirmation = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteDialog(true);
  };

  const confirmDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setShowDeleteDialog(false);
  };

  const handleNewTask = () => {
    setTaskToEdit(null);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = tasks.filter(
      (task) =>
        task.assignedTo.toLowerCase().includes(value.toLowerCase()) ||
        task.status.toLowerCase().includes(value.toLowerCase()) ||
        task.priority.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTasks(filtered);
    setCurrentPage(1);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (
      direction === "next" &&
      currentPage < Math.ceil(filteredTasks.length / tasksPerPage)
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      className="container mt-4 border"
      style={{ backgroundColor: "#f8f9fa", height: "500px" }} // Set container height
    >
      <div className="d-flex justify-content-between align-items-center mb-3 p-2">
        <div className="d-flex align-items-center">
          <div className="border border-danger bg-danger text-white p-2 rounded me-2">
            <i className="bi bi-list-task fs-4"></i>
          </div>
          <div>
            <h2 className="h5 mb-1">Tasks</h2>
            <h2 className="h5 mb-1">All Tasks</h2>
          </div>
        </div>
        <div className="d-flex">
          <button className="btn btn-warning me-2" onClick={handleNewTask}>
            New Task
          </button>
          <button className="btn btn-warning">Refresh</button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <small className="text-black">{filteredTasks.length} records</small>
        </div>
        <div className="col-md-3 d-flex justify-content-end">
          <div className="input-group mb-0">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-secondary btn-sm" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <TaskForm
          onClose={closeForm}
          addTask={addTask}
          editTask={editTask}
          taskToEdit={taskToEdit}
        />
      )}

      <table className="table table-hover mt-3">
        <thead className="table-light">
          <tr>
            <th>
              {" "}
              <input type="checkbox" />
            </th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th></th>
          </tr>
        </thead>
        <tbody
          style={{
            backgroundColor: "#f8f9fa",
            height: "200px",
            overflow: "hidden",
          }}
        >
          {currentTasks.map((task) => (
            <tr key={task.id} style={{ height: "50px" }}>
              {" "}
              {/* Each row has a height of 50px */}
              <td>
                <input type="checkbox" />
              </td>{" "}
              {/* Checkbox for task selection */}
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-outline-dark dropdown-toggle"
                    type="button"
                    onClick={() =>
                      setShowOptionsForTask(
                        showOptionsForTask === task.id ? null : task.id
                      )
                    }
                  ></button>
                  {showOptionsForTask === task.id && (
                    <div className="dropdown-menu show">
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setTaskToEdit(task);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => handleDeleteConfirmation(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <label className="me-2">{`${indexOfFirstTask + 1}-${Math.min(
            indexOfLastTask,
            filteredTasks.length
          )} of ${filteredTasks.length}`}</label>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handlePageChange("prev")}
            >
              <i className="bi bi-chevron-up"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handlePageChange("next")}
            >
              <i className="bi bi-chevron-down"></i>
            </button>
          </div>
        </div>
        <nav>
          <ul className="pagination mb-0">
            <li className="page-item">
              <button className="page-link" onClick={() => setCurrentPage(1)}>
                &laquo; First
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange("prev")}
              >
                &lt; Prev
              </button>
            </li>
            <li className="page-item active">
              <button className="page-link">{currentPage}</button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange("next")}
              >
                Next &gt;
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage(Math.ceil(filteredTasks.length / tasksPerPage))
                }
              >
                Last &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="modal-container">
        {showDeleteDialog && (
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-2"
            aria-label="Close"
            onClick={() => setShowDeleteDialog(false)}
            style={{
              zIndex: 1055,
            }}
          ></button>
        )}

        <Modal
          show={showDeleteDialog}
          onHide={() => setShowDeleteDialog(false)}
        >
          <Modal.Header className="bg-danger d-flex justify-content-center align-items-center">
            <Modal.Title className="text-white mb-0">Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to delete this task?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteDialog(false)}
            >
              No
            </Button>
            <Button variant="warning" onClick={confirmDeleteTask}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default TaskList;
