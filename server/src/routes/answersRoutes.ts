import { Router } from "express";
import validateToken from "../middleware/validateToken";
import {
  createAnswer,
  dislikeAnswer,
  getAnswers,
  likeAnswer,
} from "../controllers/answerController";

const router = Router();

router.use(validateToken);
router.route("/:id").get(getAnswers).post(createAnswer);
router.route("/:id/like").post(likeAnswer);
router.route("/:id/dislike").post(dislikeAnswer);

export default router;
