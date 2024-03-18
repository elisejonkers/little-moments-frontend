import { Button } from "react-bootstrap"
import { ConfirmDeleteProps } from "../types/album.types"

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({onConfirmAlbum, onConfirmEvent, onCancel, eventID}) => {
    console.log(eventID)
    const handleClick = () => {
        if(onConfirmAlbum) {
            onConfirmAlbum()
        } else if (onConfirmEvent && eventID) {
            onConfirmEvent(eventID)
        } else {
            console.error("No function to call")
        }
    }

    return (
        <div className="delete-window">
            <p>Are you sure you want to delete this item?</p>
            <Button onClick={handleClick}>Delete</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </div>
    )
}

export default ConfirmDelete