import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import LoginForm from '../components/login/LoginForm';
import styles from './LoginScreen.module.css';

import { UserContext } from '../Context/UserContext';


function LoginScreen() {
  const [showLogin, setShowLogin] = useState(true)
  const[userData, setUserData] = useContext(UserContext)
  const navigate = useNavigate()

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

  const cardVariants = {
    initial: { scale: 0.96, y: 30, opacity: 0 },
    animate: { scale: 1, y: 0, opacity: 1, transition: { duration: 1, ease: [0.48, 0.15, 0.25, 0.96] } },
    exit: {
      scale: 0.6,
      y: 100,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
    },
  }

  useEffect(() => {
    if (userData.name) {
      setUserData(prevState => ({
        ...prevState,
        isLogged: false,
        name: '',
        user_id: '',
      }));
    }
  }, [userData.name, setUserData]);
  
  function toggleChange() {
    setShowLogin(!showLogin);
  }

  async function loginHandler(user) {
     try{
      await fetch('http://localhost:3333/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth': userData.user_id,
      },
        body: JSON.stringify(user)
      })
      .then(resp => resp.json())
      .then(data => {
        if(data.name){
          setUserData(prevState => ({
            ...prevState,
            isLogged: true,
            name: data.name,
            user_id: data._id
          }))
          navigate('/todo')
        } else {
          alert(data.message)
        }
      }, [])
      .catch(err => {
        console.log(err)
        alert('Erro ao entrar, tente novamente...')}
      )
    }catch(err){
      alert('Falha no login, tente novamente...')
    }
  }

  async function registerHandler(user) {
    try{
      await fetch('http://localhost:3333/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth': userData.user_id,
      },
        body: JSON.stringify(user)
      })
      .then(resp => resp.json())
      .then(data => {
        if(data.name){
          setUserData(prevState => ({
            ...prevState,
            isLogged: true,
            name: data.name,
            user_id: data._id
          }))
          navigate('/todo')
        }else {
          alert(data.message)
        }
      }, [])
    }catch(err){
      alert('Falha ao registrar usuário, tente novamente...')
    }
  }

  return (
    <motion.div
      initial={"inicio"}
      animate={"animacao"}
      exit={"fim"}
      variants={variacoesAnimadas}
      className={styles.login_container}
    >
      <h1>{!showLogin ? "Sign Up" : "Log In"}</h1>

      {showLogin ? (
        <motion.div
          key="signup"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <LoginForm
            handleSubmit={loginHandler}
            btnText="Log In"
            textBtn="Sign Up"
            textUser="User"
            textPassword="Password"
            toggleOnChange={toggleChange}
          />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <LoginForm
            handleSubmit={registerHandler}
            btnText="Sign Up"
            textBtn="Log In"
            textUser="New User"
            textPassword="New Password"
            toggleOnChange={toggleChange}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

export default LoginScreen;
