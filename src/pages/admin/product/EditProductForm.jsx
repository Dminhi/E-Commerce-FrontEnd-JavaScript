import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, getAllCategory, getAllBrand, getAllProducts } from '../../../redux/reducers/productSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const { Option } = Select;

const EditProductForm = ({ open, onClose, product }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const categories = useSelector((state) => state.products.categories);
    const brands = useSelector((state) => state.products.brands);

    useEffect(() => {
        if (product && open) {
            form.setFieldsValue({
                productName: product.productName,
                description: product.description,
                categoryId: product.categoryId,
                brandId: product.brandId,
                file: [],
                imageSet: [],
            });
            dispatch(getAllCategory());
            dispatch(getAllBrand());
        }
    }, [product, form, dispatch, open]);

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('productName', values.productName);
        formData.append('description', values.description);
        formData.append('categoryId', values.categoryId);
        formData.append('brandId', values.brandId);
        formData.append('id', product.id);
        if (values.file && values.file.length > 0) {
            formData.append('image', values.file[0].originFileObj);
        }
        if (values.imageSet && values.imageSet.length > 0) {
            values.imageSet.forEach((file) => {
                formData.append('imageSet', file.originFileObj);
            });
        }

        try {
            const resultAction = await dispatch(updateProduct(formData));
            unwrapResult(resultAction);
            form.resetFields();
            onClose();
            dispatch(getAllProducts());
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    return (
        <Modal
            title="Edit Product"
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
                    name="productName"
                    label="Product Name"
                    rules={[{ required: true, message: 'Please enter product name' }]}
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
                    name="categoryId"
                    label="Category"
                    rules={[{ required: true, message: 'Please select a category' }]}
                >
                    <Select placeholder="Select a category">
                        {categories.map(category => (
                            <Option key={category.id} value={category.id}>{category.categoryName}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="brandId"
                    label="Brand"
                    rules={[{ required: true, message: 'Please select a brand' }]}
                >
                    <Select placeholder="Select a brand">
                        {brands.map(brand => (
                            <Option key={brand.id} value={brand.id}>{brand.brandName}</Option>
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
                <Form.Item
                    name="imageSet"
                    label="Product Image Set"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                >
                    <Upload name="imageSet" beforeUpload={() => false} listType="picture" multiple>
                        <Button icon={<UploadOutlined />}>Click to upload multiple</Button>
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

export default EditProductForm;
