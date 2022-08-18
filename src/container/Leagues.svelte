<script lang="ts">
    import LeagueComponent from "../component/League.svelte";
    import type {League} from "../lib/models";
    export let leagues: League[];
</script>

<div class="leagues-container">
    <LeagueComponent league={leagues[0]}/>
    <LeagueComponent league={leagues[1]}/>
</div>

<style lang="scss">
    .leagues-container {
      display: flex;
      width: 100%;
      gap: 10px;
      flex-direction: column;
    }
</style>
