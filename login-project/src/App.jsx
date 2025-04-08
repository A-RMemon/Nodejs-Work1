import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Todo from './Todo'

function App() {
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  const [login,setLogin] = useState(false)
  useEffect(()=>{
    let status = localStorage.getItem('login')
    setLogin(status == undefined? false:status)
  },[])

  const LoginBtn = () => {
  try {
    let data = {
      email,password
    };

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:5000/auth/login',
  headers: { },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(response.data);
  localStorage.setItem('token',response.data.token)
  localStorage.setItem('login',true)
  setLogin(true)
  
})
.catch((error) => {
  console.log(error);
});
  } catch (error) {
    
  }

  }
  return (
    <>
    {login?<Todo/>:<div>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password'/>
        <button onClick={LoginBtn}>Submit</button>
       </div>}
       
    </>
  )
}

export default App
