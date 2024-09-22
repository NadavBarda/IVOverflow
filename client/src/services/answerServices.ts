import { IAnswer } from "../interface/questionInterface";

export const initialAnswerState = (id: string): IAnswer => {
  return {
    _id: id,
    body: "",
    user: {
      username: "",
      _id: "",
    },
    likes: 0,
    dislikes: 0,
    createdAt: null,
    updatedAt: null,
    questionId: "",
  };
};

export const getAnswers = async (id: string, dispatch: any) => {
  //   const res = await axiosGet(`/api/answers/${id}/answers`);
  //   dispatch(setAnswers(res.data));
  //   return res.data;
};
export const addAnswer = async (answer: IAnswer, dispatch: any) => {
  // await axiosPost("/api/answers", answer);
  // await getAnswers(dispatch);
};
