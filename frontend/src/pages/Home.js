import { useEffect } from "react"
import { useTasksContext} from "../hooks/useTasksContext"

//components
import TaskDetails from '../components/TaskDetails'
import TaskForm from "../components/TaskForm"

const Home = () => {
    const {tasks, dispatch} = useTasksContext()

    useEffect(() => {
        const fetchTasks = async () => {
            const respose = await fetch('/api/todotasks')
            const json = await respose.json()

            if(respose.ok) {
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }

        fetchTasks()
    }, [])

    return (
        <div className="home">
            <div className="tasks">
                {tasks && tasks.map((task) => (
                    <TaskDetails key={task._id} task={task} />
                ))}
            </div>
            <TaskForm />
        </div>
    )
}

export default Home