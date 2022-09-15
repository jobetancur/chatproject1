import { useEffect, useState } from "react";

const useUsersData = (userLogged, user) => {

    const [emailUserLogged, setEmailUserLogged] = useState(userLogged)
    const [emailUser, setEmailUser] = useState(user)

    useEffect(() => {
       setEmailUserLogged(userLogged) 
    }, [userLogged])

    useEffect(() => {
        setEmailUser(user)
    }, [user])

    return {
        emailUserLogged,
        emailUser
    }

}

export default useUsersData