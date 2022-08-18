<script lang="ts">
    import type {Summoner} from "../lib/models";

    export let summoner: Summoner;
</script>

<style lang="scss">
  .profile-icon {
    position: relative;
    display: inline-block;
    width: 100px;

    .border-image {
      position: absolute;
      left: -10px;
      top: -10px;
      width: 120px;
      height: 120px;
      -webkit-background-position: center bottom;
      background-position: center bottom;
      background-repeat: no-repeat;
    }
    img {
      display: block;
      width: 100px;
      height: 100px;
      border: 0;
      vertical-align: middle;
      max-width: 100%;
    }
    .level {
      position: absolute;
      top: 100%;
      left: 50%;
      margin-top: -14px;
      margin-left: -22px;
      width: 44px;
      height: 24px;
      padding-top: 3px;
      box-sizing: border-box;
      background: url(https://s-lol-web.op.gg/static/images/site/summoner/bg-levelbox.png);
      -webkit-background-size: 100%;
      background-size: 100%;
      line-height: 17px;
      font-family: Helvetica,AppleSDGothic,"Apple SD Gothic Neo",AppleGothic,Arial,Tahoma;
      font-size: 14px;
      text-align: center;
      color: #eabd56;
    }
  }
</style>

<div class="profile-icon">
    <div class="border-image" style="background-image:url({summoner.profileBorderImageUrl})"></div>
    <img src="{summoner.profileImageUrl}" alt="profile image">
    <span class="level">{summoner.level}</span>
</div>
