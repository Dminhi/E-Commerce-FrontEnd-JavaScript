import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, toggleProductStatus } from '../../../redux/reducers/productSlice';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';

const columns = (handleEditModalOpen, handleStatusChange) => [
    {
        title: 'Product Name',
        dataIndex: 'productName',
        key: 'productName',
    },
    {
        title: 'Product Image',
        dataIndex: 'image',
        key: 'image',
        render: (text) => <img src={text} alt="Product" className="w-16 h-16 rounded-md object-cover" />,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status, record) => (
            <Tag 
                color={status ? 'green' : 'red'} 
                onClick={() => handleStatusChange(record.id)}
                className="cursor-pointer"
            >
                {status ? 'Active' : 'Inactive'}
            </Tag>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <div className="flex space-x-2">
                <Button className="flex items-center justify-center" onClick={() => handleEditModalOpen(record)}>
                    <EditOutlined />
                </Button>
                <Button className="flex items-center justify-center" onClick={() => handleStatusChange(record.id)}>
                    <DeleteOutlined />
                </Button>
            </div>
        ),
    },
];

const ProductPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.data);
    const isLoading = useSelector((state) => state.products.isLoading);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        dispatch(getAllProducts({ page: currentPage - 1, limit: pageSize }));
    }, [dispatch, currentPage, pageSize]);

    const handleAddModalOpen = () => {
        setIsAddModalVisible(true);
    };

    const handleAddModalClose = () => {
        setIsAddModalVisible(false);
        dispatch(getAllProducts({ page: currentPage - 1, limit: pageSize }));
    };

    const handleEditModalOpen = (product) => {
        setCurrentProduct(product);
        setIsEditModalVisible(true);
    };

    const handleEditModalClose = () => {
setIsEditModalVisible(false);
        setCurrentProduct(null); // Reset currentProduct khi đóng modal
        dispatch(getAllProducts({ page: currentPage - 1, limit: pageSize }));
    };

    const handleStatusChange = (id) => {
        dispatch(toggleProductStatus(id)).then(() => {
            dispatch(getAllProducts({ page: currentPage - 1, limit: pageSize })); 
        });
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold">All Products</div>
                <Button type="primary" icon={<FileAddOutlined />} onClick={handleAddModalOpen}>
                    Add New Product
                </Button>
            </div>
            <Table
                columns={columns(handleEditModalOpen, handleStatusChange)}
                dataSource={Array.isArray(products?.content) ? products.content.map(product => ({ ...product, key: product.id })) : []}
                loading={isLoading}
                rowKey="id"
                pagination={false}
                expandable={{
                    expandedRowRender: (record) => <p className="m-0">{record.description}</p>,
                    rowExpandable: (record) => record.productName !== 'Not Expandable',
                }}
                className="overflow-x-auto"
            />
            <Pagination
                className="mt-4"
                current={currentPage}
                total={products?.totalElement || 0}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger
            />
            <AddProductForm open={isAddModalVisible} onClose={handleAddModalClose} />
            <EditProductForm 
                open={isEditModalVisible} 
                onClose={handleEditModalClose} 
                product={currentProduct} 
            />
        </div>
    );
};

export default ProductPage;
