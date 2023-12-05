import { Router } from "express";
import {
  addQuestion,
  deleteQuestion,
  editQuestion,
  getQuestion,
  getSingleQuestion,
} from "../controllers/Question.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const question = Router();

question
  .get("/getallquestion", getQuestion)
  .get("/getquestion/:id", getSingleQuestion);
question.post("/addquestion", authMiddleware, addQuestion);
question.put("/editquestion/:id", authMiddleware, editQuestion);
question.delete("/deletequestion/:id", authMiddleware, deleteQuestion);

export default question;