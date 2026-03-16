
import { Link } from "react-router-dom";
import blobYellow from "../assets/blob-ylw.svg"
import blobBlue from "../assets/blob-blue.svg"


export function MainScreen(){


    return (
        <section className="main-screen">
             <h1>Quizzical</h1>
             <p className="main-description">Check your knowledge!</p>
             <Link to="/quiz">
                 <button className="start-btn">Start quiz</button>
             </Link>

             <img src={blobYellow} className="blob blob-yellow" />
             <img src={blobBlue} className="blob blob-blue" />
        </section>
    )
}