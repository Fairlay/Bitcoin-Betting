import WebSocket from 'ws';
import { checkEnvironentVariables } from './utilities.js';

checkEnvironentVariables();

const currencyIds = ['mBTC', 'mETH', 'WBTC']

const ws = new WebSocket(process.env.NODE_URL);

ws.on('error', console.error);

ws.on('open', function open() {
    ws.send(JSON.stringify({
        "Type": "SubscribeBalance",
        "UserID": process.env.USER_ID,
        "NodeID": process.env.NODE_ID
    }));
});

ws.on('message', function message(data) {
    const dataObject = JSON.parse(data)
    if (dataObject.Type === "SubscribeBalance") {
        for (const [idx, curr] of currencyIds.entries()) {
            const currData = dataObject.Data[idx.toString()];
            if (!currData) continue;
            const decoded = {
                id: idx.toString(),
                symbol: curr,
                ...currData
            }
            console.log(decoded);
        }
        process.exit(0);
    }
});