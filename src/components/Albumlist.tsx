import axios from "axios";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb"
import { Link } from "react-router-dom";
import baby from "../assets/baby.jpg"
import "../styling/album.css"

interface Album {
    _id: ObjectId,
    name: string,
    dateOfBirth: Date,
    place: string,
    length: number,
    weight: number
}

const AlbumList: React.FC = () => {
    const storedToken = localStorage.getItem("authToken");
    const [albums, setAlbums] = useState<Album[]>([])

    const loadAlbums = () => {
        axios
            .get("http://localhost:5005/api/albums",
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
            .then((response) => {
                console.log(response.data)
                setAlbums(response.data)
            })
            .catch((error) => {
                console.log("Error loading albums", error)
            })
    }

    useEffect(() => {
        loadAlbums()
    }, [])

    return (
        <div className="albumlist-container">
            {albums.map((album, index) => {
                return (
                    <div className="albumlist-container-item">
                        <Link to={`/albums/${album._id}`} style={{ textDecoration: 'none' }}>
                        <img src={baby} alt="baby" />
                        <h4 key={index} className="babyname">{album.name}</h4>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default AlbumList