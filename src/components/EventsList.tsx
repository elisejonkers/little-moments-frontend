import { AxiosResponse, AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AddEventForm from "./AddEventForm"
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import albumService from "../services/album.service";
import { Event, EventsListProps } from "../types/album.types"
import ConfirmDelete from "./ConfirmDelete";

const EventsList: React.FC<EventsListProps> = ({ albumId }) => {
    const [isAddEventFormVisible, setIsEventFormVisible] = useState<boolean>(false)
    const [eventsList, setEventsList] = useState<Event[]>([])
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

    const loadEvents = () => {
        albumService.getAllEvents(albumId)
            .then((response: AxiosResponse) => {
                setEventsList(response.data)
            })
            .catch((error: AxiosError) => {
                console.log("Error loading events", error)
            })
    }

    const toggleAddEventForm = () => {
        setIsEventFormVisible((prevIsToggled) => !prevIsToggled)
    }

    const deleteEvent = () => {
        setShowConfirmation(true)
    }

    const handleConfirmDelete = (eventId: string | undefined) => {
        setShowConfirmation(false)

        albumService.deleteEvent(albumId, eventId)
        .then((_response: AxiosResponse) => {
            console.log(`Event ${eventId} deleted succesfully`)
            loadEvents()
        })
        .catch((error: AxiosError) => {
            console.log("Error deleting event", error)
        })
    }

    const handleCancelDelete = () => {
        setShowConfirmation(false)
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
                            <Carousel.Item key={event._id}>
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
                                            <Button onClick={deleteEvent}>Delete</Button>
                                        </div>
                                    </div>
                                    {showConfirmation && (<ConfirmDelete
                                    onConfirmEvent={handleConfirmDelete}
                                    onCancel={handleCancelDelete}
                                    eventID={event._id}
                                    />
                                    )}
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