import axios, { AxiosResponse, AxiosError } from "axios"
import { setFips } from "crypto"
import { useEffect, useState } from "react"

interface Event {
    category: "Motor development" | "Social development" | "Language development" | "Sensory development" | "Other",
    title: string,
    date: Date,
    description: string,
    albumID: string | undefined
}

interface EventsListProps {
    albumId?: string | undefined
}

const EventsList: React.FC<EventsListProps> = ({ albumId }) => {
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

    useEffect(() => {
        loadEvents()
    }, [])

    return (
        <>
            <h3>This is events</h3>
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
                        <br />
                    </div>
                )

            })}
        </>
    )
}

export default EventsList