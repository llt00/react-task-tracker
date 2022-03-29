import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import TaskDetails from './components/TaskDetails'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch ('http://localhost:5000/tasks')
    const data = await res.json()
    console.log(data);
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch (`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    console.log('delete', id);
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch (`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })
    console.log(res)    
    setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch ('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    console.log(JSON.stringify(task))
    const data = await res.json()
    setTasks([...tasks, data]) 
    
  }

  return (
    <Router>
      <div className="container">
        <Header 
          onAdd={() => setShowAddTask(!showAddTask)} 
          showAdd={showAddTask} 
        />
        <Routes>
        <Route 
          path='/' 
          element = {
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (
              <Tasks 
                tasks={tasks} 
                onDelete={deleteTask} 
                onToggle={toggleReminder} 
                />
              ) : (
                'No Task To Show' 
              )}
          </>
          } 
        />
        <Route path='/about' element={<About />} />
        <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>  
        <Footer />
      </div>
    </Router>
  );
}

/*
class App extends React.Component {
  render() {
    return <h1>Hello from a class</h1>
    
  }
}*/

export default App;
