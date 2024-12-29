import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching, error } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;

    if (isFetching) return <Loader />;

    if (error) return <Text> {error?.message || 'coming soon...'}</Text>; // Display error message

    if (!exchangesList) return <Text>No exchanges data available yet.</Text>; // Important: Handle undefined data

    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {exchangesList.map((exchange) => (
                    <Col key={exchange.uuid} span={24}> {/* Add key prop here */}
                        <Collapse>
                            <Panel
                                key={exchange.uuid} // Key prop is already here, no need to duplicate
                                showArrow={false}
                                header={(
                                    <Row key={exchange.uuid}>
                                        <Col span={6}>
                                            <Text><strong>{exchange.rank}.</strong></Text>
                                            <Avatar className="exchange-image" src={exchange.iconUrl} />
                                            <Text><strong>{exchange.name}</strong></Text>
                                        </Col>
                                        <Col span={6}>${millify(exchange.volume, { precision: 2 })}</Col>
                                        <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                        <Col span={6}>{millify(exchange.marketShare)}%</Col>
                                    </Row>
                                )}
                            >
                                {exchange.description ? (
                                    HTMLReactParser(exchange.description)
                                ) : (
                                    <Text>No description available</Text>
                                )}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Exchanges;