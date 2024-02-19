import { useState } from "react"

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

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignUp({...signUp, [name]: value})
    console.log(signUp)
}

const handleSignUpSubmit = () => {
    
}




    return (
        <div>
            <h1>Sign Up</h1>
            <form action="">
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
                <button>Create an account</button>
            </form>
        </div>
    )

}

export default SignUp