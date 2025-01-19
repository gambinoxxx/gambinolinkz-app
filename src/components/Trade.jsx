import React, { useState, useRef } from 'react';
import millify from 'millify';
import { Card, Input, Button, InputNumber, Select, Row, Col } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Option } = Select;

const Trade = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [tradeAmount, setTradeAmount] = useState(0);
  const [tradeType, setTradeType] = useState(null);
  const { data: cryptoData, isLoading, error } = useGetCryptosQuery(6);

  const WHATSAPP_PHONE = '2349054786960'; // Replace with your WhatsApp number
  const tradePanelRef = useRef(null); // Reference for the trade panel

  if (isLoading) return <div>Loading crypto data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredData = cryptoData?.data?.coins?.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSelectCrypto = (crypto) => {
    setSelectedCrypto(crypto);
    setTradeAmount(0);
    setTradeType(null);

    // Scroll to the trade panel
    if (tradePanelRef.current) {
      tradePanelRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConfirmTrade = () => {
    if (!selectedCrypto || !tradeType || tradeAmount <= 0) {
      alert('Please select a crypto, trade type, and a valid amount.');
      return;
    }

    const quantity = tradeAmount / selectedCrypto.price;
    const rate = tradeAmount <= 500 ? 1600 : 1630;
    const nairaEquivalent = tradeAmount * rate;

    const message = encodeURIComponent(`
New Trade Order:
Crypto: ${selectedCrypto.name} (${selectedCrypto.symbol})
Type: ${tradeType.toUpperCase()}
Amount (in USD): $${tradeAmount}
Equivalent in NGN: ₦${nairaEquivalent.toFixed(2)}
Quantity: ${quantity.toFixed(6)}
Price: $${millify(selectedCrypto.price)}
    `);

    // Redirect to WhatsApp with the order message
    alert('Trade Confirmed! Click OK to finish trade on WhatsApp.');
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, '_blank');

    // Reset state
    setSelectedCrypto(null);
    setTradeAmount(0);
    setTradeType(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      {selectedCrypto && (
        <div ref={tradePanelRef} className="trade-panel">
          <h2 className="trade-title">Trade {selectedCrypto.name}</h2>
          <InputNumber
            className="trade-input"
            placeholder="Enter Amount in USD"
            value={tradeAmount}
            min={0}
            onChange={(value) => setTradeAmount(value)}
          />

          <Select
            className="trade-select"
            placeholder="Select Trade Type"
            onChange={setTradeType}
            value={tradeType}
          >
            <Option value="buy">Buy</Option>
            <Option value="sell">Sell</Option>
          </Select>

          <p className="trade-summary">
            You are about to {tradeType ? tradeType.toUpperCase() : 'select a trade type'} ${tradeAmount} worth of{' '}
            {selectedCrypto.symbol}. Quantity: {(tradeAmount / selectedCrypto.price).toFixed(6)}.
          </p>
          {tradeType === 'sell' && tradeAmount > 0 && (
            <p className="trade-equivalent">
              Equivalent in NGN: ₦
              {(tradeAmount * (tradeAmount <= 500 ? 1600 : 1630)).toFixed(2)}.
            </p>
          )}

          <Button
            className="trade-button"
            type="primary"
            onClick={handleConfirmTrade}
            disabled={!tradeType || tradeAmount <= 0}
          >
            Confirm Trade
          </Button>
        </div>
      )}

      <Input
        className="search-crypto"
        placeholder="Search Cryptocurrency"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <Row gutter={[16, 16]}>
        {filteredData?.map((crypto) => (
          <Col key={crypto.id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              onClick={() => handleSelectCrypto(crypto)}
              className={`crypto-card ${selectedCrypto?.id === crypto.id ? 'selected' : ''}`}
            >
              <h3>{crypto.name}</h3>
              <p>Price: ${millify(crypto.price)}</p>
              <p>Market Cap: ${millify(crypto.marketCap)}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Trade;
