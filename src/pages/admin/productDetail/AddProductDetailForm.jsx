import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addProductDetail, getAllColors } from '../../../redux/reducers/productDetailSlice';
import { getAllProduct } from '../../../redux/reducers/productSlice';

const { Option } = Select;

const AddProductDetailForm = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const colors = useSelector((state) => state.productDetails.colors);
    const products = useSelector((state) => state.products.data.content);

    useEffect(() => {
        dispatch(getAllColors());
        dispatch(getAllProduct({ page: 0, limit: 100 }));
    }, [dispatch]);

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('productDetailName', values.productDetailName);
        formData.append('unitPrice', values.unitPrice);
        formData.append('stock', values.stock);
        formData.append('colorId', values.colorId);
        formData.append('productId', values.productId);
        if (values.file && values.file.length > 0) {
            formData.append('image', values.file[0].originFileObj);
        }
        if (values.configs && values.configs.length > 0) {
            values.configs.forEach((config, index) => {
                formData.append(`configs[${index}]`, JSON.stringify(config));
            });
        }

        // Log payload
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            await dispatch(addProductDetail(formData)).unwrap();
            form.resetFields();
            onClose();
            dispatch(getAllProductDetails({ page: 0, limit: 10 }));
        } catch (error) {
            console.error('Failed to add product detail:', error);
        }
    };

    return (
        <Modal
            title="Add New Product Detail"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="productDetailName"
                    label="Product Detail Name"
                    rules={[{ required: true, message: 'Please enter product detail name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="unitPrice"
                    label="Unit Price"
                    rules={[{ required: true, message: 'Please enter unit price' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="stock"
                    label="Stock"
                    rules={[{ required: true, message: 'Please enter stock' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="colorId"
                    label="Color"
                    rules={[{ required: true, message: 'Please select a color' }]}
                >
                    <Select placeholder="Select a color">
                        {colors.map(color => (
                            <Option key={color.id} value={color.id}>{color.colorName}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="productId"
                    label="Product"
                    rules={[{ required: true, message: 'Please select a product' }]}
                >
                    <Select placeholder="Select a product">
                        {products.map(product => (
                            <Option key={product.id} value={product.id}>{product.productName}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="file"
                    label="Product Image"
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
                        Add Product Detail
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProductDetailForm;
