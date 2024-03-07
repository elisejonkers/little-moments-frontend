//import "../styling/app.css"

import axios, { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import service from "../services/file-upload.service"

interface Event {
    category: "Motor development" | "Social development" | "Language development" | "Sensory development" | "Other",
    title: string,
    date: Date,
    description: string,
    albumID: string | undefined
    _id?: string,
    imageURL?: string | undefined
}

const EventEdit: React.FC = () => {
    const storedToken = localStorage.getItem("authToken");
    const [handleFileUploadCalled, setHandleFileUploadCalled] = useState<boolean>(false)
    const navigate = useNavigate()
    const { eventId, albumId } = useParams()
    const [imageUrl, setImageUrl] = useState("")
    const [formData, setFormData] = useState<Event>({
        category: "Other",
        title: "",
        date: new Date(),
        description: "",
        albumID: "",
        imageURL: ""
    })

    type InputFormControlElement = HTMLInputElement & {
        files: FileList | null
    }

    useEffect(() => {
        console.log(imageUrl)
    }, [imageUrl])

    const handleFileUpload = async (e: React.ChangeEvent<InputFormControlElement>) => {
        console.log("The file to be uploaded is: ", e.target)

        const file = e.target.files && e.target.files[0]

        if (file) {
            console.log("selected file: ", file)
        }

        const uploadData = new FormData()
        uploadData.append("imageURL", e.target.files![0])

        try {
            const response = await service.uploadImage(uploadData)
            console.log("response is: ", response.fileURL)
            setImageUrl(response.fileURL)
            setHandleFileUploadCalled(true)
            
        } catch (error) {
            console.log("error while uploading file: ", error)
        }
    }

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

        let newRequestBody = {...formData}

        if (handleFileUploadCalled) {
            newRequestBody = {...formData, imageURL: imageUrl}
        } else {
            newRequestBody = {...formData}
        }

        axios
            .put(`http://localhost:5005/api/albums/${albumId}/events/${eventId}`, newRequestBody, {
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
                    label="Image"
                    className="mb-3"
                >
                    <Form.Control 
                    type="file" 
                    name="imageURL"
                    accept=".jpg, .jpeg, .png"
                    //placeholder="Name"
                    //required={true}
                    //value={formData.imageURL}
                    onChange={(e: React.ChangeEvent<InputFormControlElement>) => handleFileUpload(e)}
                    />
                    {/* {formData.imageURL && (
                        <div>Selected file: {formData.imageURL}</div>
                    )} */}

                </FloatingLabel>

                <br />

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