import { useState } from "react";
import Rating from "./Rating";
import axios from "axios";

export default function Question(props) {

    const [value, setValue] = useState("")

    if (props.question.questionType === "text") {
        return (
            <label className="question">
                {props.question.label}
                <input type="text" value={value} onChange={e => {
                    setValue(e.target.value)
                    let newArr = [...props.answers]
                    newArr[props.index] = e.target.value
                    props.setAnswers(newArr)
                     axios.get(props.MOVIE_API_URL + e.target.value.replace(/ /g, "+"))
                        .then(res => {
                            props.setMovieData(res.data)
                        }).catch(err => {
                            console.log(err)
                        })
                }} />
                <p></p>
            </label>
        )
    }

    if (props.question.questionType === "rating") {
        return (
            <label className="question">
                {props.question.label}
                <Rating
                    setAnswers={props.setAnswers}
                    answers={props.answers}
                    index={props.index}
                    setValue={setValue}
                    maxValue={props.question.attributes.max} />
            </label>

        )
    }
}