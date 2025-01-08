import React, { useState } from 'react';
import millify from 'millify';
import { Card, Input, Button, InputNumber, Select, Row, Col } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Option } = Select;

const Trade = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [tradeAmount, setTradeAmount] = useState(0); // Amount in dollars
  const [tradeType, setTradeType] = useState(null);
  const { data: cryptoData, isLoading, error } = useGetCryptosQuery(10);

  const TELEGRAM_BOT_TOKEN = 'your-telegram-bot-token'; // Replace with your bot token
  const TELEGRAM_CHAT_ID = 'your-chat-id'; // Replace with your chat ID or channel ID

  if (isLoading) return <div>Loading crypto data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredData = cryptoData?.data?.coins?.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSelectCrypto = (crypto) => {
    setSelectedCrypto(crypto);
    setTradeAmount(0);
    setTradeType(null);
  };

  const handleConfirmTrade = async () => {
    if (!selectedCrypto || !tradeType || tradeAmount <= 0) {
      alert('Please select a crypto, trade type, and a valid amount.');
      return;
    }

    const quantity = tradeAmount / selectedCrypto.price;
    const rate = tradeAmount <= 500 ? 1600 : 1630;
    const nairaEquivalent = tradeAmount * rate;

    const message = `
      New Trade Order:
      Crypto: ${selectedCrypto.name} (${selectedCrypto.symbol})
      Type: ${tradeType.toUpperCase()}
      Amount (in USD): $${tradeAmount}
      Equivalent in NGN: ₦${nairaEquivalent.toFixed(2)}
      Quantity: ${quantity.toFixed(6)}
      Price: $${millify(selectedCrypto.price)}
    `;

    // Send message to Telegram
    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        }
      );

      alert('Trade Confirmed and sent to Telegram!');
      console.log(message);
    } catch (error) {
      alert('Failed to send trade info to Telegram.');
      console.error(error);
    }

    // Reset state
    setSelectedCrypto(null);
    setTradeAmount(0);
    setTradeType(null);
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Search Input */}
      <Input
        style={{ marginBottom: 20 }}
        placeholder="Search Cryptocurrency"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      {/* List of Cryptos */}
      <Row gutter={[16, 16]}>
        {filteredData?.map((crypto) => (
          <Col key={crypto.id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              onClick={() => handleSelectCrypto(crypto)}
              style={{
                border: selectedCrypto?.id === crypto.id ? '2px solid #1890ff' : '1px solid #ddd',
              }}
            >
              <h3>{crypto.name}</h3>
              <p>Price: ${millify(crypto.price)}</p>
              <p>Market Cap: ${millify(crypto.marketCap)}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Trade Panel */}
      {selectedCrypto && (
        <div style={{ marginTop: 20, padding: 20, border: '1px solid #ddd' }}>
          <h2>Trade {selectedCrypto.name}</h2>
          <InputNumber
            style={{ width: '100%', marginBottom: 10 }}
            placeholder="Enter Amount in USD"
            value={tradeAmount}
            min={0}
            onChange={(value) => setTradeAmount(value)}
          />

          <Select
            style={{ width: '100%', marginBottom: 10 }}
            placeholder="Select Trade Type"
            onChange={setTradeType}
            value={tradeType} // Ensuring controlled component behavior
          >
            <Option value="buy">Buy</Option>
            <Option value="sell">Sell</Option>
          </Select>

          <p>
            You are about to {tradeType ? tradeType.toUpperCase() : 'select a trade type'} ${tradeAmount} worth of{' '}
            {selectedCrypto.symbol}. Quantity: {(tradeAmount / selectedCrypto.price).toFixed(6)}.
          </p>
          {tradeType === 'sell' && tradeAmount > 0 && (
            <p>
              Equivalent in NGN: ₦
              {(tradeAmount * (tradeAmount <= 500 ? 1600 : 1630)).toFixed(2)}.
            </p>
          )}

          <Button
            type="primary"
            style={{ marginTop: 10, width: '100%' }}
            onClick={handleConfirmTrade}
            disabled={!tradeType || tradeAmount <= 0}
          >
            Confirm Trade
          </Button>
        </div>
      )}
    </div>
  );
};

export default Trade;
