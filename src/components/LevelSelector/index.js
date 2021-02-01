import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../Button';

export const QuizLevel = {
  EASY: 'facil',
  MEDIUM: 'medio',
  HARD: 'dificil',
};

const LevelSelectorContainer = styled.div`
    display: flex;
    margin: 0px -5px 10px;
`;

const LevelSelector = ({ visible, currentLevel, onChangeLevel }) => (visible ? (
  <LevelSelectorContainer>
    <LevelSelector.Button
      type="button"
      color="green"
      onClick={(e) => {
        e.preventDefault();
        onChangeLevel(QuizLevel.EASY);
      }}
      data-selected={currentLevel === QuizLevel.EASY}
    >
      Fácil
    </LevelSelector.Button>
    <LevelSelector.Button
      type="button"
      color="#ff7400"
      onClick={(e) => {
        e.preventDefault();
        onChangeLevel(QuizLevel.MEDIUM);
      }}
      data-selected={currentLevel === QuizLevel.MEDIUM}
    >
      Médio
    </LevelSelector.Button>
    <LevelSelector.Button
      type="button"
      color="red"
      onClick={(e) => {
        e.preventDefault();
        onChangeLevel(QuizLevel.HARD);
      }}
      data-selected={currentLevel === QuizLevel.HARD}
    >
      Difícil
    </LevelSelector.Button>
  </LevelSelectorContainer>
) : null);

LevelSelector.Button = styled(Button)`
    font-size:90%;
    margin: 5px;

    ${(props) => props.color
        && css`
            background-color: ${props.color}
        `};

    ${(props) => props['data-selected']
        && css`
            font-style: italic;         
            font-weight: 900;
            opacity: 0.5;   
        `};
`;

LevelSelector.propTypes = {
  visible: PropTypes.bool.isRequired,
  currentLevel: PropTypes.string.isRequired,
  onChangeLevel: PropTypes.func.isRequired,
};

export default LevelSelector;
