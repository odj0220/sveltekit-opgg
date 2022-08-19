import {SummonerInfo, MostInfo, Matches} from "../../../lib/_api";
import {error} from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: any) {
    const summoner = (await SummonerInfo(params.name)).summoner;
    const mostInfo = await MostInfo(params.name);
    const matches = await Matches(params.name);

    if (summoner && mostInfo) {
        return {
            summoner,
            mostInfo,
            matches
        }
    }

    throw error(404, 'Not found');
}
