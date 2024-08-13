import { createPublicClient, createWalletClient, getContract, http, parseUnits } from 'viem'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import WebSocket from 'ws';
import { ERC20_ABI, BB_ABI, BB_CONTRACT_ADDRESS, hexToBase64, CurrenciesData, checkEnvironentVariables } from './utilities.js';

checkEnvironentVariables();

// Operation Config
const amount = 0.00001;   // 0.01 mWBTC
const currencyId = 2;   // Currency ID: 'mBTC' = 0, 'mETH' = 1, 'WBTC' = 2

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
const erc20Contract = getContract({
    abi: ERC20_ABI,
    address: CurrenciesData[currencyId].contract,
    client
})

// Deposit Execution
const amountUnit = parseUnits(amount.toString(), CurrenciesData[currencyId].decimals)
const sendAllowance = async () => {
    console.log('An Approve transaction will need to be send first.')
    const approveHash = await erc20Contract.write.approve([
        BB_CONTRACT_ADDRESS,
        amountUnit
    ])
    await publicClient.waitForTransactionReceipt({ hash: approveHash })
    console.log('Approve transaction sent successfully.')
}

const sendDeposit = async () => {
    console.log('Will deposit and monitor transaction.')
    const depositHash = await mainContract.write.depositERC([
        amountUnit,
        CurrenciesData[currencyId].contract,
        currencyId,                  // Currency ID: 'mBTC' = 0, 'mETH' = 1, 'WBTC' = 2
        BigInt(process.env.USER_ID)
    ])
    await publicClient.waitForTransactionReceipt({ hash: depositHash, confirmations: 3 })
    return depositHash
}

const claimDeposit = async (depositHash) => {
    console.log('Will claim onchain deposit made on the Bitcoin Betting.')
    // ATTENTION: Make sure that all parameters are in alphabetical order.
    const issuanceData = {
        Currency: {
            // CrossChainPayments: true,
            ID: currencyId
        },
        Deposit: {
            Amount: amount,
            TXID: depositHash,
            UserID: process.env.USER_ID
        },
        MinerFeeStr: '0.00001',
        NodeID: process.env.NODE_ID,
        UserID: process.env.USER_ID
    }
    const signature = await client.signMessage({ message: JSON.stringify(issuanceData) })
    const message = {
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
            console.log('Currency issuance status:', dataObject.State)
            process.exit(0);
        }
    });
}

sendAllowance()
    .then(sendDeposit)
    .then(claimDeposit)