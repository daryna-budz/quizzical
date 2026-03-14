import { useState, useEffect } from "react"
import { getQuestions } from "../utils"
import {encode, decode} from 'html-entities';



export function QuizScreen(){

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        async function loadQuestions() {
            const data = await getQuestions()
            setQuestions(data)
        }
        loadQuestions()
    }, [])

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5)
    }



    const quizObjects = questions.map((elem)=>{
        const answers = shuffleArray([
                elem.correct_answer,
                ...elem.incorrect_answers
        ])

        return (
            <div key={elem.question}className="quiz-element">

                <h2 className="quiz-question">{decode(elem.question)}</h2>
                <div className="quiz-answers">
                    {answers.map(answer => (
                        <button key={answer}>{decode(answer)}</button>
                    ))}
                </div>
                <div className="bottom-line"></div>
                </div>
        )
    })



    return (
        <section className="quiz-screen">
             
             {quizObjects}

             <img src="../src/assets/blob-ylw.svg" className="blob blob-yellow" />
             <img src="../src/assets/blob-blue.svg" className="blob blob-blue" />
        </section>
    )
}