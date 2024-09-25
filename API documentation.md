# API documentation

By default, each node also offers an API to external users. To incentivize node owners to do so, each mined transaction that is processed by a node incurs a small fee of around 1 satoshi.
The API is Websocket only. REST is not supported to ensure efficient use of each Node's limited resources.  


## How to connect

Please take note that all JSON messages/requests must be sent with UTF8 encoding.

Public node addresses:
```
wss://node82.sytes.net:82
wss://bitcoin-betting.org:82
wss://node928.info:82
```

## How to sign messages
Requests that change state requires a signature. In order to provide a valid signature, sort the `Data` object alphabetically and sign it with Ed25519 (or ECDSA if your account is flagged as `isETH`) to provide it as `SignatureUser` property inside the storage unit you send to the node.

**For signing, all fields that have default values MUST be omitted** - they are only shown for completeness in all request samples below.

The `RequestTime` and `CreatedByUser` property inside `Data` object **may not deviate more than 15 seconds from the node time** or the request might get rejected.

Nonce, RequestTime and CreatedByUser  may be omitted, but this might compromise security.

For example, consider signing the following `Data` object of a `ChangeMarketTimes` request:  
```jsonc
{
  "ClosD":"2022-11-20T19:50:00Z",
  "CreatedByUser":638267133247192363,
  "MinerFee":0.00001,
  "Mid":"c91d1993-7115-49f1-b3cd-ab9dc88821a2",
  "NodeID":1,
  "SetlD":"2022-11-20T21:50:00Z",
  "UserID":2
}
```

Your final message/request to be sent to the Node with `ID = 1`:

```jsonc
{
  "Type":"ChangeMarketTimes",
  "Nonce":63804569790630801,
  "SignatureUser":"/khiPwpPNk8gFSyrp81t1ZcbUNmF8w233bQCvhz4U5PzCcALbPiipsvWqR+AQ+cJJVHtk0RMtihpM3DHdMxSBg==",
  "Data": {
    "ClosD":"2022-11-20T19:50:00Z",
    "CreatedByUser":638267133247192363,
    "MinerFee":0.00001,
    "Mid":"c91d1993-7115-49f1-b3cd-ab9dc88821a2",
    "NodeID":1,
    "SetlD":"2022-11-20T21:50:00Z",
    "UserID":2
  }
}
```

## Handling errors
You should check `State` property on every response. In case of `State == Error`, there will be another property `Error` with the related message.

```jsonc
// Response (error):
{
  "State": "Error",
  "Type": "GetMarketByID",
  "Error": "No market found"
}
```

## What messages to sign
Only messages that write to the Ledger are required to have a signature.  Balance or Order subscriptions do not require a signature. For all these requests, it is recommended to omit "RequestTime", "Nonce" and "CreatedByUser"!


