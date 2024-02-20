import { useNavigate } from "react-router-dom"
import AddAlbumForm from "../components/AddAlbumForm"
import AlbumList from "../components/Albumlist"

const DashBoardPage = () => {
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate("/albumform")
    }
    
    return (
        <>
        <h1>This is dashboard</h1>
        <AlbumList/>
        <button onClick={handleButtonClick}>Add new album</button>
        </>
    )

}

export default DashBoardPage