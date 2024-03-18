import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import albumService from "../services/album.service";
import { Album } from "../types/album.types"

const AlbumList: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([])

    useEffect(() => {
        albumService.getAllAlbums()
            .then((response) => {
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
                    <div className="albumlist-container-item" key={index}>
                        <Link to={`/albums/${album._id}`} style={{ textDecoration: 'none' }}>
                            <div className="profile-picture-wrapper">
                                <img src={album.imageURL} alt="baby" />
                            </div>
                            <h4 className="babyname">{album.name}</h4>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default AlbumList