/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';
import db from '../../db.json';

export default function QuizDaGaleraPage({ name }) {
  return (
    <ThemeProvider theme={db.theme}>
      <QuizScreen
        externalQuestions={db.questions}
        externalBg={db.bg}
        name={name}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      name: context.query.name,
    },
  };
}
