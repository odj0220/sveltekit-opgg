<script lang="ts">
    import type {Champion, Matches, Position} from "../lib/models";

    export let matches: Matches;
    const {summary, positions, games, champions} = matches;
    const gameCnt = summary.wins + summary.losses;

    const avgKill = (summary.kills / gameCnt).toFixed(1);
    const avgDeath = (summary.deaths / gameCnt).toFixed(1);
    const avgAssist = (summary.assists / gameCnt).toFixed(1);
    const kdaRatio = ((summary.kills + summary.assists) / summary.deaths).toFixed(2);
    const winsRatio = +((summary.wins / gameCnt) * 100).toFixed(0);
    const kdaRatioColor = (kdaRatio: number) => {
        if (+kdaRatio >= 5) {
            return '#e19205';
        }
        if (+kdaRatio >= 4) {
            return '#1f8ecd';
        }
        if (+kdaRatio >= 3) {
            return '#2daf7f';
        }
        return '#353a3a';
    }

    const winsRatioColor = (winsRatio: number) => {
        if (winsRatio >= 60) {
            return '#c6443e';
        }
        return '#353a3a';
    }

    const championWinsRate = (champion: Champion) => {
        return +((champion.wins / champion.games) * 100).toFixed(0);
    }

    const championKda = (champion: Champion) => {
        return +((champion.kills + champion.assists) / champion.deaths).toFixed(2);
    }

    const roleImageUrl = (position: Position) => {
        return `/images/icon-mostposition-${position.position.toLowerCase()}.png`;
    }

    const rolePosition = (position: Position) => {
        switch (position.position) {
            case 'ADC':
                return '바텀';
            case 'JNG':
                return '정글';
            case 'MID':
                return '미드';
            case 'SUP':
                return '서포터';
            case 'TOP':
                return '탑';
            default:
                return '알 수 없음';
        }
    }

    const roleRatio = (position: Position) => {
        const totalGames = positions.reduce((pre: number, cur: Position) => pre + cur.games, 0);
        return (position.games / totalGames * 100).toFixed(0);
    }

    const roleWinsRatio = (position: Position) => {
        return +((position.wins / position.games) * 100).toFixed(0);
    }

</script>

<style lang="scss">
    .component-wrap {
      margin-top: -1px;
      box-sizing: border-box;
      text-align: left;
      border: 1px solid rgb(205, 210, 210);
      box-shadow: rgb(220 223 223) 0px 1px;
      background: rgb(242, 242, 242);
      border-radius: 2px;

      table {
        display: table;
        width: 100%;
        table-layout: auto;
        background-color: rgb(237, 237, 237);
        border-collapse: collapse;
        border-spacing: 0;

        tbody {
          display: table-row-group;
          vertical-align: middle;
          border-color: inherit;

          tr {
            display: table-row;
            vertical-align: inherit;
            border-color: inherit;

            td {
              padding: 0;
              margin: 0;
            }

            .title {
              padding: 16px 0px 14px 20px;
              line-height: 14px;
              font-size: 12px;
              color: rgb(102, 102, 102);
              height: 14px;
              border-left: 1px solid rgb(205, 210, 210);

              &:nth-of-type(1) {
                border-left: none;
                padding-left: 24px;
              }
            }

            .most-champion {
              width: 229px;
              border-left: 1px solid rgb(205, 210, 210);

              ul {
                font-size: 0px;
                margin-left: 16px;
                margin-top: 16px;
                margin-bottom: 16px;

                li {
                  position: relative;
                  display: block;
                  white-space: nowrap;
                  margin-top: 12px;
                  padding-left: 42px;
                  padding-top: 1px;

                  &:nth-of-type(1) {
                    margin-top: 0;
                  }

                  .icon {
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                      display: block;
                      width: 100%;
                      height: 100%;
                      border: 0;
                      vertical-align: middle;
                      max-width: 100%;
                    }
                  }

                  .name {
                    margin-bottom: 2px;
                    line-height: 16px;
                    font-size: 14px;
                    color: rgb(51, 51, 51);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }

                  .unchampion {
                    height: 31px;
                    font-size: 11px;
                    line-height: 30px;
                    color: #999999;
                  }

                  .win-lose {
                    display: inline-block;
                    font-size: 11px;
                    line-height: 12px;
                    color: rgb(51, 51, 51);
                  }

                  .kda-avg {
                    display: inline-block;
                    line-height: 12px;
                    font-size: 11px;
                    font-weight: bold;
                    color: rgb(51, 51, 51);

                    &:before {
                      display: inline-block;
                      margin-left: 6px;
                      margin-right: 6px;
                      content: "";
                      border-left: 1px solid rgb(224, 227, 227);
                      height: 11px;
                      vertical-align: middle;
                    }
                  }
                }
              }
            }

            .summary {
              padding: 0px 0px 0px 24px;
              vertical-align: top;

              .chart {
                width: 90px;
                height: 90px;
                display: inline-block;
                vertical-align: middle;
                position: relative;

                .recharts-wrapper {
                  position: relative;
                  cursor: default;
                  width: 90px;
                  height: 90px;
                }

                .text {
                  position: absolute;
                  left: 0px;
                  top: 50%;
                  text-align: center;
                  width: 100%;
                  margin-top: -8px;
                  line-height: 16px;
                  font-size: 14px;
                  color: rgb(85, 85, 85);
                }
              }


            }

            .kda {
              color: rgb(135, 146, 146);
              text-align: center;
              vertical-align: top;
              padding-top: 18px;
              width: 164px;

              .k-d-a {
                color: rgb(135, 146, 146);
                font-size: 11px;
                line-height: 12px;
                font-weight: bold;

                .death {
                  color: rgb(198, 68, 62);
                }
              }

              .ratio {
                font-size: 16px;
                line-height: 19px;
                margin-top: 7px;
                .kda-ratio {
                  color: rgb(53, 58, 58);
                  margin-right: 5px;
                }
                .participantion {
                  position: relative;
                  display: inline;
                  .kill-participantion {
                    color: rgb(198, 68, 62);
                  }
                }

              }
            }

            .position-stats {
              width: 183px;
              border-left: 1px solid rgb(205, 210, 210);
              white-space: nowrap;
              vertical-align: middle;

              ul {
                padding: 0px 16px 0px 12px;
                font-size: 0px;

                li {
                  margin-top: 20px;
                  &:nth-of-type(1) {
                    margin-top: 0;
                  }

                  .icon {
                    display: inline-block;
                    width: 36px;
                    line-height: 34px;
                    vertical-align: middle;
                    text-align: center;

                    img {
                      display: inline-block;
                      border: 0px;
                      vertical-align: middle;
                      max-width: 100%;
                    }
                  }

                  .content {
                    display: inline-block;
                    vertical-align: middle;
                    padding-bottom: 1px;
                    margin-left: 4px;

                    .name {
                      line-height: 16px;
                      font-size: 14px;
                      color: rgb(51, 51, 51);
                      margin-bottom: 4px;
                    }

                    .role-ratio {
                      line-height: 12px;
                      font-size: 11px;
                      color: rgb(31, 142, 205);
                    }

                    .win-ratio {
                      line-height: 12px;
                      font-size: 11px;
                      color: rgb(102, 102, 102);
                      &:before {
                        display: inline-block;
                        margin-left: 6px;
                        margin-right: 6px;
                        content: "";
                        border-left: 1px solid rgb(205, 210, 210);
                        height: 12px;
                        vertical-align: middle;
                      }
                    }
                  }
                }
              }
            }

          }
        }
      }
    }
