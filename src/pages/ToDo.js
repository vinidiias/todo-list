import { useEffect, useState } from 'react'
import { MdOutlineAddCircle } from "react-icons/md";
import styles from './ToDo.module.css'

import TaskCard from '../components/task/TaskCard';
import TaskForm from '../components/task/TaskForm'
import Container from '../components//layout/Container'

import api from '../services/Api';

function ToDo() {

    //const [taskForm, setTaskForm] = useState(false)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [tasks, setTasks] = useState([])

    function toggleChange() {
        console.log('teste')
        setShowTaskForm(true)
    }

    function toggleChangeFalse() {
      setShowTaskForm(false)
    }

    useEffect(() => {
      api
        .get("tasks")
        .then((response) => {
          let taskSort = response.data.sort(function (a, b) {
            return a.importance_id < b.importance_id
              ? -1
              : a.importance_id > b.importance_id
              ? 1
              : 0;
          });
          setTasks(taskSort);
        })
        .catch((err) => console.log(err));
    }, [tasks.length])

    async function newCreateTask(task) {
      try{
        await api.post('tasks', {
          name: task.name,
          importance: task.importance,
          importance_id: task.importance_id
        })
        setShowTaskForm(false)
      }catch(err){
        console.log(err)
      }
    }

    function removeTask(id) {
      try {
        api
          .delete(`tasks/${id}`)
          .then(() => {
            setTasks(tasks.filter((task) => task.id !== id));
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <div className={styles.todo}>
        <Container customClass="margin_bottom">
          <div className={styles.todo_add} onClick={toggleChange}>
            <MdOutlineAddCircle />
            <p>Add New Task</p>
          </div>
          <div>
            {showTaskForm && (
              <TaskForm btnText="Add Task" handleSubmit={newCreateTask} toggleOnChange={toggleChangeFalse} />
            )}
          </div>
        </Container>
        <Container customClass="wrap">
            {tasks.length > 0 && 
              tasks.map((task) => (
                <TaskCard 
                name={task.name}
                importance={task.importance}
                key={task._id}
                id={task._id}
                handleRemove={removeTask}
                />
              ))}
        </Container>
      </div>
    );
}

export default ToDo