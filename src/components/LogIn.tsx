function LogIn () {
    return (
        <div>
            <h1>Log In</h1>
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
                <button>Log in</button>
            </form>
        </div>
    )

}

export default LogIn