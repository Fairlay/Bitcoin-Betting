# Interfaces

## `MarketStatus`
```typescript
enum MarketStatus {
    Active,
    Live,
    Suspended,
    Closed,
    Settled,
    Finalized,
    Cancelled
}
```

## `MarketType`
```typescript
enum MarketType {
    Match,
    OverUnder,
    Outright,
    GameSpread,
    SetSpread,
    CorrectScore,
    Future,
    BasicPrediction,
    Reserved2,
    Reserved3,
    Reserved4,
    Reserved5,
    Reserved6
}
```

## `MarketPeriod`
```typescript
enum MarketPeriod {
    Undefined,
    FullTime,
    FirstSet,
    SecondSet,
    ThirdSet,
    FourthSet,
    FifthSet,
    FirstHalf,
    SecondHalf,
    FirstQuarter,
    SecondQuarter,
    ThirdQuarter,
    FourthQuarter,
    FirstPeriod,
    SecondPeriod,
    ThirdPeriod,
    FirstInning,
    SecondInning,
    ThirdInning,
    FourthInning,
    FifthInning,
    SexthInning,
    SeventhInning,
    EighthInning,
    NinthInning,
    FirstMap,
    SecondMap,
    ThirdMap,
    FourthMap,
    FifthMap,
    SixthMap,
    SeventhMap,
    EighthMap,
    NinethMap,
    FullTimeWithOvertime,
    FirstOvertime
    SecondOvertime,
    Penalty
}
```

## `MarketSettleType`
```typescript
enum MarketSettleType {
    Binary,
    CFD,
    CFDInverse,
    ExchangeToCur
}
```

## `MarketFilterStatus`
```typescript
enum MarketFilterStatus {
    All,
    Active,
    Live
}
```

## `MarketFilterSorting`
```typescript
enum MarketFilterSorting {
    Mix,
    MatchedVolume,
    Closing,
    OpenOrdersVolume
}
```

## `MarketFilter`
```typescript
interface MarketFilter {
    OnlyActive: boolean
    Status: MarketFilterStatus
    PageSize: number
    Cat: number
    Comp: string
    Descr: string
    ToSettle: boolean
    OnlyMyCreatedMarkets: boolean
    ChangedAfter: Date
    SoftChangedAfter: Date
    OnlyActive: boolean
    MaxMargin: number
    NoZombie: boolean
    FromClosT: Date
    ToClosT: Date
    PageSize: number
    MaxResults: number
    GeneralAND: string[]
    GeneralNOT: string[]
    GeneralOR: string[]
    RunnerAND: string[]
    TitleAND: string[]
    TypeOR;
    PeriodOR: number[]
    SettleOR: number[]
    Sorting: MarketFilterSorting
    SubscribeOrderbooks: boolean
}
```

## `MarketRunner`
```typescript
interface MarketRunner {
   Name: string
   mCT: number

   RedA: number
   // Reduction Applied
}
```

## `Market`
```typescript
interface Market {
   Margin: number
   ID: string
   LastCh: Date 
   // Last Changed

   LastSoftCh: Date
   // Last Soft Changed (orderbook changed)
   
   CreationDate: Date
   MainNodeID: number
   // Node that will process order matches for this market
   
   Comp: string
   Descr: string
   Title: string
   Cat: number
   ClosD: Date
   SettlD: Date
   Status: MarketStatus
   Ru: MarketRunner[]
   Type: MarketType
   Period: MarketPeriod
   Creator: number
   // User ID who created the market
   
   Settler: [string]: boolean 
   // User ID and permission to settle this market
   
   SetFin: number
   // Time when the settlement is considered final (in hours past settlement date)
   
   SettleProtocol: number
   SettlT: MarketSettleType

   Comm: number
   ComRecip: [string]: number
   // Commission of the market  going to the Com(mission)Recip(ients) of the market
   
   MinVal: number
   MaxVal: number
   // Maximum Allowed Price (0 means Infinity)

   Cur: number
   //  Quote Currency ID

   CurB: number
   // For Exchanges between Currencies, this is the Trade Currency ID

   Flag: number

   evID: number
   // Event ID
}
```

