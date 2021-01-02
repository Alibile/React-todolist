import React, { useState, useEffect }from 'react'
import './App.css';
import Form from './Components/Form';
import TodoList from './Components/TodoList'
function App() {
  
  
  //state stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status,setStatus] = useState('all');
  const [filteredTodos,setFilteredTodos] = useState([])
  
   ///Run once when the app start
   useEffect(() =>{
     getLocalTodos();
   }, []);
  //use effect
  useEffect(() =>{
    filterHandler();
    saveLocalTodos();
  },[todos,status]);
  //function
  const filterHandler = () => {
    switch (status) {
      case "completed":
      setFilteredTodos(todos.filter(todo => todo.completed == true))
      break;
     case 'uncompleted':
      setFilteredTodos(todos.filter(todo => todo.completed == false))
      break;
      default:
        setFilteredTodos(todos);
        break
    }
  }
  //save to local
  const saveLocalTodos = () => {
   localStorage.setItem('todos',JSON.stringify(todos))
  };
  const getLocalTodos = () =>{
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos',JSON.stringify([]));
    }else {
      let todoLocal = JSON.parse(localStorage.getItem( 'todos'))
      setTodos(todoLocal)
    }
  }
  
  return (
    <div className="App">
      <header>
          <h1>Ali's Todo List</h1>
      </header>    
      <Form 
      inputText={inputText}
      setInputText={setInputText}
      todos={todos} setTodos={setTodos}
      setStatus={setStatus}
      setInputText={setInputText}
      />
      <TodoList       filteredTodos={filteredTodos}
 setTodos={setTodos} todos={todos}/>
    </div>
  );
}

export default App;
