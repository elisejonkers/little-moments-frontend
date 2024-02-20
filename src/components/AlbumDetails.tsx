import axios, { AxiosResponse, AxiosError } from "axios"
import { ObjectId } from "mongodb"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

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

    const handleButtonClick = () => {
        navigate("/eventform")
    }

    useEffect(() => {
        loadAlbumDetails()
    }, [albumId])

    return (
        <div>
            <div>
            <p>{albumDetails.name}</p>
            {/* <p>{albumDetails.dateOfBirth instanceof Date ? albumDetails.dateOfBirth.toLocaleDateString('en-US') : albumDetails.dateOfBirth}</p> */}
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
            </div>
            <div>
                <button onClick={handleButtonClick}>Create new event</button>
            </div>
        </div>
    )

}

export default AlbumDetails