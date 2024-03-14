//import "../styling/app.css"

import axios, { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import service from "../services/file-upload.service"
import default_picture from "../assets/default-picture.jpg"
import CloseButton from 'react-bootstrap/CloseButton';

const apiURL = process.env.REACT_APP_API_URL

interface Event {
    category: "Motor development" | "Social development" | "Language development" | "Sensory development" | "Other" | "Open this select menu",
    title: string,
    date: Date,
    description: string,
    album?: string | undefined
    imageURL?: string | undefined
}

interface AddEventFormProps {
    albumId?: string | undefined
    toggleAddEventForm?: () => void | undefined
    loadEvents?: () => void | undefined
}

const AddEventForm: React.FC<AddEventFormProps> = ({ albumId, toggleAddEventForm, loadEvents }) => {
    const [handleFileUploadCalled, setHandleFileUploadCalled] = useState<boolean>(false)
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState("")
    const [formData, setFormData] = useState<Event>({
        category: "Open this select menu",
        title: "",
        date: new Date(),
        description: "",
        imageURL: default_picture
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
            const response = await service.uploadImage(uploadData, storedToken)
            console.log("response is: ", response)
            setImageUrl(response.fileURL)
            setHandleFileUploadCalled(true)
            console.log(imageUrl)
        } catch (error) {
            console.log("error while uploading file: ", error)
        }
    }

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

        // let newRequestBody = {...formData}

        // if (handleFileUploadCalled) {
        //     newRequestBody = {...formData, imageURL: imageUrl}
        // } else {
        //     newRequestBody = {...formData}
        // } 

        axios
            .get(`${apiURL}/api/albums/${albumId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response: AxiosResponse) => {
                const album = response.data
                if (!album) {
                    throw new Error('Album was not found')
                }

                let newEventData = {
                    ...formData,
                    album: album._id
                }

                if (handleFileUploadCalled) {
                    newEventData = {...formData, album: album._id, imageURL: imageUrl}
                } 

                return axios.post(`${apiURL}/api/albums/${album}/events`, newEventData, {
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
            console.log(formData)
    }

    const closeForm = () => {
        toggleAddEventForm?.()
    }

    return (
        <div className="add-event-form-container">
            <CloseButton onClick={closeForm} className="close-button"/>
               <h1>CREATE A NEW EVENT</h1>
            <Form onSubmit={handleSubmit} className="add-event-form">
            
             
                <br />

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