import { useState, useEffect } from 'react'

const TaskManager = () => {

    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [filter, setFilter] = useState('all') // all, active, completed

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks')
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = (e) => {
        e.preventDefault()
        if (newTask.trim()) {
            const newTaskObj = {
                id: Date.now(),
                text: newTask,
                completed: false,
                createdAt: new Date().toISOString()
            }
            setTasks(prev => [...prev, newTaskObj])
            setNewTask('')
        }
    }

    const toggleTask = (id) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    // Function to clear completed tasks
    const clearCompleted = () => {
        setTasks(prev => prev.filter(task => !task.completed))
    }

    // Filter tasks based on the selected filter
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all')
            return true
        if (filter === 'active')
            return !task.completed
        if (filter === 'completed')
            return task.completed
        return true
    })

    // Calculate task statistics using reduce
    const stats = tasks.reduce(
        (acc, task) => {
            acc.total += 1
            if (task.completed) acc.completed += 1
            else acc.active += 1
            return acc
        },
        { total: 0, active: 0, completed: 0 }
    )

    return (
        <div className="task-manager">
            {/* Add Task Form */}
            <form onSubmit={addTask} className="task-form">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="task-input"
                />
                <button type="submit" className="task-add-btn">
                    Add Task
                </button>
            </form>

            {/* Filter Buttons */}
            <div className="task-filters">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All ({stats.total})
                </button>
                <button
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => setFilter('active')}
                >
                    Active ({stats.active})
                </button>
                <button
                    className={filter === 'completed' ? 'active' : ''}
                    onClick={() => setFilter('completed')}
                >
                    Completed ({stats.completed})
                </button>
            </div>

            {/* Task List */}
            <div className="task-list">
                {filteredTasks.length === 0 ? (
                    <p className="no-tasks">No tasks to display</p>
                ) : (
                    filteredTasks.map(task => (
                        <div key={task.id} className="task-item">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="task-checkbox"
                            />
                            <span className={task.completed ? 'completed' : ''}>
                {task.text}
              </span>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="task-delete"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Clear Completed Button */}
            {stats.completed > 0 && (
                <button onClick={clearCompleted} className="clear-completed">
                    Clear Completed
                </button>
            )}
        </div>
    )
}

export default TaskManager