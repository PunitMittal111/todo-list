import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { FaSave } from "react-icons/fa";

const Todo = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        AddTask();
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Clean up: Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const AddTask = () => {
    if (value.trim() !== "") {
      const newTask = {
        id: Date.now(),
        todoTask: value,
        completed: false,
      };
      setData([...data, newTask]);
      setValue("");
    }
  };

  const InputChange = (e) => {
    setValue(e.target.value);
  };

  const toggleTask = (id) => {
    const updatedData = data.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setData(updatedData);
  };

  const deleteTask = (id) => {
    const updateTodo = data.filter((task) => task.id !== id);
    setData(updateTodo);
  };

  const handleEdit = (id, todoTask) => {
    setEditingId(id);
    setEditValue(todoTask);
  };

  const saveEdit = (id) => {
    const updatedData = data.map((task) =>
      task.id === id ? { ...task, todoTask: editValue } : task
    );
    setData(updatedData);
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div>
      <div className="text-center bg-gray-800 ">
        <h1 className="text-4xl text-gray-400">Todo list</h1>
        <input
          className="  text-black-400 px-4 py-3 rounded-md my-2 mx-1.5"
          type="text"
          onChange={InputChange}
          placeholder="Name"
          value={value}
        />
        <button
          className="bg-red-600 px-4 py-3 rounded-md hover:bg-red-900"
          onClick={AddTask}
        >
          Add Task
        </button>
      </div>

      <ul className="mt-4">
        {data &&
          data?.map((task, index) => (
            <li
              key={task.id}
              className={`flex bg-gray-400 py-3 rounded-md w-[40%] px-2 m-auto justify-between text-black font-semibold items-center mb-2 transition-opacity duration-300 ${
                task.completed ? "opacity-50" : ""
              }`}
            >
              <div>
                <span>{index + 1}. &nbsp;</span>
                {editingId === task.id ? (
                  <input
                    className="  text-black-400 px-0.1 py-2 rounded-md my-2 mx-1.5"
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  <span>{task.todoTask}</span>
                )}
              </div>
              <div className="flex justify-center items-center gap-3 hover:cursor-pointer ">
                <button
                  className={`border ${
                    task.completed
                      ? "bg-green-500 hover:bg-green-700"
                      : "bg-gray-700 hover:bg-gray-800"
                  } text-white rounded-md border-gray-200 px-2 py-1.5 text-xl active:opacity-40`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "Completed" : "Not Completed"}
                </button>
                {editingId === task.id ? (
                  <FaSave
                    className="text-red-800 text-2xl active:opacity-40"
                    onClick={() => saveEdit(task.id)}
                  />
                ) : (
                  <TbEdit
                    className="text-red-800 text-2xl active:opacity-40"
                    onClick={() => handleEdit(task.id)}
                  />
                )}
                <MdDelete
                  className="text-red-500 text-2xl active:opacity-40"
                  onClick={() => deleteTask(task.id)}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todo;
