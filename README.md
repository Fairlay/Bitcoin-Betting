# Websocket API documentation

Use the address below to access the test server. It's a simple proxy so we can work on a HTTPS environment. All requests are currently proxied to **`83.171.236.194:81`**.

> `wss://proxy-ws.fairlay.com`

## Index
- [Server Time (ReturnHeartbeat)](#server-time-returnheartbeat)
- [Get Categories (SubscribeSports)](#get-categories-subscribesports)
- [Get Competitions (SubscribeCompetitions)](#get-competitions-subscribecompetitions)
- [Get Markets and Orderbooks (SubscribeMarketsByFilter)](#get-markets-and-orderbooks-subscribemarketsbyfilter)
- [Get Market by ID (GetMarketByID)](#get-market-by-id-getmarketbyid)
- [Get User ID from Public Key (GetUserIDFromPubKey)](#get-user-id-from-public-key-getuseridfrompubkey)
- [Get Next Available User ID (GetFreeUserID)](#get-next-available-user-id-getfreeuserid)
- [Create an account (AccountCreation)](#create-an-account-accountcreation)
- [Get User Balances (SubscribeBalance)](#get-user-balances-subscribebalance)
- [Get Matches (SubscribeMatches)](#get-matches-subscribematches)
- [Get unmatched user orders (SubscribeUOrders)](#get-unmatched-user-orders-subscribeuorders)
- [Order alteration (OrderAlteration)](#order-alteration)
- [Create Market (MarketCreation)](#create-market-marketcreation)

## Server Heartbeat (ReturnHeartbeat)
Returns the current server time in ticks. First directly after connecting then with an interval of one minute. The server time is returned as the "Nonce" value.
Response:
```jsonc
{
    "State": "Success",
    "Type": "ReturnHeartbeat",
    "Nonce": "252345234523453245",
    // Server time in ticks / 10
}
````

## Create Market (MarketCreation)
Creates a market.
Request:
```jsonc
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
    "CreatedByUser": "2022-07-19T11:05:17.5852297Z"
  }
}
```

Response:
```jsonc
  {
    "State": "Success",
    "Type": "MarketCreation",
    "Nonce": 3,
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
      "CreatedByUser": "2022-07-19T11:05:17.5852297Z"
    }
  }
```

## Create an account (AccountCreation)
Creating  an account is only possible through an existing account as a transaction fee is involved for creating it. The Nodes accept both ED25519 and ECDSA signatures. If you like to have an account that signs requests via ECDSA, set IsETH to true on account creation.


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

## Change or create an order (OrderAlteration)
Used to create or change an order.

Request:
```jsonc
{
  "Type": "OrderAlteration",
  "Nonce": 4,
  "SignatureUser": "rvPmrUb/Sx/HpuQlKAvBD...LWFpOIsyah5XQL6APZW06mBE8CA==",
  "Data": {
    "UserOrder": {
      "MarketID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
      "OrderID": "c0c025a2-dc39-4c5a-afaf-40c975ac014e"
    },
    "UnmatchedOrder": {
      "Price": 1.5,
      "RemAmount": 3.0,
      "Amount": 3.0,
      "State":0,
      "ID": "c0c025a2-dc39-4c5a-afaf-40c975ac014e",
      "makerCT": 6000,
      "UserID": 1
    },
    "UserID": 1,
    "NodeID": 1,
    "CreatedByUser": "2022-07-19T11:08:48.9997487Z"
  }
}
```

Response:
```jsonc
{
    "State": "Success",
    "Type": "OrderAlteration",
    "Nonce": 4,
    "Data": {
      "UserOrder": {
        "MarketID": "d81e889f-7b98-4229-941c-ffefac4ed7c3",
        "OrderID": "c0c025a2-dc39-4c5a-afaf-40c975ac014e"
      },
      "UnmatchedOrder": {
        "Price": 1.5,
        "RemAmount": 3.0,
        "Amount": 3.0,
        "ID": "c0c025a2-dc39-4c5a-afaf-40c975ac014e",
        "makerCT": 6000,
        "UserID": 1
      },
      "UserID": 1,
      "NodeID": 1,
      "CreatedByUser": "2022-07-19T11:08:48.9997487Z"
    }
  }
  
```

  State can be 0 (ACTIVE), 1 (CANCELLED), 2 (FULLYMATCHED), 3 (MATCHEDANDCANCELLED)
  
  
## Get Categories (SubscribeSports)
Returns all active categories (have active/inplay markets).

Request:
```jsonc
{
    "Type": "SubscribeSports",

    "RequestTime": "2022-04-22T09:20:14.3856547Z",
    // Should be close to server's time

    "UserID": -1,
    // This will be a "short" integer ID (1k to 1m)
    // No user identity necessary

    "NodeID": 1
    // This will be the same as the User ID who is running the node
}
```

Response:
```jsonc
{
    "State": "Success",

    "Type": "SubscribeSports",

    "Data": [
        [
            "13",
            "AMERICANFOOTBALL",
            "AMERICAN FOOTBALL"
        ],
        [
            "14",
            "BASEBALL",
            "BASEBALL"
        ],
        ...
        [
            "2",
            "TENNIS",
            "TENNIS"
        ]
    ]
    // Array of [ID, slug, name]
}
````

## Get Competitions (SubscribeCompetitions)
Returns all active competitions for all categories (have active/inplay markets).

Request:
```jsonc
{
    "Type": "SubscribeCompetitions",

    "RequestTime": "2022-04-22T09:21:07.6501979Z",
    // Should be close to server's time

    "UserID": -1,
    // This will be a "short" integer ID (1k to 1m)
    // No user identity necessary
    
    "NodeID": 1
    // This will be the same as the User ID who is running the node
}
````

Response:
```jsonc
{
    "State": "Success",

    "Type": "SubscribeCompetitions",

    "Data": {
        "1": [
            "Sweden - 2nd Div. Sodra Svealand",
            "Ireland - Premier Corners",
            "Argentina - Torneo Federal A",
            "Germany - Berlin Liga",
            "Poland - 3rd Liga Group 2"
        ],
        "2": [
            "ITF Women Ceska Lipa - QF",
            "ITF Women Madrid - R16",
            "ATP Challenger Corrientes - R16",
            "ITF Women Madrid - SF",
            "ATP London - R16",
            "ITF Men Santo Domingo - SF",
            "ITF Men Martos - R16",
            "ITF Men Santo Domingo - R16"
        ],
        "12": [
            "Australia - NBL1 Women",
            "WNBA",
            "Puerto Rico - Superior Nacional",
            "Serbia - Nasa Liga",
            "Bolivia - Libobasquet",
            "Spain - ACB",
            "Paraguay - Primera",
            "Brazil - LBF Women",
            "New Zealand - NBL"
        ],
        "35": []
    }
    // Dict where key is category ID with an array of competition names
}
````

## Get Markets and Orderbooks (SubscribeMarketsByFilter)
Returns all markets that match the filter and subscribe to future changes. There are three variations of messages that comes from this method:

- `SubscribeMarketsByFilter` come in two different structures: first, after the initial  subscription all markets that match the filter are sent in batch using the maximum `PageSize` property; after that any updates on a market are sent individually. Examples of both structures below.
- If `SubscribeOrderbooks` is enabled, then `ReturnOrderbook` message is sent for every market (example below).

Request:
```jsonc
{
    "Type": "SubscribeMarketsByFilter",

    "RequestTime": "2022-05-03T19:53:33.1218254Z",
    // Should be close to server's time

    "UserID": -1,
    // This will be a "short" integer ID (1k to 1m)
    // No user identity necessary

    "NodeID": 1,
    // This will be the same as the User ID who is running the node

    "Data": {

        "MarketFilter": {

            "OnlyActive": true,

            "PageSize": 100
            // Number of markets per page (websocket message)
        },
        // These are the options for MarketFilter object:
        //     int Cat;
        //     string Comp;
        //     string Descr;
        //     string Comp;
        //     string Descr;
        //     int TypeOR;
        //     int PeriodOR;
        //     int SettleOR;
        //     bool ToSettle;
        //     bool OnlyMyCreatedMarkets;
        //     DateTime ChangedAfter;
        //     DateTime SoftChangedAfter;
        //     bool OnlyActive;
        //     decimal MaxMargin;
        //     bool NoZombie;
        //     DateTime FromClosT;
        //     DateTime ToClosT;

        //     General searches in Runner, Title, Description and Competition
        //     string GeneralAND;
        //     string GeneralNOT;
        //     string GeneralOR;
        //     string RunnerAND;
        //     string TitleAND;

        //     int PageSize (defaults to 200);
        //     int FromID;
        //     int ToID;

        //     Following is a propery to sort markets
        //     enum Sorting:
        //          MIX,
        //          MATCHEDVOLUME,
        //          CLOSING,
        //          OPENORDERSVOLUME
        //     MIX formula: MatchedVolume  + Closing < 1h ? 10 : <3h ? 5: <12h  ? 3 : <24h ? 2 : <48h ? 1 :0 + OpenOrdersVolume >500 ? 10: >300

        "SubscribeOrderbooks": true
        // Set this option to true to get orderbook updates
    }
}
````

Response (single market):
```jsonc
{
    "State": "Success",

    "Type": "SubscribeMarketsByFilter",

    "Data": {
        "Margin": 106.211,

        "ID": "890f70d1-f6d7-49c1-a17f-94428df82a8e",

        "LastCh": "2022-06-27T18:01:46.9028667Z",
        // Last Changed

        "LastSoftCh": "2022-06-27T18:01:46.9028667Z",
        // Last Soft Changed (orderbook changed)

        "MainNodeID": 1,
        // Node responsible to processing the order matches for this market

        "Comp": "CS:GO - REPUBLEAGUE",
        // Competition

        "Descr": "Total Away - 1st Map Over/Under 16.5",
        // Description

        "Title": "forZe vs. Bad News Eagles",
        
        "Cat": 32,
        // Category

        "ClosD": "2022-06-27T19:01:46.8982615Z",
        // Close date

        "SettlD": "2022-06-27T19:07:46.8982615Z",
        //Settle Date

        "Status": 1,
        // enum:
        //     ACTIVE,
        //     INPLAY,
        //     SUSPENDED,
        //     CLOSED,
        //     SETTLED,
        //     CANCELLED
        
        // Runners
        "Ru": [
            {
                "Name": "Over 16.5 ",
                "mCT": 8000
            },
            {
                "Name": "Under 16.5 ",
                "mCT": 8000
            }
        ],
        
        "Type": 1,
        // enum:
        //     M_ODDS,
        //     OVER_UNDER,
        //     OUTRIGHT,
        //     GAMESPREAD,
        //     SETSPREAD,
        //     CORRECT_SCORE,
        //     FUTURE,
        //     BASICPREDICTION,
        //     RESERVED2,
        //     RESERVED3,
        //     RESERVED4,
        //     RESERVED5,
        //     RESERVED6

        "Period": 1,
        // enum:
        //     UNDEFINED,
        //     FT,
        //     FIRST_SET,
        //     SECOND_SET,
        //     THIRD_SET,
        //     FOURTH_SET,
        //     FIFTH_SET,
        //     FIRST_HALF,
        //     SECOND_HALF,
        //     FIRST_QUARTER,
        //     SECOND_QUARTER,
        //     THIRD_QUARTER,
        //     FOURTH_QUARTER,
        //     FIRST_PERIOD,
        //     SECOND_PERIOD,
        //     THIRD_PERIOD,

        "Creator": 2,
        // User ID who created the market

        // Dict where key is a User ID and if it's allowed to settle this market
        "Settler": {
            "2": true
        },

        "SetFin": 24
        // The time when the settlement is considered final (in hours past settlement date)
    }
    // Dict that represent a Market
}
```

Response (multiple markets):
```jsonc
{
    "State": "Success",

    "Type": "SubscribeMarketsByFilter",

    "Page": 1,
    // Current page

    "Count": 22,
    // Number of pages

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
        ...
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
    // Array of dicts that represent Markets (check market structure above)
}
```

Response (Orderbook):
```jsonc
{
    "State": "Success",

    "Type": "ReturnOrderbook",

    "Data": {
        "MarketID": "12ef87b0-2658-4e62-83a8-a7ba46f0a6c3",

        "RunnerID": 0,
        // Runner index on Market "Ru" array

        "Bids": [],
        // Array of [price, amount]

        "Asks": [ [2.14, 240.11] ]
        // Array of [price, amount]
    }
}
```


## Get User Balances (SubscribeBalance)
Returns current user balance and subscribes to future balance changes. This does not require autentication.

Request:
```jsonc
{
    "Type": "SubscribeBalance",

    "RequestTime": "2022-04-22T09:21:30.7788438Z",
    // Should be close to server's time

    "UserID": 2,
    // This will be a "short" integer ID (1k to 1m)

    "NodeID": 1
    // This will be the same as the User ID who is running the node
}
```

Response:
```jsonc
{
    "State": "Success",

    "Type": "SubscribeBalance",

    // Dict where keys are currency ID
    // TODO: where do we get this list?
    "Data": {
        "0": {

            "AvailableFunds": 9979.01,

            "CreatorUsed": 20
            // Some collateral you have to pay when you create markets
        }
    }
}
```

Response (Error):
```jsonc
{
    "State": "Error",

    "Type": "SubscribeBalance",

    "Error": "User does not exist"
}
```

## Get Matches (SubscribeMatches)

Returns all matched user orders.

Request:
```jsonc
{
  "Type": "SubscribeMatches",
  "Nonce": 5,
  "RequestTime": "2022-07-13T18:54:23.5043806Z",
  "UserID": 1,
  "NodeID": 1,
  "Data": {
	"FromDate": "9999-12-31T23:59:59.9999999",
    "ToDate": "9999-12-31T23:59:59.9999999",
    "PageSize": 100,
    "SubscribeUpdates": true
  }
}
```

Response:
```jsonc
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
        "Note": ";2"
      },
      "MatchedOrder": {
        "ID": "aeda7c0a-5dbb-48f2-8ffa-f768b706c51b",
        "State": 1,
        "CreationDate": "2022-07-11T16:07:41.8473882Z",
        "Price": 1.9,
        "Amount": 1.0
      }
    }
  ]
}
```

Response (Error):
```jsonc
{
    "State": "Error",
    "Type": "SubscribeMatches",
    "Error": "User does not exist"
}
```

## Get unmatched orders (SubscribeUOrders)
Returns unmatched orders. This does not require autentication.

Request:
```jsonc
{
  "Type": "SubscribeUOrders",
  "Nonce": 6,
  "RequestTime": "2022-07-13T19:01:27.772938Z",
  "UserID": 1,
  "NodeID": 1,
  "Data": {
    "FromDate": "9999-12-31T23:59:59.9999999",
    "ToDate": "9999-12-31T23:59:59.9999999",
    "PageSize": 100,
    "SubscribeUpdates": true,
    "Types":[
	    "Default",
	    "Same"
    ]
  }
}
```
Possible Types:

* Default
* PostOnly
* KillOrFill
* Same


Response:
```jsonc
{
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
          "OrderID": "ce8bdedc-b345-44f3-b54e-11ea3f44975f"
        },
        "UnmatchedOrder": {
          "SUID": "370567508BA10F0E42BD414AC93AC56A36C8702B7F94F32762E22970FCAE32DC",
          "Price": 1.7,
          "RemAmount": 0,
          "State": 2,
          "Amount": 2.0,
          "ID": "ce8bdedc-b345-44f3-b54e-11ea3f44975f",
          "makerCT": 6000,
          "UserID": 1
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
}
```

Response (Error):
```jsonc
{
    "State": "Error",
    "Type": "SubscribeUOrders",
    "Error": "User does not exist"
}
```

## Get Market by ID (GetMarketByID)
Returns a market.

Request:
```jsonc
{
  "Type": "GetMarketByID",
  "Nonce": 8,
  "RequestTime": "2022-07-13T19:16:03.0247397Z",
  "UserID": -1,
  "NodeID": 1,
  "Data": { "mid": "d81e889f-7b98-4229-941c-ffefac4ed7c3" }
}
```

Response:
```jsonc
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

Response (Error):
```jsonc
{
    "State": "Error",
    "Type": "GetMarketByID",
    "Error": "//TODO"
}
```

## Get User ID from Public Key (GetUserIDFromPubKey)
Returns an integer if an account with the Public Key is found.

Request:
```jsonc
{
  "Type":"GetUserIDFromPubKey",
  "RequestTime":"2022-07-23T00:20:41.0138136Z",
  "UserID":-1,
  "NodeID":1,
  "Data":{
    "PublicKey":"3mVC3iAAQAA8SYKHTVi1MMIf7L+EIJL5jIOov5oNto2dk00ekGqojg=="
  }
}
```

Response:
```jsonc
{
  "State": "Success",
  "Type": "GetUserIDFromPubKey",
  "Data": 1
  // UserID
}
```

Response (error):
```jsonc
{
  "State": "Error",
  "Type": "GetUserIDFromPubKey",
  "Error": "User Not Found"
}
```

## Get Next Available User ID (GetFreeUserID)
Returns an integer with the next available User ID to be used on account creation.

Request:
```jsonc
{
  "Type":"GetFreeUserID",
  "RequestTime":"2022-07-23T00:20:41.0138136Z",
  "UserID":-1,
  "NodeID":1
}
```

Response:
```jsonc
{
  "State": "Success",
  "Type": "GetFreeUserID",
  "Data": 5
}
```