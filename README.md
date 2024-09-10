
# Bitcoin Betting Documentation

## What is Bitcoin Betting

Bitcoin Betting is a  decentralized P2P Prediction Market and Betting Exchange consisting of a vast network of nodes. It utilizes its custom-tailored Decentralized Ledger based on the concept of Directed Acyclic Graphs specifically designed to match the needs of a fast, secure and efficient decentralized platform for processing millions of markets and hundreds of millions of orders every day.  

Supported currencies for most markets on the platform are currently Ethereum and (Wrapped) Bitcoin.  Deposits and withdrawals happen via an Bridge - a special Smart Contract on the Ethereum Blockchain. However, any user is free to issue their own currency, transfer it and create markets utilizing this currency.

Anyone who wants to support the network is free to run their own node (server requirements: 16GB RAM, 4 CPU Cores) and perform all transactions directly on that node. All relevant transactions are permanently stored on all nodes. Certain transactions like open orders or markets with no orders are only stored in the mempool and thus do not fill up the valuable ledger space.  The source code is currently only shared with trusted entities to not allow targeted attacks against the network, but will be released to the public once a security audit has been performed.  

The main interface to access the network is the DeFI-App  https://app.bitcoin-betting.com.  It is a static site (also available on IPFS)  that runs client-side Javascript code in the browser to interact directly with one of the nodes.   It is recommended to use the App MetaMask on all mobile devices to safeguard one's private keys and use their browser to be able to easily sign requests.  


## Getting Access  and Referral Bonus System

The developers of the protocol are aware, that having an completely decentralized platform for any kind of market open for everyone without entry restrictions may lead to severe negative external effects. Thus the Platform is Invite-Only. Having an Invite-Only-Platform shall maintain a high quality user base and keep out bad actors.  

New accounts can only be created by existing accounts. This can be done directly by issuing an arbitrary Invite Code. Once you have an account, deposits can be made by passing your UserId to the deposit function of the Ethereum Smart Contract.  

If bad actors enter the platform anyway, the issuer of the invite has a certain period, in which he can revoke any invite and optionally all their referrals. After the revoke request is initiated, the affected account can only withdraw funds but not place any new orders. 

Referrers of mulitple bad actors may also be banned. Thus it is recommended to only invite new users that are trustworthy.

Referring a new user will be rewarded with a 10% share of all generated commissions by that user and of all subordinate referrals of that user. 

