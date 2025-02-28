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
    const [answers, setAnswers] = useState<number[]>([]); // Массив ответов (правильный + 2 неправильных)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState<boolean>(false); // Состояние, указывающее, был ли ответ дан
    const [answerText, setAnswerText] = useState("")
    // Массив с вопросами и ответами
    const questionsData: Question[] = [
        { num1: 5, num2: 3, sign: '+', correctAnswer: 8 },
        { num1: 10, num2: 4, sign: '-', correctAnswer: 6 },
        { num1: 2, num2: 6, sign: '*', correctAnswer: 12 },
        { num1: 15, num2: 3, sign: '/', correctAnswer: 5 },
        // Добавьте больше вопросов
    ];

    // Функция для генерации случайного числа в заданном диапазоне (для создания неправильных ответов)
    const getRandomNumber = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Функция для генерации массива ответов
    const generateAnswers = (correctAnswer: number): number[] => {
        const answerOptions: number[] = [correctAnswer];
        while (answerOptions.length < 3) {
            const randomAnswer = getRandomNumber(correctAnswer - 5, correctAnswer + 5); // Диапазон для неправильных ответов
            if (!answerOptions.includes(randomAnswer) && randomAnswer !== correctAnswer) {
                answerOptions.push(randomAnswer);
            }
        }
        // Перемешиваем ответы, чтобы правильный ответ не всегда был на одной позиции
        for (let i = answerOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answerOptions[i], answerOptions[j]] = [answerOptions[j], answerOptions[i]];
        }
        return answerOptions;
    };

    // Функция для выбора нового вопроса
    const pickNewQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questionsData.length);
        const question = questionsData[randomIndex];
        setCurrentQuestion(question);
        const newAnswers = generateAnswers(question.correctAnswer);
        setAnswers(newAnswers);
        setSelectedAnswer(null); // Сброс выбранного ответа
        setIsAnswered(false); // Сброс состояния ответа
    };

    useEffect(() => {
        if (isOpen) {
            pickNewQuestion();
        }
    }, [isOpen]);

    // Обработчик выбора ответа
    const handleAnswerClick = (answer: number) => {
        if (isAnswered) return; // Запрещаем выбор после ответа
        console.log(answer);
        
        setSelectedAnswer(answer);
        setIsAnswered(true);

        
        if (answer === currentQuestion?.correctAnswer) {
            // Правильный ответ - добавьте логику для начисления очков
            setAnswerText("Правильно")
            console.log('Correct!');
        } else {
            setAnswerText("Неправильно")

            console.log('Incorrect!');
        }
    };

    // Обработчик подтверждения ответа (например, для начисления очков)
    const handleConfirmAnswer = () => {
        if (selectedAnswer === currentQuestion?.correctAnswer) {
            // Правильный ответ - добавьте логику для начисления очков
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
        return null; // Не отображаем ничего, если модальное окно закрыто или нет вопроса
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