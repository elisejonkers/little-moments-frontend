import { useNavigate } from "react-router-dom"
import AddAlbumForm from "../components/AddAlbumForm"
import AlbumList from "../components/Albumlist"
import { AuthContext } from "../context/auth.context"
import { useContext } from "react"

const DashBoardPage = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate("/albumform")
    }
    
    return (
        <>
        <h1>Welcome {user ? user.firstName: "user"}</h1>
        <AlbumList/>
        <button onClick={handleButtonClick}>Add new album</button>
        </>
    )

}

export default DashBoardPage