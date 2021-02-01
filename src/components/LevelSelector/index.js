import React from 'react';
import styled from 'styled-components';
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
    <Button
      style={{ margin: '5px' }}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onChangeLevel(QuizLevel.EASY);
      }}
      data-selected={currentLevel === QuizLevel.EASY}
    >
      Fácil
    </Button>
    <Button
      style={{ margin: '5px' }}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onChangeLevel(QuizLevel.MEDIUM);
      }}
      data-selected={currentLevel === QuizLevel.MEDIUM}
    >
      Médio
    </Button>
    <Button
      style={{ margin: '5px' }}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onChangeLevel(QuizLevel.HARD);
      }}
      data-selected={currentLevel === QuizLevel.HARD}
    >
      Difícil
    </Button>
  </LevelSelectorContainer>
) : null);

LevelSelector.propTypes = {
  visible: PropTypes.bool.isRequired,
  currentLevel: PropTypes.string.isRequired,
  onChangeLevel: PropTypes.func.isRequired,
};

export default LevelSelector;
