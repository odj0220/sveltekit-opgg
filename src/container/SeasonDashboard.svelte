<script lang="ts">
    import type {Summoner, TierRank} from "../lib/models";
    import ProfileIcon from "../component/ProfileIcon.svelte";

    export let data: Summoner;
    let previousTiers = data.previousTiers.sort((a: TierRank, b: TierRank) => a.season - b.season);
</script>

<div class="container-wrap">
    <div class="section-wrap">
        <ul>
            {#each previousTiers as preTier}
            <li title={preTier.string}>
                <b>S{preTier.season}</b>
                {preTier.tier}
            </li>
            {/each}
        </ul>
        <div class="profile-wrap">
            <ProfileIcon summoner={data}/>
            <div class="profile">
                <div class="info">
                    <span class="name">오동진</span>
                    <div class="rank">
                        래더 랭킹 <span class="ranking">{data.ladderRank.rank.toLocaleString('en-US')}</span>위 (상위 {data.ladderRank.rankPercentOfTop}%)
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .container-wrap {
      height: 175px;
      border-bottom: 1px solid #d8d8d8;

      ul {
        padding: 15px 30px 17px 30px;
        li {
          display: inline-block;
          padding: 4px 5px 3px;
          height: 20px;
          margin-right: 7px;
          background: #e0e3e3;
          border: 1px solid #d0d3d4;
          border-radius: 2px;
        }
      }

      .profile-wrap {
        padding: 0 30px;
        .profile {
          position: relative;
          display: inline-block;
          height: 100px;
          margin: 0 25px 0 29px;
          vertical-align: top;
          line-height: 1.1;

          .info {
            display: block;
            .name {
              font-size: 20px;
              font-weight: bold;
              color: #242929;
            }
            .rank {
              margin-top: 4px;
              color: #657070;
              font-size: 11px;
              letter-spacing: -0.42px;
              .ranking {
                font-weight: bold;
              }
            }

          }
        }
      }
    }
</style>
