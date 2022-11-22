import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const colors = {
    orange: "FFBA5A",
    grey: "a9a9a9"
}

export default function Rating(props) {
    const stars = Array(props.maxValue).fill(0)
    const [currentValue, setCurrentValue] = useState(0)
    const [hoverValue, setHoverValue] = useState(undefined)

    function onClick(index) {
        setCurrentValue(index + 1)
        let newArr = [...props.answers]
        newArr[props.index] = index + 1
        props.setAnswers(newArr)
    }

    return (
        <div className="Rating">
            <div className="stars">
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            onClick={() => onClick(index)}
                            onMouseEnter={() => setHoverValue(index + 1)}
                            onMouseLeave={() => setHoverValue(undefined)}
                            color={(index + 1 <= (hoverValue || currentValue)) ? colors.orange : colors.grey}
                            style={{
                                marginRight: 3,
                                cursor: "pointer",
                            }}
                        />
                    )
                })}
            </div>
            <p>
                {hoverValue || currentValue}
                {(hoverValue || currentValue) === 1 ? " star!" : " stars!"}
            </p>
        </div>
    );
};