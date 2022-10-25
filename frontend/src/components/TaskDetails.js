import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from "../hooks/useAuthContext"
const TaskDetails = ({ task }) => {

    const {dispatch} = useTasksContext()
    const user = useAuthContext()

    const handleClick1 = async () =>{
        
        if(!user) {
            return
        }
        
        const response = await fetch('/api/todotasks/' + task._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
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