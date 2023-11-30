import { useState } from "react";
import Button from "@mui/material/Button";
import "./Todo.css";
import { v4 as uuidv4 } from "uuid";
import uselocalstorage from "./hooks/uselocalstorage";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Pagination from "./pagination.jsx";
import Priority from "./priority.jsx";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function todo() {
  let [description, setDes] = useState("");
  let [newtodo, setNewtodo] = useState("");
  let [todos, setTodo] = uselocalstorage("todos", [
    {
      task: "Code",
      description: "coding time",
      id: uuidv4(),
      isDone: false,
    },
  ]);

  function addnewtodo(e) {
    setNewtodo(e.target.value);
  }
  function addnewdescription(e) {
    setDes(e.target.value);
  }

  function Addtask() {
    setTodo((prevtodo) => {
      return [
        ...prevtodo,
        { task: newtodo, description: description, id: uuidv4() },
      ];
    });
    setNewtodo("");
    setDes("");
  }

  function Delete(id) {
    setTodo(todos.filter((todo) => todo.id != id));
  }

  function Markasdone(id, isDone) {
    setTodo((prevtodo) =>
      prevtodo.map((todo) => {
        if (id === todo.id && !todo.isDone) {
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      })
    );
  }

  function MarkallDone() {
    setTodo((prevtodo) =>
      prevtodo.map((todo) => {
        todo.isDone = true;
        return { ...todo };
      })
    );
  }

  return (
    <>
      <div className="main">
        <div className="add-bar">
          <form>
            <TextField
              id="outlined-basic"
              label="Task"
              placeholder="Type the task to do"
              type="text"
              onChange={addnewtodo}
              value={newtodo}
              required
            />
            <br></br>
            <br></br>
            <input
              className="input"
              id="outlined-basic"
              label="Description"
              placeholder="Describe the task"
              type="text"
              onChange={addnewdescription}
              value={description}
              required
            />
            <br></br>
            <br></br>

            <Priority style={{ backgroundColor: "#994D1C", color: "white" }} />
            <br></br>
            <Button
              onClick={Addtask}
              style={{
                backgroundColor: "#994D1C",
                color: "white",
                marginRight: "0.5rem",
              }}
            >
              Add Task
            </Button>
          </form>
        </div>
        <br></br>
        <div className="task-container">
          <div className="Alltask">
            <h2>Todo List</h2>
            {todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <Checkbox {...label} />
                  <span
                    style={
                      todo.isDone
                        ? {
                            textDecoration: "line-through",
                            fontWeight: 300,
                            fontSize: "1.2rem",
                          }
                        : { fontSize: "1.2rem", fontWeight: 300 }
                    }
                  >
                    {todo.task}
                  </span>
                  &nbsp;&nbsp;
                  <span
                    style={
                      todo.isDone
                        ? {
                            textDecoration: "line-through",
                          }
                        : {}
                    }
                  >{`(${todo.description})`}</span>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    style={{ backgroundColor: "#994D1C", color: "white" }}
                    onClick={() => Delete(todo.id)}
                  >
                    Delete
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    style={{ backgroundColor: "#994D1C", color: "white" }}
                    onClick={() => Markasdone(todo.id, todo.isDone)}
                  >
                    MarkasDone
                  </Button>
                  <br></br>
                </li>
              );
            })}
          </div>
          <div className="pagination">
            <Pagination />
          </div>
        </div>

        <Button
          style={{ backgroundColor: "#994D1C", color: "white" }}
          onClick={() => MarkallDone()}
        >
          MarkallDone
        </Button>
      </div>
    </>
  );
}
