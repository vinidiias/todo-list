import { useContext, useEffect, useState, useReducer } from 'react'
import { MdOutlineAddCircle } from "react-icons/md";
import { motion } from 'framer-motion';
import { UserContext } from '../Context/UserContext';
import withFetching from '../hocs/withFetching';
import styles from './ToDo.module.css'
import TaskCard from '../components/task/TaskCard';
import TaskForm from '../components/task/TaskForm'
import Container from '../components//layout/Container'
import withAuth from '../hocs/withAuth';

const reducerTask = (tasks, action) => {
  switch (action.type) {
    case 'READ':
      return action.tasks
    case 'ADD':
      {
        return [...tasks, action.task]}
    case 'DELETE':
     { return tasks.filter((task) => task._id !== action._id)}
    case 'INORDEM':
      return tasks.sort(function (a, b) {
        return a.importance_id < b.importance_id
          ? -1
          : a.importance_id > b.importance_id
          ? 1
          : 0;
      });
      default:
        return tasks
  }
}

function ToDo({ data, error, userData}) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, dispatch] = useReducer(reducerTask, data || [])

  const variacoesAnimadas = {
    inicio: {
      opacity: 0.8,
      x: 1000,
    },
    animacao: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    fim: {
      opacity: 0,
      x: 1000,
      transition: {
        duration: 1,
      },
    },
  }

  const formAnimate = {
    initial: { scale: 0.96, y: 20, opacity: 0 },
    animate: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
    },
    exit: {
      scale: 0.6,
      y: 100,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
    },
  }

  useEffect(() => {
    if(data) {
      dispatch({ type: 'READ', tasks: data})
    }
  }, [data])

  function toggleChange() {
    setShowTaskForm(true);
  }

  function toggleChangeFalse() {
    setShowTaskForm(false);
  }

  function handleCreateTask(task) {
    try {
      fetch(`http://localhost:3333/${userData.user_id}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: userData.user_id,
        },
        body: JSON.stringify(task),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setShowTaskForm(false);
          dispatch({type: 'ADD', task: data})
        });
    } catch (err) {
      console.log(err);
    }
  }

  function handleRemoveTask(id) {
    try {
      fetch(`http://localhost:3333/${userData.user_id}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          auth: userData.user_id,
        },
      })
        .then(() => {
          dispatch({type: 'DELETE', _id: id})
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
              handleSubmit={handleCreateTask}
              toggleOnChange={toggleChangeFalse}
            />
          </motion.div>
        )}
      </Container>
      <Container customClass="wrap">
        {Array.isArray(tasks)  && tasks.length > 0 ?
          tasks
            .sort(function (a, b) {
              return a.importance_id < b.importance_id
                ? -1
                : a.importance_id > b.importance_id
                ? 1
                : 0;
            })
            .map((task) => (
              <TaskCard
                name={task.name}
                importance={task.importance}
                key={task._id}
                id={task._id}
                handleRemove={handleRemoveTask}
              />
            )) : <p>Sem tarefas!</p>}
      </Container>
    </motion.div>
  );
}

const TodoWrapper = () => {
  const [userData] = useContext(UserContext)

  const TodoWithFetching = withFetching (
    ToDo,
    `http://localhost:3333/tasks/${userData.user_id}`,
    userData.user_id
  );

  return <TodoWithFetching userData={userData} />
}

export default withAuth(TodoWrapper)