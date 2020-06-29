import { saveQuestionAnswer, saveQuestion } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";
export const SAVE_QUESTION = "SAVE_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function saveAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  };
}

function saveNewQuestion({ optionOneText, optionTwoText, author }) {
  return {
    type: SAVE_QUESTION,
    optionOneText,
    optionTwoText,
    author
  };
}

export function handleSaveQuestion(question) {
  return dispatch => {
    dispatch(saveNewQuestion(question));
    return saveQuestion(question).catch(e => {
      console.warn("Error saving question", e);
    });
  };
}

export function handleSaveAnswer(info) {
  return dispatch => {
    dispatch(saveAnswer(info));
    return saveQuestionAnswer(info).catch(e => {
      console.warn("Error saving answer", e);
    });
  };
}
