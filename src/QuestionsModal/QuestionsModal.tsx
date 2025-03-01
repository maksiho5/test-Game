'use client'

import React, { useState, useEffect } from 'react';
import styles from './QuestionsModal.module.css'; // Создайте этот файл

interface Question {
    num1: number;
    num2: number;
    sign: string;
    correctAnswer: number;
}

interface QuestionsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const QuestionsModal: React.FC<QuestionsModalProps> = ({ isOpen, onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [answers, setAnswers] = useState<number[]>([]); 
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState<boolean>(false); 
    const [answerText, setAnswerText] = useState("")

    const questionsData: Question[] = [
        { num1: 5, num2: 3, sign: '+', correctAnswer: 8 },
        { num1: 10, num2: 4, sign: '-', correctAnswer: 6 },
        { num1: 2, num2: 6, sign: '*', correctAnswer: 12 },
        { num1: 15, num2: 3, sign: '/', correctAnswer: 5 },
        
    ];

   
    const getRandomNumber = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    const generateAnswers = (correctAnswer: number): number[] => {
        const answerOptions: number[] = [correctAnswer];
        while (answerOptions.length < 3) {
            const randomAnswer = getRandomNumber(correctAnswer - 5, correctAnswer + 5); 
            if (!answerOptions.includes(randomAnswer) && randomAnswer !== correctAnswer) {
                answerOptions.push(randomAnswer);
            }
        }
      
        for (let i = answerOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answerOptions[i], answerOptions[j]] = [answerOptions[j], answerOptions[i]];
        }
        return answerOptions;
    };


    const pickNewQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questionsData.length);
        const question = questionsData[randomIndex];
        setCurrentQuestion(question);
        const newAnswers = generateAnswers(question.correctAnswer);
        setAnswers(newAnswers);
        setSelectedAnswer(null); 
        setIsAnswered(false);
    };

    useEffect(() => {
        if (isOpen) {
            pickNewQuestion();
        }
    }, [isOpen]);

  
    const handleAnswerClick = (answer: number) => {
        if (isAnswered) return; 
        console.log(answer);
        
        setSelectedAnswer(answer);
        setIsAnswered(true);

        
        if (answer === currentQuestion?.correctAnswer) {
          
            setAnswerText("Правильно")
            console.log('Correct!');
        } else {
            setAnswerText("Неправильно")

            console.log('Incorrect!');
        }
    };

   
    const handleConfirmAnswer = () => {
        if (selectedAnswer === currentQuestion?.correctAnswer) {
       
            setAnswerText((el) => el = "Правильно")
            console.log('Correct!');
        } else {
            setAnswerText("Неправильно")

            console.log('Incorrect!');
        }
        // Закрываем модальное окно и готовим новый вопрос для следующего открытия
        onClose();
    };

    if (!isOpen || !currentQuestion) {
        return null; 
    }

    const { num1, num2, sign } = currentQuestion; // Деструктуризация для удобства

    return (
        <>
            {isOpen ? <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                    <div className={styles.questions}>
                        <div className={styles.numbers}>
                            <h3 >{num1}</h3>
                            <h3 >{sign}</h3>
                            <h3 >{num2}</h3>
                            <h3>= ?</h3>
                        </div>
                        <div className={styles.answers}>
                            {answers.map((answer, index) => (
                                <div
                                    key={index}
                                    className={`${styles.answersNumber} ${selectedAnswer === answer
                                            ? answer === currentQuestion.correctAnswer
                                                ? styles.correctAnswer
                                                : styles.incorrectAnswer
                                            : ''
                                        }`}
                                    onClick={() => handleAnswerClick(answer)}
           
                                >
                                    {answer}
                                </div>
                            ))}
                        </div>

                        <div className={styles.answerText}>{answerText}</div>
                        {isAnswered && (
                            <button className={styles.confirmButton} onClick={handleConfirmAnswer}>
                                Далее
                            </button>
                        )}
                    </div>
                </div>
            </div> : ""}
        </>

    );
};

export default QuestionsModal;