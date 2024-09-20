import { axiosGet } from "./axiosConfig";

const getQuestions = async () => {
  const res = await axiosGet("/api/questions");
  //add redoxxx
  return res.data;
};

export { getQuestions };
