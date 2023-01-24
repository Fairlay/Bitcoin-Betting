# Websocket API documentation

All JSON requests can be sent (with UTF8 encoding) to any node of the network. The following public node are available  

**`83.171.236.194:81`**

It is also possible to run your own node. Installation instructions are to be announced. For early access, please contact the developers.

## Getting Access

The developers of the protocol are aware that having an completely decentralized platform for any kind of market open for everyone without entry restrictions may lead to severe negative external effects. Thus the Platform is Invite-Only. Having an Invite-Only-Platform shall maintain a high quality user base and keep out bad actors.  
New accounts can only be created by existing accounts. Once you have an account, deposits can be made by passing your UserId to the deposit function of the Ethereum Smart Contract.  

If bad actors enter the platform anyway, a majority vote of all staking nodes in the network can ban certain accounts and all their referrals. Referrers of bad actors may also be banned. Thus it is recommended to only invite new people you know and trust.


## Index
- [Server Time (ReturnHeartbeat)](#server-heartbeat-ReturnHeartbeat)
---
- [Get Categories (SubscribeSports)](#get-categories-subscribesports)
- [Get Competitions (SubscribeCompetitions)](#get-competitions-subscribecompetitions)
- [Get Markets and Orderbooks (SubscribeMarketsByFilter)](#get-markets-and-orderbooks-subscribemarketsbyfilter)
- [Get Market by ID (GetMarketByID)](#get-market-by-id-getmarketbyid)

---
- [Get Next Available User ID (GetFreeUserID)](#get-next-available-user-id-getfreeuserid)
- [Get User ID from Public Key (GetUserIDFromPubKey)](#get-user-id-from-public-key-getuseridfrompubkey)
- [Get User Balances (SubscribeBalance)](#get-user-balances-subscribebalance)

---
- [Get Unmatched Orders (SubscribeUOrders)](#get-unmatched-orders-subscribeuorders)
- [Get Matched Orders (SubscribeMatches)](#get-matched-orders-subscribematches)

---
- [Signing](#signing-example)
- [Create an account (AccountCreation)](#create-an-account-accountcreation)
- [Create Market (MarketCreation)](#create-market-marketcreation)
- [Change Closing Time (ChangeMarketTimes)](#change-Market-closing-time-changemarkettimes)
- [Change/Create an Order (OrderAlteration)](#changecreate-an-order-orderalteration)
- [Send / Burn / Withdraw Funds (Transfer)](#sendburnwithdraw-funds-transfer)  
- [Issue Currency/ Deposit (CurrencyIssuance)](#deposit--currencyIssuance)  

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
        "1": {
            { "Sweden - 2nd Div. Sodra Svealand": 4 },
            { "Ireland - Premier Corners": 5 },
        },
        "2": {
            { "ITF Women Ceska Lipa - QF": 3 },
        },
        "12": {
            { "Australia - NBL1 Women": 2 },
            { "New Zealand - NBL": 6 }
        },
        "35": {}
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
    "MaxResults": 1000,
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
	//General searches in Runner, Title, Description and Competion
        //HashSet<string> GeneralAND;
        //HashSet<string> GeneralNOT;
        //HashSet<string> GeneralOR;

       // HashSet<string> RunnerAND;
       // HashSet<string> TitleAND;
       // string Comp;
        //string Descr;

        //HashSet<Market.MarketTypes> TypeOR;
        //HashSet<Market.MarketPeriods> PeriodOR;
        //HashSet<Market.SettleTypes> SettleOR;
        //bool ToSettle;
        //bool OnlyMyCreatedMarkets;


        //DateTime ChangedAfter;
        //DateTime SoftChangedAfter;
        // bool OnlyActive;
        //decimal MaxMargin;
        //bool NoZombie;

        //DateTime FromClosT;
        //DateTime ToClosT;

        //int PageSize;
	//limit the number of Markets returned
        //int MaxResults;

        //     Following is a propery to sort markets
        //     enum Sorting:
        //          MIX,
        //          MATCHEDVOLUME,
        //          CLOSING,
        //          OPENORDERSVOLUME

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
	
        "CreationDate": "2022-06-27T11:01:46.9028667Z",
        // Last Soft Changed (orderbook changed)

        "MainNodeID": 1,
        // Node responsible to processing the order matches for this market

        "Comp": "CS:GO - REPUBLEAGUE",
        // Competition
      //  ALL= 0, (do not use)        SOCCER = 1,        TENNIS = 2,        GOLF = 3,        CRICKET = 4,      
      //    RUGBYUNION = 5,        BOXING = 6,        HORSERACING = 7,        MOTORSPORT = 8,        SPECIAL = 10,
      //  RUGBYLEAGUE = 11,        BASKETBALL = 12,        AMERICANFOOTBALL = 13,        BASEBALL = 14,        HOCKEY = 30,
     //   POLITICS = 15,        FINANCIAL = 16,        GREYHOUND = 17,        VOLLEYBALL = 18,        HANDBALL = 19,
     //   DARTS = 20,        BANDY = 21,        WINTERSPORTS = 22,        BOWLS = 24,        POOL = 25,
     //   SNOOKER = 26,        TABLETENNIS = 27,        CHESS = 28,        FUN = 31,        ESPORTS = 32,
     //     RESERVED4 = 34,        MIXEDMARTIALARTS = 35,        RESERVED6 = 36,        RESERVED = 37,        CYCLING = 38,
     //   RESERVED9 = 39,        BITCOIN = 40,        BADMINTON = 42,        DICE = 131,

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
     // ACTIVE,            INPLAY,            SUSPENDED,            CLOSED,            SETTLED,            FINALIZED,            CANCELLED
        
        
        // Runners
        "Ru": [
            {
                "Name": "Over 16.5 ",
                "mCT": 8000,
		"RedA": 0  //Reduction Applied
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
	"SettleProtocol":0,
	"SettlT":0 ,  //            BINARY,            CFD,            CFDINVERSE,            EXCHANGE
	"Comm":0.001,  //Commission of the market  going to the Com(mission)Recip(ients) of the market
	 "ComRecip": {
            "2": 0.5,
	    "1":0.5
        },
	"MinVal":0,    //Minimum Allowed Price
	"MaxVal":0,    // Maximum Allowed Price (0 means Infinity)
	"Cur":0,      //  Quote Currency ID
	"CurB":0,    // for Exchanges between Currencies, this is the Trade Currency ID
	"Flag":0,    // BinaryFlags
	"evID":12041151212, // Event ID
        }
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


## Get User Balances (SubscribeBalance)
Returns current user balance and subscribes to future balance changes. This does not require authentication.

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

            "CreatorUsed": 20,  
            // Some collateral you have to pay when you create markets
	    "ReservedFunds":0,  // TotalFunds   Total is 
	     // Used  (Matched Orders)   + OnHold (Unfinalized settlements) + Staked + Collateral (Settlement Challenges) 
	     // + CreatorUsed (For Creating Markets) + 	SettleUsed (for Settling markets as untrusted settler until settlement is finalized);
	 "MaxFunds":0,   // MaxFunds to be gained	       
         "UsedFunds":0,    //  ReservedFunds - AvailableFunds;
         "SettleUsed":0, // Collateral for untrusted settlers	 
         "OnHold":0,   // Amount of Money on Hold until Settlement is finalized    
         "RemainingRequests":0,  -- Remaining API Requests
     
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

## Get Unmatched Orders (SubscribeUOrders)
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
    "AddMarketSummary":false,
    "Types":[
	    "Default",
	    "Same"
    ]
    // Possible Types:
    // Default, PostOnly, KillOrFill, Same
  }
}
```


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
          "OrderID": "ce8bdedc-b345-44f3-b54e-11ea3f44975f",
	  "Side":0,
	  "RunnerID":0,
	  "Note":null,
	  "Insurance":false,
        },
        "UnmatchedOrder": {
          "SUID": "370567508BA10F0E42BD414AC93AC56A36C8702B7F94F32762E22970FCAE32DC",
          "Price": 1.7,
          "RemAmount": 2.0,
          "State": 2,   
          "Amount": 2.0,
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

## Get Matched Orders (SubscribeMatches)
Returns all matched user orders. This does not require autentication.

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
    "AddMarketSummary":false,
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
        "Note": ";2",
	  "Side":0,
	  "RunnerID":0,
	  "Note":null,
	  "Insurance":false,
      },
      "MatchedOrder": {
        "ID": "aeda7c0a-5dbb-48f2-8ffa-f768b706c51b",
        "State": 1,
        // State (MATCHEDORDER):  DEFAULT,            MATCHED,            RUNNERWON,            RUNNERHALFWON,            RUNNERLOST,       
        //    RUNNERHALFLOST,            MAKERVOIDED,            VOIDED,            PENDING,            DECIMALRESULT,      
        //    DECIMALRESULTTOBASE,            SETTLED
        "CreationDate": "2022-07-11T16:07:41.8473882Z",
        "Price": 1.9,
        "Amount": 1.0,
	"DecResult":0,  // used for markets with continuous settlement 
	"R":0,   //  Used for Flags
	"Red":0,  //Reduction. Used in special circumstances when the matched Price has to be reduced on settlement. (Used in Horse racing markets or with multibets)
	"MakerCancelTime":0,  // time in milliseconds the maker of the bet is allowed to change the status of the bet from PENDING to MAKERVOIDED. Only used by 					//professional Market Makers.
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


## Signing (Example)

In order to provide a valid signature, sort the Data Object alphabetically and sign it with Ed25519 (or ECDSA if your Account is flagged as "isETH") to provide it as "SignatureUser" inside the Storage Unit you send to the Node.  For signing, all fields that have default values MUST be omitted - they are only shown for completeness in all request samples below.   The creation date of the Data object provided as CreatedByUser  may not deviate more than 15 seconds from the Node time or the request might get rejected.


For example, sign the following Data object of a ChangeMarketTimes Request:  

{"ClosD":"2022-11-20T19:50:00Z","CreatedByUser":"2022-11-20T19:35:45.4294401Z","Mid":"c91d1993-7115-49f1-b3cd-ab9dc88821a2","NodeID":1,"SetlD":"2022-11-20T21:50:00Z","UserID":2}

send the following Request to the Node with ID 1:

{"Type":"ChangeMarketTimes","Nonce":63804569790630801,"SignatureUser":"/khiPwpPNk8gFSyrp81t1ZcbUNmF8w233bQCvhz4U5PzCcALbPiipsvWqR+AQ+cJJVHtk0RMtihpM3DHdMxSBg==","Data":{"Mid":"c91d1993-7115-49f1-b3cd-ab9dc88821a2","ClosD":"2022-11-20T19:50:00Z",
"SetlD":"2022-11-20T21:50:00Z","UserID":2,"NodeID":1,"CreatedByUser":"2022-11-20T19:35:45.4294401Z"}}



## Create an account (AccountCreation)
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




## Create Market (MarketCreation)
Creates a market.  For Create Requests all fields that have default values MUST be omitted. So putting "Period":0 for example will be rejected by any Node.
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
## Change Market Closing Time (ChangeMarketTimes)
Changes Closing and Settlement Date for any market that was created by the same user. For Create Requests all fields that have default values MUST be omitted. So putting "Period":0 for example will be rejected by any Node.
Request:
```jsonc
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
    "CreatedByUser": "2022-07-19T11:05:17.5852297Z"
  }
}
```

Response:
```jsonc
  {
    "State": "Success",
    "Type": "ChangeMarketTimes",
    "Nonce": 63804569790630801,
    "Data": ""
  }
```

Error Response:
```jsonc
  {
    "State": "Error",
    "Type": "ChangeMarketTimes",
    "Nonce": 63804569790630801,
    "Data": "Market already settled."
  }
```

## Change/Create an Order (OrderAlteration)
Used to create or change or cancel an order.
For Create Requests all fields that have default values MUST be omitted. Putting "State":0 for example will be rejected by any Node. 

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
    //  "State":0,
      "Side":1,
      "ID": "c0c025a2-dc39-4c5a-afaf-40c975ac014e",
      "makerCT": 6000,
      "UserID": 1
    },
    "UserID": 1,
    "NodeID": 1,
    "CreatedByUser": "2022-07-19T11:08:48.9997487Z",
    // "LayAsL":false,    //Set this to true if you place a lay order on a binary market and you like to have the Amount as Liability of the Order.
   // "Local":false,    //indicates whether the order shall be shared with all other nodes.   Local = true will require a lower Miner Fee
       		 	     		// By default all markets are shared accross all nodes
        
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


## Send/Burn/Withdraw Funds (Transfer)
Allows you to transfer funds to a different user account  or to burn the funds to withdraw them via a cross chain bridge.
Funds that are burned, can be retrieved via Smart Chain Bridges on other Chains.  For burning transaction the "Descr"  field needs to contain the withdrawal address. Adding additional information in the "Descr" field or putting an wrong address there might result in your funds being permanently lost.  
Request:
```jsonc
{
  "Type": "Transfer",
  "Nonce": 63804569790630801,
  "SignatureUser": "FOOuU5oibmQatnBx4VrxMvwA6...P8bqm7J+38gz+xP945a4Cg==",
  "Data": {
    "ID": "2646b51a-bd6b-498d-b246-ae80ecbc3f3c",
    "Cur": 0,   //Currency ID, default is 0 (mBTC)
    "From": 43,   // Sender's User ID
    "To": 5,   // Receiver's User ID
    "Reference": "0x63c3223207A1400868b05e756c26E77284B9ebC1",   // Reference. Needs to match the withdrawal address to be used in the smart contract exactly for burning transactions.
    "TType": 10,   // TransferTypes are:  P2P,            FeePaid,            FeeReceived,            FeeReversed,            Settlement,         
    		// SettlementReversed,    Exchange,            Withdrawal,            Deposit,            CurrencyIssuing,          
		// Burn,            DirectDebit,            Penalty,         Staking
		// In Order to burn funds, you need to pass the value 10 (Burn)
  //  "Chain" : 0  //Only Applicable for Burning Transactions you may set the Chain.  0: Ethereum.
    
    "NodeID": 1,
    "Amount": 10.5,  // Amount 
    "CreatedByUser": "2022-07-19T11:05:17.5852297Z"
  }
}
```

Response:
```jsonc
  {
    "State": "Success",
    "Type": "Transfer",
    "Nonce": 63804569790630801,
    "Data": null
  }
```

Error Response:
```jsonc
  {
    "State": "Error",
    "Type": "Transfer",
    "Nonce": 63804569790630801,
    "Data": "Not enough Balance"
  }
```


## Deposit  (CurrencyIssuance) 
Allows you to issue your own Currency. 

If Maintainer is set to 0 (default), the currency is self maintained and currency can be issued via  CrossChainPayments only.  CrossChainPayments must be enabled if no Maintainer is set.

If DisallowIssuingByMaintainer is set to True, the maintainer may only issue the Currency on Creation, and may not change the total amount later on. 

Creating a self-maintained Currency:

Request:
```jsonc
{
  "Type": "CurrencyIssuance",
  "Nonce": 63804569790630801,
  "SignatureUser": "FOOuU5oibmQatnBx4VrxMvwA6...P8bqm7J+38gz+xP945a4Cg==",
  "Data": {
    "Currency": {"ID":101, "Name": "MilliWrappedBitcoin", "Symbol" : "mWBTC", "ColdWalletAddress": "some SmartContractAddress",
    // "TotalBalance":"0",
    // "Maintainer":0,
     "CrossChainPayments":true,
     "DisallowIssuingByMaintainer":true
     },
    "NodeID": 1,
    "UserID":1
  }
}
```

Each time after a Deposit to the Smart Contract, the deposited amount must be credited via the following request:

```jsonc
{
  "Type": "CurrencyIssuance",
  "Nonce": 63804569790630801,
  "SignatureUser": "FOOuU5oibmQatnBx4VrxMvwA6...P8bqm7J+38gz+xP945a4Cg==",
  "Data": {
    "Deposit": {"TXID":"0x920960a4812bf2ad8395a4a451b232daea3805b427b94e20b4bc1f1e1ac0f480","UserID":4,"Amount":15},
    "Currency": {"ID":101},
    "NodeID": 1,
    "UserID":1
  }
}
```


Response:
```jsonc
  {
    "State": "Success",
    "Type": "CurrencyIssuance",
    "Nonce": 63804569790630801,
    "Data": null
  }
```

Error Response:
```jsonc
  {
    "State": "Error",
    "Type": "CurrencyIssuance",
    "Nonce": 63804569790630801,
    "Data": "Not enough Balance"
  }
```
