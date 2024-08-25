import React from 'react'

const MainPage: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">구매 데이터 대시보드</h1>
      <div className="section">
        <h2 className="section-title">가격대별 구매 빈도 차트</h2>
        <p className="text">
          한 달 동안 발생한 구매 데이터를 바탕으로, 각 가격대의 제품이 얼마나 많이 구매되었는지 보여주는 차트입니다.
          가격대는 2만원 이하부터 10만원 이상까지 만원 단위로 구분됩니다. 날짜를 선택해서 특정 기간을 조회할 수
          있습니다.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">가장 많이 구매한 고객 목록 및 검색 기능</h2>
        <p className="text">
          한 달 동안 가장 많이 구매한 고객을 내림차순/오름차순으로 정렬할 수 있습니다. 기본 정렬은 고객 ID입니다. 각
          고객의 ID, 이름, 총 구매 횟수, 총 구매 금액을 표시하며, 고객 이름으로 검색할 수 있는 기능이 포함됩니다.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">고객 ID 기반 상세 기능</h2>
        <p className="text">
          특정 고객을 클릭하면 해당 고객의 상세 구매 내역을 볼 수 있습니다. 검색 결과에는 구매 날짜, 구매한 제품 목록,
          각 제품의 가격, 상품 썸네일이 포함됩니다.
        </p>
      </div>
    </div>
  )
}

export default MainPage
