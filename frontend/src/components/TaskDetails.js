import { useTasksContext } from "../hooks/useTasksContext"

const TaskDetails = ({ task }) => {

    const {dispatch} = useTasksContext()

    const handleClick1 = async () =>{
        const response = await fetch('/api/todotasks/' + task._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_TASK', payload: json})
        }
    }

    return (
        <div className="task-details">
            <h4>{task.title}</h4>
            <p><strong>Task added on: </strong>{task.createdAt}</p>
            <p><strong>Deadline: </strong>{task.date}</p>
            <span onClick={handleClick1}>Delete</span>
        </div>
    )
}

export default TaskDetails