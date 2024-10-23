
# Bitcoin Betting

## Introduction

Bitcoin Betting is a  decentralized P2P Prediction Market and Betting Exchange consisting of a vast network of nodes. It utilizes its custom-tailored Decentralized Ledger based on the concept of Directed Acyclic Graphs specifically designed to match the needs of a fast, secure and efficient decentralized platform for processing millions of markets and hundreds of millions of orders every day.  

## Funding and supported currencies

Supported currencies for most markets on the platform are currently Ethereum and (Wrapped) Bitcoin.  Deposits and withdrawals happen via Bridges - certain Smart Contracts on the Ethereum Blockchain that safeguard your funds in a trustless manner. 
Deposits and withdrawals will usually take less than 30 seconds.  Thus no central party is holding any customer funds, instead all are securely held in the Smart Contract, which is secured against any known attack vector. 

Furthermore any user is free to issue their own currency, token or other asset, transfer it and create markets utilizing this currency.  Stablecoins are not welcomed on the platform as they are not suitable for long-term orders due to their diminishing value.

## User Interfaces

The main user interface to access the platform is the DeFi-App https://app-bitcoin--betting-com.ipns.dweb.link.  It is a static site (hosted on IPFS)  that runs client-side Javascript code in the browser to interact directly with one of the selected nodes.  
Furthermore standalone-applications should become available for anyone with custom needs.

## Mobile Support

It is recommended to use the App MetaMask on all mobile devices to safeguard one's private keys and use their browser to be able to sign requests easily. User experience with regular browsers and other wallets can be frustrating on certain devices. 

## No Personal Data Collection

Bitcoin Betting is accessible to anyone. No personal data is ever collected. Not even names or email addresses. The identity management is entirely handled by your wallet. Any transaction that is submitted to the ledger must be signed by that wallet. 

## Privacy & Block Explorers

All transactions on Bitcoin Betting are public and accessible via so called "Block Explorers".  A current very simple alpha version is integrated into each node and can be found for example under  https://node928.info:1443/, https://bitcoin-betting.org:1443/  or  https://node82.sytes.net:1443

It is recommended to not save any personal data in the ledger. Bitcoin Betting is thus not suitable for money laundering or other criminal activities as all transactions are easily traceable. 

## Getting Access  and Referral Bonus System

The developers of the protocol are aware, that having an completely decentralized platform for any kind of market open to everyone without entry restrictions may lead to severe negative external effects. Thus the platform is invite-only. Having an Invite-Only-Platform shall maintain a high quality user base and keep out bad actors.  

New accounts can only be created by existing accounts. This can be done directly by issuing an arbitrary Invite Code. Once you have an account, deposits can be made by passing your User Id to the deposit function of the Ethereum Smart Contract.  

If bad actors enter the platform anyway, the issuer of the invite has a certain period, in which he can revoke any invite and optionally all their referrals. After the revoke request is initiated, the affected account can only withdraw funds but not place any new orders. 

Referrers of multiple bad actors may also be banned. Thus it is recommended to only invite new users that are trustworthy.

Referring a new user will be rewarded with a 10% share of all generated commissions by that user and of all subordinate referrals of that user. 

## Commission

For any market settlement, a small commission is collected. The commission is always set by the creator of a market. It is recommended that the base commission (excluding VIP reduction) is 

- not higher than 0.25% for markets, that settle automatically and
- not higher than 2% for markets that have to be settled manually.

For binary markets, commissions are only collected on wins.

## VIP Model

Users can obtain a VIP Status from Level 1 to 10. Among other benefits, a user can enjoy lower commissions with a higher VIP status. The commission reductions are as follows:

- VIP 1:   2%
- VIP 2:   5%
- VIP 3:   10%
- VIP 4:   15%
- VIP 5:   20%
- VIP 6:   30%
- VIP 7:   40%
- VIP 8:   45%
- VIP 9:   54%
- VIP 10:  60%

The VIP Status is determined based on the VIP points. VIP points decay by 5% each week and can be earned by paying commission on the platform.

## Getting in touch

The platform is fully governed by the Bitcoin Betting DAO.  All protocol and UI changes are decided by the DAO. Furthermore the DAO will receive all commissions that are ever collected. 
Proposals can be initiated via:

https://app.aragon.org/#/daos/ethereum/bitcoin-betting.dao.eth/dashboard 

Any bug report or feature proposal that is accepted by the DAO will usually be rewarded directly by sending WBTC to the Ethereum address of the initiator of the proposal.

A governance forum is planned, in the meantime matters can be discussed in the chat on:

https://app.bitcoin-betting.com

New Proposals and updates from the DAO will also be published on:

https://x.com/_bitcoinbetting

## Ownership

It is also possible to trade ownership tokens of Bitcoin Betting: bbet tokens (Contract address 0x60b8b2bf009a90d3864068bff2c2cb37d86b12ec).   There exist a maximum of 1 million bbet tokens that represent full ownership of all source code, IP, domains and funds associated with Bitcoin Betting excluding user funds.

These tokens can be traded on uniswap for example or P2P. 

## Running a Node

Anyone who wants to support the network is free to run their own node (please check Running a Node.md) and perform all transactions directly on that node, collect transaction / mining fees and more. 

## API

Please check the API documentation.md file for further details as well as the Javascript samples.


## Restricted Regions

By default, certain IPs like US IPs are restricted from connecting to a node. Any node operator is free to add or remove regions from the list by editing the IPRanges.ini config file. 

## OnHold

