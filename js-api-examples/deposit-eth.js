import { createPublicClient, createWalletClient, getContract, http, parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import WebSocket from 'ws';
import { BB_ABI, BB_CONTRACT_ADDRESS, hexToBase64, unixToTicks, checkEnvironentVariables } from './utilities.js';

checkEnvironentVariables();

// Operation Config
const amount = 0.001;   // 1 mEth - It must be more than than 0.1mETH

// Wallet Config
const account = privateKeyToAccount(process.env.PRIVATE_KEY)

const client = createWalletClient({
    chain: mainnet,
    transport: http(process.env.RPC_ENDPOINT),
    account
})

const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(process.env.RPC_ENDPOINT)
})

const mainContract = getContract({
    abi: BB_ABI,
    address: BB_CONTRACT_ADDRESS,
    client
})

// Deposit Execution
const amountUnit = parseEther(amount.toString())
const sendDeposit = async () => {
    console.log('Will deposit and monitor transaction.')
    const depositHash = await mainContract.write.deposit([BigInt(process.env.USER_ID)], {
        value: amountUnit
    })
    console.log('Transaction hash: ' + depositHash)
    await publicClient.waitForTransactionReceipt({ hash: depositHash, confirmations: 3 })
    return depositHash
}

const claimDeposit = async (depositHash) => {
    console.log('Will claim onchain deposit made on the Bitcoin Betting: ' + depositHash)

    const nonce = unixToTicks(Date.now()) / 10;
    // ATTENTION: Make sure that all parameters are in alphabetical order.
    const issuanceData = {
        Currency: {
            // CrossChainPayments: true,
            ID: 1
        },
        Deposit: {
            Amount: amount * 1000,
            TXID: depositHash.toLowerCase(),
            UserID: process.env.USER_ID,
        },
        MinerFeeStr: '0.00001',
        NodeID: nodeId,
        UserID: process.env.USER_ID
    }
    const signature = await client.signMessage({ message: JSON.stringify(issuanceData) })
    const message = {
        Nonce: nonce,
        Type: 'CurrencyIssuance',
        SignatureUser: hexToBase64(signature.slice(2)),
        Data: issuanceData
    }
    const ws = new WebSocket(process.env.NODE_URL);
    ws.on('open', function open() {
        ws.send(JSON.stringify(message));
    });
    ws.on('message', function message(data) {
        const dataObject = JSON.parse(data)
        if (dataObject.Type === "CurrencyIssuance") {
            console.log('Currency issuance status:', dataObject)
            process.exit(0);
        }
    });
}

sendDeposit().then(claimDeposit)

// In case you want to claim a specific deposit.
// claimDeposit('0x7e67edcef5768df53c7f7f92978ce8129eb8942e7a9d45960c1179bc38c15823');