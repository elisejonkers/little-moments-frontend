import "../styling/appXS.css"
import "../styling/appS.css"
import "../styling/appM.css"
import "../styling/appL.css"
import "../styling/appXL.css"

import { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Spinner from 'react-bootstrap/Spinner'
import service from "../services/file-upload.service"
import default_profile from "../assets/baby.jpg"
import albumService from "../services/album.service"
import { Album, InputFormControlElement } from "../types/album.types"
import moment from "moment"

const AddAlbumForm: React.FC = () => {
    const [handleFileUploadCalled, setHandleFileUploadCalled] = useState<boolean>(false)
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState("")
    const [formData, setFormData] = useState<Album>({
        name: "",
        dateOfBirth: new Date(),
        place: "",
        length: 0,
        weight: 0,
        imageURL: default_profile
    })

    useEffect(() => {
        if (imageUrl) {
            setShowSpinner(false)
        }
    }, [imageUrl])

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
            //console.log(response)
            //console.log("response is: ", response.fileURL)
            setImageUrl(response.fileURL)
            setHandleFileUploadCalled(true)

        } catch (error) {
            console.log("error while uploading file: ", error)
        }
        //console.log(imageUrl)
    }

    const setAlbumInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === "dateOfBirth") {
            const date = moment(value, 'YYYY-MM-DD').toDate()
            setFormData({ ...formData, [name]: date })
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

        //console.log(newRequestBody)

        albumService.createAlbum(newRequestBody)
            .then((_response: AxiosResponse) => {
                console.log("Album created")
                navigate("/dashboard")
            })
            .catch((error: AxiosError) => {
                console.log("Error creating an album", error)
            })
    }

    //TOO: moment or luxon for dates handling

    return (
        <div className="album-form-container">
            <Form onSubmit={handleSubmit}>
                <h1>CREATE A NEW ALBUM</h1>
                <br />
                <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Name"
                        required={true}
                        value={formData.name}
                        onChange={setAlbumInput}
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
                    label="Date of birth"
                    className="mb-3"
                >
                    <Form.Control
                        type="date"
                        placeholder="Date of birth"
                        name="dateOfBirth"
                        required={true}
                        //value={formData.dateOfBirth.toISOString().split('T')[0]}
                        value={moment(formData.dateOfBirth).format('YYYY-MM-DD')}
                        onChange={setAlbumInput}
                    />
                </FloatingLabel>

                <br />

                <FloatingLabel
                    controlId="floatingInput"
                    label="Place of birth"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="Place of birth"
                        name="place"
                        required={true}
                        value={formData.place}
                        onChange={setAlbumInput}
                    />
                </FloatingLabel>

                <br />

                <FloatingLabel
                    controlId="floatingInput"
                    label="Length in cm"
                    className="mb-3"
                >
                    <Form.Control
                        type="number"
                        placeholder="Length in cm"
                        name="length"
                        required={true}
                        value={formData.length}
                        onChange={setAlbumInput}
                    />
                </FloatingLabel>

                <br />

                <FloatingLabel
                    controlId="floatingInput"
                    label="Weight in gram"
                    className="mb-3"
                >
                    <Form.Control
                        type="number"
                        placeholder="Weight in gram"
                        name="weight"
                        required={true}
                        value={formData.weight}
                        onChange={setAlbumInput}
                    />
                </FloatingLabel>

                <br />

                <Button variant="secondary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    )
}

export default AddAlbumForm