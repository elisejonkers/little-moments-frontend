import axios from "axios";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb"

const storedToken = localStorage.getItem("authToken");
//Go to the Ironhack explanation to set the token in the Headers

interface Album {
    _id: ObjectId,
    name: string,
    placeOfBirth: Date,
    place: string,
    length: number,
    weight: number
}

const AlbumList: React.FC = () => {
    const storedToken = localStorage.getItem("authToken");
    const [albums, setAlbums] = useState<Album[]>([])
    
    const loadAlbums = () => {
        //storedToken
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
            return <h4 key={index}>{album.name}</h4>

        })}
        </>
    )
   
}

export default AlbumList