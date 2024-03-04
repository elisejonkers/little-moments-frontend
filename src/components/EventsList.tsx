import axios, { AxiosResponse, AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AddEventForm from "./AddEventForm"
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from "../assets/baby.jpg"

interface Event {
    category: "Motor development" | "Social development" | "Language development" | "Sensory development" | "Other",
    title: string,
    date: Date,
    description: string,
    albumID: string | undefined,
    _id: string,
    imageURL?: string
}

interface EventsListProps {
    albumId?: string | undefined
    //text: string
}

const EventsList: React.FC<EventsListProps> = ({ albumId }) => {
    const [isAddEventFormVisible, setIsEventFormVisible] = useState<boolean>(false)
    const [eventsList, setEventsList] = useState<Event[]>([])
    const storedToken = localStorage.getItem("authToken");

    const loadEvents = () => {
        axios
            .get(`http://localhost:5005/api/albums/${albumId}/events`,
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
            .then((response: AxiosResponse) => {
                console.log(response.data)
                setEventsList(response.data)
            })
            .catch((error: AxiosError) => {
                console.log("Error loading events", error)
            })
    }

    const toggleAddEventForm = () => {
        setIsEventFormVisible((prevIsToggled) => !prevIsToggled)
    }

    const deleteEvent = (eventId: string) => {
        console.log("Delete buttons invoked", eventId)
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this album and the associated events?"
        )

        if (confirmDelete) {
            axios.delete(`http://localhost:5005/api/albums/${albumId}/events/${eventId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
                .then((response: AxiosResponse) => {
                    console.log("Event deleted succesfully")
                    loadEvents()
                })
                .catch((error: AxiosError) => {
                    console.log("Error deleting event", error)
                })
        }
    }

    useEffect(() => {
        loadEvents()
    }, [])

    return (
        <div>
            <Button onClick={toggleAddEventForm} className="add-event-button">New event</Button>
            {isAddEventFormVisible && (
                <AddEventForm albumId={albumId} toggleAddEventForm={toggleAddEventForm} loadEvents={loadEvents} />
            )}
            <div className="carousel-container">
                <Carousel>
                    {eventsList.map((event) => {
                        return (
                            <Carousel.Item>
                                <div className="carousel-items">
                                    <div className="carousel-picture-wrapper">
                                    <img src={event.imageURL} alt="First Slide" />
                                    </div>
                                    <div className="carousel-text">
                                        <h3>{event.title}</h3>
                                        <p>
                                            {new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }).format(new Date(event.date))}
                                        </p>
                                        <p>{event.category}</p>
                                        <p>{event.description}</p>
                                        <div className="eventslist-buttons">
                                            <Link to={(`/albums/${albumId}/eventedit/${event._id}`)}><Button>Edit</Button></Link>
                                            <Button onClick={() => deleteEvent(event._id)}>Delete</Button>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        </div>
        // <>
        //     <div>
        //         <Button onClick={toggleAddEventForm}>Add new event</Button>
        //         {isAddEventFormVisible && (
        //             <AddEventForm albumId={albumId} toggleAddEventForm={toggleAddEventForm} loadEvents={loadEvents} />
        //         )}
        //     </div>
        //     {eventsList.map((event, index) => {
        //         return (
        //             <div key={index}>
        //                 <p>{event.title}</p>
        //                 <p>{event.category}</p>
        //                 <p>
        //                     {new Intl.DateTimeFormat('en-US', {
        //                         year: 'numeric',
        //                         month: 'long',
        //                         day: 'numeric'
        //                     }).format(new Date(event.date))}
        //                 </p>
        //                 <p>{event.description}</p>
        //                 <div>
        //                     <Link to={(`/albums/${albumId}/eventedit/${event._id}`)}><Button>Edit</Button></Link>
        //                     <Button onClick={() => deleteEvent(event._id)}>Delete</Button>
        //                 </div>
        //                 <br />
        //             </div>
        //         )
        //     })}
        // </>
    )
}

export default EventsList