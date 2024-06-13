import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addColor } from '../../../redux/reducers/colorSlice';

const AddColorForm = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            await dispatch(addColor(values));
            form.resetFields();
            onClose();
        } catch (error) {
            console.error('Failed to add color:', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Validation failed:', errorInfo);
    };

    return (
        <Modal
            title="Add New Color"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="colorName"
                    label="Color Name"
                    rules={[{ required: true, message: 'Please enter color name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Add Color
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddColorForm;
