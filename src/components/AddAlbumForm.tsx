import "../styling/appXS.css"
import "../styling/appS.css"
import "../styling/appM.css"
import "../styling/appL.css"
import "../styling/appXL.css"

import axios, { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import service from "../services/file-upload.service"
import default_profile from "../assets/baby.jpg"

const apiURL = process.env.REACT_APP_API_URL

interface Album {
    name: string,
    dateOfBirth: Date,
    place: string,
    length: number,
    weight: number,
    imageURL?: string | undefined
}

const AddAlbumForm: React.FC = () => {
    const [handleFileUploadCalled, setHandleFileUploadCalled] = useState<boolean>(false)
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
            console.log(response)
            console.log("response is: ", response.fileURL)
            setImageUrl(response.fileURL)
            setHandleFileUploadCalled(true)

        } catch (error) {
            console.log("error while uploading file: ", error)
        }

        console.log(imageUrl)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === "dateOfBirth") {
            const date = new Date(value)
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

        console.log(newRequestBody)

        axios
            .post(
                `${apiURL}/api/albums`, newRequestBody, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response: AxiosResponse) => {
                console.log("Album created")
                navigate("/dashboard")
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }

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
                        onChange={handleInputChange}
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
                        value={formData.dateOfBirth.toISOString().split('T')[0]}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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