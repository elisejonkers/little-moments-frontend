import { AxiosResponse, AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import EventsList from "./EventsList"
import Button from 'react-bootstrap/Button';
import logo_heart from "../assets/logo-symbol.png"
import albumService from "../services/album.service";
import { Album } from "../types/album.types"
import ConfirmDelete from "./ConfirmDelete";

const initialAlbumDetails: Album = {
    name: 'Initial name',
    dateOfBirth: new Date(),
    place: 'Initial place',
    length: 0,
    weight: 0
}

const AlbumDetails: React.FC = () => {
    //TIP: Instead of setting initial data, you could display a spinner or pageloader
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const [albumDetails, setAlbumDetails] = useState<Album>(initialAlbumDetails)
    const { albumId } = useParams()
    const navigate = useNavigate()

    const handleEditClick = () => {
        navigate(`/albumedit/${albumId}`)
    }

    const deleteAlbum = () => {
        setShowConfirmation(true)
    }

    const handleConfirmDelete = () => {
        setShowConfirmation(false)

        albumService.deleteAlbum(albumId)
            .then((_response: AxiosResponse) => {
                console.log("Album deleted")
                navigate("/dashboard")
            })
            .catch((error: AxiosError) => {
                console.log("Error deleting album", error)
            })
    }

    const handleCancelDelete = () => {
        setShowConfirmation(false)
    }

    useEffect(() => {
        albumService.getAlbum(albumId)
            .then((response: AxiosResponse) => {
                setAlbumDetails(response.data)
            })
            .catch((error: AxiosError) => {
                console.log("Error getting album details", error)
            })
    }, [albumId])

    return (
        <div className="album-details-container">
            <h1><img src={logo_heart} alt="heart" className="heart" />{albumDetails.name.toUpperCase()}</h1>
            <div className="albumdetails">
                <h2>About me</h2>
                <p>My name is <span className="different-font">{albumDetails.name}</span></p>
                <p>I was born on <span className="different-font">
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }).format(new Date(albumDetails.dateOfBirth))}</span>
                </p>
                <p>I was born in <span className="different-font">{albumDetails.place}</span></p>
                <p>I was <span className="different-font">{albumDetails.length}</span> cms when I was born</p>
                <p>I weighed <span className="different-font">{albumDetails.weight}</span> grams when I was born</p>
                <div className="albumdetails-buttons"><Button onClick={handleEditClick}>Edit</Button>
                    <Button onClick={deleteAlbum}>Delete</Button>
                </div>
                <div className="albumdetails-events">
                    <EventsList albumId={albumId} />
                </div>
            </div>
            {showConfirmation && (
                <ConfirmDelete
                    onConfirmAlbum={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    )
}

export default AlbumDetails