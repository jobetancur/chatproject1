import { useEffect, useState } from "react";

const useEmailNotification = changeEmail => {

    const [email, setEmail] = useState(false)

    useEffect(() => {
        if (changeEmail === true) {
        setEmail(true)
        } else {
            setEmail(false)
        }
    }, [changeEmail])

    return {
        email
    }

}

export default useEmailNotification