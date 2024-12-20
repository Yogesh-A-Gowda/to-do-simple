import axios from 'axios'
import './App.css'
import { useState } from 'react'

function Create(){
    const [task,setTask] = useState()
    const handleAdd = () => {

        axios.post(`${import.meta.env.VITE_PORT}/add`,{task:task})
         .then(() => {
            location.reload();
            }).catch(err => console.log(err))
    }
    return(
        <div className="create__form">
            <input type="text" placeholder='Enter Task' onChange={(e) => {
                setTask(e.target.value)
            }}/>
            <button type="button" onClick={handleAdd}>Add</button>

        </div>
    )
}
export default Create