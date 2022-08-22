import type {GameInfo, MatchDetail, Team} from "./models";

const API_HOST = 'https://codingtest.op.gg';

interface fetchOption {
    method?: string;
    body?: any;
    params?: any;
    headers?: any;
    responseType?: string;
}

const defaultOption = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const createParams = (params: any): string => {
    return new URLSearchParams(params).toString();
};

export const SummonerInfo = (summonerName: string) => {
    return GET(`/api/summoner/${summonerName}`, {params: {hl: 'ko'}})
}

export const MostInfo =  (summonerName: string) => {
    return GET(`/api/summoner/${summonerName}/mostInfo`, {params: {hl: 'ko'}})
}

export const Matches = async (summonerName: string) => {
    const matches = await GET(`/api/summoner/${summonerName}/matches`, {params: {hl: 'ko'}});
    const matchDetailPromises = matches.games.map((game: GameInfo) => MatchDetail(summonerName, game.gameId));
    const matchDetails = (await Promise.allSettled(matchDetailPromises)).filter((res: any) => res.status === 'fulfilled')
        .map((res: any) => res.value);
    matches.games.forEach((game: GameInfo) => {
        const team = matchDetails.find((detail: MatchDetail) => detail.gameId === game.gameId).teams;
        game.teams = team.sort((a: Team, b: Team) => a.teamId - b.teamId);
    })
    return matches
}

export const GetItems = () => {;
    return fetch('http://ddragon.leagueoflegends.com/cdn/10.15.1/data/ko_KR/item.json')
        .then (res => res.json());
}

const MatchDetail = (summonerName: string, gameId: string) => {
    return GET(`/api/summoner/${summonerName}/matchDetail/${gameId}`, {params: {hl: 'ko'}})
}


export const restApi = (url: string, option: fetchOption) => {
    let params = '';
    let requestUrl = `${API_HOST}${url}`;

    if (option.params) {
        params = createParams(option.params);
        requestUrl += `?${params}`;
    }

    return fetch(requestUrl, {
        ...option,
        body: option.body ? JSON.stringify(option.body) : null,
    })
        .then(res => {
            if (option.responseType === 'text') {
                return res.text();
            }
            return res.json();
        });
}

export const GET = (url: string, option?: fetchOption) => {
    return restApi(url, {
        ...defaultOption,
        ...option,
        method: 'GET',
    });
}




