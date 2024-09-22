import { setAnswers } from "../features/answer/answerSlice";
import { IAnswer } from "../interface/questionInterface";
import { AppDispatch } from "../redux/store";
import { axiosGet, axiosPost } from "./axiosConfig";


export const initialAnswerState = (questionId: string): IAnswer => {
  return {
    _id: "",
    body: "",
    user: {
      username: "",
      _id: "",
    },
    likes: 0,
    dislikes: 0,
    createdAt: null,
    updatedAt: null,
    question: questionId,
  };
};

export const getAnswers = async (questionId: string, dispatch: AppDispatch) => {
  const res = await axiosGet(`/api/answers/${questionId}`);
  dispatch(setAnswers(res.data));
  return res.data;
};
export const addAnswer = async (
  answer: IAnswer,
  questionId: string,
  dispatch: AppDispatch
) => {
  await axiosPost(`/api/answers/${questionId}`, answer);
  await getAnswers(questionId, dispatch);
};



export const responeToAnswer = async (
  answerId: string,
  questionId: string,
  type: string,
  dispatch: AppDispatch
) => {
  await axiosPost(`/api/answers/${answerId}/${type}`, {});
  await getAnswers(questionId, dispatch);
};
