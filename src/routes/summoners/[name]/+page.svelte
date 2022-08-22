<script lang="ts">
    import {page} from '$app/stores';
    import SeasonDashboard from "../../../container/SeasonDashboard.svelte";
    import Leagues from "../../../container/Leagues.svelte";
    import type {ServerLoad} from "../../../lib/models";
    import MostInfoContainer from "../../../container/MostInfoContainer.svelte";
    import MatchesContainer from "../../../container/MatchesContainer.svelte";
    import {items as gameItems} from "../../../lib/stores";
    import SearchInput from "../../../component/SearchInput.svelte";
    import {setLatest} from "../../../lib/_util";
    import {onMount} from "svelte";

    /** @type {import('./$types').PageData} */
    export let data: ServerLoad;
    let {summoner, mostInfo, matches, items} = data;
    let name = $page.params.name;
    gameItems.set(items);

    onMount(() => {
        console.log('set');
        setLatest(name);
    });


    console.log(data);



</script>

<style lang="scss">
    .page {
      background: #eaeaea;
      min-height: 100vh;

      .header {
        height: 97px;
        width: 100%;
        background: #5383e8;
        padding: 12px 0;

        .section-wrap {
          display: flex;
          height: 100%;
          align-items: flex-end;
          justify-content: flex-end;

          .search-wrap {
            width: 287px;
          }
        }
      }

      .content {
        display: flex;
        padding: 10px 0;
        gap: 10px;

        .container {
          &.left {
            width: 300px;
          }
          &.main {
            flex: 1;
          }
        }
      }
    }
</style>

<div class="page">
    <div class="header">
        <div class="section-wrap">
            <div class="search-wrap">
                <SearchInput></SearchInput>
            </div>
        </div>
    </div>
    <SeasonDashboard {summoner}/>
    <div class="content section-wrap">
        <div class="container left">
            <Leagues leagues={summoner.leagues}/>
            <MostInfoContainer {mostInfo} {name}/>
        </div>
        <div class="container main">
            <MatchesContainer {matches} {name}/>
        </div>
    </div>
</div>
