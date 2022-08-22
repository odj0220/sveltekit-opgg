export const timeForToday = (value: number) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export const getTimeStringSeconds = (seconds: number) => {

    const hour = parseInt((seconds/3600).toString());
    const min = parseInt(((seconds%3600)/60).toString()) + (hour * 60);
    const sec = seconds%60;

    return `${min}분 ${sec}초`;
}

export const setLatest = (name: string) => {
    const KEY = 'latest';
    const storage = localstorage().get(KEY) || '[]';
    const list = JSON.parse(storage);
    const index = list.indexOf(name);
    if (index > -1) {
        const tmp = list[index];
        list.splice(index, 1);
        list.unshift(tmp);
    } else {
        list.unshift(name);
    }
    const result = list.splice(0, 10);
    localstorage().set(KEY, JSON.stringify(result));

    return result;
}

export const getLatest = () => {
    const KEY = 'latest';
    const storage = localstorage().get(KEY) || '[]';
    return JSON.parse(storage);
}

export const removeLatest = (name: string) => {
    const list = getLatest();
    const index = list.indexOf(name);
    if (index < 0) {
        return list;
    }
    list.splice(index, 1);
    localstorage().set('latest', JSON.stringify(list));
    return list;
}

export const removeFavorite = (name: string) => {
    const list = getFavorite();
    const index = list.indexOf(name);
    if (index < 0) {
        return list;
    }
    list.splice(index, 1);
    localstorage().set('favorite', JSON.stringify(list));
    return list;
}

export const setFavorite = (name: string) => {
    const KEY = 'favorite';
    const storage = localstorage().get(KEY) || '[]';
    const list = JSON.parse(storage);
    const index = list.indexOf(name);
    if (index > -1) {
        const tmp = list[index];
        list.splice(index, 1);
        list.unshift(tmp);
    } else {
        list.unshift(name);
    }
    const result = list.splice(0, 10);
    localstorage().set(KEY, JSON.stringify(result));

    return result;
}

export const getFavorite = () => {
    const KEY = 'favorite';
    const storage = localstorage().get(KEY) || '[]';
    return JSON.parse(storage);
}

const localstorage = () => {
    const get = (key:string) => window.localStorage.getItem(key);
    const set = (key: string, value: string) => window.localStorage.setItem(key, value);
    return { get, set };
};