## `Balance`
```typescript
interface Balance {
    AvailableFunds: number
    CreatorUsed: number
    // Some collateral you have to pay when you create markets

	ReservedFunds: number
    // TotalFunds   Total is 
    // Used  (Matched Orders)   + OnHold (Unfinalized settlements) + Staked + Collateral (Settlement Challenges) 
	// + CreatorUsed (For Creating Markets) + 	SettleUsed (for Settling markets as untrusted settler until settlement is finalized);
    
    MaxFunds: number
    // MaxFunds to be gained

    UsedFunds: number
    // ReservedFunds - AvailableFunds

    SettleUsed: number
    // Collateral for untrusted settlers

    OnHold: number
    // Amount on hold until settlement is finalized
    
    RemainingRequests: number
    // Remaining API Requests
}
```

## `UnmatchedOrderState`
```typescript
enum UnmatchedOrderState {
    Active,
    Cancelled,
    Matched,
    MatchedAndCancelled
}
```

## `UnmatchedOrderType`
```typescript
enum UnmatchedOrderType {
    Default,
    PostOnly,
    KillOrFill,
    Same
}
```

## `OrderSide`
```typescript
enum OrderSide {
    Bid,
    Ask
}
```

## `UserOrder`
```typescript
interface UserOrder {
    HiddenLUChange: number
    MarketID: string
    OrderID: string
    Side: OrderSide
    RunnerID: number
    Note: string
    Insurance: boolean
}
```

## `UnmatchedOrder`
```typescript
interface UnmatchedOrder {
    SUID: string
    Price: number
    RemAmount: number
    State: UnmatchedOrderState
    Amount: number
    ID: string
    makerCT: number
    UserID: number
    Type : UnmatchedOrderType
    Side: OrderSide
    Note: string
    CancelAt: Date
}
```

## `MatchedOrderState`
```typescript
enum MatchedOrderState {
    Default,
    Matched,
    RunnerWon,
    RunnerHalfWon,
    RunnerLost,
    RunnerHalfLost,
    MakerVoided,
    Voided,
    Pending,
    DecimalResult,DecimalResultToBase,
    Settled		
}
```

## `MatchedOrder`
```typescript
interface MatchedOrder {
    ID: string
    State: MatchedOrderState
    CreationDate: Date
    Price: number
    Amount: number
	DecResult: number
    // Used for markets with continuous settlement 

	R: number
    // Flag

	Red: number
    // Reduction. Used in special circumstances when the matched Price has to be reduced on settlement. (Used in Horse racing markets or with multibets)

	MakerCancelTime: number
    // Time in milliseconds the maker of the bet is allowed to change the status of the bet from PENDING to MAKERVOIDED. Only used by 			
}
```

## `MatchedOrder`
```typescript
interface MatchedOrder {
    ID: string
    State: MatchedOrderState
    CreationDate: Date
    Price: number
    Amount: number
	DecResult: number
    // Used for markets with continuous settlement 

	R: number
    // Flag

	Red: number
    // Reduction. Used in special circumstances when the matched Price has to be reduced on settlement. (Used in Horse racing markets or with multibets)

	MakerCancelTime: number
    // Time in milliseconds the maker of the bet is allowed to change the status of the bet from PENDING to MAKERVOIDED. Only used by 			
}
```

## `TransactionType`
```typescript
enum TransactionType {
    P2P,
    FeePaid,
    FeeReceived,
    FeeReversed,
    Settlement,
    SettlementReversed,
    Exchange,
    Withdrawal,
    Deposit,
    CurrencyIssuing,
    Burn,
    DirectDebit,
    Penalty,
    Staking
}
```

## `Transaction`
```typescript
interface Transaction {
    ID: string
    Cur: number
    // Currency

    From: number
    To: number
    // User IDs

    Reference: string
    // Reference. Needs to match the withdrawal address to be used in the smart contract exactly for burning transactions.

    TType: TransactionType
    NodeID: number
    Amount: number
    CreatedByUser: Date

    Chain: boolean
    // Only Applicable for Burning Transactions to set the chain the funds are released. Default 0 Ethereum.
}
```