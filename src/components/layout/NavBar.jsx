import { useContext } from 'react'

import { UserContext } from '../../Context/UserContext'

import styles from './NavBar.module.css'
import { CgProfile } from "react-icons/cg";


function NavBar() {
    const [userData, setUserData]= useContext(UserContext)

    const LogoutHandler = (e) => {
        e.preventDefault();

        setUserData(prevState => ({
            ...prevState,
            isLogged: false,
            name: '',
            user_id: '',
          }))
    }

    return (
        <nav className={styles.nav}>
            {userData.name && <div><CgProfile /><h3>{userData.name}</h3></div>}
            <h1>Task to do</h1>
            {userData.isLogged && (<button onClick={LogoutHandler}>Logout</button>)}
        </nav>
    )
}

export default NavBar