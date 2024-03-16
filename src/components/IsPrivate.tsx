import { useContext, ReactNode } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { IsPrivateAnonProps } from "../types/album.types"

// type IsPrivateProps = {
//     children: ReactNode
// }

function IsPrivate( { children }: IsPrivateAnonProps ) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>
  }
}

export default IsPrivate;
