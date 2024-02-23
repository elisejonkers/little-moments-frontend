import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { Link, useNavigate } from "react-router-dom"
import login_photo from "../assets/login-photo.jpg"
import login_photo2 from "../assets/login-photo2.jpg"
import "../styling/app.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


interface LoginState {
    email: string,
    password: string
}

interface AuthResponseData {
    authToken: string
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
    const navigate = useNavigate()
    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLogIn({ ...logIn, [name]: value })
    }

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios
            .post("http://localhost:5005/auth/login", logIn)
            .then((response: AxiosResponse<AuthResponseData>) => {
                console.log("This is the JTW token", response.data.authToken)
                storeToken(response.data.authToken)
                authenticateUser()
                navigate("/dashboard")
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                console.log(error)
                if (error.response) {
                    setErrorMessage("Invalid email and/or password. Please try again")
                } else {
                    setErrorMessage("An error occured")
                }
            })
    }

    return (
        <div className="login-container">
            <div>
                <img src={login_photo2} alt="login" className="login-photo" />
            </div>
            <div className="login">
                <h3>LOGIN</h3>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            required={true}
                            value={logIn.email}
                            onChange={handleInputChange}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            required={true}
                            value={logIn.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div className="errormessage">
                {errorMessage && <p>{errorMessage}</p>}
                <p>Don't have an account yet?</p>
                <Link to={"/signup"}>Click here to create an account</Link>
            </div>
            </div>

        </div>
    )

}

export default LogIn