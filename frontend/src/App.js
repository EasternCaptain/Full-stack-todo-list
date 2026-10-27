import { useSelector, useDispatch } from 'react-redux'; 
import { useEffect, useState } from 'react'; 

export default function App() {
  const [ text, setText ] = useState(''); 

  const toDoList = useSelector((state) => state.toDoList ); 
  const dispatch = useDispatch(); 

  const handleAdd = () => {
    if (text.trim() === "") return; 

    dispatch({type: "ADD", payload: text })
    setText('')
  } 

  const handleDelete = (id) => {
    dispatch({type: "DELETE", payload: id})
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
          toDoList.map((item, id) => {
            return (
              <div key={id}> 
                <input type="checkbox" />
                <p>{item}</p>
              <input type="button" value="X" onClick={() => {
                handleDelete(id); 
              }} />
          </div>
            )
          }) 
        }
      </div>
    </div>
  )
}