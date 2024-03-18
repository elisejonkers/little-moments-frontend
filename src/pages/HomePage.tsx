import "../styling/appXS.css"

import beach from "../assets/family-beach.jpg"
import minion from "../assets/kid-minion.jpg"
import album from "../assets/creating-album.jpg"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';

function HomePage() {
    return (
        <div className="homepage-container">
            <div className="homepage-container-picture">
                <img src={minion} alt="kid camera" id="minion-picture" className="homepage-picture" />
                <div></div>
                <div></div>
                <img src={album} alt="creating an album" id="album-picture" className="homepage-picture album" />
                <img src={beach} alt="beach picture" className="homepage-picture" />
            </div>
            <div className="homepage-container-text">
                <h1>Welcome to Little Moments</h1>
                <br />
                <p>Welcome to our community! Join us in capturing the magic of childhood as we cherish every laugh, embrace each new discovery, and honor every milestone. Create an account right now and preserve these precious memories together.</p>
                <Link to="/signup" className="create-account"><Button>CREATE AN ACCOUNT NOW</Button></Link>
                <br />
                <br />
                <h5>Getting started</h5>
                <p>Get started by creating your children's albums where you can capture and preserve their precious moments. You can create multiple albums for each child and organize their life events in a beautiful and meaningful way.</p>
                <br />
                <h5>Create and manage albums</h5>
                <p>To create a new album, click on the "New Album" button and add the child's name, date of birth, place of birth, length in cm, and weight in kg. You can also optionally add a picture.</p>
                <br />
                <p>Edit or delete album information by accessing the album details and making the necessary modifications. Maintain accurate and updated records of your child's growth and milestones.</p>
                <br />
                <h5>Create and manage events</h5>
                <p>Inside each album, you can create, edit, or delete specific life events. When adding an event, include a title, category, date of the event, and a description that encapsulates the special moment.</p>
                <br />
                <p>Enhance the event details by optionally adding images that vividly capture the essence of the moment. Share your child's experiences through visual storytelling.</p>
                <br />
                <p>Assign categories to events to better organize and navigate through different types of milestones. From "First Steps" to "Special Holidays", categorize and remember every special moment.</p>
                <br />
                <h5>Explore and enjoy</h5>
                <p>Dive into the creation of your family's album legacy. Relive and celebrate the journey of your child's growth, achievements, and memorable moments through the power of visual storytelling.</p>
            </div>
        </div>
    )
}

export default HomePage