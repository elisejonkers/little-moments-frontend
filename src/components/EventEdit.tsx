import axios, { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

interface Event {
    category: "Motor development" | "Social development" | "Language development" | "Sensory development" | "Other",
    title: string,
    date: Date,
    description: string,
    albumID: string | undefined
    _id?: string
}

// interface EventEditProps {
//     albumId?: string | undefined
// }

const EventEdit: React.FC = () => {
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()
    const { eventId, albumId } = useParams()
    const [formData, setFormData] = useState<Event>({
        category: "Other",
        title: "",
        date: new Date(),
        description: "",
        albumID: ""
    })

    const getEventDetails = () => {
        axios
            .get(`http://localhost:5005/api/albums/${albumId}/events/${eventId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response: AxiosResponse<Event>) => {
                console.log(response.data)
                const { date, ...otherData } = response.data
                const newDate = new Date(date)
                setFormData({...otherData, date: newDate})
            })
            .catch((error: AxiosError) => {
                console.log("error getting details album", error)
            })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === "date") {
            const correctDate = new Date(value)
            setFormData({...formData, [name]: correctDate})
        } else {
            setFormData({...formData, [name]: value})
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios
            .put(`http://localhost:5005/api/albums/${albumId}/events/${eventId}`, formData, {
            headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response: AxiosResponse) => {
            console.log("Event updated")
            navigate(`/albums/${albumId}`)
            })
            .catch((error: AxiosError) => {
            console.log(error)
            })
    }

    useEffect(() => {
        getEventDetails()
    }, [eventId])

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
                <label>Description of event
                    <textarea 
                        name="description"
                        maxLength={1000}
                        value={formData.description}
                        onChange={handleInputChange}
                        >
                        </textarea>
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EventEdit