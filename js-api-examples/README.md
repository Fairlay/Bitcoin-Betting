# Readme Documentation

## Introduction

This project are a couple of JS examples on how to use Bitcoin Betting API. To get started, follow the instructions below.

## Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)

## Installation

The follwoing packages are used to communicate with blockchain and access Btcoin Betting sockets:

- [Viem](https://viem.sh/)
- [ws](https://github.com/websockets/ws)
- [dotenv](https://github.com/motdotla/dotenv)
  Install the required packages:

```
npm install
```

## Environment Variables

Set up the necessary environment variables in your local machine using the `.env`.

```env
PRIVATE_KEY=0x9e...
RPC_ENDPOINT=https://eth.llamarpc.com
NODE_URL=wss://sa.bitcoin-betting.com:82/
NODE_ID=12
USER_ID=123
```

## Optional: Install Bun

Bun is an optional dependency that can be used as an alternative to Node.js. To install Bun, follow the instructions on their official website: https://bun.sh/docs/install

Bun will run drastically faster than Node.js and also embed your environment variables automatically.

## Running the scripts

Once you have installed the required packages and set up the environment variables, you can run the scripts using the following commands:

- `bun deposit-erc20.js`: Execute a deposit of ERC20 token.
- `bun deposit-eth.js`: Execute ETH deposit inside platform.
- `bun get-balance.js`: Fetch user ID balance.
- `bun place-order.js`: Send an order to the platform.
- `bun withdraw.js`: Withdraw funds on behalf of your user.

Those scripts require some changes on configuration variables usually found at the beggining of the files.

```js
// Operation Config
const amount = 0.00001; // 0.01 mWBTC
const currencyId = 2; // Currency ID: 'mBTC' = 0, 'mETH' = 1, 'WBTC' = 2
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
