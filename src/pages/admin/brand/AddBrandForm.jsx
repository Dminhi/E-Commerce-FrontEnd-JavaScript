import React from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addBrand } from '../../../redux/reducers/brandSlice';

const AddBrandForm = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('brandName', values.brandName);
        formData.append('description', values.description);
        if (values.file && values.file.length > 0) {
            formData.append('file', values.file[0].originFileObj);
        }

        try {
            await dispatch(addBrand(formData));
            form.resetFields();
            onClose();
        } catch (error) {
            console.error('Failed to add brand:', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Validation failed:', errorInfo);
    };

    return (
        <Modal
            title="Add New Brand"
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
                        Add Brand
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddBrandForm;
