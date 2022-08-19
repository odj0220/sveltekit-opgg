<script lang="ts">
    import {page} from '$app/stores';
    import SeasonDashboard from "../../../container/SeasonDashboard.svelte";
    import Leagues from "../../../container/Leagues.svelte";
    import type {ServerLoad} from "../../../lib/models";
    import MostInfoContainer from "../../../container/MostInfoContainer.svelte";

    /** @type {import('./$types').PageData} */
    export let data: ServerLoad;
    console.log(data);
    let {summoner, mostInfo, matches} = data;
    let name = $page.params.name;
    let findName = '';

    function handleSubmit() {
        if (findName) {
            location.href = `/summoners/${findName}`;
        }
    }
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
        }

        .search-container {
          position: relative;
          display: flex;
          width: 340px;
          height: 32px;
          transition: width 0.2s ease 0s;
          z-index: 1;

          input {
            width: 100%;
            border: 0px;
            box-sizing: border-box;
            padding: 0px 12px 0px 14px;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            font-size: 12px;
            color: rgb(114, 114, 114);
            outline: none;
          }

          button {
            width: 54px;
            height: 32px;
            font-size: 0;
            position: absolute;
            top: -1px;
            right: 0;

            img {
              margin: auto;
            }
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
            <form class="search-container" on:submit|preventDefault={handleSubmit}>
                <label for="searchSummoner" class="hidden">소환사명, 소환사명, ...</label>
                <input id="searchSummoner" name="searchSummoner" type="text" bind:value={findName} placeholder="소환사명, 챔피언...">
                <button type="submit">
                    <img src="https://s-lol-web.op.gg/images/icon/icon-gg.svg?v=1660730703228" alt="search" height="14">
                </button>
            </form>
        </div>
    </div>
    <SeasonDashboard {summoner}/>
    <div class="content section-wrap">
        <div class="container left">
            <Leagues leagues={summoner.leagues}/>
            <MostInfoContainer {mostInfo} {name}/>
        </div>
        <div class="container main">
            main
        </div>
    </div>
</div>
