import {SummonerInfo, MostInfo, Matches, GetItems} from "../../../lib/_api";
import {error} from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: any) {
    const summoner = (await SummonerInfo(params.name)).summoner;
    const mostInfo = await MostInfo(params.name);
    const matches = await Matches(params.name);
    const items = await GetItems();

    if (summoner && mostInfo) {
        return {
            summoner,
            mostInfo,
            matches,
            items
        }
    }

    throw error(404, 'Not found');
}
