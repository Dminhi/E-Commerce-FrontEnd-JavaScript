import React, { useState } from "react";

import { ADD_COMMENT } from "../../../redux/api/service/commentService";
import { Avatar } from "antd";
import CommentList from "./CommentList";
import Editor from "./Editor";
import { UserOutlined } from "@ant-design/icons";

const CommentForm = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [reload, setReload] = useState(true);

  const handleSubmit = async () => {
    if (!value) return;
    const user = JSON.parse(localStorage.getItem("userAccount")) || {};
    const userId = user.userId;
    const productDetailId = +id;
    const commentForm = {
      comment: value,
      productDetailId: productDetailId,
      userId: userId,
    };
    await ADD_COMMENT(commentForm);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setComments([
        ...comments,
        {
          author: "User",
          avatar: <Avatar icon={<UserOutlined />} />,
          content: <p>{value}</p>,
          datetime: new Date().toLocaleString(),
        },
      ]);
      setValue("");
    }, 1000);
    setReload(!reload);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {id && <CommentList reload={reload} id={id} />}
      <div className="mb-6">
        <Editor
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          value={value}
        />
      </div>
    </div>
  );
};

export default CommentForm;
