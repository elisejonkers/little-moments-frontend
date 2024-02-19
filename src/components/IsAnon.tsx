import { useContext, ReactNode } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

type IsAnonProps = {
    children: ReactNode
}

function IsAnon( { children }: IsAnonProps ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;

  if (isLoggedIn) {    
    return <Navigate to="/" />;
  } else {
    return <>{children}</>
  }
}

export default IsAnon;