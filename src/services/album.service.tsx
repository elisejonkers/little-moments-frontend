import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Album, Event } from "../types/album.types"

class AlbumService {
    private readonly api: AxiosInstance

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5005'
        });

        this.api.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const storedToken = localStorage.getItem('authToken');

                if (storedToken) {
                    config.headers.Authorization = `Bearer ${storedToken}`;
                }

                return config;
            },
            (error: any) => {
                return Promise.reject(error)
            }
        )
    }

    //get all
    getAllAlbums = () => {
        return this.api.get('/api/albums');
    };

    getAllEvents = (albumid: string | undefined) => {
        return this.api.get(`/api/albums/${albumid}/events`)
    }

    //create 
    createAlbum = (requestBody: Album) => {
        return this.api.post('/api/albums', requestBody);
    };

    createEvent = (albumid: string | undefined, requestBody: Event) => {
        return this.api.post(`/api/albums/${albumid}/events`, requestBody)
    }

    //get one
    getAlbum = (id: string | undefined) => {
        return this.api.get(`/api/albums/${id}`);
    };

    getEvent = (albumid: string | undefined, eventid: string | undefined) => {
        return this.api.get(`/api/albums/${albumid}/events/${eventid}`)
    }

    //update one
    updateAlbum = (id: string | undefined, requestBody: Album) => {
        return this.api.put(`/api/albums/${id}`, requestBody);
    };

    updateEvent = (albumid: string | undefined, eventid: string | undefined, requestBody: Event) => {
        return this.api.put(`/api/albums/${albumid}/events/${eventid}`, requestBody)
    }

    //delete
    deleteAlbum = (id: string | undefined) => {
        return this.api.delete(`/api/albums/${id}`);
    };

    deleteEvent = (albumid: string | undefined, eventid: string | undefined) => {
        return this.api.delete(`/api/albums/${albumid}/events/${eventid}`)
    }
}

const albumService = new AlbumService();

export default albumService;
