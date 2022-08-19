<script lang="ts">
    import Spinner from "../component/Spinner.svelte";
    import type {MostInfo} from "../lib/models";
    import {MostInfo as getMostInfo} from "../lib/_api";
    import type {ChampionWinRate, MostChampion} from "../lib/models";

    export let mostInfo: MostInfo;
    export let name: string;
    let selectedTab = 'champions';

    const selectTab = async (tab: string) => {
        selectedTab = tab;
        mostInfo = null;
        mostInfo = await getMostInfo(name);
    }

    const championRate = (champion: MostChampion) => {
        return +((champion.kills + champion.assists) / champion.deaths).toFixed(2);
    }

    const championKdaColor = (champion: MostChampion) => {
        if (championRate(champion) >= 5) {
            return '#e19205';
        }
        if (championRate(champion) >= 4) {
            return '#1f8ecd';
        }
        if (championRate(champion) >= 3) {
            return '#2daf7f';
        }
        return '#5e5e5e';
    }

    const championWinsRate = (champion: MostChampion) => {
        return +(champion.wins / champion.games * 100).toFixed(0);
    }

    const championWinsRateColor = (champion: MostChampion) => {
        if (championWinsRate(champion) >= 60) {
            return '#c6443e';
        }
        return '#5e5e5e';
    }

    const championKills = (champion: MostChampion) => {
        return (champion.kills/champion.games).toFixed(1);
    }

    const championAssists = (champion: MostChampion) => {
        return (champion.assists/champion.games).toFixed(1);
    }

    const championDeaths = (champion: MostChampion) => {
        return (champion.deaths/champion.games).toFixed(1);
    }

    const recentRate = (champion: ChampionWinRate) => {
        return +(champion.wins / (champion.wins + champion.losses) * 100).toFixed(0);
    }

    const recentDisplayBar = (champion: ChampionWinRate) => {
        return (recentRate(champion) < 1 || recentRate(champion) > 99) ? 'display: none;' : '';
    }

    const recentFillLeft = (champion: ChampionWinRate) => {
        return recentRate(champion) < 1 ? 'display: none;' : '';
    }
</script>

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

        &:first-child {
          border-left: none;
        }

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

      .recent-box {
        display: table;
        width: 100%;
        border-bottom: 1px solid #cdd2d2;
        background: #ededed;
        color: #879292;
        text-align: center;
        font-size: 12px;
        table-layout: fixed;

        .face {
          display: table-cell;
          width: 44px;
          padding: 5px 0 0 0;
          text-align: right;
          vertical-align: middle;

          img {
            display: inline-block;
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }
        }

        .info {
          display: table-cell;
          width: 61px;
          text-align: left;
          vertical-align: middle;

          .name {
            width: 100%;
            margin-left: 10px;
            color: #555e5e;
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-decoration: none;
          }
        }

        .winratio {
          display: table-cell;
          width: 40px;
          vertical-align: middle;
        }

        .graph {
          display: table-cell;
          height: 40px;
          vertical-align: middle;
          padding-left: 6px;
          padding-right: 12px;

          .graph-container {
            position: relative;
            display: inline-block;
            width: 100%;
            height: 20px;
            vertical-align: middle;

            .fill {
              position: absolute;
              left: 0;
              top: -1px;
              display: inline-block;
              vertical-align: middle;
              height: 100%;
              border-radius: 3px;

              &.left {
                display: block;
                width: 100%;
                z-index: 2;
                background: #3d95e5;
                border: 1px solid #3480c6;
              }

              &.right {
                width: 100%;
                z-index: 1;
                background: #ee5a52;
                border: 1px solid #c6443e;
              }
            }

            .text {
              position: absolute;
              top: 0;
              height: 100%;
              font-size: 11px;
              z-index: 3;
              color: #f2f2f2;
              line-height: 22px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;

              &.left {
                display: block;
                left: 6px;
                text-align: left;
              }

              &.right {
                display: block;
                right: 5px;
                text-align: right;
              }
            }

            .bar {
              position: absolute;
              top: 0;
              width: 100%;
              height: calc(100% - 2px);
              border-left: 1px solid #1a78ae;
              border-right: 1px solid #c6443e;
              z-index: 2;
            }
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
                                <div class="rate" style="color: {championKdaColor(champion)};">{championRate(champion)}: 1 평점</div>
                            </div>
                            <div class="detail">
                                {championKills(champion)} /
                                {championAssists(champion)} /
                                {championDeaths(champion)}
                            </div>
                        </div>
                        <div class="played">
                            <div class="" style="position: relative;">
                                <div class="rate" style="color: {championWinsRateColor(champion)}">{championWinsRate(champion)}%</div>
                            </div>
                            <div class="count">{champion.games} 게임</div>
                        </div>
                    </div>
                {/each}
            {/if}
            {#if selectedTab === 'recentWinRate'}
                {#each mostInfo.recentWinRate as champion}
                    <div class="recent-box">
                        <div class="face">
                            <img src={champion.imageUrl} alt={champion.name}>
                        </div>
                        <div class="info">
                            <div class="name">{champion.name}</div>
                        </div>
                        <div class="winratio">{recentRate(champion)} %</div>
                        <div class="graph">
                            <div class="graph-container">
                                <div class="fill left" style="width: {recentRate(champion)}%;{recentFillLeft}"></div>
                                <div class="text left">{champion.wins}승</div>
                                <div class="fill right"></div>
                                <div class="text right">{champion.losses}패</div>
                                <div class="bar" style="width: {recentRate(champion)}%; {recentDisplayBar(champion)}"></div>
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}

        {/if}
        {#if !mostInfo}
            <div class="spinner-container">
                <Spinner/>
            </div>
        {/if}
    </div>

</div>
