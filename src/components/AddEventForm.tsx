import axios, { AxiosResponse, AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

interface Event {
    category: "Motor development" | "Social development" | "Language development" | "Sensory development" | "Other" | "Open this select menu",
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
        category: "Open this select menu",
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
            setFormData({ ...formData, [name]: value })
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
        <div className="add-event-form-container">
               <h1>CREATE A NEW EVENT</h1>
            <Form onSubmit={handleSubmit} className="add-event-form">
             
                <br />
                <FloatingLabel
                    controlId="floatingInput"
                    label="Category"
                    className="mb-3"
                >
                    <Form.Select 
                        aria-label="Default select example"
                        name="category"
                        required={true}
                        value={formData.category}
                        onChange={handleInputChange}
                        >
                        <option>Open this select menu</option>
                        <option value="Motor development">Motor development</option>
                        <option value="Social development">Social development</option>
                        <option value="Language development">Language development</option>
                        <option value="Sensory development">Sensory development</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Title"
                    className="mb-3"
                >
                    <Form.Control 
                    type="text" 
                    name="title"
                    placeholder="Title"
                    required={true}
                    value={formData.title}
                    onChange={handleInputChange} 
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Date"
                    className="mb-3"
                >
                    <Form.Control 
                    type="date" 
                    name="date"
                    placeholder="Date"
                    required={true}
                    value={formData.date.toISOString().split('T')[0]}
                    onChange={handleInputChange} 
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingTextarea"
                    label="Description"
                    className="mb-3"
                >
                    <Form.Control 
                    as="textarea" 
                    name="description"
                    placeholder="Date"
                    required={true}
                    value={formData.description}
                    onChange={handleInputChange} 
                    />
                </FloatingLabel>
        
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default AddEventForm