## Index
- [`ReturnHeartbeat`](#ReturnHeartbeat)  
Get the time from the server in ticks

- [`GetCurrencies`](#GetCurrencies)  
Get available currencies

- [`SubscribeSports`](#SubscribeSports)  
Get (and subscribe to) available categories

- [`SubscribeCompetitions`](#SubscribeCompetitions)  
Get (and subscribe to) available competitions by category

- [`SubscribeMarketsByFilter`](#SubscribeMarketsByFilter)  
Get (and subscribe to) markets and orderbook updates given a filter

- [`GetMarketByID`](#GetMarketByID)  
Get markets given a market ID

- [`GetFreeUserID`](#GetFreeUserID)  
Get the next available user ID

- [`GetUserIDFromPubKey`](#GetUserIDFromPubKey)  
Get user ID given a public key

- [`GetAccountSettings`](#GetAccountSettings)  
Get user ID given a public key

- [`AccountCreation`](#AccountCreation)

- [`SubscribeBalance`](#SubscribeBalance)  
Get (and subscribe to) user balance given a user ID

- [`SubscribeUOrders`](#SubscribeUOrders)  
Get (and subscribe to) unmatched orders

- [`SubscribeMatches`](#SubscribeMatches)  
Get (and subscribe to) matched orders

- [`OrderAlteration`](#OrderAlteration)  
Create, change or cancel an order created by the user

- [MarketCreation](#MarketCreation)  
Create a new market

- [`ChangeMarketTimes`](#ChangeMarketTimes)  
Change close and/or settle for a market created by the user

- [`CurrencyIssuance`](#CurrencyIssuance)  
Issue your own currency or credit your deposits

- [`GetBurnValidations`](#GetBurnValidations)  
Get a list of all burned transactions

- [`Transfer`](#Transfer)  
Withdraw your funds by sending or burning

## [Additional class documentation](interfaces.md)
---
## `ReturnHeartbeat`
Once connected to a node, you'll start receiving `ReturnHeartbeat` with the current server time in ticks every minute. The server time is returned as the `Nonce` value.
```jsonc
// Example:
{
  "State": "Success",
  "Type": "ReturnHeartbeat",
  "Nonce": "252345234523453245",
}
````

## `GetCurrencies`
Returns all active currencies on platform.
```jsonc
// Request:
{
  "Type": "GetCurrencies",
  "RequestTime": "2022-04-22T09:20:14.3856547Z", //(optional)
  "UserID": -1,
  "NodeID": 1
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "GetCurrencies",
  "Data": [
    [
      "ID" : 1,
      "Name" : "Bitcoin",
      "ColdWalletAddress" : "",
      "TotalBalance" : 100,
      "Maintainer" : 1,
      "CrossChainPayments" : "true",
      "DisallowIssuingByMaintainer" : "true",
    ],
    [
        
      "ID" : 2,
      "Name" : "Ether",
      "ColdWalletAddress" : "",
      "TotalBalance" : 1,
      "Maintainer" : 1,
      "CrossChainPayments" : "true",
      "DisallowIssuingByMaintainer" : "true",
    ]
  ]
}
````

## `SubscribeSports`
Returns all active categories (that have active/inplay markets) and subscribe to future changes.
```jsonc
// Request:
{
  "Type": "SubscribeSports"
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "SubscribeSports",
  "Data": [
    [
        "13",
        // ID

        "AMERICANFOOTBALL",
        // Slug

        "AMERICAN FOOTBALL"
        // Name
    ],
    [
        "14",
        "BASEBALL",
        "BASEBALL"
    ],
    [
        "2",
        "TENNIS",
        "TENNIS"
    ]
  ]
}
````

## `SubscribeCompetitions`
Returns all active competitions (that have active/inplay markets) by category and subscribe to future changes.
```jsonc
// Request:
{
  "Type": "SubscribeCompetitions"
}
````
```jsonc
// Response:
{
  "State": "Success",
  "Type": "SubscribeCompetitions",
  "Data": {
    "1": {
        { "Sweden - 2nd Div. Sodra Svealand": 4 },
        { "Ireland - Premier Corners": 5 },
    },
    // [CategoryID]: {[CompetitionName]: MarketCount} 

    "2": {
        { "ITF Women Ceska Lipa - QF": 3 },
    },
    "12": {
        { "Australia - NBL1 Women": 2 },
        { "New Zealand - NBL": 6 }
    },
    "35": {}
  }
}
````

## `SubscribeMarketsByFilter`
Returns all markets that match the filter and subscribe to future changes. There are three variations of responses in this method:

- `SubscribeMarketsByFilter` come in two different structures: first, after the initial  subscription all markets that match the filter are sent in batch using the maximum `PageSize` property; after that any updates on a market are sent individually. Examples of both structures below.
- If `SubscribeOrderbooks` is enabled, then `ReturnOrderbook` message is sent for every market (example below).
```jsonc
// Request:
{
  "Type": "SubscribeMarketsByFilter",
  "MaxResults": 1000,
  "Data": {
    "MarketFilter": {
      "Cat":2,
      "OnlyActive": true,
      "Status": 1,    //INPLAY
      "PageSize": 100
    },
    "SubscribeOrderbooks": true
  }
}
````
```jsonc
// Response (single market):
{
  "State": "Success",
  "Type": "SubscribeMarketsByFilter",
  "Data": {
    "Margin": 106.211,
    "ID": "890f70d1-f6d7-49c1-a17f-94428df82a8e",
    "LastCh": "2022-06-27T18:01:46.9028667Z",
    "LastSoftCh": "2022-06-27T18:01:46.9028667Z",
    "CreationDate": "2022-06-27T11:01:46.9028667Z",
    "MainNodeID": 1,
    "Comp": "CS:GO - REPUBLEAGUE",
    "Descr": "Total Away - 1st Map Over/Under 16.5",
    "Title": "forZe vs. Bad News Eagles",
    "Cat": 32,
    "ClosD": "2022-06-27T19:01:46.8982615Z",
    "SettlD": "2022-06-27T19:07:46.8982615Z",
    "Status": 1,
    "Ru": [
      {
        "Name": "Over 16.5 ",
        "mCT": 8000,
        "RedA": 0
      },
      {
        "Name": "Under 16.5 ",
        "mCT": 8000
      }
    ],
    "Type": 1,
    "Period": 1,
    "Creator": 2,
    "Settler": {
      "2": true
    },
    "SetFin": 24,
    "SettleProtocol": 0,
    "SettlT": 0,

    "Comm": 0.001,
    "ComRecip": {
      "2": 0.5,
      "1": 0.5
    },
    "MinVal": 0,
    "MaxVal": 0,
    "Cur": 0,
    "CurB": 0,
    "Flag": 0,
    "evID": 12041151212,
  }
}
```
```jsonc
// Response (multiple markets):
{
  "State": "Success",
  "Type": "SubscribeMarketsByFilter",
  "Page": 1,
  "Count": 22,
  "Data": [
    {
      "Margin": 103.268,
      "ID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
      "LastCh": "2022-05-22T05:44:28.895424Z",
      "LastSoftCh": "2022-05-22T05:44:28.895424Z",
      "MainNodeID": 1,
      "Comp": "Testcompetition",
      "Descr": "TestDescript",
      "Title": "TestMarket",
      "Cat": 12,
      "ClosD": "2022-08-14T00:00:00",
      "SettlD": "2022-08-15T00:00:00",
      "Ru": [
        {
          "VolMatched": 1.9,
          "Name": "ru1",
          "mCT": 6000
        },
        {
          "Name": "ru2",
          "mCT": 6000
        }
      ],
      "Period": 1,
      "Creator": 1,
      "Settler": {
        "1": true
      },
      "SetFin": 24
    },
    {
      "ID": "92e2a387-9305-49bb-890a-5e8934ecfdf0",
      "MainNodeID": 1,
      "Comp": "Testcompetition2",
      "Descr": "TestDescript2",
      "Title": "TestMarket2",
      "Cat": 27,
      "ClosD": "2022-09-17T00:00:00",
      "SettlD": "2022-09-18T00:00:00",
      "Ru": [
        {
          "Name": "ru5",
          "mCT": 6000
        },
        {
          "Name": "ru6",
          "mCT": 6000
        }
      ],
      "Period": 1,
      "Creator": 2,
      "Settler": {
        "1": true,
        "2": true
      },
      "SetFin": 24
    }
  ]
}
```
```jsonc
// Response (orderbook):
{
  "State": "Success",
  "Type": "ReturnOrderbook",
  "Data": {
    "MarketID": "12ef87b0-2658-4e62-83a8-a7ba46f0a6c3",
    "RunnerID": 0,
    "Bids": [],
    "Asks": [[2.14, 240.11]]
    // [[Price, Amount]]
  }
}
```

## `GetMarketByID`
Returns a market given a market ID.


```jsonc
// Request:
{
  "Type": "GetMarketByID",
  "RequestTime": "2022-07-13T19:16:03.0247397Z",
  "Data": { "mid": "d81e889f-7b98-4229-941c-ffefac4ed7c3" }
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "GetMarketByID",
  "Nonce": 8,
  "Data": {
    "Margin": 103.268,
    "ID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
    "LastCh": "2022-07-11T16:07:42.1345748Z",
    "LastSoftCh": "2022-07-11T16:07:42.1345748Z",
    "MainNodeID": 1,
    "Comp": "Testcompetition",
    "Descr": "TestDescript",
    "Title": "TestMarket",
    "Cat": 12,
    "ClosD": "2022-08-14T00:00:00",
    "SettlD": "2022-08-15T00:00:00",
    "Ru": [
      {
        "VolMatched": 1.9,
        "Name": "ru1",
        "mCT": 6000
      },
      {
        "Name": "ru2",
        "mCT": 6000
      }
    ],
    "Period": 1,
    "Creator": 1,
    "Settler": { "1": true },
    "SetFin": 24
  }
}
```

## `GetFreeUserID`
Returns an integer with the next available user ID to be used on account creation.
```jsonc
// Request:
{
  "Type":"GetFreeUserID"
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "GetFreeUserID",
  "Data": 5
}
```

## `GetUserIDFromPubKey`
Returns an integer if an account with the public key is found.
```jsonc
// Request:
{
  "Type":"GetUserIDFromPubKey"
  "Data":{
    "PublicKey":"3mVC3iAAQAA8SYKHTVi1MMIf7L+EIJL5jIOov5oNto2dk00ekGqojg=="
  }
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "GetUserIDFromPubKey",
  "Data": 1
}
```
## `GetAccountSettings`
Returns an integer if an account with the public key is found.
```jsonc
// Request:
{
  "Type":"GetAccountSettings",
  "UserID":1,
  "NodeID":104
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "GetUserIDFromPubKey",
  "Data": 1
}
```


## `AccountCreation`
Creating  an account is only possible through an existing account as a transaction fee is involved for creating it.  The Nodes accept both ED25519 and ECDSA signatures. If you like to have an account that signs requests via ECDSA, set IsETH to true on account creation.
For Create Requests all fields that have default values MUST be omitted.  Also read the Get Access  section.

Request:
```jsonc
{
  "Type": "AccountCreation",
  "Nonce": 1,
  "SignatureUser": "1HXMLy1s4zWDnu...SEFER+R2Mc/KMIfhY+OvDe8Nfuw34rECA==",
  "Data": {
    "NewAccountID": 2,
    "PubKey": "3mVC3iAAQA...to2dk00ekGqojg==",
    "IsETH":false,
    "UserID": 1,
    "NodeID": 1,
    "MinerFee":0.00001,
    "CreatedByUser": "2022-07-19T11:01:25.8980825Z"
  }
}
```

Response:
```jsonc
{
   "State": "Success",
   "Type": "AccountCreation",
   "Nonce": 1,
   "Data": {
     "NewAccountID": 2,
     "PubKey": "3mVC3iAAQAA8SYKHTVi1MMIf7L+EIJL5jIOov5oNto2dk00ekGqojg==",
     "IsETH":false,
     "UserID": 1,
     "NodeID": 1,
     "CreatedByUser": "2022-07-19T11:01:25.8980825Z"
   }
}
```

## `ISSUEINVITE`
Issuing an invite. In order to issue an invite to the platform, you must hash your custom secure invite code (Only Uppercase letters) with SHA256 and provide the UTF-8 encoded string as InviteCodeHash. Issueing an invite costs at least 0.001mBTC  (StartingBalance).  The InviteCode must be at least 11 characters long. 


Request:
```jsonc
{
  "Type": "AccountCreation",
  "Nonce": 1,
  "SignatureUser": "1HXMLy1s4zWDnu...SEFER+R2Mc/KMIfhY+OvDe8Nfuw34rECA==",
  "Data": {
    "CreationMode": 1,
    "InviteCodeHash":"97da58f1c01fd2f573b006687afa5d81e46a5116ada08d9fcb58efaa872c1fcb"
    "UserID": 1,
    "StartingBalance":0.001,
    "NodeID": 1,
    "CreatedByUser": "2024-07-19T11:01:25.8980825Z"
  }
}
```

Response:
```jsonc
{
   "State": "Success",
   "Type": "AccountCreation",
   "Nonce": 1,
   "Data": null
}
```

## `REDEEMINVITE`
Issuing an invite

Request:
```jsonc
{
  "Type": "AccountCreation",
  "Nonce": 1,
  "SignatureUser": "1HXMLy1s4zWDnu...SEFER+R2Mc/KMIfhY+OvDe8Nfuw34rECA==",
  "Data": {
    "CreationMode": 2,
    "NewAccountID": 220,
    "PubKey": "3mVC3iAAQA...to2dk00ekGqojg==",
    "IsETH":false,
    "InviteCode":"2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b"   
    "NodeID": 1,
    "MinerFee":0.00001,
    "CreatedByUser": "2022-07-19T11:01:25.8980825Z"
  }
}
```

Response:
```jsonc
{
   "State": "Success",
   "Type": "AccountCreation",
   "Nonce": 1,
   "Data": null
}
```

## `DELETEINVITE`
Issuing an invite. In order to issue an invite to the platform, you must hash your custom secure invite code with SHA256 and provide the UTF-8 encoded string as InviteCodeHash. Issueing an invite costs 0.01mBTC.


Request:
```jsonc
{
  "Type": "AccountCreation",
  "Nonce": 1,
  "SignatureUser": "1HXMLy1s4zWDnu...SEFER+R2Mc/KMIfhY+OvDe8Nfuw34rECA==",
  "Data": {
    "CreationMode": 3,
    "InviteCodeHash":"97da58f1c01fd2f573b006687afa5d81e46a5116ada08d9fcb58efaa872c1fcb"
    "UserID": 1,
    "NodeID": 1,
    "MinerFee":0.00001,
    "CreatedByUser": "2022-07-19T11:01:25.8980825Z"
  }
}
```

Response:
```jsonc
{
   "State": "Success",
   "Type": "AccountCreation",
   "Nonce": 1,
   "Data": null
}
```

## `AccountSettings`
For Create Requests all fields that have default values MUST be omitted. They are just listed to ensure completeness.
AbsenceCancelMS is only for professional Market Makers. In case the user has not submitted any order for the past X  milliseconds, the User is marked offline and no open orders will be matched.
ForceConfirmMatched: if this is set to True and as the Market Maker of a match, you are not confirming the match in time, the match will automatically be voided and a penalty deducted
DisableOnHold:   Disable the withholdings of the largest win of the last 24 hours. An additional commission will apply if you opt-in and is accumulated in an insurance fund. Additional insurance commission will range from  from 1  to 20 basis points based on the Competition.   Negative balances of any user account will be covered from the insurance fund.

"SelfExclude": will self exclude your account from posting any orders until set date. Also transfers to other users and invites are not possible.

Request:
```jsonc
{
  "Type": "AccountSetting",
  "Nonce": 1,
  "SignatureUser": "1HXMLy1s4zWDnu...SEFER+R2Mc/KMIfhY+OvDe8Nfuw34rECA==",
  "Data": {
    "AccountID": 2,
    "AbsenceCancelMS": null,
    "ForceConfirmMatched": null,
    "DisableOnHold": true,
   "SelfExclude":  "2022-07-19T11:01:25.8980825Z",
    "NodeID": 1,
    "MinerFee":0.00001,
    "CreatedByUser": "2022-07-19T11:01:25.8980825Z"
  }
}
```

Response:
```jsonc
{
   "State": "Success",
   "Type": "AccountSetting",
   "Nonce": 1,
   "Data": null
}
```
## `SubscribeBalance`
Returns user balance and subscribes to future balance changes given a user ID. This does not require authentication.
```jsonc
// Request:
{
  "Type": "SubscribeBalance",
  "UserID": 2,
  "NodeID": 1
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "SubscribeBalance",
  "Data": {
    "0": {
      "AvailableFunds": 9979.01,
      "CreatorUsed": 20,  
      "ReservedFunds":0,
      "MaxFunds":0,
      "UsedFunds":0,
      "SettleUsed":0,
      "OnHold":0,
      "RemainingRequests":0,
    }
  }
}
```

## `SubscribeUOrders`
Get unmatched orders and subscribes to future changes. This does not require autentication.
```jsonc
// Request:
{
  "Type": "SubscribeUOrders",
  "Nonce": 6,
  "UserID": 1,
  "NodeID": 1,
  "Data": {
    "FromDate": "9999-12-31T23:59:59.9999999",
    "ToDate": "9999-12-31T23:59:59.9999999",
    "PageSize": 100,
    "SubscribeUpdates": true,
    "AddMarketSummary":false,
    "Types":[
	    "Default",
	    "Same"
    ]
    // Types: Default, PostOnly, KillOrFill, Same
  }
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "SubscribeUOrders",
  "Nonce": 6,
  "Count": 1,
  "Data": [
    {
      "UserOrder": {
        "HiddenLUChange": 637931524616597824,
        "MarketID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
        "OrderID": "ce8bdedc-b345-44f3-b54e-11ea3f44975f",
        "Side":0,
        "RunnerID":0,
        "Note":null,
        "Insurance":false,
      },
      "UnmatchedOrder": {
        "SUID": "370567508BA10F0E42BD414AC93AC56A36C8702B7F94F32762E22970FCAE32DC",
        "Price": 1.7,
         "Cur" :0,
        "RemAmount": 2.0,
        "RemAmountD": {
           0: 10,
           1:5
        }
        "State": 2,   
        "Amount": 2.0,
        "AmountD": {
           0: 10,
           1:5
        }
         "ID": "ce8bdedc-b345-44f3-b54e-11ea3f44975f",
        "makerCT": 6000,
        "UserID": 1,
        "Type" :1,
        "Side":1,
        "Note":"",
        "CancelAt": "2022-07-11T16:07:41.8473882Z",
      }
    },    
    {
      "UserOrder": {
        "HiddenLUChange": 637931524616708953,
        "Side": 1,
        "MarketID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
        "OrderID": "b26a4789-81d0-4a5d-842b-392aac17c4d2"
      },
      "UnmatchedOrder": {
        "SUID": "1CFCC078DF55E3901DB706ED6BEB0A6781DC273D35EA1C7BECBDA9B9CF2A8AED",
        "Price": 2.5,
        "RemAmount": 3.0,
        "Side": 1,
        "Amount": 3.0,
        "ID": "b26a4789-81d0-4a5d-842b-392aac17c4d2",
        "makerCT": 6000,
        "UserID": 1
      }
    },
    {
      "UserOrder": {
        "HiddenLUChange": 637931524616219927,
        "MarketID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
        "OrderID": "c0c025a2-dc39-4c5a-afaf-40c975ac014e"
      },
      "UnmatchedOrder": {
        "SUID": "4A4BC5B7477D1953B92D081D773CD6630846E78910EAE2DBE2B3F47835849B64",
        "Price": 1.5,
        "RemAmount": 3.0,
        "Amount": 3.0,
        "State": 0,
        "ID": "c0c025a2-dc39-4c5a-afaf-40c975ac014e",
        "makerCT": 6000,
        "UserID": 1
      }
    },
    {
      "UserOrder": {
        "HiddenLUChange": 637931524616651548,
        "Side": 1,
        "MarketID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
        "OrderID": "dfd965a8-554e-495f-9c96-fb9612e90d22"
      },
      "UnmatchedOrder": {
        "SUID": "201540BE64FCE9D131AC3D5D123E9C47285DEFAB0192B7ACC9F583354EBDD759",
        "Price": 2.3,
        "RemAmount": 2.0,
        "Side": 1,
        "Amount": 2.0,
        "State": 1,
        "ID": "dfd965a8-554e-495f-9c96-fb9612e90d22",
        "makerCT": 6000,
        "UserID": 1
      }
    }
  ]
}
```

## `SubscribeMatches`
Returns all matched user orders and subscribes to future changes. This does not require autentication.
```jsonc
// Request:
{
  "Type": "SubscribeMatches",
  "Nonce": 5,
  "UserID": 1,
  "NodeID": 1,
  "Data": {
	"FromDate": "9999-12-31T23:59:59.9999999",
    "ToDate": "9999-12-31T23:59:59.9999999",
    "PageSize": 100,
    "AddMarketSummary":false,
    "SubscribeUpdates": true
  }
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "SubscribeMatches",
  "Nonce": 5,
  "Count": 1,
  "Data": [
    {
      "UserOrder": {
        "MarketID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
        "OrderID": "aeda7c0a-5dbb-48f2-8ffa-f768b706c51b",
        "Note": ";2",
        "Side":0,
        "RunnerID":0,
        "Note":null,
        "Insurance":false,
      },
      "MatchedOrder": {
        "ID": "aeda7c0a-5dbb-48f2-8ffa-f768b706c51b",
        "State": 1,
        "CreationDate": "2022-07-11T16:07:41.8473882Z",
        "Price": 1.9,
        "Amount": 1.0,
        "DecResult":0,
        "R":0,
        "Red":0,
        "MakerCancelTime":0,
      }
    }
  ]
}
```

## `OrderAlteration`
Use to create, change or cancel an order created by the same user. Take note that all fields that have default values MUST be omitted. So putting `"Side":0` for example will be rejected by any node.
```jsonc
// Request:
{
  "Type": "OrderAlteration",
  "Nonce": 4,
  "SignatureUser": "rvPmrUb/Sx/HpuQlKAvBD...LWFpOIsyah5XQL6APZW06mBE8CA==",
  "Data": {
    "UserOrder": {
      "MarketID": "d81e889f-7b98-4229-941c-ffefac4ed7c3"
    },
    "UnmatchedOrder": {
      "Amount": 3.0,
      "ID": "c0c025a2-dc39-4c5a-afaf-40c975ac014e",
      "makerCT": 6000,
      "Price": 1.5,
      "RemAmount": 3.0,
      "Side":1,
      "Type":2,
     },
    "UserID": 1,
    "NodeID": 1,
    "MinerFee":0.00001,
    "CreatedByUser": "2022-07-19T11:08:48.9997487Z",
    "LayAsL": false,
    // Set this to true if you place a lay order on a binary market and you like to have the amount as liability of the order.

    "Local": false,
   // Indicates whether the order shall be shared with all other nodes. Local = true will require a lower Miner Fee. By default all markets are shared accross all nodes
  }
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "OrderAlteration",
  "Nonce": 4,
  "Data": {
    "UserOrder": {
      "MarketID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
      "OrderID": "c0c025a2-dc39-4c5a-afaf-40c975ac014e",
      "Side":1
    },
    "UnmatchedOrder": {
      "Price": 1.5,
      "RemAmount": 3.0,
      "Amount": 3.0,
      "ID": "c0c025a2-dc39-4c5a-afaf-40c975ac014e",
      "makerCT": 6000,
      "Side":1,
      "UserID": 1
    },
    "UserID": 1,
    "NodeID": 1,
    "MinerFee":0.00001,
    "CreatedByUser": "2022-07-19T11:08:48.9997487Z"
  }
}
```

## `MarketCreation`
Creates a new market. Take note that all fields that have default values MUST be omitted. So putting `"Period":0` for example will be rejected by any node.
```jsonc
// Request:
{
  "Type": "MarketCreation",
  "Nonce": 3,
  "SignatureUser": "FOOuU5oibmQatnBx4VrxMvwA6...P8bqm7J+38gz+xP945a4Cg==",
  "Data": {
    "ID": "2646b51a-bd6b-498d-b246-ae80ecbc3f3c",
    "Market": {
      "ID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
      "MainNodeID": 1,
      "Comp": "Testcompetition",
      "CreationDate": "2022-07-19T11:05:17.5852297Z",
      "Descr": "TestDescript",
      "Title": "TestMarket",
      "Cat": 12,
      "ClosD": "2022-08-15T00:00:00",
      "SettlD": "2022-08-16T00:00:00",
      "Ru": [
        {
          "Name": "ru1",
          "mCT": 6000
        },
        {
          "Name": "ru2",
          "mCT": 6000
        }
      ],
      "Period": 1,
      "Creator": 1,
      "Settler": { "1": true },
      "ComRecip": { "1": 0.5 },
      "SetFin": 24
    },
    "UserID": 1,
    "NodeID": 1,
    "MinerFee":0.00001,
    "CreatedByUser": "2022-07-19T11:05:17.5852297Z"
  }
}
```
```jsonc
// Response:
  {
    "State": "Success",
    "Type": "MarketCreation",
    "Nonce": 3,
    "Data": {
      "Market": {
        "ID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
        "MainNodeID": 1,
        "Comp": "Testcompetition",
        "CreationDate": "2022-07-19T11:05:17.5852297Z",
        "Descr": "TestDescript",
        "Title": "TestMarket",
        "Cat": 12,
        "ClosD": "2022-08-15T00:00:00",
        "SettlD": "2022-08-16T00:00:00",
        "Ru": [
          {
            "Name": "ru1",
            "mCT": 6000
          },
          {
            "Name": "ru2",
            "mCT": 6000
          }
        ],
        "Period": 1,
        "Creator": 1,
        "Settler": { "1": true },
        "ComRecip": { "1": 0.5 },
        "SetFin": 24
      },
      "UserID": 1,
      "NodeID": 1,
      "CreatedByUser": "2022-07-19T11:05:17.5852297Z"
    }
  }
```

## `ChangeMarketTimes`
Changes closing and settlement dates for any market that was created by the same user. Take note that all fields that have default values MUST be omitted. So putting `"Period":0` for example will be rejected by any node.
```jsonc
// Request:
{
  "Type": "ChangeMarketTimes",
  "Nonce": 63804569790630801,
  "SignatureUser": "FOOuU5oibmQatnBx4VrxMvwA6...P8bqm7J+38gz+xP945a4Cg==",
  "Data": {
    "ID": "2646b51a-bd6b-498d-b246-ae80ecbc3f3c",
    "ClosD":"2022-11-20T19:50:00Z",
    "SetlD":"2022-11-20T21:50:00Z",
    "UserID": 1,
    "NodeID": 1,
    "MinerFee":0.00001,
    "CreatedByUser": "2022-07-19T11:05:17.5852297Z"
  }
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "ChangeMarketTimes",
  "Nonce": 63804569790630801,
  "Data": ""
}
```

## `CurrencyIssuance` 
Allows you to issue your own currency. If Maintainer is set to `0` (default), the currency is self maintained and currency can be issued via  `CrossChainPayments` only. `CrossChainPayments` must be enabled if no Maintainer is set. If `DisallowIssuingByMaintainer` is set to `true`, the maintainer may only issue the Currency on creation, and may not change the total amount later on. 
```jsonc
// Creating a self-maintained Currency
// Request:
{
  "Type": "CurrencyIssuance",
  "Nonce": 63804569790630801,
  "SignatureUser": "FOOuU5oibmQatnBx4VrxMvwA6...P8bqm7J+38gz+xP945a4Cg==",
  "Data": {
    "Currency": {
      "ID":101,
      "Name": "MilliWrappedBitcoin",
      "Symbol" : "mWBTC",
      "ColdWalletAddress": "some SmartContractAddress",
      "CrossChainPayments":true,
      "DisallowIssuingByMaintainer":true
      // "TotalBalance": 0,
      // "Maintainer": 0,
     },
    "MinerFee":0.00001,
    "NodeID": 1,
    "UserID":1
  }
}
```
```jsonc
// Deposit: after a smart contratct deposit, the amount must be credited via the following:
// Request:
{
  "Type": "CurrencyIssuance",
  "Nonce": 63804569790630801,
  "SignatureUser": "FOOuU5oibmQatnBx4VrxMvwA6...P8bqm7J+38gz+xP945a4Cg==",
  "Data": {
    "Deposit": {
      "TXID": "0x920960a4812bf2ad8395a4a451b232daea3805b427b94e20b4bc1f1e1ac0f480",
      "UserID": 4,
      "Amount": 15
    },
    "Currency": {
      "ID": 101
    },
    "NodeID": 1,
    "UserID":1
  }
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "CurrencyIssuance",
  "Nonce": 63804569790630801,
  "Data": null
}
```

## `GetBurnValidations`
Get a list of all burned transactions.
```jsonc
// Request:
{
  "Type": "GetBurnValidations",
  "Data": {
    "NodeID": 1,
    "UserID": 13,
    "MaxResults":10
  }
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "GetBurnValidations",
  "Nonce": 63804569790630801,
  {
    "BurnValidations": [{
      "TXID": "0x123456789",
      "Cur": 1,
      "Amount": 1,
      "Nonce": 12345678,
      "Address": "0x12345",
      "SignatureValidator": "0x1234567",
      "CreationTime": "2023-08-04T05:00:00.9997487Z"
    }],     
    "UserID": 13,
    "NodeID": 1,
    "CreatedByUser": 638267133247192363
  }
}
```


## `Transfer`
Allows you to transfer funds to a different user account or to burn the funds to withdraw them via a cross chain bridge.
Funds that are burned, can be retrieved via Smart Chain Bridges on other Chains. For burning transaction the `Descr` field needs to contain the withdrawal address. Adding additional information in the `Descr` field or putting an wrong address there might result in your funds being permanently lost.
```jsonc
// Request:
{
  "Type": "Transfer",
  "Nonce": 63804569790630801,
  "SignatureUser": "FOOuU5oibmQatnBx4VrxMvwA6...P8bqm7J+38gz+xP945a4Cg==",
  "Data": {
    "ID": "2646b51a-bd6b-498d-b246-ae80ecbc3f3c",
    "Cur": 0,
    "From": 43,
    "To": 5,
    "Reference": "0x63c3223207A1400868b05e756c26E77284B9ebC1",
    "TType": 10,
    "NodeID": 1,
    "Amount": 10.5,
    "MinerFee":0.00001,
    "CreatedByUser": "2022-07-19T11:05:17.5852297Z"
  }
}
```
```jsonc
// Response:
{
  "State": "Success",
  "Type": "Transfer",
  "Nonce": 63804569790630801,
  "Data": null
}
```
