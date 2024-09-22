import { Router } from "express";
import validateToken from "../middleware/validateToken";
import {
  createQuestion,
  getQuestion,
  getQuestions,
} from "../controllers/questionsController";
const router = Router();

router.use(validateToken);
router.route("/").get(getQuestions).post(createQuestion);
router.route("/:id").get(getQuestion);

//router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
//router.route("/deleteAll").delete(deleteAllContact);

export default router;
