using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.ComponentModel;

namespace BBetModels.APIv1
{
    public enum CATEGORY : int
    {
        [Description("ALL")]
        ALL= 0,
        [Description("SOCCER")]
        SOCCER = 1,

        [Description("TENNIS")]
        TENNIS = 2,

        [Description("GOLF")]
        GOLF = 3,

        [Description("CRICKET")]
        CRICKET = 4,

        [Description("RUGBY UNION")]
        RUGBYUNION = 5,

        [Description("BOXING")]
        BOXING = 6,

        [Description("HORSE RACING")]
        HORSERACING = 7,

        [Description("MOTORSPORT")]
        MOTORSPORT = 8,

        [Description("SPECIAL")]
        SPECIAL = 10,

        [Description("RUGBY LEAGUE")]
        RUGBYLEAGUE = 11,

        [Description("BASKETBALL")]
        BASKETBALL = 12,

        [Description("AMERICAN FOOTBALL")]
        AMERICANFOOTBALL = 13,

        [Description("BASEBALL")]
        BASEBALL = 14,

        [Description("HOCKEY")]
        HOCKEY = 30,

        [Description("POLITICS")]
        POLITICS = 15,

        [Description("FINANCIAL")]
        FINANCIAL = 16,

        [Description("GREYHOUND")]
        GREYHOUND = 17,

        [Description("VOLLEYBALL")]
        VOLLEYBALL = 18,

        [Description("HANDBALL")]
        HANDBALL = 19,

        [Description("DARTS")]
        DARTS = 20,

        [Description("BANDY")]
        BANDY = 21,

        [Description("WINTER SPORTS")]
        WINTERSPORTS = 22,

        [Description("BOWLS")]
        BOWLS = 24,

        [Description("POOL")]
        POOL = 25,

        [Description("SNOOKER")]
        SNOOKER = 26,

        [Description("TABLE TENNIS")]
        TABLETENNIS = 27,

        [Description("CHESS")]
        CHESS = 28,

        [Description("FUN")]
        FUN = 31,

        [Description("ESPORTS")]
        ESPORTS = 32,

        [Description("INPLAY")]
        INPLAY = 33,

        [Description("RESERVED4")]
        RESERVED4 = 34,

        [Description("MIXED MARTIAL ARTS")]
        MIXEDMARTIALARTS = 35,

        [Description("RESERVED6")]
        RESERVED6 = 36,

        [Description("WATERPOLO")]
        WATERPOLO = 37,

        [Description("CYCLING")]
        CYCLING = 38,

        [Description("RESERVED9")]
        RESERVED9 = 39,

        [Description("BITCOIN")]
        BITCOIN = 40,

        [Description("BADMINTON")]
        BADMINTON = 42,

        [Description("DICE")]
        DICE = 131,
    }
}
