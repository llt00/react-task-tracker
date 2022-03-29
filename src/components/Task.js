import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Task = ({ task, onDelete, onToggle }) => {
    function formatDate(jDate) {
        let oDate = Date.parse(jDate);
        let sDate = format(oDate, 'yyyy-MM-dd HH:MM')
        return sDate;

    }
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text} 
                <FaTimes 
                    style={{ color: 'red', cursor: 'pointer' }} 
                    onClick={() => onDelete(task.id)} />
            </h3>
            <p>{task.day}</p>
            <p>{task.date ? formatDate(task.date) : 'none'}</p>
            <p><Link to={`/task/${task.id}`}>View Details</Link></p>
        </div>
    )
}

export default Task
