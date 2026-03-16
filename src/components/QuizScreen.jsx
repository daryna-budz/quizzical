import { useState, useEffect } from "react"
import { getQuestions } from "../utils"
import {decode} from 'html-entities';



export function QuizScreen(){

    const [questions, setQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [showResults, setShowResults] = useState(false)
    


    useEffect(() => {
        async function loadQuestions() {
            const data = await getQuestions()
            const shuffledData = data.map(q => {
                const answers = [
                    q.correct_answer,
                    ...q.incorrect_answers
                ];
                console.log(q.correct_answer) 
                return {
                    ...q,
                    answers: shuffleArray(answers), 
                };
            });
            setQuestions(shuffledData);
        }
        loadQuestions()
    }, [])

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5)
    }

    function chooseAnswer(question, answer){
        setSelectedAnswers( prev => ({
            ...prev,
            [question]: answer
        })
        )
    }

     function checkResults(){
        let count = 0;
        questions.forEach((elem) =>{
            if(elem.correct_answer === selectedAnswers[elem.question]){
                count+=1
            }
        })
        setCorrectAnswers(count)
        setShowResults(true)
     }





    const quizObjects = questions.map((elem)=>{

        return (
            <div key={elem.question}className="quiz-element">

                <h2 className="quiz-question">{decode(elem.question)}</h2>
                <div className="quiz-answers">
                    {elem.answers.map(answer => (
                        <button 
                        key={answer} 
                        onClick={()=>chooseAnswer(elem.question,answer)}
                        disabled={showResults}
                        className={`
                            ${selectedAnswers[elem.question] === answer ? "selected" : ""}
                            ${
                                showResults && answer === elem.correct_answer
                                    ? "correct"
                                    : ""
                            }
                            ${
                                showResults &&
                                selectedAnswers[elem.question] === answer &&
                                answer !== elem.correct_answer
                                    ? "wrong"
                                    : ""
                            }
                        `}
                        >
                            {decode(answer)}
                        </button>
                    ))}
                </div>
                <div className="bottom-line"></div>
                </div>
        )
    })



    return (
        <section className="quiz-screen">
             
             {quizObjects}
             {!showResults && Object.keys(selectedAnswers).length === questions.length && <button className="check-btn" onClick={checkResults}>Check results</button>}
             {showResults && 
                    <div className="play-again">
                        <p>You scored {correctAnswers}/5 correct answers 🎉</p>
                        <button className="again-btn">Play again</button>
                    </div>
                  }

             <img src="../src/assets/blob-ylw.svg" className="blob blob-yellow" />
             <img src="../src/assets/blob-blue.svg" className="blob blob-blue" />
        </section>
    )
}