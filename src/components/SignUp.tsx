//import "../styling/app.css"

import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import signup_photo from "../assets/signup_photo.jpg"

const apiURL = process.env.REACT_APP_API_URL

interface SignUpState {
    email: string,
    password: string,
    firstName: string
}



const SignUp: React.FC = () => {
    const [signUp, setSignUp] = useState<SignUpState>({
        email: "",
        password: "",
        firstName: ""
    })
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const [show, setShow] = useState<boolean>(false)
    const navigate = useNavigate()


    // TODO: Rename it to handleSignupChange
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSignUp({ ...signUp, [name]: value })
    }

    const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // TODO: Use react-query for api calls
        axios
            .post(`${apiURL}/auth/signup`, signUp)
            .then((_response) => {
                console.log("sign up approved")
                navigate("/login")
            })
            .catch((error) => {
                console.log(error)
                const errorDescription = error.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    //TODO: Try to use formik for handling forms & validations 
    return (
        <div className="login-container">
            <div className="login-photo-item">
                <img src={signup_photo} alt="login" className="login-photo" />
            </div>
            <div className="login">
                <h3>CREATE NEW ACCOUNT</h3>
                <Form onSubmit={handleSignUpSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            required={true}
                            value={signUp.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            required={true}
                            value={signUp.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            required={true}
                            value={signUp.firstName}
                            onChange={handleInputChange}
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
                    </ToastContainer>}
                <p>Already have an account?</p>
                <Link to={"/login"}>Click here to login</Link>
            </div>
            </div>

        </div>
    )
}

export default SignUp