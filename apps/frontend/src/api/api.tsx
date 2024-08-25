import { Customer, Purchase, PurchaseFrequency } from '../types'

const formatDateToISO = (date: Date | null): string | null => {
  return date ? date.toISOString() : null
}

export const fetchPurchaseFrequency = async (from: Date | null, to: Date | null): Promise<PurchaseFrequency[]> => {
  // 날짜를 ISO 8601 형식으로 변환
  const fromDate = formatDateToISO(from)
  const toDate = formatDateToISO(to)

  const response = await fetch(`http://localhost:4000/api/purchase-frequency?from=${fromDate}&to=${toDate}`)

  if (!response.ok) {
    throw new Error('Failed to fetch purchase frequency data')
  }

  const data: PurchaseFrequency[] = await response.json()
  return data
}

export const fetchCustomers = async (name: string, sortBy: 'asc' | 'desc'): Promise<Customer[]> => {
  const response = await fetch(`http://localhost:4000/api/customers?name=${name}&sortBy=${sortBy}`)

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Error response:', errorText)
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: Customer[] = await response.json()
  return data
}

export const fetchCustomerPurchases = async (id: string): Promise<Purchase[]> => {
  const response = await fetch(`http://localhost:4000/api/customers/${id}/purchases`)
  if (!response.ok) {
    throw new Error('Failed to fetch customer purchases')
  }
  const data: Purchase[] = await response.json()
  return data
}
