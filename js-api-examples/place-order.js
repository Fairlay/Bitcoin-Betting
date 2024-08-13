import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { hexToBase64, unixToTicks, checkEnvironentVariables } from './utilities.js';
import WebSocket from 'ws';

checkEnvironentVariables();

// Operation Config
const makerOrderId = "9099a901-9180-4869-afb7-e1cc88c2c169"
const marketID = "6904d2c0-72c1-4f6b-987f-6843f4b19663"
const amount = 1.392;   // 0.01 mWBTC
const price = 1.359;    // Decimal odds
const side = 1;         // 1 = Buy, 2 = Sell

// Wallet Config
const account = privateKeyToAccount(process.env.PRIVATE_KEY)

const client = createWalletClient({
    chain: mainnet,
    transport: http(process.env.RPC_ENDPOINT),
    account
})

const placeOrder = async (depositHash) => {
    console.log('Will place an order on Bitcoin betting.')
    // ATTENTION: Make sure that all parameters are in alphabetical order.
    const orderData = {
        CreatedByUser: unixToTicks(Date.now()),          // User that created maker order
        MinerFeeStr: "0.00001",
        NodeID: process.env.NODE_ID,
        UnmatchedOrder: {
            Amount: amount,
            ID: makerOrderId,
            Price: price,
            RemAmount: amount,
            Side: side,
            Type: 2
        },
        UserID: process.env.USER_ID,
        UserOrder: {
            MarketID: marketID
        }
    }
    const signature = await client.signMessage({ message: JSON.stringify(orderData) })
    const message = {
        Type: "OrderAlteration",
        SignatureUser: hexToBase64(signature.slice(2)),
        Data: orderData
    }
    const ws = new WebSocket(process.env.NODE_URL);
    ws.on('open', function open() {
        ws.send(JSON.stringify(message));
    });
    ws.on('message', function message(data) {
        const dataObject = JSON.parse(data)
        if (dataObject.Type === "OrderAlteration") {
            console.log('Order Placement Status:', dataObject)
            process.exit(0);
        }
    });
}

placeOrder()