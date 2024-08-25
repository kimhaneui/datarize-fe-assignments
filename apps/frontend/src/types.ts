  // Purchase Frequency Data 타입 정의
  export type PurchaseFrequency = {
    range: string;
    count: number;
  };
  
  // Customer Data 타입 정의
  export type Customer = {
    id: string;
    name: string;
    count: number;
    totalAmount: number;
  };
  
  // Customer Purchase Data 타입 정의
  export type Purchase = {
    date: string;
    quantity: number;
    product: string;
    price: number;
    imgSrc: string;
  };
  export type CustomerDetailProps = {
    customerId: string;
  };