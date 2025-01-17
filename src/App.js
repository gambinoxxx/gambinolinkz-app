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
              <Route exact path="/news" element={<News />} /> {/* News route */}
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
            <Link to="/cryptocurrencies" className="footer-button">
              Cryptocurrencies
            </Link>
            <Link to="/news" className="footer-button"> {/* News button */}
              News
            </Link>
            <Link to="/trade" className="footer-button">
              Trade
            </Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
