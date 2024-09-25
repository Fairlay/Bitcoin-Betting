using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Security.Permissions;
using System.Text;

namespace BBetModels.APIv1
{
    public static class S
    {
        public static Dictionary<int, DateTime> ProtocolChanges = new Dictionary<int, DateTime>()
        {
            { 1, new DateTime(2024,6,10,22,0,0) },
            {2, new DateTime(2024, 6, 28) },
            {3, new DateTime(2024, 9, 1) },
            {4, new DateTime(2024, 8, 24) },
            {5, new DateTime(2024, 9, 13,21,40,0) } ,
            {6, new DateTime(2024, 9, 19,21,40,0) }   
        };


        public static readonly DateTime StartDateRequiredMinerFee = new DateTime(2024, 2, 20);
        public static readonly DateTime StartDateRequiredReferences = new DateTime(2024, 2, 20);

        public const int MAXHOURSTOKEEPSETTLEDMARKET = 24 * 21;
        public const int MAXHOURSTOKEEPCLOSEDMARKET = 72;


        public static int PenaltyForMalCancellation = 300;
        public static double SettlingDatePlusHours = 2.0;
        public static double SettlingDatePlusHoursLive = 0.1;
        public static double ClosingDatePlusHoursLive = 1;
        public static int MAKERCANCELTIME = 6000;
        public static int MAKERCANCELTIMEINPLAY = 13000;
        public static int MAKERCANCELTIMEINPLAYSOCCER = 30000;

        public static CultureInfo DefaultCulture = CultureInfo.InvariantCulture;
        public static int DECIMALMARKETRUNNER = 0;
        public const int HASH_LENGTH = 32;
        public const int DefaultCurrency = 0;

        public const int MaxMarkets = 500000;

        public const decimal TotalCredits = 2500000;

        public const bool NoPrebetAtThisTime = true;

        public static int MAIN_MarketNode = 104;

        public static Random RC = new Random();
        public const decimal MINSTAKEBinary = 0.02m;
        public const decimal MINSTAKEDecimal = 0.0001m;


        public static decimal MinimalInitialAccountFunding = 0.001m;
        public static decimal MinimalFunds = 0.0001m;

        public static int MakeOBookInterval = 1000;
        public const int MAXSettleRequestsToKeep = 100000;

        public const int MaxDecimalsDecMarket = 8;
        public const int MAXDECIMALS = 3;
        public const int MAXDECIMALSABOVE2 = 2;
        public const int MAXDECIMALSABOVE10 = 1;
        public const int MAXAMOUNTDECIMALS = 5;

        public const int MaxOrderCreationAgeInSeconds = 180;

        public static SettlementProtocol DefaultSettlementProtocol = new SettlementProtocol(SettlementProtocols.Default);
        public static SettlementProtocol SecondSettlementProtocol = new SettlementProtocol(SettlementProtocols.Other);
        public static SettlementProtocol getSettlementProtocol(SettlementProtocols x)
        {
            if (x == SettlementProtocols.Default) return DefaultSettlementProtocol;
            else return SecondSettlementProtocol;
        }

        public static decimal? getOnHoldInsuranceCosts(CATEGORY cat, string comp)
        {
            switch (cat)
            {
                case CATEGORY.ESPORTS: return 0.004m;
                case CATEGORY.BITCOIN: return 0m;
                case CATEGORY.DICE: return 0m;
                case CATEGORY.SOCCER: return 0.0005m;
                case CATEGORY.TENNIS:
                    return 0.0005m;
                case CATEGORY.HOCKEY:
                    switch (comp)
                    {
                        case "NHL": return 0.0002m;
                        default: return 0.0005m;
                    }
                case CATEGORY.VOLLEYBALL: return 0.0005m;
                case CATEGORY.HANDBALL: return 0.0005m;
                case CATEGORY.GOLF: return 0.002m;
                case CATEGORY.AMERICANFOOTBALL: return 0.0002m;
                case CATEGORY.BASEBALL:
                    switch (comp)
                    {
                        case "MLB": return 0.0002m;
                        default: return 0.002m;
                    }
                case CATEGORY.BASKETBALL:
                    switch (comp)
                    {
                        case "NBA": return 0.0002m;
                        case "NCAA": return 0.002m;
                        case "Bosnia and Herzegovina - Prvenstvo BIH - Women": return null;
                        case "Serbia - 1 ZLS WOMEN": return null;
                        default: return 0.0005m;
                    }

                default: return 0.001m;


            }
        }
    }

    public readonly struct SettlementProtocol
    {
        public SettlementProtocol(SettlementProtocols x)
        {
            if (x == SettlementProtocols.Default)
            {
                Level0FinalH = 24;
                Level0Collateral = 5;
                Level1Collateral = 20;
                Level2FinalH = 72;
                Level2Collateral = 100;
                Level3Collateral = 1000;
                Level4FinalH = 240;
                Level4Collateral = 1000;
            }
            else
            {
                Level0FinalH = 24;
                Level0Collateral = 5;
                Level1Collateral = 20;
                Level2FinalH = 72;
                Level2Collateral = 100;
                Level3Collateral = 1000;
                Level4FinalH = 240;
                Level4Collateral = 1000;

            }

        }

        public readonly int Level0FinalH;
        public readonly int Level0Collateral;

        public readonly int Level2FinalH;
        public readonly int Level1Collateral;

        public readonly int Level2Collateral;

        public readonly int Level4FinalH;
        public readonly int Level3Collateral;
        public readonly int Level4Collateral;


    }

    public readonly struct SettlementRulesDefault
    {
        public SettlementRulesDefault()
        {

        }
        public readonly int CollateralLevel1 = 20;
        public readonly int CollateralLevel2 = 50;
        public readonly int CollateralLevel3 = 200;
        public readonly int CollateralLevel4 = 1000;
    }

}
