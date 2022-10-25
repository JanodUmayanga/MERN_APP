import { useState } from "react";
import { useAuthContext} from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setISLoading] = useState(null)

    const signup = async (username, password) => {
        setISLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
    }
}