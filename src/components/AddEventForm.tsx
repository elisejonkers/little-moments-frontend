import { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import service from "../services/file-upload.service"
import default_picture from "../assets/default-picture.jpg"
import CloseButton from 'react-bootstrap/CloseButton';
import Spinner from 'react-bootstrap/Spinner'
import albumService from "../services/album.service";
import { Event, AddEventFormProps, InputFormControlElement } from "../types/album.types"
import moment from "moment";

const AddEventForm: React.FC<AddEventFormProps> = ({ albumId, toggleAddEventForm, loadEvents }) => {
    const [handleFileUploadCalled, setHandleFileUploadCalled] = useState<boolean>(false)
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const storedToken = localStorage.getItem("authToken");
    const [imageUrl, setImageUrl] = useState("")
    const [formData, setFormData] = useState<Event>({
        category: "Open this select menu",
        title: "",
        date: new Date(),
        description: "",
        imageURL: default_picture
    })

    // TODO: Create a custom hook using useCallback and try to reuse this function whever you are uploading images
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
            //console.log("response is: ", response)
            setImageUrl(response.fileURL)
            setHandleFileUploadCalled(true)
            //console.log(imageUrl)
        } catch (error) {
            console.log("error while uploading file: ", error)
        }
    }

    useEffect(() => {
        if (imageUrl) {
            setShowSpinner(false)
        }
    }, [imageUrl])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === "date") {
            const date = moment(value, 'YYYY-MM-DD').toDate()
            setFormData({ ...formData, [name]: date })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        albumService.getAlbum(albumId)
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
                    newEventData = { ...formData, album: album._id, imageURL: imageUrl }
                }
                return albumService.createEvent(albumId, newEventData)
            })
            .then((_response: AxiosResponse) => {
                console.log("Event created")
                setFormData({
                    category: "Other",
                    title: "",
                    date: new Date(),
                    description: ""
                })
                //console.log(formData)
                loadEvents?.()
                toggleAddEventForm?.()
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
        //console.log(formData)
    }

    const closeForm = () => {
        toggleAddEventForm?.()
    }

    return (
        <div className="add-event-form-container">
            <CloseButton onClick={closeForm} className="close-button" />
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
                        onChange={(e: React.ChangeEvent<InputFormControlElement>) => handleFileUpload(e)}
                    />
                    {showSpinner && <Spinner animation="border" />}
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
                        value={moment(formData.date).format('YYYY-MM-DD')}
                        //value={formData.date.toISOString().split('T')[0]}
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