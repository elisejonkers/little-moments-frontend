import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { IsPrivateAnonProps } from "../types/album.types"

function IsAnon({ children }: IsPrivateAnonProps) {

  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  } else {
    return <>{children}</>
  }
}

export default IsAnon;
