import React from 'react';
import { Navbar, Exchanges, News, Homepage, Cryptocurrencies, CryptoDetails, Trade } from './components';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              {/* Default route to Homepage */}
              <Route path="/" element={<Homepage />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
              <Route exact path="/trade" element={<Trade />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            © 2025 Gambinoviews <br />
            All rights reserved by Gambinolinkz
          </Typography.Title>
          <Space>
            <button style={{ margin: '0 10px', padding: '5px 10px', cursor: 'pointer' }}>
              <Link to="/homepage" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            </button>
            <button style={{ margin: '0 10px', padding: '5px 10px', cursor: 'pointer' }}>
              <Link to="/cryptocurrencies" style={{ color: 'inherit', textDecoration: 'none' }}>Cryptocurrencies</Link>
            </button>
            <button style={{ margin: '0 10px', padding: '5px 10px', cursor: 'pointer' }}>
              <Link to="/trade" style={{ color: 'inherit', textDecoration: 'none' }}>Trade</Link>
            </button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
