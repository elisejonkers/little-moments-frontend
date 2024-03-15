import axios from "axios";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb"
import { Link } from "react-router-dom";
import albumService from "../services/album.service";

const apiURL = process.env.REACT_APP_API_URL

interface Album {
    _id: ObjectId,
    name: string,
    dateOfBirth: Date,
    place: string,
    length: number,
    weight: number,
    imageURL?: string
}

const AlbumList: React.FC = () => {
    const storedToken = localStorage.getItem("authToken");
    const [albums, setAlbums] = useState<Album[]>([])

    // const loadAlbums = () => {
    //     axios
    //         .get(`${apiURL}/api/albums`,
    //             {
    //                 headers: { Authorization: `Bearer ${storedToken}` },
    //             })
    //         .then((response) => {
    //             console.log(response.data)
    //             setAlbums(response.data)
    //         })
    //         .catch((error) => {
    //             console.log("Error loading albums", error)
    //         })
    // }

    useEffect(() => {
        //loadAlbums()
        albumService.getAllAlbums()
        .then((response) => {
            console.log(response.data)
            setAlbums(response.data)
        })
        .catch((error) => {
            console.log("Error fetching all albums", error)
        })
    }, [])

    return (
        <div className="albumlist-container">
            {albums.map((album, index) => {
                return (
                    <div className="albumlist-container-item">
                        <Link to={`/albums/${album._id}`} style={{ textDecoration: 'none' }}>
                            <div className="profile-picture-wrapper">
                        <img src={album.imageURL} alt="baby" />
                        </div>
                        <h4 key={index} className="babyname">{album.name}</h4>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default AlbumList