import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrand, toggleBrandStatus } from '../../../redux/reducers/brandSlice';
import AddBrandForm from './AddBrandForm';
import EditBrandForm from './EditBrandForm';

const columns = (handleEditModalOpen, handleStatusChange) => [
    {
        title: 'Brand Name',
        dataIndex: 'brandName',
        key: 'brandName',
    },
    {
        title: 'Brand Image',
        dataIndex: 'image',
        key: 'image',
        render: (text) => <img src={text} alt="Brand" className="w-16 h-16 rounded-md object-cover" />,
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

const BrandPage = () => {
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brands.data);
    const isLoading = useSelector((state) => state.brands.isLoading);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentBrand, setCurrentBrand] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Đặt kích thước trang phù hợp với backend

    useEffect(() => {
        dispatch(getAllBrand({ page: currentPage - 1, limit: pageSize }));
    }, [dispatch, currentPage, pageSize]);

    const handleAddModalOpen = () => {
        setIsAddModalVisible(true);
    };

    const handleAddModalClose = () => {
        setIsAddModalVisible(false);
        dispatch(getAllBrand({ page: currentPage - 1, limit: pageSize }));
    };

    const handleEditModalOpen = (brand) => {
        setCurrentBrand(brand);
        setIsEditModalVisible(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalVisible(false);
        dispatch(getAllBrand({ page: currentPage - 1, limit: pageSize }));
    };

    const handleStatusChange = (id) => {
        dispatch(toggleBrandStatus(id)).then(() => {
            dispatch(getAllBrand({ page: currentPage - 1, limit: pageSize })); 
        });
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold">All Brands</div>
                <Button type="primary" icon={<FileAddOutlined />} onClick={handleAddModalOpen}>
                    Add New Brand
                </Button>
            </div>
            <Table
                columns={columns(handleEditModalOpen, handleStatusChange)}
                dataSource={Array.isArray(brands?.content) ? brands.content.map((brand) => ({ ...brand, key: brand.id })) : []}
                loading={isLoading}
                rowKey="id"
                pagination={false}
                expandable={{
                    expandedRowRender: (record) => <p className="m-0">{record.description}</p>,
                    rowExpandable: (record) => record.brandName !== 'Not Expandable',
                }}
                className="overflow-x-auto"
            />
            <Pagination
                className="mt-4"
                current={currentPage}
                total={brands?.totalElement || 0}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger
            />
            <AddBrandForm open={isAddModalVisible} onClose={handleAddModalClose} />
            <EditBrandForm 
                open={isEditModalVisible} 
                onClose={handleEditModalClose} 
                brand={currentBrand} 
            />
        </div>
    );
};

export default BrandPage;
