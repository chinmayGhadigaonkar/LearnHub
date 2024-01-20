import React, { useCallback, useEffect, useState } from "react";
import AnsForm from "./AnsForm";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FetchRequest from "../../utils/FetchRequest";
import { useDispatch, useSelector } from "react-redux";
import { Triangle } from "lucide-react";
import Answer from "./Answer";
import formatDateDifference from "../../utils/FormatDate";
import {
  getSingleQuestion,
  questionDisLike,
  questionLike,
} from "../../store/slice/SingleQuestionSlice";
import { useAuth, useUser } from "@clerk/clerk-react";
import { GetAllAnswer } from "../../store/slice/answerSlice";

const SingleQuestion = () => {
  // const [upVote, setUpVote] = useState();
  // const [downVote, setDownVote] = useState();
  // const [question, setQuestion] = useState("");
  const getparams = useParams();
  const [user, setUser] = useState();

  // const getSingleQuestion = async (id) => {
  //   try {
  //     const res = await FetchRequest.get(`question/getquestion/${id}`);
  //     const { success, question } = res.data;

  //     if (success) {
  //       setQuestion(question);
  //       setUpVote(question.likes);
  //       setDownVote(question.dislikes);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(question.updatedAt);

  // console.log(createDate);

  const getUser = async () => {
    try {
      const res = await FetchRequest.get(`clerkauth/getuser`);
      const { success, users } = res.data;
      if (success) {
        setUser(users._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    // getSingleQuestion(getparams.id);
    dispatch(getSingleQuestion(getparams.id));
  }, []);

  const { question } = useSelector((state) => state.singleQuestion);

  const upVote = user && question.likeById.includes(user);
  const downVote = user && question.dislikeById.includes(user);

  const originalTimestamp = new Date(question.updatedAt);
  const originalTimestamp2 = new Date(question.createdAt);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Kolkata",
  };
  const formattedDate = originalTimestamp.toLocaleDateString("en-US", options);
  const formattedDate2 = originalTimestamp2.toLocaleDateString(
    "en-US",
    options,
  );

  const dispatch = useDispatch();
  const handleOnLike = (id) => {
    dispatch(questionLike(id));
    dispatch(GetAllQuestion());
  };
  const handleOnDisLike = (id) => {
    dispatch(questionDisLike(id));
    dispatch(GetAllAnswer());
  };

  return (
    <>
      {question && (
        <div className=" px-2 space-y-6 flex-1 py-10">
          <h1 className="text-3xl font-bold">{question.title}</h1>
          <div className="flex">
            <p className="">
              {" "}
              Asked : <span className=" font-semibold"> {formattedDate}</span>
            </p>
            <p className="px-3">
              {" "}
              Modified :{" "}
              <span className=" font-semibold"> {formattedDate2}</span>
            </p>
          </div>

          <hr />
          <div className="flex  md:w-10/12 space-x-4">
            <div className="flex flex-col md:w-4/12">
              <button
                className={` mx-auto h-12 w-12 my-1 text-center shadow-md  text-black border-2  rounded-full p-2 ${
                  upVote ? " bg-red-500  hover:bg-red-100" : "bg-white "
                }`}
                onClick={() => handleOnLike(getparams.id)}>
                <Triangle fill="black" color="none" />
                {/* <Triangle color="#ffffff" strokeWidth={1.5} /> */}
              </button>
              <h1 className="mx-auto my-1 font-semibold  text-xl">
                {question.likes - question.dislikes}
              </h1>
              <button
                className={` mx-auto h-12 w-12 text-center shadow-md  text-black border-2 rounded-full p-2  ${
                  downVote ? "bg-red-500 hover:bg-red-100" : "bg-white"
                }`}
                onClick={() => handleOnDisLike(getparams.id)}>
                <Triangle
                  fill="black"
                  color="none"
                  transform="rotate(180 0 0)"
                />
              </button>
            </div>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: question.description,
                }}></div>
              <div className="tags  flex space-x-3 my-2   ">
                {question.tags &&
                  question.tags[0].map((item) => {
                    return (
                      <li
                        key={item}
                        className=" list-none border-2  w-fit px-2 py-1 bg-red-500 text-white  border-none rounded-sm">
                        {item}
                      </li>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      <hr className=" border-1 border-solid border-black mt-2" />
      <Answer />

      <hr className=" border-1 border-solid border-black mt-2" />
      <AnsForm id={getparams.id} />
    </>
  );
};

export default SingleQuestion;
