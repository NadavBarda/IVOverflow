
import { axiosGet, axiosPost } from "./axiosConfig";
import { setQuestion } from "../features/question/questionSlice";

const getQuestions = async (dispatch: any) => {
  const res = await axiosGet("/api/questions");
  dispatch(setQuestion(res.data));
  return res.data;
};

const addQuestion = async (question: any, dispatch: any) => {
  await axiosPost("/api/questions", question);
  await getQuestions(dispatch);
};

export { getQuestions, addQuestion };
