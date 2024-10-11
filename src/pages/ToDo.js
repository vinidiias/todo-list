import { useContext, useEffect, useState } from 'react'
import { MdOutlineAddCircle } from "react-icons/md";
import styles from './ToDo.module.css'

import TaskCard from '../components/task/TaskCard';
import TaskForm from '../components/task/TaskForm'
import Container from '../components//layout/Container'

import { UserContext } from '../Context/UserContext';

import { motion } from 'framer-motion';

function ToDo() {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [tasks, setTasks] = useState([])
  const [updated, setUpdated] = useState(false)
  const [userData, setUserData] = useContext(UserContext)
  
  const variacoesAnimadas= {
    inicio: {
      opacity: 0.8,
      x: 1000,
    },
    animacao: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      },
    },
    fim: {
      opacity: 0,
      x: 1000,
      transition: {
        duration: 1
      },
    }
  }

  const formAnimate = {
    initial: { scale: 0.96, y: 20, opacity: 0 },
    animate: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] } },
    exit: {
      scale: 0.6,
      y: 100,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
    },
  }


    function toggleChange() {
        setShowTaskForm(true)
    }

    function toggleChangeFalse() {
      setShowTaskForm(false)
    }

    useEffect(() => {
      fetch(`http://localhost:3333/tasks/${userData.user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth': userData.user_id,
        },
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        let taskSort = data.sort(function(a, b){
          return a.importance_id < b.importance_id ? -1
          : a.importance_id > b.importance_id ? 1 : 0
        });
        setTasks(taskSort)
      })
        .catch((err) => console.log(err));
    }, [updated])

    function newCreateTask(task) {
      try{
        fetch(`http://localhost:3333/${userData.user_id}/tasks`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'auth': userData.user_id,
          },
          body: JSON.stringify(task)
      })
      .then(resp => resp.json())
      .then(() =>{
        setUpdated(!updated)
        setShowTaskForm(false)
      })
        /*await api.post('tasks', {
          name: task.name,
          importance: task.importance,
          importance_id: task.importance_id
        })*/

      }catch(err){
        console.log(err)
      }
    }

    function removeTask(id) {
      try {
        fetch(`http://localhost:3333/${userData.user_id}/tasks/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth': userData.user_id,
          },
        })
        /*api
          .delete(`tasks/${id}`)*/
          .then(() => {
            setUpdated(!updated)
            setTasks(tasks.filter((task) => task.id !== id));
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <motion.div
        className={styles.todo}
        initial={"inicio"}
        animate={"animacao"}
        exit={"fim"}
        variants={variacoesAnimadas}
      >
        <Container customClass="margin_bottom">
          <div className={styles.todo_add} onClick={toggleChange}>
            <MdOutlineAddCircle />
            <p>Add New Task</p>
          </div>

          {showTaskForm && (
            <motion.div
              initial={"initial"}
              animate={"animate"}
              exit={"exit"}
              variants={formAnimate}
            >
              <TaskForm
                btnText="Add Task"
                handleSubmit={newCreateTask}
                toggleOnChange={toggleChangeFalse}
              />
            </motion.div>
          )}
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
      </motion.div>
    );
}

export default ToDo