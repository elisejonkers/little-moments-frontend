import axios, { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

interface Album {
    name: string,
    dateOfBirth: Date,
    place: string,
    length: number,
    weight: number
}

const AlbumEdit: React.FC = () => {
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()
    const { albumId } = useParams()
    const [formData, setFormData] = useState<Album>({
        name: "",
        dateOfBirth: new Date(),
        place: "",
        length: 0,
        weight: 0
    })

    const getAlbumDetails = () => {
        axios
            .get(`http://localhost:5005/api/albums/${albumId}`, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .then((response: AxiosResponse<Album>) => {
                const { dateOfBirth, ...otherData } = response.data
                const newDateOfBirth = new Date(dateOfBirth)
                setFormData({...otherData, dateOfBirth: newDateOfBirth})
            })
            .catch((error: AxiosError) => {
                console.log("error getting details album", error)
            })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === "dateOfBirth") {
            const date = new Date(value)
            setFormData({...formData, [name]: date})
        } else {
            setFormData({...formData, [name]: value})
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios
        .put(`http://localhost:5005/api/albums/${albumId}`, formData, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((response: AxiosResponse) => {
            console.log("Album updated")
            navigate(`/albums/${albumId}`)
        })
        .catch((error: AxiosError) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAlbumDetails()
    }, [albumId])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    required={true}
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="dateOfBirth"
                    required={true}
                    value={formData.dateOfBirth.toISOString().split('T')[0]}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="place"
                    required={true}
                    value={formData.place}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="length"
                    required={true}
                    value={formData.length}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="weight"
                    required={true}
                    value={formData.weight}
                    onChange={handleInputChange}
                />
                <button>Save</button>

            </form>

        </>
    )
}

export default AlbumEdit