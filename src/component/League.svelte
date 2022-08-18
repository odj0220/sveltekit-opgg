<script lang="ts">
    import type {League} from "../lib/models";

    export let league: League;
    const {tierRank, wins, losses} = league;

    const rate = Math.round((wins / (wins + losses)) * 100);
    const lankTier = `${tierRank.tier} ${tierRank.shortString.replace(/[^0-9]/g, '')}`
</script>

<div class="wrapper">
    {#if league.hasResults}
        <div class="medal">
            <div class="medal-wrap">
                <img src={league.tierRank.imageUrl} alt={league.tierRank.tier}>
            </div>
        </div>
        <div class="info">
            <div class="type">{league.tierRank.name}</div>
            <div class="tier-rank">{lankTier}</div>
            <div class="tier-info">
                <span class="lp">{tierRank.lp} LP</span> /
                <span class="win-lose">{wins}승 {losses}패<br>승률 {rate}%</span>
            </div>
            <div class="league-name">트위치의 불한당들</div>
        </div>
    {/if}
    {#if !league.hasResults}
        <div class="medal">
            <div class="medal-wrap">
                <img class="unranked" src="/images/unranked.png" alt="unranked">
            </div>
        </div>
        <div class="info">
            <div class="type">{league.tierRank.name}</div>
            <div class="tier-rank unranked">Unranked</div>
        </div>
    {/if}
</div>

<style lang="scss">
  .wrapper {
    border: 1px solid #cdd2d2;
    box-shadow: 0 1px #dcdfdf;
    background: #f2f2f2;
    border-radius: 2px;
    display: table;
    width: 100%;
    color: #879292;
    position: relative;
    padding: 9px 0;

    .medal {
      display: table-cell;
      vertical-align: middle;
      width: 120px;
      padding: 0 8px;
      text-align: center;
      .medal-wrap {
        position: relative;
        display: inline-block;
        img {
          display: inline-block;
          width: 104px;
          height: 104px;
          border: 0;
          vertical-align: middle;
          max-width: 100%;

          &.unranked {
            width: 64px;
            height: 64px;
            margin: 7px 0;
          }
        }
      }
    }

    .info {
      display: table-cell;
      vertical-align: middle;
      font-size: 12px;
      line-height: 1.5;
      text-align: left;

      .type {
        font-size: 11px;
        color: #879292;
      }
      .tier-rank {
        font-size: 15px;
        font-weight: bold;
        text-transform: capitalize;
        color: #1f8ecd;
        &.unranked {
          color: #879292;
        }
      }
      .lp {
        color: #555e5e;
        font-weight: bold;
      }
    }
  }
</style>
