import { useState, useEffect } from "react"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Tasks from './components/Tasks/Tasks';
import AddTask from "./components/AddTask/AddTask.jsx";
import Footer from "./components/Footer/Footer.jsx";
import About from "./components/About/About.jsx";
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks , setTasks] = useState([])

  useEffect(() => {
  const getTasks = async () =>{
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }
    getTasks()
  },[])

//fetch tasks
const fetchTasks = async () => {
  const response = await fetch('http://localhost:5000/tasks')
  const data = await response.json()
  return data
  }   


//fetch task

const fetchTask = async (id) => {
  const response =await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await response.json()
  return data
} 

// Add tasks
  const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task)
    })
    const data = await response.json();
    setTasks([...tasks, data])


    // const id = Math.floor(Math.random() * 10000) +1 ;
    // console.log(id);
    // const newTask = {id, ...task};
    // setTasks([...tasks, newTask])
  }

// delete tasks
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: "DELETE"
  })
  setTasks(tasks.filter((task) => task.id !== id))
}

// Toggle Reminder

const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask ={...taskToToggle, reminder : !taskToToggle.reminder}
  
  const response = await fetch(`http://localhost:5000/tasks/${id}`,{
    method :'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  }) 

  const data = await response.json()
  setTasks(tasks.map((task) => 
  task.id === id ? {...task, reminder: data.reminder}:task)
  )
}
  return (
      <div className="container">
        <Header title='Task Tracker' onAdd={()=>
          setShowAddTask(!showAddTask)}
          showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length >0 ?
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
          : <h1 style={{color:"red" , textAlign:"center"}}>You have no tasks !</h1>
        }
        {/* <Route path='/about' component= {About}/> */}
        <Footer />
      </div>
  );
}

export default App;
