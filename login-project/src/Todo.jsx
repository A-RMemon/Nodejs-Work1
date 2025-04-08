import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Todo = () => {
    let [todos,setTodos] = useState('')
    let [todoList,setTodoList] = useState([])
    let token = localStorage.getItem('token')
    useEffect(()=>{getAllTodos()},[])

    const getAllTodos = () => {
        try {
       
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:5000/todo/get',
                headers: { 
                  'Authorization': token
                }
              };
              
              axios.request(config)
              .then((response) => {
                console.log(response.data);
                setTodoList(response.data["todos"])
              })
              .catch((error) => {
                console.log(error);
              });
        } catch (error) {
            
        }
    }
    const addTodo = ( ) => {
        try {
            let data = JSON.stringify({
                "title": todos
              });
              
              let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:5000/todo/create',
                headers: { 
                  'Authorization': token, 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              axios.request(config)
              .then((response) => {
                console.log(response.data);
                setTodos('')
                getAllTodos()
              })
              .catch((error) => {
                console.log(error);
              });
        } catch (error) {
            
        }
    }
  return (
    <div>
        <h1>Todo List</h1>
        <input type="text" value={todos} onChange={(e)=>setTodos(e.target.value)} placeholder='EnterTitle' /> 
        <button onClick={addTodo}>Add</button>
        {todoList.map((v,i)=>{
            return(
                <div key={i}>
                    <p>{v.title}</p>
                    <button>{v._id}</button>
                    </div>
            )
        })}

    </div>
  )
}

export default Todo