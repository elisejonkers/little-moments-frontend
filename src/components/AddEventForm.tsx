import axios, { AxiosResponse, AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Event {
    category: "Motor development" | "Social development" | "Language development" | "Sensory development" | "Other",
    title: string,
    date: Date,
    description: string,
    album?: string | undefined
}

interface AddEventFormProps {
    albumId?: string | undefined
    toggleAddEventForm?: () => void | undefined
    loadEvents?: () => void | undefined
}

const AddEventForm: React.FC<AddEventFormProps> = ({ albumId, toggleAddEventForm, loadEvents }) => {
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Event>({
        category: "Other",
        title: "",
        date: new Date(),
        description: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === "date") {
            const date = new Date(value)
            setFormData({ ...formData, [name]: date })
        } else {
            setFormData({ ...formData, [name]: value})
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios
            .get(`http://localhost:5005/api/albums/${albumId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response: AxiosResponse) => {
                const album = response.data
                if (!album) {
                    throw new Error('Album was not found')
                }
                const newEventData = {
                    ...formData,
                    album: album._id
                }

                return axios.post(`http://localhost:5005/api/albums/${album}/events`, newEventData, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                })
            })
            .then((response: AxiosResponse) => {
                console.log("Event created")
                setFormData({
                    category: "Other",
                    title: "",
                    date: new Date(),
                    description: ""
                })
                loadEvents?.()
                toggleAddEventForm?.()
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