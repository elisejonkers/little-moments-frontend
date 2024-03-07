//import "../styling/app.css"

import axios, { AxiosHeaders, AxiosResponse } from "axios"
import { useContext, useState } from "react"
import config from "../config"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import signup_photo from "../assets/signup_photo.jpg"


interface SignUpState {
    email: string,
    password: string,
    firstName: string
}

interface AuthResponseData {
    authToken: string
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
    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSignUp({ ...signUp, [name]: value })
    }

    const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios
            .post(`http://localhost:5005/auth/signup`, signUp)
            .then((response) => {
                console.log("sign up approved")
                navigate("/login")
            })
            .catch((error) => {
                console.log(error)
                const errorDescription = error.response.data.message
                setErrorMessage(errorDescription)
            })
    }

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


        // <div>
        //     <h1>Sign Up</h1>
        //     <form onSubmit={handleSignUpSubmit}>
        //         <label htmlFor="">
        //             Email
        //             <input
        //                 type="email"
        //                 name="email"
        //                 placeholder="Enter your email here"
        //                 required={true}
        //                 value={signUp.email}
        //                 onChange={handleInputChange}
        //             />
        //         </label>
        //         <label htmlFor="">
        //             Password
        //             <input
        //                 type="password"
        //                 name="password"
        //                 placeholder="Enter your password here"
        //                 required={true}
        //                 value={signUp.password}
        //                 onChange={handleInputChange}
        //             />
        //         </label>
        //         <label htmlFor="">
        //             First name
        //             <input
        //                 type="text"
        //                 name="firstName"
        //                 placeholder="Enter your first nam here"
        //                 required={true}
        //                 value={signUp.firstName}
        //                 onChange={handleInputChange}
        //             />
        //         </label>
        //         <button type="submit">Create an account</button>
        //     </form>
        // </div>
    )

}

export default SignUp