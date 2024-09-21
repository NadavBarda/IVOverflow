import { axiosGet, axiosPost } from "./axiosConfig";
import { setQuestion } from "../features/question/questionSlice";
import { IQuestion } from "../interface/questionInterface";

export const getQuestions = async (dispatch: any) => {
  const res = await axiosGet("/api/questions");
  dispatch(setQuestion(res.data));
  return res.data;
};

export const addQuestion = async (question: any, dispatch: any) => {
  await axiosPost("/api/questions", question);
  await getQuestions(dispatch);
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
