import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { Cryptocurrencies, News } from '../components';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10); // Fetching data
  const globalStats = data?.data?.stats; // Extract stats

  console.log(useGetCryptosQuery)

  if (isFetching) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: Unable to fetch data.</div>; // Show error state

  // Ensure globalStats is defined
  if (!globalStats) {
    return (
      <div>
        <Title level={3}>Statistics Unavailable</Title>
        <p>Global statistics data is currently unavailable. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={globalStats.total || 'N/A'}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={globalStats.totalExchanges ? millify(globalStats.totalExchanges) : 'N/A'}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={globalStats.totalMarketCap ? millify(globalStats.totalMarketCap) : 'N/A'}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={globalStats.total24hVolume ? millify(globalStats.total24hVolume) : 'N/A'}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={globalStats.totalMarkets ? millify(globalStats.totalMarkets) : 'N/A'}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies</Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
