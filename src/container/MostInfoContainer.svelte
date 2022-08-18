<script lang="ts">
    import Spinner from "../component/Spinner.svelte";
    import type {MostInfo} from "../lib/models";
    import {MostInfo as getMostInfo} from "../lib/_api";

    export let mostInfo: MostInfo;
    export let name: string;
    let selectedTab = 'champions';

    const selectTab = async (tab: string) => {
        selectedTab = tab;
        mostInfo = null;
        mostInfo = await getMostInfo(name);
    }

</script>

<div class="most-wrap">
    <ul>
        <li class:active={selectedTab === 'champions'} on:click={() => selectTab('champions')}>챔피언 승률</li>
        <li class:active={selectedTab === 'recentWinRate'} on:click={() => selectTab('recentWinRate')}>7일간 랭크 승률</li>
    </ul>
    <div class="most-content">
        {#if mostInfo}
            {#if selectedTab === 'champions'}
                {#each mostInfo.champions as champion}
                    <div class="champion-box">
                        <div class="face">
                            <img src={champion.imageUrl} alt={champion.name}>
                        </div>
                        <div class="info">
                            <div class="name">{champion.name}</div>
                            <div class="cs">CS {champion.cs}</div>
                        </div>
                        <div class="kda">
                            <div class="" style="position: relative;">
                                <div class="rate">{+((champion.kills + champion.assists) / champion.deaths).toFixed(2)}: 1 평점</div>
                            </div>
                            <div class="detail">
                                {+(champion.kills/champion.games).toFixed(2)} /
                                {+(champion.assists/champion.games).toFixed(2)} /
                                {+(champion.deaths/champion.games).toFixed(2)}
                            </div>
                        </div>
                        <div class="played">
                            <div class="" style="position: relative;">
                                <div class="rate">{(champion.wins / champion.games * 100).toFixed(0)}%</div>
                            </div>
                            <div class="count">{champion.games} 게임</div>
                        </div>
                    </div>
                {/each}
            {/if}
            {#if selectedTab === 'recentWinRate'}

            {/if}

        {/if}
        {#if !mostInfo}
            <div class="spinner-container">
                <Spinner/>
            </div>
        {/if}
    </div>


</div>


<style lang="scss">
  .most-wrap {
    margin-top: 10px;
    border: 1px solid #cdd2d2;
    box-shadow: 0 1px #dcdfdf;
    background: #f2f2f2;
    border-radius: 2px;

    ul {
      display: table;
      width: 100%;
      table-layout: fixed;

      li {
        display: table-cell;
        border-left: 1px solid #cdd2d2;
        border-bottom: 1px solid #cdd2d2;
        background-color: #f2f2f2;
        vertical-align: middle;
        cursor: pointer;
        color: #879292;
        text-align: center;
        padding: 7px 0;
        font-size: 12px;
        line-height: 15px;
        text-decoration: none;

        &.active {
          border-bottom: 1px solid #ededed;
          background-color: #ededed;
          color: #555e5e;
          font-weight: bold;
        }
      }
    }

    .most-content {
      background: #ededed;

      .champion-box {
        display: table;
        width: 100%;
        height: 52px;
        border-bottom: 1px solid #cdd2d2;
        color: #879292;
        text-align: center;
        text-size-adjust: 100%;

        .face {
          display: table-cell;
          width: 60px;
          text-align: right;
          vertical-align: middle;

          img {
            display: inline-block;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 0;
            vertical-align: middle;
            max-width: 100%;
          }
        }

        .info {
          display: table-cell;
          width: 85px;
          text-align: left;
          vertical-align: middle;
          padding-left: 10px;

          .name {
            width: 70px;
            color: #555e5e;
            font-weight: bold;
            font-size: 13px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          .cs {
            margin-top: 6px;
            font-size: 12px;
            white-space: nowrap;
          }
        }

        .kda {
          display: table-cell;
          line-height: 1.8;
          vertical-align: middle;
          .rate {
            font-size: 13px;
            font-weight: bold;
            white-space: nowrap;
            color: #879292;
          }
          .detail {
            font-size: 12px;
            color: #879292;
            white-space: nowrap;
          }
        }

        .played {
          display: table-cell;
          width: 70px;
          line-height: 1.8;
          vertical-align: middle;

          .rate {
            font-weight: bold;
            font-size: 13px;
            color: #879292;
          }

          .count {
            font-size: 11px;
            white-space: nowrap;
          }
        }

      }

      .spinner-container {
        min-height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
