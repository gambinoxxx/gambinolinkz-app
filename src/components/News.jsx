
import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card, Input } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: cryptoData, isLoading: isCryptoLoading } = useGetCryptosQuery(10);
  const { data: cryptoNews, isLoading: isNewsLoading } = useGetCryptoNewsQuery({
    category: newsCategory,
  });

  if (isCryptoLoading || isNewsLoading) return <Loader />;

  // Get the list of news articles
  const newsList = Array.isArray(cryptoNews) ? cryptoNews : cryptoNews?.data || [];
  // Filter news based on search term
  const filteredNews = newsList.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Limit to 6 news articles for the simplified view
  const displayedNews = simplified ? filteredNews.slice(0, 6) : filteredNews;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {cryptoData?.data?.coins?.map((currency) => (
                <Option key={currency.id} value={currency.name}>
                  {currency.name}
                </Option>
              ))}
            </Select>
            <Input
              placeholder="Search for news"
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
        </Col>
      )}

      {displayedNews.length > 0 ? (
        displayedNews.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={news.url || index}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.title || 'Untitled'}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || news?.image || demoImage}
                    alt={news.title || 'News'}
                    onError={(e) => (e.target.src = demoImage)} // Fallback for broken images
                  />
                </div>
                <p>{news.description?.substring(0, 100) || 'No description available.'}...</p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.providerLogo || demoImage} alt={news.provider || 'Provider'} />
                    <Text>{news.provider || 'GV'}</Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))
      ) : (
        <Col xs={24}>
          <Title level={4}>
            No news available for "{searchTerm || newsCategory}".
          </Title>
        </Col>
      )}
    </Row>
  );
};

export default News;
