import axios, { AxiosResponse, AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AddEventForm from "./AddEventForm"

interface Event {
    category: "Motor development" | "Social development" | "Language development" | "Sensory development" | "Other",
    title: string,
    date: Date,
    description: string,
    albumID: string | undefined
    _id: string
}

interface EventsListProps {
    albumId?: string | undefined
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
        console.log("Delete button invoked", eventId)
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
        <>
            <div>
                <button onClick={toggleAddEventForm}>Add new event</button>
                {isAddEventFormVisible && (
                    <AddEventForm albumId={albumId} toggleAddEventForm={toggleAddEventForm} loadEvents={loadEvents} />
                )}
            </div>
            {eventsList.map((event, index) => {
                return (
                    <div key={index}>
                        <p>{event.title}</p>
                        <p>{event.category}</p>
                        <p>
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }).format(new Date(event.date))}
                        </p>
                        <p>{event.description}</p>
                        <div>
                            <Link to={(`/albums/${albumId}/eventedit/${event._id}`)}><button>Edit</button></Link>
                            <button onClick={() => deleteEvent(event._id)}>Delete</button>
                        </div>
                        <br />
                    </div>
                )
            })}
        </>
    )
}

export default EventsList