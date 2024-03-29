import axios, { AxiosError, AxiosResponse } from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { Link, useNavigate } from "react-router-dom"
import login_photo2 from "../assets/login-photo2.jpg"

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { LoginState, AuthResponseData, ErrorResponse } from "../types/album.types"

const apiURL = process.env.REACT_APP_API_URL

const LogIn: React.FC = () => {
    const [logIn, setLogIn] = useState<LoginState>({
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const [show, setShow] = useState<boolean>(false)
    const navigate = useNavigate()
    const { storeToken, authenticateUser } = useContext(AuthContext)

    const setLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLogIn({ ...logIn, [name]: value })
    }

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios
            .post(`${apiURL}/auth/login`, logIn)
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
                    setShow(true)
                } else {
                    setErrorMessage("An error occured")
                    setShow(true)
                }
            })
    }

    return (
        <div className="login-container">
            <div className="login-photo-item">
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
                            onChange={setLoginInput}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            required={true}
                            value={logIn.password}
                            onChange={setLoginInput}
                        />
                    </Form.Group>
                    <Button variant="secondary" type="submit" onClick={() => setShow(true)}>
                        Submit
                    </Button>
                </Form>
                <div className="errormessage">
                    {errorMessage && <ToastContainer position="top-start">
                        <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
                            <Toast.Header>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto"></strong>
                                <small></small>
                            </Toast.Header>
                            <Toast.Body className="toast-message">{errorMessage}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                    }
                    <p>Don't have an account yet?</p>
                    <Link to={"/signup"}>Click here to create an account</Link>
                </div>
            </div>
        </div>
    )

}

export default LogIn