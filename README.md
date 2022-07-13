# Websocket API documentation

Use the address below to access the test server. It's a simple proxy so we can work on a HTTPS environment. All requests are currently proxied to **`83.171.236.194:81`**.

> `wss://proxy-ws.fairlay.com`

## Index
- [Server Time (ReturnHeartbeat)](#server-time-returnheartbeat)

- [Get Categories (SubscribeSports)](#get-categories-subscribesports)

- [Get Competitions (SubscribeCompetitions)](#get-competitions-subscribecompetitions)

- [Get Markets and Orderbooks (SubscribeMarketsByFilter)](#get-markets-and-orderbooks-subscribemarketsbyfilter)

- [Get user balances (SubscribeBalance)](#get-user-balances-subscribebalance)

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
Returns all active categories (have active markets).

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
Returns all active competitions for all categories (have active markets).

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


## Get user balances (SubscribeBalance)
Returns all user balances and subscribe to future changes.

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
