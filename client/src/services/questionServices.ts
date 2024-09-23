import { axiosGet, axiosPost } from "./axiosConfig";
import { setQuestions } from "../features/question/questionSlice";
import { IQuestion } from "../interface/questionInterface";
import { AppDispatch } from "../redux/store";

interface IQuestionRequest {
  dispatch: AppDispatch;
  question?: IQuestion;
  id?: string;
  authHeader: string;
}

export const getQuestions = async ({
  dispatch,
  authHeader,
}: IQuestionRequest) => {
  if (!authHeader || !dispatch) {
    return;
  }
  const res = await axiosGet({ authHeader, url: "/api/questions" });
  dispatch(setQuestions(res.data));
  return res.data;
};

export const addQuestion = async ({
  dispatch,
  question,
  authHeader,
}: IQuestionRequest) => {
  if (!authHeader || !dispatch) {
    return;
  }
  await axiosPost({ authHeader, url: `/api/questions`, data: question });
  await getQuestions({ dispatch, authHeader });
};

export const getQuestion = async ({
  dispatch,
  id,
  authHeader,
}: IQuestionRequest) => {
  if (!authHeader || !dispatch) {
    return;
  }
  const res = await axiosGet({
    url: `/api/questions/${id}`,
    authHeader: authHeader,
  });
  return res.data;
};

export const initialQuestionState: IQuestion = {
  _id: "",
  title: "",
  body: "",
  tags: [],
  user: {
    username: "",
    _id: "",
  },
};
