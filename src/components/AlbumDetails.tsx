import axios, { AxiosResponse, AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import AddEventForm from "./AddEventForm"
import EventsList from "./EventsList"
import AlbumEdit from "./AlbumEdit"

interface Album {
    //_id: ObjectId,
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
    const [isAddEventFormVisible, setIsEventFormVisible] = useState<boolean>(false)
    const { albumId } = useParams()
    const navigate = useNavigate()

    const loadAlbumDetails = () => {
        axios
            .get(`http://localhost:5005/api/albums/${albumId}`,
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
            .then((response: AxiosResponse<Album>) => {
                //console.log(response.data)
                setAlbumDetails(response.data)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }

    // const handleButtonClick = () => {
    //     navigate("/eventform")
    // }

    const handleAddEventForm = () => {
        setIsEventFormVisible(true)
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
        <div>
            <div>
            <p>{albumDetails.name}</p>
            <p>
                {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }).format(new Date(albumDetails.dateOfBirth))}
            </p>
            <p>{albumDetails.place}</p>
            <p>{albumDetails.length}</p>
            <p>{albumDetails.weight}</p>
            <Link to={(`/albumedit/${albumId}`)}><button>Edit</button></Link>
            <button onClick={deleteAlbum}>Delete</button>
            </div>
            {/* <div>
                <button onClick={handleButtonClick}>Create new event</button>
            </div> */}
            <div>
                <button onClick={handleAddEventForm}>Add new event</button>
                {isAddEventFormVisible && (
                    <AddEventForm albumId={albumId} isAddEventFormVisible={isAddEventFormVisible} loadAlbumDetails={loadAlbumDetails}/>
                )}
            </div>
            <div>
                <EventsList albumId={albumId}/>
            </div>
        </div>
    )

}

export default AlbumDetails