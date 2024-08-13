import { createWalletClient, hashMessage, http, recoverPublicKey } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { hexToBase64, checkEnvironentVariables } from './utilities.js';

checkEnvironentVariables();

const client = createWalletClient({
    chain: mainnet,
    transport: http()
})

const account = privateKeyToAccount(process.env.PRIVATE_KEY)


// Generate a nonce using a random number
const nonce = Math.round(Math.random() * 1000000)
// Get the current timestamp
const timestamp = new Date().toISOString()
// A message explaining the action being taken
const message = `Please, make sure that you are signing this message on Bitcoin Betting domain:\nNonce: ${nonce}\nTimestamp: ${timestamp}`
// Request the user's signature
const signature = await client.signMessage({ message, account })
// Hash the message and recover the public key
const hash = hashMessage(message)
const publickey = await recoverPublicKey({ hash, signature })
const base64pk = hexToBase64(publickey.slice(2))
console.log('User Public Key:', base64pk)
