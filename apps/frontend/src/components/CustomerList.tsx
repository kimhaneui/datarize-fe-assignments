import React, { useState, useEffect, useRef } from 'react';
import { fetchCustomers } from '../api/api';
import { Customer } from '../types';
import { Modal, Input, Select, Table, Spin } from 'antd';
import CustomerDetail from './CustomerDetail';

const { Option } = Select;
const { Search } = Input;

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<number | undefined>(undefined);

  const debouncedFetchData = (query: string, sort: 'asc' | 'desc') => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetchCustomers(query, sort);
        setCustomers(response);
      } catch (error) {
        console.error('Error fetching customers:', error);
        window.alert('고객 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    debouncedFetchData(searchQuery, sortBy);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery, sortBy]);

  const handleCustomerClick = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCustomerId(null);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '이름', dataIndex: 'name', key: 'name' },
    { title: '총 구매 횟수', dataIndex: 'count', key: 'count' },
    {
      title: '총 구매 금액',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `${amount.toLocaleString()}원`,
    },
  ];

  return (
    <div className="margin-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>고객 목록</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Search
          placeholder="고객 이름 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={() => {}}
          style={{ width: '60%' }}
        />
        <Select value={sortBy} onChange={(value) => setSortBy(value)} style={{ width: '30%' }}>
          <Option value="asc">오름차순</Option>
          <Option value="desc">내림차순</Option>
        </Select>
      </div>

      {loading ? (
        <Spin tip="Loading...">
          <Table columns={columns} dataSource={[]} pagination={false} />
        </Spin>
      ) : (
        <Table
          columns={columns}
          dataSource={customers}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleCustomerClick(record.id),
          })}
          pagination={false}
        />
      )}

      <Modal
        title="고객 상세 정보"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedCustomerId && <CustomerDetail customerId={selectedCustomerId} />}
      </Modal>
    </div>
  );
};

export default CustomerList;
