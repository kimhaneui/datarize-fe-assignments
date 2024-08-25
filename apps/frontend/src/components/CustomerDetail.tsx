import React, { useState, useEffect } from 'react'
// library
import { List, Avatar } from 'antd'
// types
import { CustomerDetailProps, Purchase } from '../types'
// api
import { fetchCustomerPurchases } from '../api/api'

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customerId }) => {
  const [purchases, setPurchases] = useState<Purchase[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCustomerPurchases(customerId)
        setPurchases(response)
      } catch (error) {
        console.error('Error fetching customer purchases:', error)
      }
    }

    fetchData()
  }, [customerId])

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>고객 구매 내역</h2>
      <List
        itemLayout="vertical"
        dataSource={purchases}
        renderItem={(purchase: Purchase) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={purchase.imgSrc} alt={purchase.product} size={80} shape="square" />}
              title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>{purchase.product}</span>}
              description={
                <div>
                  <p>구매 날짜: {purchase.date}</p>
                  <p>가격: {purchase.price.toLocaleString()}원</p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default CustomerDetail
