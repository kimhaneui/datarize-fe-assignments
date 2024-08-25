# Datarize Frontend 과제 전형

안녕하세요, Datarize Frontend Developer 지원자 김하늬입니다.

## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [메뉴](#메뉴)
3. [기술 스택](#기술-스택)
4. [설치 및 실행](#설치-및-실행)
5. [폴더 구조](#폴더-구조)

## 프로젝트 개요
React 및 TypeScript로 작성된 웹 애플리케이션입니다. 구매 빈도와 고객 목록을 관리하고 시각화합니다. Chart.js와 Ant Design을 활용해 데이터를 시각화합니다.

## 메뉴
### 1. Main
![메인 페이지](./apps/frontend/src/assets/main.png)
간단한 요구사항 정리 페이지입니다.

### 2. Chart
![차트 페이지](./apps/frontend/src/assets/chart.png)
가격대별 구매 빈도를 바 차트로 시각화한 페이지입니다.

### 3. Customer
![고객 목록 페이지](./apps/frontend/src/assets/customers.png)
검색 및 정렬 기능이 있는 고객 목록 페이지입니다.

## 기술 스택
- **프론트엔드**: React, TypeScript
- **차트 라이브러리**: Chart.js
- **UI 라이브러리**: Ant Design

## 설치 및 실행

```bash
cd apps
yarn install
yarn start-server
yarn start-client
```

## 설치 및 실행
```bash
/project-root
├── /src
│   ├── /api
│   ├── /assets
│   ├── /components
│   ├── /pages
│   └── types.ts
└── package.json
```
