import { useContext } from 'react'

import { UserContext } from '../../Context/UserContext'

import styles from './NavBar.module.css'

function NavBar() {
    const [userData, setUserData]= useContext(UserContext)

    return (
        <nav className={styles.nav}>
            <h1>Task to do</h1>
            <button>{userData.isLogged ? 'Logout' : 'Login'}</button>
        </nav>
    )
}

export default NavBar