</style>

<div class="component-wrap">
    <table>
        <tbody>
        <tr>
            <td class="title" colspan="2">{summary.wins + summary.losses}전 {summary.wins}승 {summary.losses}패</td>
            <td class="most-champion" rowspan="2">
                <ul>
                    {#each Array(3) as _, index (index)}
                        {#if champions[index]}
                            <li>
                                <div class="icon">
                                    <img src={champions[index].imageUrl} alt={champions[index].name}></div>
                                <div class="name">{champions[index].name}</div>
                                <div class="win-lose">
                                    <div style="position: relative; display: inline; color: {winsRatioColor(+championWinsRate(champions[index]))};">
                                        <b>{championWinsRate(champions[index])}%</b>
                                    </div>
                                    ({champions[index].wins}승 {champions[index].losses}패)
                                </div>
                                <div class="kda-avg" style="color: {kdaRatioColor(+championKda(champions[index]))};">
                                    {championKda(champions[index])} 평점
                                </div>
                            </li>
                        {:else}
                            <li>
                                <div class="icon">
                                    <img src="/images/unchampion.png" alt="unchampion"></div>
                                <div class="unchampion">챔피언 정보가 없습니다.</div>
                            </li>
                        {/if}

                    {/each}
                </ul>
            </td>
            <td class="title">선호 포지션 (랭크)</td>
        </tr>
        <tr>
            <td class="summary">
                <div class="chart">
                    <div class="recharts-wrapper">
                        <svg class="recharts-surface" width="90" height="90" viewBox="0 0 90 90" version="1.1">
                            <defs>
                                <clipPath id="recharts11-clip">
                                    <rect x="5" y="5" height="80" width="80"></rect>
                                </clipPath>
                            </defs>
                            <g class="recharts-layer recharts-pie">
                                <g class="recharts-layer recharts-pie-sector">
                                    <path stroke="none" fill="#ee5a52" color="#ee5a52" class="recharts-sector" d="M 45,0
    A 45,45,0,
    1,1,
    18.549663646838713,81.40576474687263
  L 27.36644243122581,69.27050983124843
            A 30,30,0,
            1,0,
            45,15 Z"></path>
                                </g>
                                <g class="recharts-layer recharts-pie-sector">
                                    <path stroke="none" fill="#1f8ecd" color="#1f8ecd" class="recharts-sector" d="M 18.549663646838713,81.40576474687263
    A 45,45,0,
    0,1,
    44.99999999999999,0
  L 44.99999999999999,15
            A 30,30,0,
            0,0,
            27.36644243122581,69.27050983124843 Z"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="text">{winsRatio}%</div>
                </div>
            </td>
            <td class="kda">
                <div class="k-d-a"><span>{avgKill}</span> / <span class="death">{avgDeath}</span> / <span>{avgAssist}</span></div>
                <div class="ratio"><span class="kda-ratio" style="color: {kdaRatioColor(+kdaRatio)}">{kdaRatio}:1</span>
                    <div class="participantion"><span class="kill-participantion" style="color: {winsRatioColor(+winsRatio)};">({winsRatio}%)</span></div>
                </div>
            </td>
            <td class="position-stats">
                <ul>
                    {#each positions as position}
                        <li>
                            <div class="icon">
                                <img src={roleImageUrl(position)} alt={rolePosition(position)}></div>
                            <div class="content">
                                <div class="name">{rolePosition(position)}</div>
                                <div>
                                    <span class="role-ratio">
                                        <b>{roleRatio(position)}</b>%
                                    </span>
                                        <span class="win-ratio">
                                        승률 <b>{roleWinsRatio(position)}</b>%
                                    </span>
                                </div>
                            </div>
                        </li>
                    {/each}
                </ul>
            </td>
        </tr>
        </tbody>
    </table>
</div>
