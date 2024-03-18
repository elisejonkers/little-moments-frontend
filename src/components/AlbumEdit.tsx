import { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import service from "../services/file-upload.service"
import albumService from "../services/album.service";
import Spinner from 'react-bootstrap/Spinner'
import { Album, InputFormControlElement } from "../types/album.types"
import moment from "moment";

const AlbumEdit: React.FC = () => {
    const storedToken = localStorage.getItem("authToken");
    const [handleFileUploadCalled, setHandleFileUploadCalled] = useState<boolean>(false)
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const navigate = useNavigate()
    const { albumId } = useParams()
    const [imageUrl, setImageUrl] = useState("")
    const [formData, setFormData] = useState<Album>({
        name: "",
        dateOfBirth: new Date(),
        place: "",
        length: 0,
        weight: 0,
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

    const getAlbumDetails = () => {
        albumService.getAlbum(albumId)
            .then((response: AxiosResponse<Album>) => {
                const { dateOfBirth, ...otherData } = response.data
                const newDateOfBirth = new Date(dateOfBirth)
                setFormData({ ...otherData, dateOfBirth: newDateOfBirth })
                //console.log(formData)
            })
            .catch((error: AxiosError) => {
                console.log("error getting details album", error)
            })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        albumService.updateAlbum(albumId, newRequestBody)
            .then((_response: AxiosResponse) => {
                console.log("Album updated")
                navigate(`/albums/${albumId}`)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }

    //TODO: Check effect dependency
    useEffect(() => {
        getAlbumDetails()
        console.log(imageUrl)
    }, [albumId])

    return (
        <div className="edit-container">
            <Form onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        name="name"
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
                        name="dateOfBirth"
                        required={true}
                        value={moment(formData.dateOfBirth).format('YYYY-MM-DD')}
                        //value={formData.dateOfBirth.toISOString().split('T')[0]}
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
                        name="weight"
                        required={true}
                        value={formData.weight}
                        onChange={handleInputChange}
                    />
                </FloatingLabel>
                <Button variant="secondary" type="submit">Save</Button>
            </Form>
        </div>
    )
}

export default AlbumEdit