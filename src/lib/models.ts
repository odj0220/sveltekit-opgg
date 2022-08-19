export interface ServerLoad {
    summoner: Summoner
    mostInfo: MostInfo
    matches: Matches
}

export type GameTypes = 'TOTAL' | 'SOLORANKED' | 'FLEXRANKED';

export interface Summoner {
    ladderRank:	LadderRank
    leagues: League[]
    level: number
    name: string
    previousTiers: TierRank[]
    profileBackgroundImageUrl: string
    profileBorderImageUrl: string
    profileImageUrl: string
    url: string
}

export interface LadderRank {
    rank: number
    rankPercentOfTop: number
}

export interface League {
    hasResults:	boolean
    losses:	number
    tierRank: TierRank
    wins: number
}

export interface TierRank {
    division: string
    imageUrl: string
    lp: number
    name: string
    season: number
    shortString: string
    string: string
    tier: string
    tierDivision: string
    tierRankPoint: number
}

export interface MostInfo {
    champions: MostChampion[]
    recentWinRate: ChampionWinRate[]
}

export interface MostChampion {
    assists: number
    cs: number
    deaths: number
    games: number
    id: number
    imageUrl: string
    key: string
    kills: number
    losses: number
    name: string
    rank: number
    wins: number
}

export interface ChampionWinRate {
    id: number
    imageUrl: string
    key: string
    losses: number
    name: string
    wins: number
}

export interface Champion {
    imageUrl: string
    level: number
    assists: number
    deaths: number
    games: number
    id: number
    key: string
    kills: number
    losses: number
    name: string
    wins: number
}

export interface ImageObj {
    imageUrl: string
}

export interface MapInfo {
    imageUrl: string
    mapId: number
}

export interface General {
    assist: number
    contributionForKillRate: string
    cs: number
    csPerMin: number
    death: number
    goldEarned: number
    kdaString: string
    kill: number
    largestMultiKillString: string
    opScoreBadge: string
    totalDamageDealtToChampions: number
}

export interface Ward{
    sightWardsBought: number
    visionWardsBought: number
}

export interface GameInfoStats {
    general: General
    ward: Ward
}

export interface GameInfo {
    champion: Champion
    createDate: number
    gameId: string
    gameLength: number
    gameType: string
    isWin: boolean
    items: ImageObj[]
    mapInfo: MapInfo
    mmr: number
    needRenew: boolean
    peak: string[]
    spells: ImageObj[]
    stats: GameInfoStats
    summonerId: string
    summonerName: string
    tierRankShort: string
}

export interface Position{
    games: number
    losses: number
    position: string
    positionName: string
    wins: number
}

export interface Summary {
    assists: number
    deaths: number
    kills: number
    losses: number
    wins: number
}

export interface Matches {
    champions: Champion[]
    games: GameInfo[]
    positions: Position[]
    summary: Summary
}

