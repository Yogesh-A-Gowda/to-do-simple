import Create from "./Create";
import { useEffect, useState } from "react";
import './App.css'
import axios from "axios";

function Home(){
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_PORT}/get`)
            .then(result => {
                console.log('Data from API:', result.data); // Log the response data
                setTodos(result.data);
            })
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    function handleEdit(id){
        axios.put(`${import.meta.env.VITE_PORT}/update/` + id).then(result => {
            location.reload()
            console.log(result)})
            .catch(err => console.log(err))


    }
    function handleDelete(id){
        axios.delete(`${import.meta.env.VITE_PORT}delete/`+id).then(result => {
            location.reload(),
            console.log(result)
        }).catch(err => console.log(err))
    }

    return (
        <div className="home">
            <h2>TO DO LIST</h2>
            <Create />
            {
                todos.length === 0 
                ? (
                    <div>
                        <h2>No activity in the list</h2>
                    </div>
                ) 
                : (
                    todos.map((todo, index) => (
                        <div key={index}>
                            <div className="grid-container">
                            <div className="checkbox" onClick={()=>handleEdit(todo._id)}>
                                {todo.done ? 
                                <svg   className="icon"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                                :
                                <svg className="icon"   xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                                }
                            <p className={todo.done ? "line-through" : ""}  >{todo.task}</p>
                            </div>
                          
                            <div>
                            <span className="icon" onClick={() => handleDelete(todo._id)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> </span>
                            </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
}
export default Home