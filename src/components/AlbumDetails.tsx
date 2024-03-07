//import "../styling/app.css"

import axios, { AxiosResponse, AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import AddEventForm from "./AddEventForm"
import EventsList from "./EventsList"
import AlbumEdit from "./AlbumEdit"
import Button from 'react-bootstrap/Button';
import logo_heart from "../assets/logo-symbol.png"

interface Album {
    name: string,
    dateOfBirth: Date | string,
    place: string,
    length: number,
    weight: number
}

const initialAlbumDetails: Album = {
    name: 'Initial name',
    dateOfBirth: new Date(),
    place: 'Initial place',
    length: 0,
    weight: 0
}

const AlbumDetails: React.FC = () => {
    const storedToken = localStorage.getItem("authToken");
    const [albumDetails, setAlbumDetails] = useState<Album>(initialAlbumDetails)
    const { albumId } = useParams()
    const navigate = useNavigate()

    const loadAlbumDetails = () => {
        axios
            .get(`http://localhost:5005/api/albums/${albumId}`,
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
            .then((response: AxiosResponse<Album>) => {
                setAlbumDetails(response.data)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }

    const deleteAlbum = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this album and the associated events?"
        )

        if (confirmDelete) {
            axios
                .delete(`http://localhost:5005/api/albums/${albumId}`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response: AxiosResponse) => {
                    console.log("Album deleted succesfully")
                    navigate("/dashboard")
                })
                .catch((error: AxiosError) => {
                    console.log("Error deleting album", error)
                })
        }
    }

    useEffect(() => {
        loadAlbumDetails()
    }, [albumId])

    return (
        <div className="album-details-container">
            <h1><img src={logo_heart} alt="heart" className="heart" />{albumDetails.name.toUpperCase()}</h1>
            <div className="albumdetails-overview">
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
                    <div className="albumdetails-buttons"><Link to={(`/albumedit/${albumId}`)}><Button>Edit</Button></Link>
                        <Button onClick={deleteAlbum}>Delete</Button>
                    </div>
                </div>
                <div className="albumdetails-events">
                    <EventsList albumId={albumId} />
                </div>
            </div>
        </div>
    )
}

export default AlbumDetails