import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"

interface LoginState {
    email: string,
    password: string
}

interface AuthResponseData {
    authToken: string
}

interface AuthResponse {
    data: {
        authToken: string,
    },
    status: number,
    statusText: string,
    headers: AxiosHeaders
}

interface ErrorResponse {
    message: string
}

const LogIn: React.FC = () => {
    const [logIn, setLogIn] = useState<LoginState>({
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLogIn({...logIn, [name]: value})
    }

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios
            .post("http://localhost:5005/auth/login", logIn)
            .then((response: AxiosResponse<AuthResponseData>) => {
                console.log("Login approved")
                console.log("This is the JTW token", response.data.authToken)
                storeToken(response.data.authToken)
                authenticateUser()
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                console.log(error)
                if (error.response) {
                    setErrorMessage(error.response.data.message)
                } else {
                    setErrorMessage("An error occured")
                }
            })
    }

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="">
                    Email
                    <input 
                    type="email"
                    name="email"
                    placeholder="Enter your email here"
                    required={true}
                    value={logIn.email}
                    onChange={handleInputChange}
                     />
                </label>
                <label htmlFor="">
                    Password
                    <input 
                    type="password"
                    name="password"
                    placeholder="Enter your password here"
                    required={true}
                    value={logIn.password}
                    onChange={handleInputChange}
                     />
                </label>
                <button>Log in</button>
            </form>
        </div>
    )

}

export default LogIn