import axios from "axios"
import { Sign } from "crypto"
import { useState } from "react"
import config from "../config"


interface SignUpState {
    email: string,
    password: string,
    firstName: string
}

// interface ImportMetaEnv {
//     VITE_API_URL: string
// }

// type ExtendedImportMeta = ImportMeta & { env: ImportMetaEnv };

const SignUp: React.FC = () => {
    const [signUp, setSignUp] = useState<SignUpState>({
        email: "",
        password: "",
        firstName: ""
    })
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSignUp({ ...signUp, [name]: value })
    }

    const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios
            .post(`http://localhost:5005/auth/signup`, signUp)
            .then((response) => {
                console.log("Sign up approved")
            })
            .catch((error)  => {
                console.log(error)
                const errorDescription = error.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUpSubmit}>
                <label htmlFor="">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email here"
                        required={true}
                        value={signUp.email}
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
                        value={signUp.password}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="">
                    First name
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter your first nam here"
                        required={true}
                        value={signUp.firstName}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Create an account</button>
            </form>
        </div>
    )

}

export default SignUp