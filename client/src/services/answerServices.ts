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
    createdAt: "",
    updatedAt: "",
    question: questionId,
  };
};

export const getAnswers = async (
  questionId: string,
  dispatch: AppDispatch,
  authHeader: string
) => {
  const res = await axiosGet({ url: `/api/answers/${questionId}`, authHeader });
  dispatch(setAnswers(res.data));
  return res.data;
};
export const addAnswer = async (
  answer: IAnswer,
  questionId: string,
  dispatch: AppDispatch,
  authHeader: string
) => {
  await axiosPost({
    url: `/api/answers/${questionId}`,
    data: answer,
    authHeader: authHeader,
  });
  await getAnswers(questionId, dispatch, authHeader);
};

export const responeToAnswer = async (
  answerId: string,
  questionId: string,
  type: string,
  dispatch: AppDispatch,
  authHeader: string
) => {
  await axiosPost({
    url: `/api/answers/${answerId}/${type}`,
    authHeader,
    data: {},
  });
  await getAnswers(questionId, dispatch, authHeader);
};
