//import "../styling/app.css"

import axios, { AxiosResponse, AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AddEventForm from "./AddEventForm"
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import albumService from "../services/album.service";

const apiURL = process.env.REACT_APP_API_URL

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
    albumId?: string
    //text: string
}

const EventsList: React.FC<EventsListProps> = ({ albumId }) => {
    const [isAddEventFormVisible, setIsEventFormVisible] = useState<boolean>(false)
    const [eventsList, setEventsList] = useState<Event[]>([])
    const storedToken = localStorage.getItem("authToken");

    const loadEvents = () => {
        // axios
        //     .get(`${apiURL}/api/albums/${albumId}/events`,
        //         {
        //             headers: { Authorization: `Bearer ${storedToken}` },
        //         })
            albumService.getAllEvents(albumId)
            .then((response: AxiosResponse) => {
                const retrievedData = response.data
                //TODO: Move sorting to API
                const sortedEvents = retrievedData.slice().sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
                setEventsList(sortedEvents)
                console.log(eventsList)
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
            // axios.delete(`${apiURL}/api/albums/${albumId}/events/${eventId}`, {
            //     headers: { Authorization: `Bearer ${storedToken}` },
            // })
                albumService.deleteEvent(albumId, eventId)
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
        <>
            <Button onClick={toggleAddEventForm} className="add-event-button">New event</Button>
            {isAddEventFormVisible && (
                <AddEventForm albumId={albumId} toggleAddEventForm={toggleAddEventForm} loadEvents={loadEvents} />
            )}
            <div className="carousel-container">
                <Carousel>
                    {eventsList.map((event) => {
                        return (
                            // TODO:Add list key otherwise react would throw error in console
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
        </>
    )
}

export default EventsList