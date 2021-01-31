/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Lottie } from '@crello/react-lottie';

import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import QuestionReview from '../../components/QuestionReview';

import loadingAnimation from './animations/loading.json';

function QuestionResult({ question, answer, index }) {
  // eslint-disable-next-line eqeqeq
  const result = answer == question.answer;

  return (
    <QuestionReview success={result}>
      #
      {index + 1}
      {' '}
      <em>{question.title}</em>
      Resposta:
      {' '}
      {question.alternatives[answer]}
      {result === true
        ? <img alt="Acertou" className="success" src="https://pics.freeicons.io/uploads/icons/png/11875166141558096434-512.png" />
        : <img alt="Errou" className="wrong" src="https://pics.freeicons.io/uploads/icons/png/15491589561537355604-512.png" />}

      { result === false && (
      <>
        <br />
        {' '}
        <span>
          Resposta correta:
          {' '}
          {question.alternatives[question.answer]}
        </span>
      </>
      )}

      {question.source && (
        <>
          <br />
          <span>
            Referência:
            {' '}
            {question.source}
          </span>
        </>
      )}
    </QuestionReview>
  );
}

function ResultWidget({
  answers, questions, name,
}) {
  // eslint-disable-next-line eqeqeq
  const rightAnswers = answers.filter((answer, index) => questions[index].answer == answer).length;

  return (
    <Widget>
      <Widget.Header>
        {name}
        , veja seu resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          { rightAnswers }
          {' '}
          perguntas (
          {(rightAnswers * 100) / questions.length}
          %):
        </p>
        <ul>
          {answers.map((answer, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`answer__${answer}__${index}`}>
              <QuestionResult
                question={questions[index]}
                index={index}
                answer={answer}
              />
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Aguarde... nosso estagiário está digitando as perguntas...
      </Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
        <img src="https://i.giphy.com/SwImQhtiNA7io.gif" style={{ width: '100%', height: 'auto' }} alt="Carregando..." />
        {/* <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        /> */}
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addAnswer,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addAnswer(selectedAlternative);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onClick={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({
  externalQuestions, externalBg, name, title,
}) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addAnswer(answer) {
    setAnswers([
      ...answers,
      answer,
    ]);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);

    return () => clearTimeout(timer);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addAnswer={addAnswer}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT
          && (
          <ResultWidget
            name={name}
            answers={answers}
            questions={externalQuestions}
          />
          )}
      </QuizContainer>
    </QuizBackground>
  );
}
