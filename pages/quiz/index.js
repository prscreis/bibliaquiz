/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';
import { QuizLevel } from '../../src/components/LevelSelector';
import db from '../../db.json';

// retirado de https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length; let temporaryValue; let
    randomIndex;
  // eslint-disable-next-line prefer-const
  let newArray = array;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    newArray[currentIndex] = array[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
}

export default function QuizDaGaleraPage({ name, level }) {
  const quizLevel = level === QuizLevel.EASY
  || level === QuizLevel.MEDIUM
  || level === QuizLevel.HARD ? level : QuizLevel.EASY;

  let quizQuestions = db.questions;

  if (quizLevel === QuizLevel.MEDIUM) {
    quizQuestions = quizQuestions.concat(db.questionsMediumLevel);
    quizQuestions = shuffle(quizQuestions);
  } else if (quizLevel === QuizLevel.HARD) {
    quizQuestions = quizQuestions.concat(db.questionsMediumLevel, db.questionsHardLevel);
    quizQuestions = shuffle(quizQuestions);
  }

  return (
    <ThemeProvider theme={db.theme}>
      <QuizScreen
        externalQuestions={quizQuestions}
        externalBg={db.bg}
        title={db.title}
        name={name}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      name: context.query.name,
      level: !context.query.level ? QuizLevel.EASY : context.query.level,
    },
  };
}
