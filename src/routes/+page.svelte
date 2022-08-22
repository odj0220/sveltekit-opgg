<script lang="ts">
    import SearchInput from "../component/SearchInput.svelte";

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
    }
</style>


<div class="main-img section-wrap">
    <img src="https://opgg-static.akamaized.net/logo/20220815090917.b3aca19a45e54ad889f8a8ed9cf1dd2d.png?image=q_auto,f_webp,w_auto&amp;v=1660730703413" alt="OP.GG logo (아무무)" title="아무무">
</div>
<div class="search-container section-wrap">
    <SearchInput></SearchInput>
</div>
