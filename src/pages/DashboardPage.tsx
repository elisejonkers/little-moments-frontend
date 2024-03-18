import { useNavigate } from "react-router-dom"
import AlbumList from "../components/Albumlist"
import { AuthContext } from "../context/auth.context"
import { useContext, useCallback } from "react"
import Button from 'react-bootstrap/Button';
import logo_heart from "../assets/logo-symbol.png"

const DashBoardPage = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleButtonClick = useCallback(() => {
        navigate("/albumform")
    }, [])

    return (
        <div className="dashboard-container">
            <h1><img src={logo_heart} alt="heart" className="heart" />Welcome {user ? user.firstName : "user"}</h1>
            <AlbumList />
            <Button variant="secondary" onClick={handleButtonClick}>New album</Button>
        </div>
    )

}

export default DashBoardPage