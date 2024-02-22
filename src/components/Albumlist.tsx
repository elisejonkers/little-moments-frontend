import axios from "axios";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb"
import { Link } from "react-router-dom";

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
            {headers: { Authorization: `Bearer ${storedToken}`},
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
        <>
        <h3>This is albums</h3>
        {albums.map((album, index) => {
            return (
                <div>
            <h4 key={index}><Link to={`/albums/${album._id}`}>{album.name}</Link></h4>
            </div>
            )
        })}
        </>
    ) 
}

export default AlbumList