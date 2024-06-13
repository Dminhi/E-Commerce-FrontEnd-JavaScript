import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllColors, toggleColorStatus } from '../../../redux/reducers/colorSlice';
import AddColorForm from './AddColorForm';
import EditColorForm from './EditColorForm';

const columns = (handleEditModalOpen, handleStatusChange) => [
    {
        title: 'Color Name',
        dataIndex: 'colorName',
        key: 'colorName',
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

const ColorPage = () => {
    const dispatch = useDispatch();
    const colors = useSelector((state) => state.colors.data);
    const isLoading = useSelector((state) => state.colors.isLoading);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentColor, setCurrentColor] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        dispatch(getAllColors({ page: currentPage - 1, limit: pageSize }));
    }, [dispatch, currentPage, pageSize]);

    const handleAddModalOpen = () => {
        setIsAddModalVisible(true);
    };

    const handleAddModalClose = () => {
        setIsAddModalVisible(false);
        dispatch(getAllColors({ page: currentPage - 1, limit: pageSize }));
    };

    const handleEditModalOpen = (color) => {
        setCurrentColor(color);
        setIsEditModalVisible(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalVisible(false);
        dispatch(getAllColors({ page: currentPage - 1, limit: pageSize }));
    };

    const handleStatusChange = (id) => {
        dispatch(toggleColorStatus(id)).then(() => {
            dispatch(getAllColors({ page: currentPage - 1, limit: pageSize })); 
        });
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold">All Colors</div>
                <Button type="primary" icon={<FileAddOutlined />} onClick={handleAddModalOpen}>
                    Add New Color
                </Button>
            </div>
            <Table
                columns={columns(handleEditModalOpen, handleStatusChange)}
                dataSource={Array.isArray(colors?.content) ? colors.content : []}
                loading={isLoading}
                rowKey="id"
                pagination={false}
                expandable={{
                    expandedRowRender: (record) => <p className="m-0">{record.description}</p>,
                    rowExpandable: (record) => record.colorName !== 'Not Expandable',
                }}
                className="overflow-x-auto"
            />
            <Pagination
                className="mt-4"
                current={currentPage}
                total={colors?.totalElement || 0}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger
            />
            <AddColorForm open={isAddModalVisible} onClose={handleAddModalClose} />
            <EditColorForm 
                open={isEditModalVisible} 
                onClose={handleEditModalClose} 
                color={currentColor} 
            />
        </div>
    );
};

export default ColorPage;