Missettlements happen rarely on Bitcoin Betting, but cannot be avoided.  To be able to resettle markets without having one user left with a negative balance, a certain amount will be placed "OnHold"  up to 24 hours after the last settlement.  The "OnHold" amount is designed in a way that if any single event of the last 24 hours resettles to a different outcome, that the user will not be left with a negative balance.  
It is possible to disable "OnHold" by paying a certain insurance fee. The insurance fee is dependent on the Sport and Competition. Here the current list: 



    ESPORTS  0.004m
    BITCOIN  0m
    DICE     0m
    SOCCER  0.0005m
    TENNIS   0.0005m
    HOCKEY       
            NHL  0.0002m
            default 0.0005m        
    VOLLEYBALL  0.0005m
    HANDBALL  0.0005m
    GOLF  0.002m
    AMERICANFOOTBALL  0.0002m
    BASEBALL       
            MLB  0.0002m
            default  0.002m        
    BASKETBALL       
            case NBA  0.0002m
            case NCAA  0.002m
            default  0.0005m   
    default  0.001m


# Technical Details 

## DAGs

Bitcoin Betting utilizes Directed Acyclic Graphs to store and process transactions. Unlike with blockchains this technology allows different nodes or parts of the network to work on their own branches seperately and only merge them with other nodes if it is possible or beneficial to do so.  For example, a node in Venezuela can continue to operate normally and process local markets and orders 
with local users if the connection to Venezuela drops for a day for some reason. It will merge normally with the network again, when the connection is reestablished as long as there are no conflicts with the transactions (double spending for example). Alternatively, private companies could set up their own node to host their private internal prediction markets and only release the data when it is safe to do so.

## Storage Units

DAGs are graphs that link so called Storage Units together. Each new Storage Unit is always referencing at least one, in most cases two or three existing Storage Units. This will form a partial order on the set of all Storage Units.  

## Efficient usage of disk space

Bitcoin Betting is using the limited storage resources efficiently by only mining transactions permanently that are relevant. 
Transactions like order cancellations, markets with no orders, open orders that were never matched and similar transactions are only kept in the mempool. Once it will become clear, that these transaction are no longer used, they will be removed from the mempool. Only transactions that will have a permanent effect on the account balances will be saved forever.

## Storage Unit Types

On the platform, dozens of types of Storage Units are implemented.  The most used ones are described here.

### Currency Issuance

It is possible to issue your own currency of your choosing. This can happen either in a centralized way, where one user is responsible for issuing and destroying units of that currency or in a trustless way, by interacting with a bridge on a different blockchain. 

For example ETH can be deposited to a smart contract on the Ethereum Blockchain and whenever the nodes are informed about such a transaction, they issue the currency automatically to the indicated user account.  

### Transfer Funds

Units of any currency can be transferred to any other user. 

Within that request type it is also possible to burn units of any currency. Once enough validators confirm with a signature, that the currency units have been burned, these signatures  can be used to claim your funds back via the Smart Contract on the Ethereum Blockchain.

### Invite Users

It is possible to invite new users. For a limited time it is possible to revoke invites.  For all commissions paid by the invited user and their referrals, the referrer will get 10% of all generated commissions.

### Create Markets

Different markets are allowed on the platform. Binary / Prediction Markets are the most common, but also CFD or direct exchange markets are integrated among others. The market creator is free to determine settler, market conditions and commissions for that market. A maximum of 2% commissions is however enforced.

### Order Alterations

Order Alteration Requests combine all create, cancel and modify requests that are issued to handle orders on any market.  It is a big challenge to find a good solution for reliable and fast  order processing in a decentralized network.  Platforms like Uniswap avoid centralized orderbooks for that reasons.  Projects like DYDX do have orderbooks but might struggle with front-running problems and even more important problems with reliable cancellations.  Orders can be matched at nodes that have not received the cancellation request leading to unwanted matches and bad user experience. 
For this reason, Bitcoin Betting allows Order Alterations only to be processed by a predetermined Node, that is indicated in the market settings.  

### Matches

When two orders match in the orderbook, a Match is mined by the processing node and order goes into the PENDING state.  Based on the settings of the market, the PENDING state can last for a certain time period - usually 0 to 15 seconds.  In this time the maker side of the match can either confirm or MAKERVOID the match. Once the maker confirms the order or the period has passed, the node mines another so called AmentMatch transaction to finalize the match. 

### Settlements

Markets will be settled by the user accounts indicated in the market settings upon creation.  Settlers may also delegate their settling power to other accounts and revoke it.

### Settlement Challenges

It is possible to challenge settlements. In case of a challenge, the settler has a certain time period to deal with the settlement challenge. Each settlement challenge requires a small amount of collateral to be put in.

### Node Ban / Node Replacement

Having a predetermined node to process orders of a certain market involves some risk in case the node is unavailable. If however a node becomes unreachable or inconsistent for a few minutes, order processing will continue on a different node. For this reason, each node has to determine a Replacement Node. In case the original node goes down, the Replacement Node will issue a Node Ban request and take over the order processing for all their markets. Once this request has been mined, all other nodes will know, that order processing has now moved to a different node and will direct their traffic for that market to the Replacement Node.   Once the original node comes online again, it will issue an Unban Request to revert the state.

## Double Spending

In case of double spending, the nodes that have conflicting states will stop sharing conflicting transactions with each other. In such a "chain split" event the node operator will either manually decide the correct state or automatically follow a majority vote based on the node's settings. The votes are weighted based on the funds staked in the user account that is associated with a node.  
In reality, double spending or conflicting transactions should not happen naturally. It can only happen if a malicious user sends prepared transactions to two nodes at the very same time. Such behaviour would be recognized immediately and result in a ban of the user.

## Pruning and faster syncing

Bitcoin Betting nodes are regularly saving the current state of the node. This will allow a node operator to sync his node from a certain state instead of having to process and verify all Storage Units from inception.  Also this will enable pruning of the ledger if it should become necessary in the future.













