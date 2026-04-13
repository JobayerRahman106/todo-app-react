import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (inputValue.trim() === '') return; // Prevent adding empty tasks
    setTasks([...tasks, inputValue]);
    setInputValue(''); // Clear the input field after adding a task
  };

  const handleEditInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const handleEdit = (item, index) => {
    setIsUpdateMode(true);
    setInputValue(item);
    setCurrentTaskIndex(index);
    // if (currentTaskIndex === null) return; // No task selected for update
  };
  
  const handleUpdate = () => {
    if (inputValue.trim() === '') return; // Prevent updating to an empty task
    let newTasks = [...tasks];
    newTasks[currentTaskIndex] = inputValue;
    setTasks(newTasks);
    setInputValue('');
    setIsUpdateMode(false);
    setCurrentTaskIndex(null);
  };

  // When we update the state, React re-renders the component and updates the UI to reflect the new state.
  //(including arrays and functions) by reference.
  const handleDelete = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
    <div className="header">
      <h1>Todo App</h1>
    </div>
    
  <div className="input-area">
    <div className="input-wrapper">
          <input className="todo-input"
          type="text"
          placeholder="Write your task"
          value={inputValue}
          onChange={handleEditInputValue}
        />
        {
          isUpdateMode
          ? <button className="update-btn" onClick={handleUpdate}>Update</button>
          : <button className="add-btn" onClick={addTask}>Add</button>
        }

    </div>
  </div>
      <ul className="task-list">
        {tasks.map((item, index) => (
          <li key={index}>{item} 
            <button className="edit-btn" onClick={()=>handleEdit(item,index)}>Edit</button> 
            <button className="delete-btn " onClick={()=>handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
