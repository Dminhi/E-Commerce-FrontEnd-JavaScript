import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { updateColor, getAllColors } from '../../../redux/reducers/colorSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const EditColorForm = ({ open, onClose, color }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        if (color) {
            form.setFieldsValue({
                colorName: color.colorName,
            });
        }
    }, [color, form]);

    const onFinish = async (values) => {
        try {
            const resultAction = await dispatch(updateColor({ ...values, id: color.id }));
            unwrapResult(resultAction);
            form.resetFields();
            onClose();
            dispatch(getAllColors());
        } catch (error) {
            console.error('Failed to update color:', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Validation failed:', errorInfo);
    };

    return (
        <Modal
            title="Edit Color"
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
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditColorForm;
