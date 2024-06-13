import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, toggleCategoryStatus } from '../../../redux/reducers/categorySlice';
import AddCategoryForm from './AddCategoryForm';
import EditCategoryForm from './EditCategoryForm';

const columns = (handleEditModalOpen, handleStatusChange) => [
    {
        title: 'Category Name',
        dataIndex: 'categoryName',
        key: 'categoryName',
    },
    {
        title: 'Create Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => text ? new Date(text).toLocaleDateString() : 'N/A',
    },
    {
        title: 'Category Image',
        dataIndex: 'image',
        key: 'image',
        render: (text) => <img src={text} alt="Category" className="w-16 h-16 rounded-md object-cover" />,
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

const CategoryPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.data);
    const isLoading = useSelector((state) => state.categories.isLoading);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); 
    useEffect(() => {
        dispatch(getAllCategory({ page: currentPage - 1, limit: pageSize }));
    }, [dispatch, currentPage, pageSize]);

    const handleAddModalOpen = () => {
        setIsAddModalVisible(true);
    };

    const handleAddModalClose = () => {
        setIsAddModalVisible(false);
        dispatch(getAllCategory({ page: currentPage - 1, limit: pageSize }));
    };

    const handleEditModalOpen = (category) => {
        setCurrentCategory(category);
        setIsEditModalVisible(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalVisible(false);
        dispatch(getAllCategory({ page: currentPage - 1, limit: pageSize }));
    };

    const handleStatusChange = (id) => {
        dispatch(toggleCategoryStatus(id)).then(() => {
            dispatch(getAllCategory({ page: currentPage - 1, limit: pageSize })); 
        });
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold">All Categories</div>
                <Button type="primary" icon={<FileAddOutlined />} onClick={handleAddModalOpen}>
                    Add New Category
                </Button>
            </div>
            <Table
                columns={columns(handleEditModalOpen, handleStatusChange)}
                dataSource={Array.isArray(categories?.content) ? categories.content.map((category) => ({ ...category, key: category.id })) : []}
                loading={isLoading}
                rowKey="id"
                pagination={false}
                expandable={{
                    expandedRowRender: (record) => <p className="m-0">{record.description}</p>,
                    rowExpandable: (record) => record.categoryName !== 'Not Expandable',
                }}
                className="overflow-x-auto"
            />
            <Pagination
                className="mt-4"
                current={currentPage}
                total={categories?.totalElement || 0}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger
            />
            <AddCategoryForm visible={isAddModalVisible} onClose={handleAddModalClose} page={currentPage} limit={pageSize} />
            <EditCategoryForm 
                visible={isEditModalVisible} 
                onClose={handleEditModalClose} 
                category={currentCategory} 
                page={currentPage}
                limit={pageSize}
            />
        </div>
    );
};

export default CategoryPage;
