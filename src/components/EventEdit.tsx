import axios, { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

interface Event {
    category: "Motor development" | "Social development" | "Language development" | "Sensory development" | "Other",
    title: string,
    date: Date,
    description: string,
    albumID: string | undefined
    _id?: string
}

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
        <div className="edit-container">
            <Form onSubmit={handleSubmit}>
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
                        <option value="Motor development">Motor development</option>
                        <option value="Social development">Social development</option>
                        <option value="Language development">Language development</option>
                        <option value="Sensory development">Sensory development</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </FloatingLabel>

                <br/>

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

                <br/>

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

                <br/>

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
                     
                <Button type="submit">Save</Button>
            </Form>
        </div>
    )
}

export default EventEdit