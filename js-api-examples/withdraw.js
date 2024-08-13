import { createPublicClient, createWalletClient, getContract, hashMessage, http, parseAbi, parseEther, parseUnits, recoverPublicKey } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import WebSocket from 'ws';
import { unixToTicks, hexToBase64, BB_ABI, BB_CONTRACT_ADDRESS, CurrenciesData, checkEnvironentVariables } from './utilities.js';

checkEnvironentVariables();

// Operation Config
const amount = 20;   // 0.1 mETH
const currencyId = 1;   // Currency ID: 'mBTC' = 0, 'mETH' = 1, 'WBTC' = 2

// Wallet Config
const account = privateKeyToAccount(process.env.PRIVATE_KEY)
const client = createWalletClient({
    chain: mainnet,
    transport: http('https://eth.llamarpc.com'),
    account
})

const publicClient = createPublicClient({
    chain: mainnet,
    transport: http('https://eth.llamarpc.com')
})

const mainContract = getContract({
    abi: BB_ABI,
    address: BB_CONTRACT_ADDRESS,
    client
})

// Withdraw Execution
const requestWithdraw = () => {
    return new Promise(async (resolve, reject) => {
        console.log('Will request a withdraw on Bitcoin Betting.')
        // ATTENTION: Make sure that all parameters are in alphabetical order.
        // ATTENTION: Remove empty string and zeroed number values.
        const withdrawData = {
            Amount: amount,
            CreatedByUser: unixToTicks(Date.now()),
            Cur: currencyId,
            From: process.env.USER_ID,
            ID: crypto.randomUUID(),
            MinerFeeStr: '0.00001',
            NodeID: process.env.NODE_ID,
            Reference: account.address.toLowerCase(),
            TType: 10,
            UserID: process.env.USER_ID
        }
        const signature = await client.signMessage({ message: JSON.stringify(withdrawData) })
        const message = {
            Type: 'Transfer',
            SignatureUser: hexToBase64(signature.slice(2)),
            Data: withdrawData,
            UserID: process.env.USER_ID
        }
        const ws = new WebSocket(process.env.NODE_URL);
        ws.on('open', function open() {
            ws.send(JSON.stringify(message));
        });
        ws.on('message', function message(data) {
            const dataObject = JSON.parse(data)
            if (dataObject.Type === "Transfer") {
                console.log('Withdraw request status:', dataObject.State)

                ws.close();
                // Wait for nodes to sign request
                setTimeout(() => { resolve(dataObject) }, 5000)
            }
        });
    })
}

const sendWithdraw = async () => {
    const ws = new WebSocket(process.env.NODE_URL);
    const message = {
        Type: 'GetBurnValidations',
        Data: {
            MaxResults: 1,
            NodeID: process.env.NODE_ID,
            UserID: process.env.USER_ID
        }
    }
    ws.on('open', function open() {
        ws.send(JSON.stringify(message));
    });
    ws.on('message', async function message(data) {
        const dataObject = JSON.parse(data)
        if (dataObject.Type === "GetBurnValidations") {
            console.log('Withdraw request status:', dataObject)
            const burnValidation = dataObject.Data.shift();
            let request;
            if (burnValidation.Cur == '1') {
                const amountEth = parseEther((burnValidation.Amount / 1000).toString())
                request = await mainContract.simulate.withdraw([
                    amountEth,
                    BigInt(burnValidation.Nonce),
                    account.address,
                    1,
                    `0x${burnValidation.TXID}`,
                    burnValidation.SignatureValidator
                ])
            } else {
                const amountUnit = parseUnits((burnValidation.Amount / 1000).toString(), CurrenciesData[burnValidation.Cur].decimals)
                request = await mainContract.simulate.withdrawERC([
                    amountUnit,
                    BigInt(burnValidation.Nonce),
                    currency.contract,
                    CurrenciesData[burnValidation.Cur].id,
                    account.address,
                    `0x${burnValidation.TXID}`,
                    burnValidation.SignatureValidator
                ])
            }
            const withdrawHash = await client.writeContract(request.request)
            console.log('Withdraw transaction monitoring:', withdrawHash);
            await publicClient.waitForTransactionReceipt({ hash: withdrawHash, confirmations: 1 })
            ws.close();
            console.log('Withdraw confirmed.')
            process.exit(0);
        }
    });
}

requestWithdraw().then(sendWithdraw)
