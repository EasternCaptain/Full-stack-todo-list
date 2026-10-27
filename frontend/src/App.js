import { useSelector, useDispatch } from 'react-redux'; 
import { useEffect, useState } from 'react'; 

export default function App() {
  const [ text, setText ] = useState(''); 

  const toDoList = useSelector((state) => state.toDoList ); 
  const dispatch = useDispatch(); 
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/todos", {
        method: "GET", 
        headers: { "Content-Type": "application/json" }
      }) 
      const data = await response.json() 
      dispatch({type: "LOAD", payload: data })
      } catch(error) {
        console.error(error); 
      }
    }
    fetchData() 
  }, [dispatch])

  const handleAdd = async () => {
    if (text.trim() === "") return; 
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ text })
      }); 
      if (!response.ok) {
        throw new Error(`REQUEST FAILED ${response.status} ${response.statusText}`); 
      } 
      const todo = await response.json(); 
      dispatch({type: "ADD", payload: todo}) 
      setText("" )

    } catch(error) {
      console.error(error);  
  }
  } 

  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "DELETE", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ id })
      }) 
      if (!response.ok) {
        throw new Error(`REQUEST FAILED ${response.status} ${response.statusText}`); 
      } 
      dispatch({type: "DELETE", payload: id})
    } catch(error) {
      console.error(error); 
    }
  }

  const handleToggle = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "PATCH", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id })
      }) 
      if (!response.ok) {
        throw new Error (`REQUEST FAILED ${response.status} ${response.statusText}`); 
      } 
      dispatch({type: 'COMPLETED', payload: id})
    } catch(error) {
      console.error(error) 
    }
  }

  return (
    <div>
      <h1>ToDo List</h1>
      <div>
        <input type="text"  
        onChange={(e) => {
          setText(e.target.value) 
        }} 
        value={text} 
        placeholder="Enter your todo"/>
        <input type="button" value="Add" onClick={handleAdd} />
      </div>
      <div>
        {
         toDoList.map((item) => {
          return (
            <div key={item.id}>
              <input 
              type="checkbox" 
              checked={item.completed} 
              onChange={() => handleToggle(item.id)}
              />
              <p>{item.text}</p> 
              <input type="button" value="X" onClick={() => handleDelete(item.id)} />
            </div>
          )
         })
        }
      </div>
    </div>
  )
}