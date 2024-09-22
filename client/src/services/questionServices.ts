import { axiosGet, axiosPost } from "./axiosConfig";
import { setQuestions } from "../features/question/questionSlice";
import { IQuestion } from "../interface/questionInterface";

export const getQuestions = async (dispatch: any) => {
  const res = await axiosGet("/api/questions");
  dispatch(setQuestions(res.data));
  return res.data;
};

export const addQuestion = async (question: any, dispatch: any) => {
  await axiosPost("/api/questions", question);
  await getQuestions(dispatch);
};

export const getQuestion = async (id: string) => {
  const res = await axiosGet(`/api/questions/${id}`);
  //dispatch(setQuestion(res.data));
  return res.data;
}

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
