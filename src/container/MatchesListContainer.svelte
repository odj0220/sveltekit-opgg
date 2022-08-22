<script lang="ts">
    import type {GameInfo, GameTypes, Matches} from "../lib/models";
    import {getTimeStringSeconds, timeForToday} from "../lib/_util";
    import Tooltip from "../component/Tooltip.svelte";
    import {get} from 'svelte/store';
    import {items} from "../lib/stores";

    export let matches: Matches;
    export let selectedType: GameTypes;

    let games = matches.games.filter((game: GameInfo) => {
        switch (selectedType) {
            case 'SOLORANKED':
                return game.gameType === '솔랭';
            case 'FLEXRANKED':
                return game.gameType === '자유 5:5 랭크';
            default:
                return true;
        }
    });

    const championName = (game: GameInfo) => {
        const split = game.champion.imageUrl.split('/');
        return split[split.length - 1].split('.')[0];
    }

    const getBuildIcon = (isWin: boolean) => {
        if (isWin) {
            return 'https://s-lol-web.op.gg/static/images/icon/common/icon-buildblue-p.png?v=1660968209040';
        }
        return 'https://s-lol-web.op.gg/static/images/icon/common/icon-buildred-p.png?v=1660968209040';
    }

    const getWardIcon = (isWin: boolean) => {
        if (isWin) {
            return 'https://s-lol-web.op.gg/static/images/icon/common/icon-ward-blue.png?v=1660968209040';
        }
        return 'https://s-lol-web.op.gg/static/images/icon/common/icon-ward-red.png?v=1660889005277';
    }

    const getDetailIcon = (isWin: boolean) => {
        if (isWin) {
            return 'https://s-lol-web.op.gg/static/images/icon/common/icon-viewdetail-blue.png?v=1660968209040';
        }
        return 'https://s-lol-web.op.gg/static/images/icon/common/icon-viewdetail-red.png?v=1660968209040';
    }

    const getItemTooltip = (imageUrl: string, ward = false) => {
        const split = imageUrl.split('/');
        const itemId = split[split.length - 1].split('.')[0];
        const item = get(items).data[itemId];
        const html = `
            <div style="color: ${ward ? '#ffc659' : '#00cfbc'}; font-weight: bold">${item.name}</div>
            <br>
            <div>${item.description}</div>
            <br>
            <div>가격: <span style="color: #ffc659;">${item.gold.total} (${item.gold.base})</span></div>
        `;
        return html;
    }

    const getItemForId = async (id: string) => {
        return
    };



</script>

