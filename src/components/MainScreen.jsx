
import { Link } from "react-router-dom";


export function MainScreen(){


    return (
        <section className="main-screen">
             <h1>Quizzical</h1>
             <p className="main-description">Check your knowledge!</p>
             <Link to="/quiz">
                 <button className="start-btn">Start quiz</button>
             </Link>

             <img src="../src/assets/blob-ylw.svg" className="blob blob-yellow" />
             <img src="../src/assets/blob-blue.svg" className="blob blob-blue" />
        </section>
    )
}