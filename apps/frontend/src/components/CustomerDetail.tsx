import React, { useState, useEffect, useCallback } from 'react'
// library
import { List, Avatar, Spin, Alert } from 'antd'
// types
import { CustomerDetailProps, Purchase } from '../types'
// api
import { fetchCustomerPurchases } from '../api/api'

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customerId }) => {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchCustomerPurchases(customerId)
      setPurchases(response)
    } catch (error) {
      console.error('Error fetching customer purchases:', error)
      setError('고객 데이터를 불러오는 데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [customerId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return <Spin tip="Loading..." />
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />
  }

  return (
    <div>
      <h2>고객 구매 내역</h2>
      <List
        itemLayout="vertical"
        dataSource={purchases}
        renderItem={(purchase: Purchase) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={purchase.imgSrc} alt={purchase.product} size={80} shape="square" />}
              title={<span>{purchase.product}</span>}
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
