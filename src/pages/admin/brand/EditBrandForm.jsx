import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { updateBrand, getAllBrand } from '../../../redux/reducers/brandSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const EditBrandForm = ({ open, onClose, brand }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        if (brand) {
            form.setFieldsValue({
                brandName: brand.brandName,
                description: brand.description,
                file: [],
            });
        }
    }, [brand, form]);

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('brandName', values.brandName);
        formData.append('description', values.description);
        formData.append('id', brand.id);
        if (values.file && values.file.length > 0) {
            formData.append('file', values.file[0].originFileObj);
        }

        try {
            const resultAction = await dispatch(updateBrand(formData));
            unwrapResult(resultAction);
            form.resetFields();
            onClose();
            dispatch(getAllBrand());  // Cập nhật lại danh sách sau khi chỉnh sửa
        } catch (error) {
            console.error('Failed to update brand:', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Validation failed:', errorInfo);
    };

    return (
        <Modal
            title="Edit Brand"
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
                    name="brandName"
                    label="Brand Name"
                    rules={[{ required: true, message: 'Please enter brand name' }]}
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
                    label="Brand Image"
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

export default EditBrandForm;
