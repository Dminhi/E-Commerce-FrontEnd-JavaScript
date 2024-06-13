import { ADD_BANNER, BANNER } from "../../../redux/api/service/bannerService";
import { Avatar, Button, Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";

import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AddBannerForm = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("bannerName", values.bannerName);
    formData.append("description", values.description);
    formData.append("file", file);
    await ADD_BANNER(formData);
    await BANNER({ page: 0, pageSize: 10 });
    window.location.href = "/admin/banner";
  };

  useEffect(() => {
    BANNER({ page: 0, pageSize: 10 });
  }, [form]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to submit the banner!");
  };

  const handleFileChange = (info) => {
    const file = info.target.files[0];
    setFile(file);
  };

  return (
    <>
      <div className="container mx-auto p-4 max-w-xl bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Banner
        </h2>
        <Form
          form={form}
          name="banner_form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="flex justify-center mb-6">
            <label htmlFor="avatarInput" className="cursor-pointer">
              <Avatar
                size={100}
                src={file && URL.createObjectURL(file)}
                icon={!file && <UploadOutlined />}
                style={{ border: "2px solid #1890ff" }}
              />
            </label>
            <Input
              id="avatarInput"
              name="file"
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </div>
          <Form.Item
            label="Banner Name"
            name="bannerName"
            rules={[
              { required: true, message: "Please input your banner name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddBannerForm;
