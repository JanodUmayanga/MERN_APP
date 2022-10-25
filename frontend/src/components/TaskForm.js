import { useState } from "react"
import { useTasksContext} from "../hooks/useTasksContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TaskForm = () => {
    const { dispatch } = useTasksContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError("You must be logged in")
            return
        }

        const task = {title, date}

        const response = await fetch('/api/todotasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setTitle('')
            setDate('')
            setError(null)
            console.log("new task added to the To Do List", json)
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new task to the To Do List</h3>

            <label>Task Title: </label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />

            <label>Deadline: </label>
            <input type="text" onChange={(e) => setDate(e.target.value)} value={date} />

            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TaskForm