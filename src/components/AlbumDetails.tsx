import { AxiosResponse, AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import EventsList from "./EventsList"
import Button from 'react-bootstrap/Button';
import logo_heart from "../assets/logo-symbol.png"
import albumService from "../services/album.service";
import { Album } from "../types/album.types"

const initialAlbumDetails: Album = {
    name: 'Initial name',
    dateOfBirth: new Date(),
    place: 'Initial place',
    length: 0,
    weight: 0
}

const AlbumDetails: React.FC = () => {
    //TODO: Instead of setting initial data, you could display a spinner or pageloader
    const [albumDetails, setAlbumDetails] = useState<Album>(initialAlbumDetails)
    const { albumId } = useParams()
    const navigate = useNavigate()

    const handleEditClick = () => {
        navigate(`/albumedit/${albumId}`)
    }

    const deleteAlbum = () => {

        //TODO:Create a simple alert coomponent and show it on top of the page
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this album and the associated events?"
        )

        if (confirmDelete) {
            albumService.deleteAlbum(albumId)
                .then((_response: AxiosResponse) => {
                    console.log("Album deleted")
                    navigate("/dashboard")
                })
                .catch((error: AxiosError) => {
                    console.log("Error deleting album", error)
                })
        }
    }
    //TODO: This effect should not have dependency but you can check before removing it
    useEffect(() => {
        albumService.getAlbum(albumId)
            .then((response: AxiosResponse) => {
                //console.log(response.data)
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
        </div>
    )
}

export default AlbumDetails