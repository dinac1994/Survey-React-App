import { useLocation } from "react-router-dom"
import "./Components.css"

export default function Submit() {
    const location = useLocation()
    return (
        <div className="submit">
            <h2>Thank you for rating the movie.</h2>
            <h2>Preview of questions and your submitted answers: </h2>
            <div className="preview">
            {location.state.postedAnswers.map((item, index) => (
                <div>
                    <p>Q: {location.state.questions[index].label}</p>
                    <p>A: {item}</p>
                </div>
            ))}
            </div>
        </div>
    )
}