import { useState } from 'react'
import Input from '../form/Input'
import SubmiteButton from '../form/SubmitButton'
import styles from '../task/TaskForm.module.css'
import stylesLogin from './LoginForm.module.css'


function LoginForm( { handleSubmit, textUser, textPassword, btnText, toggleOnChange, textBtn }) {

  const [user, setUser] = useState([])


  const styleSubmit = {
    display: 'flex',
    justifyContent: 'start',
  }

  function handleChange(e) {
      setUser({...user, [e.target.name] : e.target.value})
  }

  const submit = (e) => {
      e.preventDefault()
      handleSubmit(user)
  }

  return (
    <form
      onSubmit={submit}
      className={`${styles.form} ${stylesLogin.width}`}
    >
      <Input
        type="text"
        name="name"
        placeholder="Type your username"
        handleOnChange={handleChange}
        text={textUser}
      />
      <Input
        type="password"
        name="password"
        placeholder="Type your password"
        handleOnChange={handleChange}
        text={textPassword}
      />
      <div style={styleSubmit} className={styles.submit}>
        <SubmiteButton style={styleSubmit} text={btnText} styleSubmit="flex" />
        <button onClick={toggleOnChange}>{textBtn}</button>
      </div>
    </form>
  );

}

export default LoginForm