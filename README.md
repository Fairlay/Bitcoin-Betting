
# Bitcoin Betting Documentation

## What is Bitcoin Betting

Bitcoin Betting is a  decentralized P2P Prediction Market and Betting Exchange consisting of a vast network of nodes. It utilizes its custom-tailored Decentralized Ledger based on the concept of Directed Acyclic Graphs specifically designed to match the needs of a fast, secure and efficient decentralized platform for processing millions of markets and hundreds of millions of orders every day.  

Supported currencies for most markets on the platform are currently Ethereum and (Wrapped) Bitcoin.  Deposits and withdrawals happen via an Bridge - a special Smart Contract on the Ethereum Blockchain. However, any user is free to issue their own currency, transfer it and create markets utilizing this currency.

Anyone who wants to support the network is free to run their own node (please check Running a Node.md) and perform all transactions directly on that node. All relevant transactions are permanently stored on all nodes. Certain transactions like open orders or markets with no orders are only stored in the mempool and thus do not fill up the valuable ledger space. 

The main interface to access the network is the DeFi-App  https://app.bitcoin-betting.com.  It is a static site (also available on IPFS)  that runs client-side Javascript code in the browser to interact directly with one of the nodes.   It is recommended to use the App MetaMask on all mobile devices to safeguard one's private keys and use their browser to be able to easily sign requests.  


## Getting Access  and Referral Bonus System

The developers of the protocol are aware, that having an completely decentralized platform for any kind of market open for everyone without entry restrictions may lead to severe negative external effects. Thus the Platform is invite-only. Having an Invite-Only-Platform shall maintain a high quality user base and keep out bad actors.  

New accounts can only be created by existing accounts. This can be done directly by issuing an arbitrary Invite Code. Once you have an account, deposits can be made by passing your UserId to the deposit function of the Ethereum Smart Contract.  

If bad actors enter the platform anyway, the issuer of the invite has a certain period, in which he can revoke any invite and optionally all their referrals. After the revoke request is initiated, the affected account can only withdraw funds but not place any new orders. 

Referrers of mulitple bad actors may also be banned. Thus it is recommended to only invite new users that are trustworthy.

Referring a new user will be rewarded with a 10% share of all generated commissions by that user and of all subordinate referrals of that user. 

## Restricted Regions

By default, certain IP's are restricted from connecting to a node. Any node operator is free to extend the list. By default among some less important countries,  all US IPs are banned. The node operator is free to extend or reduce the list by editing the IPRanges.ini config file. 

# Technical Details 

## DAGs

Bitcoin Betting utilizes Directed Acyclic Graphs technology to store and process transactions. This technology allows different nodes or parts of the network to work on their own branches and only merge them with other nodes if it is beneficial to do so.  For example a node in Venezuela can continue to operate normally and process markets and orders 
if the connection to Venezuela drops for a day for some reason. It will merge normally with the network when the connection is reestablished as long as no one tried to do a double spent or similar things. Alternatively, private companies could set up their own node to host their private internal prediction markets and only release the data when it is beneficial to do so.

## Storage Units

DAG's are graphs that link so called Storage Units together. Each new Storage Unit is always referencing at least one, in most cases two or three existing Storage Units. This will form a partial order on the set of all Storage Units.  

## Efficient usage of disk space

Bitcoin Betting is using the limited storage resources efficiently by only minig transactions permanently that are relevant. 
Transactions like order cancellations, markets with no orders, open orders that were never matched and similar transactions are only kept in the mempool. Once it weill become clear, that these transaction are no longer used, they will be removed from the mempool. Only transactions that will have an permanent effect on the account balances will be saved forever.

## Storage Unit Types

On the platform, dozens of types of Storage Units are possible.  The most used ones are described here.

### Currency Issuance

It is possible to issue your own currency of your choosing. This can happen either in a centralized way, where one user is responsible for issuing and destroying units of that currency or in a trustless way, by interactiving with a bridge on a different blockchain. 

For example ETH can be deposited to a smart contract on the Ethereum Blockchain and whenever the nodes are informed about such a transaction, they issue the currency automatically to the indicated user account.  

### Transfer Funds

Units of any currency can be transferred to any other user. 

Within that request type it is also possible to burn units of any currency. Once enough validators confirm with a signature, that the currency units have been burned, these signatures  can be used to claim your funds back via the Smart Contract on the Ethereum Blockchain.

### Invite Users

It is possible to invite new users. For a limited time it is possible to revoke invites.  For all comissions paid by the invited user and their referrals, the referrer will get 10% of all generated commissions.

### Create Markets

Different markets are allowed on the platform. Binary / Prediction Markets are the most common, but also CFD or direct exchange markets are integrated among others. The market creator is free to determine settler, market conditions and commisssions for that market. A maximum of 2% commissions is however enforced.

### Order Alterations

Order Alteration Requests combine all create, cancel and modify requests that are issued to handle orders on any market.  It is a big challenge to find a good solution for reliable and fast  order processing in a decentralized network.  Platforms like Uniswap avoid centralized orderbooks for that reasons.  Projects like DYDX do have orderbooks but might struggle with front-running problems and even more important problems with reliable cancellations.  Orders can be matched at nodes that have not received the cancellation request leading to unwanted matches and bad user experience. 
For this reason, Bitcoin Betting allows Order Alterations only to be processed by a predetermined Node, that is indicated in the market settings.  

### Matches

When two orders match in the orderbook, a Match is mined by the processing node and order goes into the PENDING state.  Based on the settings of the market, the PENDING state can last for a certain time period - usually 0 to 15 seconds.  In this time the maker side of the match can either confirm or MAKERVOID the match. Once the maker confirms the order or the period has passed, the node mines another so called AmentMatch transaction to finalize the match. 

### Settlements

Markets will be settled by the user accounts indicated in the market settings upon creation.  Settlers may also delegate their settling power to other accounts and revoke it.

### Settlement Challenges

It is possible to challenge settlements. In case of a challenge, the settler has a certain time period to deal with the settlment challenge. Each settlment challenge requires a small amount of collateral to be put in.

### Node Ban / Node Replacment

Having a predetermined node to process orders of a certain market involves some risk in case the node is unavailable. If however a nodeb becomes unreachable or inconsistent for a few minutes, order processing will continue on a different also predetermined node. For this reason, each node that wants to process orders has to determine a Replacement Node. In case the original node goes down, the Replacement Node will issue a Node Ban request and take over the order procesing for all their markets. Once this request has been mined, all other nodes will know, that order processing has now moved to a different node and will direct their traffic for that market to the Replacment Node.   Once the original node comes online again, it will issue an Unban Request to revert the state.

## Double Spends

In case of double spends, the nodes that have conflicting states will stop sharing conflicting transactions with each other. In such a "chain split" event the node operator will either manually decide the correct state or automatically follow a majority vote based on the node's settings. The votes are weighted based on the funds staked in the user account that is associated with a node.  

## Pruining and faster syncing

Bitcoin Betting nodes are regulary saving the current state of the node. This will allow a node operator to sync his node from a certain state instead of having to process and verify all Storage Units from inception.  Also this will enable pruining of the ledger if it should become necessary.  













