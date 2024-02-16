function SignUp () {
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
                     />
                </label>
                <label htmlFor="">
                    Password
                    <input 
                    type="password"
                    name="password"
                    placeholder="Enter your password here"
                    required={true}
                     />
                </label>
                <label htmlFor="">
                    First name
                    <input 
                    type="text"
                    name="first name"
                    placeholder="Enter your first nam here"
                    required={true}
                     />
                </label>
                <button>Create an account</button>
            </form>
        </div>
    )

}

export default SignUp