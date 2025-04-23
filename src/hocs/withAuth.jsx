import { useContext, useEffect } from "react"
import { UserContext } from "../Context/UserContext"
import { Navigate, useNavigate } from "react-router-dom"

const withAuth = (Component) => {
    return function ComponenteAuth(props) {
        const [userData] = useContext(UserContext)
        const navigate = useNavigate()

        useEffect(() => {
            if(!userData.isLogged) return navigate('/login')
        }, [])

        return <Component {...props} />
    }
}

export default withAuth