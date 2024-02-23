import { useNavigate } from "react-router-dom"
import AlbumList from "../components/Albumlist"
import { AuthContext } from "../context/auth.context"
import { useContext } from "react"
import Button from 'react-bootstrap/Button';
import "../styling/app.css"

const DashBoardPage = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate("/albumform")
    }
    
    return (
        <div className="dashboard-container">
        <h1>Welcome {user ? user.firstName: "user"}</h1>
        <AlbumList/>
        <Button variant="secondary" onClick={handleButtonClick}>Add new album</Button>
        </div>
    )

}

export default DashBoardPage