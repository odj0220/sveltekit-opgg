
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




