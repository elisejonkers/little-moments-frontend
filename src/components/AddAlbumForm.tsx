import axios, { AxiosResponse, AxiosError } from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

interface Album {
    name: string,
    dateOfBirth: Date,
    place: string,
    length: number,
    weight: number
}

const AddAlbumForm: React.FC = () => {
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Album>({
        name: "",
        dateOfBirth: new Date(),
        place: "",
        length: 0,
        weight: 0
    })

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

        axios
            .post(`http://localhost:5005/api/albums`, formData, {
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