<style lang="scss">
    img {
        border: 0;
        vertical-align: middle;
        max-width: 100%;
    }

    ul.match-list {
      margin-top: 16px;
      > li {
        position: relative;
        border-radius: 3px;
        margin-bottom: 8px;

        .list-wrap {
          display: table;
          table-layout: fixed;
          width: 689px;
          border-collapse: collapse;
          border: 1px solid #cea7a7;
          background-color: #e2b6b3;

          &.win {
            border: 1px solid #99b9cf;
            background-color: #a3cfec;

            .info {
              .bar {background: #99b9cf}
              .game-result {color: #1a78ae}
            }

            .action {
              border: 1px solid #4aa1d2;
              background-color: #64b1e4;

            }

            .items {
              .item {
                ul {
                  li {
                    background-color: #99b9cf;
                  }
                }
              }
            }

          }

          & > div {
            display: table-cell;
            height: 96px;
            vertical-align: middle;
          }

          .info {
            width: 70px;
            text-align: center;
            font-size: 11px;
            color: #555;
            line-height: 16px;

            .type {
              font-weight: bold;
              width: 70px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .bar {
              display: block;
              width: 27px;
              margin: 5px auto;
              height: 2px;
              background: #cea7a7;
            }

            .game-result {
              font-weight: bold;
              color: #c6443e;
            }
          }

          .champion {
            width: 100px;
            font-size: 0;

            .icon {
              display: inline-block;
              width: 46px;
              height: 46px;
              vertical-align: middle;
              border-radius: 50%;
              overflow: hidden;

              img {
                display: block;
                width: 100%;
                height: 100%;
                background: #000;
              }
            }

            .spells {
              display: inline-block;
              vertical-align: middle;
              margin-left: 4px;

              .spell {
                display: block;
                width: 22px;
                height: 22px;
                margin-top: 2px;
                border-radius: 3px;
                overflow: hidden;

                &:nth-of-type(1) {
                  margin-top: 0;
                }
              }
            }

            .runes {
              display: inline-block;
              vertical-align: middle;
              margin-left: 4px;

              .rune {
                width: 22px;
                height: 22px;
                margin-top: 2px;
                &:nth-of-type(1) {
                  margin-top: 0;
                  img {
                    background: #000;
                  }
                }
                img {
                  display: block;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
              }
            }

            .name {
              margin-top: 8px;
              font-size: 11px;
              color: #555;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .kda {
            font-size: 11px;
            text-align: center;
            .k-d-a {
              color: #879292;
              font-size: 15px;
              white-space: nowrap;
              span {
                color: #555e5e;
                font-weight: bold;
                &.d {
                  color: #c6443e;
                }
              }
            }
            .ratio {
              color: #555e5e;
              font-size: 12px;
              font-weight: bold;
              margin-top: 6px;
              span {
                color: #353a3a;
              }
            }
            .multi-kill {
              display: inline-block;
              margin: 8px 4px 0;
              font-size: 10px;
              color: #f2f2f2;
              span {
                display: inline-block;
                background: #ee5a52;
                border: 1px solid #c6443e;
                border-radius: 15px;
                padding: 2px 5px;
                line-height: 1;
              }
            }
            .badge {
              display: inline-block;
              color: #fff;
              margin: 8px auto 0;
              font-size: 10px;
              padding: 2px 5px;
              line-height: 1;
              border-radius: 9px;
              &.ace {
                background-color: #8c51c5;
                border: solid 1px #7f3590;
              }
              &.mvp {
                background-color: #e19205;
                border: solid 1px #b88a2a;
              }
            }
          }

          .stats {
            width: 90px;
            font-size: 11px;
            text-align: center;
            line-height: 18px;
            color: #555e5e;

            .cs {
              div {
                display: inline;
                margin-right: 4px;
              }
            }
            .kill-participantion {
              color: #c6443e;
            }
          }

          .items {
            display: table-cell;
            height: 96px;
            vertical-align: middle;

            .item {
              font-size: 0;
              display: flex;
              justify-content: center;
              align-items: center;

              ul {
                width: 72px;
                li {
                  display: inline-block;
                  width: 22px;
                  height: 22px;
                  border-radius: 3px;
                  margin-top: 2px;
                  margin-right: 2px;
                  overflow: hidden;
                  background-color: #cea7a7;
                }
              }

              .ward {
                display: inline-block;
                width: 22px;
                height: 22px;
                border-radius: 3px;
                margin-top: 2px;
                margin-right: 2px;
                overflow: hidden;
                background-color: #cea7a7;
              }

              .build {
                width: 22px;
                height: 22px;
                border-radius: 3px;
                margin-top: 2px;
                margin-right: 2px;
              }

            }

            .control {
              margin-top: 7px;
              color: #353a3a;
              line-height: 13px;
              font-size: 11px;
              text-align: center;

              img {
                display: inline-block;
                vertical-align: middle;
              }
            }
          }

          .participants {
            width: 170px;
            font-size: 0;

            ul {
              float: left;
              width: 50%;

              li {
                display: block;
                width: 80px;
                height: 18px;
                margin-left: 3px;
                text-align: left;
                white-space: nowrap;

                .icon {
                  display: inline-block;
                  vertical-align: middle;
                  margin-right: 3px;

                  img {
                    width: 16px;
                    height: 16px;
                    border-radius: 0;
                  }
                }

                .name {
                  display: inline-block;
                  max-width: 60px;
                  vertical-align: middle;
                  font-size: 11px;
                  color: #555;

                  a {
                    display: block;
                    color: inherit;
                    text-decoration: none;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                  }
                }
              }
            }
          }

          .action {
            position: relative;
            width: 30px;
            border: 1px solid #d67b77;
            background-color: #e89d99;

            .detail {
              width: 30px;
              height: 100%;

              img {
                position: absolute;
                bottom: 10px;
                left: 9px;
                transform: rotate( 0deg );
              }
            }
          }
        }
      }
    }
</style>

<ul class="match-list">
    {#each games as game}
        <li>
            <div class="list-wrap" class:win={game.isWin}>
                <div class="info">
                    <div class="type">{game.gameType}</div>
                    <div style="position:relative" class="">
                        <div class="time-stamp">{timeForToday(game.createDate)}</div>
                    </div>
                    <div class="bar"></div>
                    <div class="game-result">{game.isWin ? '승리' : '패배'}</div>
                    <div class="game-length">{getTimeStringSeconds(game.gameLength)}</div>
                </div>
                <div class="champion">
                    <div class="icon">
                        <img src={game.champion.imageUrl}>
                    </div>
                    <div class="spells">
                        {#each game.spells as spell}
                            <div class="spell">
                                <div style="position:relative" class="">
                                    <img src={spell.imageUrl}>
                                </div>
                            </div>
                        {/each}
                    </div>
                    <div class="runes">
                        {#each game.peak as peak}
                            <div class="rune">
                                <div style="position:relative" class="">
                                    <img src={peak}>
                                </div>
                            </div>
                        {/each}
                    </div>
                    <div class="name">{championName(game)}</div>
                </div>
                <div class="kda">
                    <div class="k-d-a">
                        <span>{game.stats.general.kill}</span> /
                        <span class="d">{game.stats.general.death}</span> /
                        <span>{game.stats.general.assist}</span></div>
                    <div class="ratio"><span>{game.stats.general.kdaString}</span> 평점</div>
                    {#if !!game.stats.general.opScoreBadge}
                        <div class="badge ace">{game.stats.general.opScoreBadge}</div>
                    {/if}
                    {#if !!game.stats.general.largestMultiKillString}
                        <div class="multi-kill"><span>{game.stats.general.largestMultiKillString}</span></div>
                    {/if}
                </div>
                <div class="stats">
                    <div class="level">레벨 {game.champion.level}</div>
                    <div class="cs">
                        <div style="position:relative" class="">{game.stats.general.cs} ( {game.stats.general.csPerMin} )</div>
                        CS
                    </div>
                    <div class="kill-participantion">
                        <div style="position:relative" class="">킬관여 {game.stats.general.contributionForKillRate}</div>
                    </div>
                </div>
                <div class="items">
                    <div>
                        <div class="item">
                            <ul>
                                {#each Array(6) as _, index (index)}
                                    <li>
                                        {#if game.items.length - 1 > index}
                                            <div style="position:relative">
                                                <Tooltip tooltip={getItemTooltip(game.items[index].imageUrl)}>
                                                    <img src={game.items[index].imageUrl}>
                                                </Tooltip>
                                            </div>
                                        {/if}
                                    </li>
                                {/each}
                            </ul>
                            <div>
                                <div class="ward">
                                    <div style="position:relative" class="">
                                        <Tooltip tooltip={getItemTooltip(game.items[game.items.length - 1].imageUrl, true)}>
                                            <img src={game.items[game.items.length - 1].imageUrl}>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div class="build">
                                    <div style="position:relative" class="">
                                        <Tooltip tooltip="빌드">
                                            <img src={getBuildIcon(game.isWin)} alt="build">
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="control">
                        <img src={getWardIcon(game.isWin)} alt="control ward">
                        제어 와드 {game.stats.ward.visionWardsBought}
                    </div>
                </div>
                <div class="participants">
                    {#each game.teams as team}
                        <ul>
                            {#each team.players as player}
                                <li>
                                    <div class="icon">
                                        <img src={player.champion.imageUrl}>
                                    </div>
                                    <div class="name">
                                        <a href="/summoners/{player.summonerName}" target="_blank" rel="noreferrer">
                                            {player.summonerName}
                                        </a>
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    {/each}
                </div>
                <div class="action">
                    <button class="detail">
                        <img src={getDetailIcon(game.isWin)} alt="">
                    </button>
                </div>
            </div>
        </li>
    {/each}
</ul>

