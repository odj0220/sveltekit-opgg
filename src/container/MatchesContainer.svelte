<script lang="ts">

    import MatchesStatus from "../component/MatchesStatus.svelte";
    import {Matches} from "../lib/_api";
    import Spinner from "../component/Spinner.svelte";

    export let matches;
    export let name;

    type GameTypes = 'TOTAL' | 'SOLORANKED' | 'FLEXRANKED';
    let selectedType: GameTypes = 'SOLORANKED';

    const selectType = async (type: GameTypes) => {
        selectedType = type;
        matches = null;
        matches = await Matches(name);
    }

</script>

<style lang="scss">
  .container-header {
    border: 1px solid #cdd2d2;
    box-shadow: 0 1px #dcdfdf;
    background: #f2f2f2;
    border-radius: 2px;
    position: relative;
    border-bottom: 1px solid #cdd2d2;
    margin-bottom: -1px;
    height: 34px;

    ul {
      float: left;
      padding-left: 10px;

      li {
        display: inline-block;
        height: 32px;
        margin: 0 10px;
        vertical-align: top;
        color: #555e5e;
        font-weight: normal;
        font-size: 12px;
        line-height: 36px;
        text-decoration: none;
        cursor: pointer;

        &.active {
          border-bottom: 2px solid #1f8ecd;
          font-weight: bold;
        }
      }
    }
  }

  .spinner-container {
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>

<div class="container-wrap">
    <div class="container-header">
        <ul>
            <li class:active={selectedType === 'TOTAL'} on:click={() => selectType('TOTAL')}>전체</li>
            <li class:active={selectedType === 'SOLORANKED'} on:click={() => selectType('SOLORANKED')}>솔로랭크</li>
            <li class:active={selectedType === 'FLEXRANKED'} on:click={() => selectType('FLEXRANKED')}>자유랭크</li>
        </ul>
    </div>
    {#if matches}
        <MatchesStatus {matches}/>
    {/if}

    {#if !matches}
        <div class="spinner-container">
            <Spinner/>
        </div>
    {/if}
</div>
