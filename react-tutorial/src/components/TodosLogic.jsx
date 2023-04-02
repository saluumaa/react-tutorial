import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from "uuid";
import InputTodo from '@/components/InputTodo';
import TodosList from '@/components/TodosList';
const TodosLogic = () => {
  const [todos, setTodos] = useState(getInitialTodos());

  function getInitialTodos() {
    // getting stored items
    const temp = localStorage.getItem('todos');
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  }

  useEffect(() => {
    // storing todos items
    const temp = JSON.stringify(todos);
    localStorage.setItem('todos', temp);
  }, [todos]);

      const  delTodo = (id) => {
        setTodos([
           ...todos.filter((todo) =>{
                return todo.id !== id
            })
        ])
    }

    const setUpdate = (updatedTitle, id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            todo.title = updatedTitle;
          }
          return todo;
        })
      );
      };

    const addTodoItem = (title) => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false,
          };
          setTodos([...todos, newTodo]);
    }

    return (
    <div>
      <InputTodo addTodoItem={addTodoItem} />
      <TodosList todosProps={todos} setTodos={setTodos} delTodo={delTodo}
      setUpdate={setUpdate} />
      
    </div>
    )
  }
  export default TodosLogic;
  