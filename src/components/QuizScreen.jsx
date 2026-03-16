import { useState, useEffect } from "react"
import { getQuestions } from "../utils"
import {decode} from 'html-entities';



export function QuizScreen(){

    const [questions, setQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [showResults, setShowResults] = useState(false)
    

    async function loadQuestions() {
        const data = await getQuestions()
        const shuffledData = data.map((q, index) => {
            const answers = [
                q.correct_answer,
                ...q.incorrect_answers
            ];
            console.log(q.correct_answer) 
            return {
                id: index,
                question: q.question,
                correct: q.correct_answer,
                answers: shuffleArray(answers)
            };
        });
        setQuestions(shuffledData);
    }


    useEffect(() => {
        loadQuestions()
    }, [])

    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5)
    }

    function chooseAnswer(id, answer){
        setSelectedAnswers( prev => ({
            ...prev,
            [id]: answer
        })
        )
    }

     function checkResults(){
        let count = 0;
        questions.forEach((elem) =>{
            if(elem.correct === selectedAnswers[elem.id]){
                count+=1
            }
        })
        setCorrectAnswers(count)
        setShowResults(true)
     }


     function playAgain(){
        setSelectedAnswers({})
        setCorrectAnswers(0)
        setShowResults(false)
        loadQuestions()
     }





    const quizObjects = questions.map((elem)=>{

        return (
            <div key={elem.id}className="quiz-element">

                <h2 className="quiz-question">{decode(elem.question)}</h2>
                <div className="quiz-answers">
                    {elem.answers.map(answer => (
                        <button 
                        key={answer} 
                        onClick={()=>chooseAnswer(elem.id,answer)}
                        disabled={showResults}
                        className={`
                            ${selectedAnswers[elem.id] === answer ? "selected" : ""}
                            ${
                                showResults && answer === elem.correct
                                    ? "correct"
                                    : ""
                            }
                            ${
                                showResults &&
                                selectedAnswers[elem.id] === answer &&
                                answer !== elem.correct
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
                        <button className="again-btn" onClick={playAgain}>Play again</button>
                    </div>
                  }

             <img src="../src/assets/blob-ylw.svg" className="blob blob-yellow" />
             <img src="../src/assets/blob-blue.svg" className="blob blob-blue" />
        </section>
    )
}