import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductDetail, getAllColors,  getAllProductDetails } from '../../../redux/reducers/productDetailSlice';
import {getAllProduct} from '../../../redux/reducers/productSlice'
import { unwrapResult } from '@reduxjs/toolkit';

const { Option } = Select;

const EditProductDetailForm = ({ open, onClose, productDetail }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const colors = useSelector((state) => state.productDetails.colors);
    const products = useSelector((state) => state.products.data.content);

    useEffect(() => {
        if (productDetail && open) {
            form.setFieldsValue({
                productDetailName: productDetail.productDetailName,
                unitPrice: productDetail.unitPrice,
                stock: productDetail.stock,
                colorId: productDetail.colorId,
                productId: productDetail.productId,
                file: [],
            });
            dispatch(getAllColors());
            dispatch(getAllProduct({ page: 0, limit: 100 }));
        }
    }, [productDetail, form, dispatch, open]);

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('productDetailName', values.productDetailName);
        formData.append('unitPrice', values.unitPrice);
        formData.append('stock', values.stock);
        formData.append('colorId', values.colorId);
        formData.append('productId', values.productId);
        formData.append('id', productDetail.id);
        if (values.file && values.file.length > 0) {
            formData.append('image', values.file[0].originFileObj);
        }

        try {
            const resultAction = await dispatch(updateProductDetail(formData));
            unwrapResult(resultAction);
            form.resetFields();
            onClose();
            dispatch(getAllProductDetails());
        } catch (error) {
            console.error('Failed to update product detail:', error);
        }
    };

    return (
        <Modal
            title="Edit Product Detail"
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
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditProductDetailForm;
