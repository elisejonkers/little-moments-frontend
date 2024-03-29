//import "../styling/app.css"

import { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Spinner from 'react-bootstrap/Spinner'
import service from "../services/file-upload.service"
import albumService from "../services/album.service";
import { Event, InputFormControlElement } from "../types/album.types"
import moment from "moment";

const EventEdit: React.FC = () => {
    const storedToken = localStorage.getItem("authToken");
    const [handleFileUploadCalled, setHandleFileUploadCalled] = useState<boolean>(false)
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const navigate = useNavigate()
    const { eventId, albumId } = useParams()
    const [imageUrl, setImageUrl] = useState("")
    const [formData, setFormData] = useState<Event>({
        category: "Other",
        title: "",
        date: new Date(),
        description: "",
        album: "",
        imageURL: ""
    })

    const handleFileUpload = async (e: React.ChangeEvent<InputFormControlElement>) => {
        setShowSpinner(true)
        console.log("The file to be uploaded is: ", e.target)

        const file = e.target.files && e.target.files[0]

        if (file) {
            console.log("selected file: ", file)
        }

        const uploadData = new FormData()
        uploadData.append("imageURL", e.target.files![0])

        try {
            const response = await service.uploadImage(uploadData, storedToken)
            console.log("response is: ", response.fileURL)
            setImageUrl(response.fileURL)
            setHandleFileUploadCalled(true)
        } catch (error) {
            console.log("error while uploading file: ", error)
        }
    }
    useEffect(() => {
        if (imageUrl) {
            setShowSpinner(false)
        }
    }, [imageUrl])

    const getEventDetails = () => {
        albumService.getEvent(albumId, eventId)
            .then((response: AxiosResponse<Event>) => {
                const { date, ...otherData } = response.data
                const newDate = new Date(date)
                setFormData({ ...otherData, date: newDate })
            })
            .catch((error: AxiosError) => {
                console.log("error getting details album", error)
            })
    }

    const setEventInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === "date") {
            const correctDate = moment(value, 'YYYY-MM-DD').toDate()
            setFormData({ ...formData, [name]: correctDate })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let newRequestBody = { ...formData }

        if (handleFileUploadCalled) {
            newRequestBody = { ...formData, imageURL: imageUrl }
        } else {
            newRequestBody = { ...formData }
        }

        albumService.updateEvent(albumId, eventId, newRequestBody)
            .then((_response: AxiosResponse) => {
                console.log("Event updated", newRequestBody)
                navigate(`/albums/${albumId}`)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getEventDetails()
    }, [albumId])

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
                        onChange={setEventInput}
                    >
                        <option value="Motor development">Motor development</option>
                        <option value="Social development">Social development</option>
                        <option value="Language development">Language development</option>
                        <option value="Sensory development">Sensory development</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </FloatingLabel>

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
                        onChange={setEventInput}
                    />
                </FloatingLabel>

                <br />

                <FloatingLabel
                    controlId="floatingInput"
                    label="Image"
                    className="mb-3"
                >
                    <Form.Control
                        type="file"
                        name="imageURL"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e: React.ChangeEvent<InputFormControlElement>) => handleFileUpload(e)}
                    />
                    {showSpinner && <Spinner animation="border" />}

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
                        value={moment(formData.date).format('YYYY-MM-DD')}
                        onChange={setEventInput}
                    />
                </FloatingLabel>

                <br />

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
                        onChange={setEventInput}
                    />
                </FloatingLabel>
                <Button type="submit">Save</Button>
            </Form>
        </div>
    )
}

export default EventEdit