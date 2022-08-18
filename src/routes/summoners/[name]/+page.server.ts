import {SummonerInfo} from "../../../lib/_api";
import {error} from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: any) {
    const post = await SummonerInfo(params.name);

    if (post) {
        return post.summoner;
    }

    throw error(404, 'Not found');
}
