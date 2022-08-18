<script lang="ts">
    let name = '';
    function handleSubmit() {
        if (name) {
            location.href = `/summoners/${name}`;
        }
    }
</script>

<style lang="scss">
    .main-img {
      padding: 32px 0 24px;
      img {
        display: block;
        max-height: 200px;
        margin: 0 auto;
      }
    }
    .search-container {
      position: relative;
      border-radius: 2px;
      background-color: #fff;
      width: 624px;
      margin: 0 auto;

      input {
        width: 100%;
        padding: 15px 150px 18px 17px;
        border: 0;
        height: 50px;
        box-sizing: border-box;
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 19%);
        border-radius: 4px;
        font-size: 14px;
        color: #9b9b9b;
        outline: none;
      }
      button {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 50px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #01a9ff;
        border-radius: 2px;
        border: 0;
        padding: 0;
        cursor: pointer;
      }
    }
</style>


<div class="main-img section-wrap">
    <img src="https://opgg-static.akamaized.net/logo/20220815090917.b3aca19a45e54ad889f8a8ed9cf1dd2d.png?image=q_auto,f_webp,w_auto&amp;v=1660730703413" alt="OP.GG logo (아무무)" title="아무무">
</div>
<div class="search-container section-wrap">
    <form on:submit|preventDefault={handleSubmit}>
        <label for="searchSummoner" class="hidden">소환사명, 소환사명, ...</label>
        <input type="text" id="searchSummoner" name="searchSummoner" bind:value={name} placeholder="소환사명,챔피언...">
        <button type="submit">
            <img src="https://s-lol-web.op.gg/images/icon/icon-gg-white.svg?v=1660730703413" width="30" alt="search" height="15">
        </button>
    </form>
</div>
