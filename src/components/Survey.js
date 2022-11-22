import axios from "axios";
import { useState, useEffect } from "react";
import Question from "./Question";
import Intro from "./Intro";
import { useNavigate } from "react-router-dom";
import "./Components.css";

export default function Survey() {
    const [surveyData, setSurveyData] = useState({})
    const API_URL = 'https://637b6f2f10a6f23f7fa8a22f.mockapi.io/api/v1/survey'
    const [answers, setAnswers] = useState([])
    const [formError, setFormError] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate()
    const MOVIE_API_URL = "https://api.themoviedb.org/3/search/movie?api_key=14bc85ab2a3f282b7e8c5f3ea3fe1a56&language=en-US&query="
    const [movieData, setMovieData] = useState({})

    function getData() {
        axios.get(API_URL)
            .then(res => {
                setSurveyData(res.data.data)
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        console.log(formError)
        if (formError.length === 0 && isSubmit) {
            console.log(answers)
        }
    }, [formError])

    function handleSubmit(event) {
        event.preventDefault();
        setFormError(validate(answers))
        setIsSubmit(true)

        if (surveyData.attributes.questions.length === answers.length && !answers.includes(undefined) && !answers.includes("") && movieData.total_results !== 0) {
            const postAnswer = {
                data: {
                    type: "surveyAnswers",
                    attributes: {
                        answers: surveyData.attributes.questions.map((item, index) => (
                            {
                                questionId: item.questionId,
                                answer: answers[index]
                            })
                        )
                    }
                }
            }
            axios.post("https://637b6f2f10a6f23f7fa8a22f.mockapi.io/api/v1/survey/2660/answers", postAnswer)
                .then(res => {
                    console.log(res);
                })
            navigate("/submit", { state: { questions: surveyData.attributes.questions, postedAnswers: answers } });
        }
    }

    function validate(values) {
        for (let i = 0; i < surveyData.attributes.questions.length; i++) {
            if (surveyData.attributes.questions[i].required && (values[i] === undefined || values[i] === "")) {
                return "All info is required!"
            }
        }
        return ""
    }

    if (Object.keys(surveyData).length === 0) {
        return <h1>Loading</h1>
    }

    return (
        <div className="survey">
            <Intro title={surveyData.attributes.title} description={surveyData.attributes.description} />
            <form onSubmit={handleSubmit} className="form">
                {
                    surveyData.attributes.questions.map((question, index) =>
                        <Question
                            question={question}
                            setAnswers={setAnswers} 
                            answers={answers} 
                            index={index}
                            setMovieData={setMovieData} 
                            MOVIE_API_URL={MOVIE_API_URL}/>)
                }
                <p className="alert">{formError}</p>
                {movieData.total_results === 0 && <p className="alert">No such movie exists!</p>}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}