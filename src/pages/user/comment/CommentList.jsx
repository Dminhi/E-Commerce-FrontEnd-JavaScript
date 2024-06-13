import { Avatar, List } from "antd";
import React, { useEffect, useState } from "react";

import { COMMENTS } from "../../../redux/api/service/commentService";
import { UserOutlined } from "@ant-design/icons";

const CommentList = ({ id, reload }) => {
  const [comments, setComments] = useState([]);
  const getComments = async () => {
    const response = await COMMENTS({
      page: 0,
      pageSize: 10,
      id: id,
    });
    setComments(response.content);
  };

  useEffect(() => {
    getComments();
  }, [reload]);

  return (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(props) => (
        <div className="flex items-start space-x-4 p-4">
          <Avatar src={props.avatar} icon={<UserOutlined />} />
          <div className="flex-1">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="font-semibold">{props.user}</div>
              <div>{props.comment}</div>
            </div>
            <div className="text-gray-500 text-sm">{props.datetime}</div>
            <div className="mt-2 flex space-x-4 text-blue-500">
              {props.actions}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default CommentList;
