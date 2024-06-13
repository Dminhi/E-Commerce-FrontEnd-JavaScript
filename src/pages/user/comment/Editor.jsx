import { Button, Input } from "antd";

import React from "react";

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div className="space-y-4">
    <TextArea rows={4} onChange={onChange} value={value} />
    <Button
      htmlType="submit"
      loading={submitting}
      onClick={onSubmit}
      type="primary"
      className="bg-blue-500"
    >
      Gửi bình luận
    </Button>
  </div>
);

export default Editor;
