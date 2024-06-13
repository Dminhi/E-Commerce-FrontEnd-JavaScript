import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { updateCategory, getAllCategory } from '../../../redux/reducers/categorySlice';
import { unwrapResult } from '@reduxjs/toolkit';

const EditCategoryForm = ({ visible, onClose, category, page, limit }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        if (category) {
            form.setFieldsValue({
                categoryName: category.categoryName,
                description: category.description,
                file: [],
            });
        }
    }, [category, form]);

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('categoryName', values.categoryName);
        formData.append('description', values.description);
        formData.append('id', category.id);
        if (values.file && values.file.length > 0) {
            formData.append('file', values.file[0].originFileObj);
        }

        try {
            const resultAction = await dispatch(updateCategory(formData));
            unwrapResult(resultAction);
            form.resetFields();
            onClose();
            dispatch(getAllCategory({ page, limit }));
        } catch (error) {
            console.error('Failed to update category:', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Validation failed:', errorInfo);
    };

    return (
        <Modal
            title="Edit Category"
            visible={visible}
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
                    name="categoryName"
                    label="Category Name"
                    rules={[{ required: true, message: 'Please enter category name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter description' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="file"
                    label="Category Image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                >
                    <Upload name="file" beforeUpload={() => false} listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
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

export default EditCategoryForm;
