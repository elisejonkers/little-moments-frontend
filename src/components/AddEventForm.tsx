import axios, {AxiosResponse, AxiosError} from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Event {
    category: "Motor development" | "Social development" | "Language development" | "Sensory development" | "Other",
    title: string,
    date: Date,
    description: string,
    albumID: string | undefined
}

interface AddEventFormProps {
    albumId?: string | undefined
    isAddEventFormVisible?: boolean | undefined
    loadAlbumDetails?: () => void | undefined
}

const AddEventForm: React.FC<AddEventFormProps> = ({albumId, isAddEventFormVisible, loadAlbumDetails}) => {
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Event>({
        category: "Other",
        title: "",
        date: new Date(),
        description: "",
        albumID: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        
        if (name === "date") {
            const date = new Date(value)
            setFormData({...formData, [name]: date, albumID: albumId})
        } else {
            setFormData({...formData, [name]: value, albumID: albumId})
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(formData)

        axios
            .post(`http://localhost:5005/api/albums/${albumId}/events`, formData, {
            headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response: AxiosResponse) => {
            console.log("Event created", albumId)
            })
            .catch((error: AxiosError) => {
            console.log(error)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Category of event
                    <select
                        name="category"
                        required={true}
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        <option disabled selected value="">Select an option</option>
                        <option value="Motor development">Motor development</option>
                        <option value="Social development">Social development</option>
                        <option value="Language development">Language development</option>
                        <option value="Sensory development">Sensory development</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label>Title of event
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        required={true}
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </label>
                <label>Date of event
                    <input
                        type="date"
                        name="date"
                        required={true}
                        value={formData.date.toISOString().split('T')[0]}
                        onChange={handleInputChange}
                    />
                </label>
                <label> Description of event
                    <textarea
                        name="description"
                        maxLength={1000}
                        value={formData.description}
                        onChange={handleInputChange}
                        >
                    </textarea>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddEventForm