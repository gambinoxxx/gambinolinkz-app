import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

console.log(useGetCryptoNewsQuery, useGetCryptosQuery)

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoData, error: cryptoError, isLoading: isCryptoLoading } = useGetCryptosQuery(100);
  const { data: cryptoNews, error: newsError, isLoading: isNewsLoading } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  // Handle loading states
  if (isCryptoLoading || isNewsLoading) return <Loader />;

  // Handle error states
  if (cryptoError || newsError) {
    console.error('Error fetching data:', cryptoError || newsError); // Log the error for debugging
    return <div>Error fetching news. Please try again later.</div>;
  }

  // Validate news data
  const newsList = cryptoNews?.value || [];

  return (
    <Row gutter={[24, 24]}>
      {/* News category selection */}
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptoData?.data?.coins?.map((currency) => (
              <Option key={currency.id || currency.name} value={currency.name}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}

      {/* Render news items */}
      {newsList.map((news) => (
        <Col xs={24} sm={12} lg={8} key={news.url || news.name}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt={news.name || 'News'} />
              </div>
              <p>{news.description?.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}

      {/* Fallback message */}
      {!newsList.length && (
        <Col xs={24}>
          <Title level={4} className="coming-soon">
            No news available at the moment.
          </Title>
        </Col>
      )}
    </Row>
  );
};

export default News;
