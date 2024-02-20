import axios, { AxiosResponse, AxiosError } from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

interface Album {
    //_id: ObjectId,
    name: string,
    dateOfBirth: Date,
    place: string,
    length: number,
    weight: number
}

const AddAlbumForm: React.FC = () => {
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Album>({
        name: "",
        dateOfBirth: new Date(),
        place: "",
        length: 0,
        weight: 0
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === "dateOfBirth") {
            const date = new Date(value)
            setFormData({ ...formData, [name]: date })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios
            .post(`http://localhost:5005/api/albums`, formData, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response: AxiosResponse) => {
                console.log("Album created")
                navigate("/dashboard")
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required={true}
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of birth"
                    required={true}
                    value={formData.dateOfBirth.toISOString().split('T')[0]}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="place"
                    placeholder="Place of birth"
                    required={true}
                    value={formData.place}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="length"
                    placeholder="Length in cm"
                    required={true}
                    value={formData.length}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight in gram"
                    required={true}
                    value={formData.weight}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddAlbumForm