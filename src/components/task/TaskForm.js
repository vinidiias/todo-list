import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmiteButton from '../form/SubmitButton'
import styles from './TaskForm.module.css'

function TaskForm( { handleSubmit, btnText, taskData, toggleOnChange }) {

    const [importances, setImportances] = useState([])
    const [task, setTask] = useState(taskData || [])

        useEffect(() => {
            fetch('http://localhost:3333/importances', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        /*api.get('importances')*/
        .then((resp) => resp.json())
        .then(data => {
            setImportances(data)
        })
        .catch(err => console.log(err))
    }, [])

    function handleChange(e) {
        setTask({...task, [e.target.name] : e.target.value})
    }

    function handleImportance(e) {
        setTask({...task, 
            importance: e.target.options[e.target.selectedIndex].text,
            importance_id: e.target.value,
        })
    }

    const submit = (e) => {
        e.preventDefault()
        if(task.name && task.importance){
            handleSubmit(task)
        }
    }

    return (
      <form onSubmit={submit} className={styles.form}>
        <Input
          type="text"
          name="name"
          placeholder="Insira sua tarefa"
          handleOnChange={handleChange}
          value={task.name ? task.name : ''}
          text="Nome da tarefa"
        />
        <Select
          name="importance_id"
          text="Grau de importância"
          options={importances}
          handleOnChange={handleImportance}
          value={task.importance ? task.importance_id : ''}
        />
        <div className={styles.submit}>
            <SubmiteButton text={btnText} />
            <button onClick={toggleOnChange}>
                Close
            </button>
        </div>
      </form>
    );

}

export default TaskForm