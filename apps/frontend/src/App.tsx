import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// library
import { Layout, Menu } from 'antd'
// css
import './App.css'
// page
import MainPage from './pages/Mainpage'
// component
import PriceChart from './components/PriceChart'
import CustomerList from './components/CustomerList'

const { Header, Content } = Layout

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '24px' }}>Datarize Dashboard</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['main']}
            style={{ lineHeight: '64px', flexGrow: 1, justifyContent: 'flex-end' }}
          >
            <Menu.Item key="main">
              <Link to="/">Main</Link>
            </Menu.Item>
            <Menu.Item key="chart">
              <Link to="/chart">Chart</Link>
            </Menu.Item>
            <Menu.Item key="customers">
              <Link to="/customers">Customers</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '16px' }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/chart" element={<PriceChart />} />
            <Route path="/customers" element={<CustomerList />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  )
}

export default App
