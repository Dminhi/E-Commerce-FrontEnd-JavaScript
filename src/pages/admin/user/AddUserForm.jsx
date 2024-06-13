import { Button, Form, Input } from "antd";

import { ADD_USER } from "../../../redux/reducers/thunk/userThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (e) => {
    const formRegister = {
      username: e.username,
      email: e.email,
      password: e.password,
    };
    dispatch(ADD_USER(formRegister));
    navigate("/admin/user");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg, mt-5">
      <h2 className="text-2xl font-semibold mb-6">Add New User</h2>
      <Form
        form={form}
        name="add_user"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Add User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUserForm;
