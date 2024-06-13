import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductDetails, toggleProductDetailStatus } from '../../../redux/reducers/productDetailSlice';
import AddProductDetailForm from './AddProductDetailForm';
import EditProductDetailForm from './EditProductDetailForm';

const columns = (handleEditModalOpen, handleStatusChange) => [
    {
        title: 'Product Detail Name',
        dataIndex: 'productDetailName',
        key: 'productDetailName',
    },
    {
        title: 'Unit Price',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
    },
    {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
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

const ProductDetailPage = () => {
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails.data);
    const isLoading = useSelector((state) => state.productDetails.isLoading);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentProductDetail, setCurrentProductDetail] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        dispatch(getAllProductDetails({ page: currentPage - 1, limit: pageSize }));
    }, [dispatch, currentPage, pageSize]);

    const handleAddModalOpen = () => {
        setIsAddModalVisible(true);
    };

    const handleAddModalClose = () => {
        setIsAddModalVisible(false);
        dispatch(getAllProductDetails({ page: currentPage - 1, limit: pageSize }));
    };

    const handleEditModalOpen = (productDetail) => {
        setCurrentProductDetail(productDetail);
        setIsEditModalVisible(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalVisible(false);
        setCurrentProductDetail(null);
        dispatch(getAllProductDetails({ page: currentPage - 1, limit: pageSize }));
    };

    const handleStatusChange = (id) => {
        dispatch(toggleProductDetailStatus(id)).then(() => {
            dispatch(getAllProductDetails({ page: currentPage - 1, limit: pageSize }));
        });
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold">All Product Details</div>
                <Button type="primary" icon={<FileAddOutlined />} onClick={handleAddModalOpen}>
                    Add New Product Detail
                </Button>
            </div>
            <Table
                columns={columns(handleEditModalOpen, handleStatusChange)}
                dataSource={Array.isArray(productDetails?.content) ? productDetails?.content.map(detail => ({ ...detail, key: detail.id })) : []}
                loading={isLoading}
                rowKey="id"
                pagination={false}
                expandable={{
                    expandedRowRender: (record) => <p className="m-0">{record.description}</p>,
                    rowExpandable: (record) => record.productDetailName !== 'Not Expandable',
                }}
                className="overflow-x-auto"
            />
            <Pagination
                className="mt-4"
                current={currentPage}
                total={productDetails?.totalElement || 0}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger
            />
            <AddProductDetailForm open={isAddModalVisible} onClose={handleAddModalClose} />
            <EditProductDetailForm
                open={isEditModalVisible}
                onClose={handleEditModalClose}
                productDetail={currentProductDetail}
            />
        </div>
    );
};

export default ProductDetailPage;
