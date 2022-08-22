<script lang="ts">

    import {getFavorite, getLatest, removeFavorite, removeLatest, setFavorite} from "../lib/_util";
    import {SummonerInfo} from "../lib/_api";

    let findName = '';
    let isOpen = false;
    let selectedTab = 'latest';
    let findList = [];
    let favoriteKey = {};
    let timer;
    let findUserInfo;


    const debounce = v => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            findSummoner();
        }, 350);
    }

    const findSummoner = async () => {
        if (!findName) {
            findUserInfo = null;
        }
        const res = (await SummonerInfo(findName));
        if (!res) {
            return ;
        }
        findUserInfo = res.summoner;
    }

    const getList = (tab: string) => {
        selectedTab = tab;
        findList = [];
        setFavoriteKeys();
        if (selectedTab === 'latest') {
            findList = getLatest();
            return ;
        }
        findList = getFavorite();
    }

    const remove = (name: string) => {
        if (selectedTab === 'latest') {
            removeLatest(name);
            findList = getLatest();
        } else {
            removeFavorite(name);
            setFavoriteKeys();
            findList = getFavorite();
        }
    }

    const onFocus =()=> {
        getList(selectedTab);
        isOpen=true;
    }
    const onBlur =(e)=> {
        //isFocused=false;
    }

    function handleSubmit() {
        if (findName) {
            location.href = `/summoners/${findName}`;
        }
    }

    function clickOutside(node, { enabled: initialEnabled, cb }) {
        const handleOutsideClick = ({ target }) => {
            if (!node.contains(target)) {
                cb();
            }
        };

        function update({enabled}) {
            if (enabled) {
                window.addEventListener('click', handleOutsideClick);
            } else {
                window.removeEventListener('click', handleOutsideClick);
            }
        }

        update({ enabled: initialEnabled });
        return {
            update,
            destroy() {
                window.removeEventListener( 'click', handleOutsideClick );
            }
        };
    }

    const clickFavorite = (event, name: string) => {
        const target = event.target;
        if (target.checked) {
            setFavorite(name);
        } else {
            removeFavorite(name);
        }
        setFavoriteKeys();
    }

    const setFavoriteKeys = () => {
        favoriteKey = {};
        getFavorite().forEach(key => {
            favoriteKey[key] = true;
        })
    }


</script>

<style lang="scss">
  .search-container {
    position: relative;
    display: flex;
    width: 100%;
    height: 32px;
    transition: width 0.2s ease 0s;
    z-index: 1;

    input {
      width: 100%;
      border: 0px;
      box-sizing: border-box;
      padding: 0px 12px 0px 14px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      font-size: 12px;
      color: rgb(114, 114, 114);
      outline: none;
      border-radius: 5px;
    }

    > button {
      width: 54px;
      height: 32px;
      font-size: 0;
      position: absolute;
      top: -1px;
      right: 0;

      img {
        margin: auto;
      }
    }

    .search-content-container {
      > div {
        width: 100%;
        position: absolute;
        top: 36px;
        right: 0px;
        background-color: rgb(255, 255, 255);
        box-shadow: rgb(0 0 0 / 50%) 0px 2px 4px 0px;
        overflow: hidden;

        .tab {
          display: inline-block;
          border: 0;
          padding: 0;
          cursor: pointer;
          width: 50%;
          height: 40px;
          font-size: 14px;
          color: rgb(156, 156, 156);
          background-color: rgb(227, 227, 227);
          float: left;
          &.active {
            color: rgb(74, 74, 74);
            background-color: rgb(255, 255, 255);
          }
        }

        ul {
          padding: 8px 0px;
          text-align: left;

          > a {
            text-decoration: none;
          }

          li {
            display: flex;
            width: inherit;
            -webkit-box-align: center;
            align-items: center;
            padding: 8px 16px;
            box-sizing: border-box;

            &.no-data {
              padding: 20px;
              width: 100%;
              text-align: center;
              box-sizing: border-box;
              display: block;

              img {
                display: block;
                margin: 0px auto;
                border: 0;
                vertical-align: middle;
                max-width: 100%;
              }

              p {
                margin-top: 20px;
                display: inline-block;
                vertical-align: middle;
                font-size: 12px;
                line-height: 15px;
                color: rgb(102, 102, 102);
                img {
                  display: inline-block;
                }
              }
            }

            .summoner-name {
              flex: 1 1 0%;
              font-size: 12px;
              line-height: 15px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              color: var(--gray700);
            }

            .favorite-summoner-label {
              display: block;
              font-size: 0px;

              input {
                appearance: none;
                background: transparent;
                display: inline-block;
                position: relative;
                height: 16px;
                width: 16px;
                vertical-align: middle;
                border: 0px;
                margin: 0px 0px 0px 8px;

                &:checked::before {
                  content: "";
                  background-image: url(https://s-lol-web.op.gg/images/icon/icon-favorite-on.png);
                }

                &::before {
                  cursor: pointer;
                  content: "";
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  text-align: center;
                  background-image: url(https://s-lol-web.op.gg/images/icon/icon-favorite-off.png);
                }
              }
            }

            &.find-user {
              display: flex;
              -webkit-box-align: center;
              align-items: center;
              padding: 6px 16px;
              height: 53px;
              box-sizing: border-box;

              .icon {
                font-size: 0px;
                line-height: 0;
                margin-right: 14px;

                img {
                  border-radius: 50%;
                  background-color: rgb(0, 0, 0);
                  display: inline-block;
                  border: 0px;
                  vertical-align: middle;
                  max-width: 100%;
                }
              }

              .info {
                .name {
                  font-size: 14px;
                  line-height: 1.43;
                  color: rgb(68, 81, 92);
                }
                .desc {
                  margin-top: 2px;
                  line-height: 14px;
                  font-size: 12px;
                  color: rgb(102, 102, 102);
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<form class="search-container" on:submit|preventDefault={handleSubmit} use:clickOutside={{ enabled: open, cb: () => isOpen = false }}>
    <label for="searchSummoner" class="hidden">소환사명, 소환사명, ...</label>
    <input id="searchSummoner" name="searchSummoner" type="text" bind:value={findName} on:keyup={({ target: { value } }) => debounce(value)} placeholder="소환사명, 소환사명..." autocomplete="off" on:focus={onFocus} on:blur={onBlur}>
    <button type="submit">
        <img src="https://s-lol-web.op.gg/images/icon/icon-gg.svg?v=1660730703228" alt="search" height="14">
    </button>
    {#if isOpen}
        {#if !findName}
            <div class="search-content-container">
                <div>
                    <div style="height: 40px">
                        <button class="tab" class:active={selectedTab === 'latest'} on:click={() => getList('latest')}>최근검색</button>
                        <button class="tab" class:active={selectedTab === 'favorite'} on:click={() => getList('favorite')}>즐겨찾기</button>
                    </div>
                    <ul>
                        {#if findList.length}
                            {#each findList as name, i}
                                <li>
                                    <a sveltekit:reload href="/summoners/{name}" class="summoner-name">{name}</a>
                                    {#if selectedTab === 'latest'}
                                        <label class="favorite-summoner-label" for="fav_{i}">
                                            <input class="favorite-summoner-chk" id="fav_{i}" type="checkbox" bind:checked={favoriteKey[name]} on:change={(e) => clickFavorite(e, name)}>
                                        </label>
                                    {/if}
                                    <button type="button" class="close-btn" on:click={() => remove(name)}>
                                        <img src="https://s-lol-web.op.gg/images/site/icon-history-delete.png?v=1661142461415" width="16" alt="" height="16">
                                    </button>
                                </li>
                            {/each}
                        {:else}
                            <li class="no-data">
                                <img src="https://s-lol-web.op.gg/static/images/site/common/icon-history-info.png?v=1661142461415" width="16" alt="Info" height="16">
                                <p>
                                    {#if selectedTab === 'latest'}
                                        최근에 본 소환사가 없습니다.
                                    {:else}
                                        관심있는 소환사에 <img src="/images/icon-favoriteStar-gray.png" width="13" height="13" alt="Bookmark"> 즐겨찾기를 하여 편리하게 정보를 받아보세요.
                                    {/if}
                                </p>
                            </li>
                        {/if}
                    </ul>
                </div>
            </div>
        {:else if findUserInfo}
            <div class="search-content-container">
                <div>
                    <ul>
                        <a sveltekit:reload href="/summoners/{findUserInfo.name}">
                            <li class="find-user">
                                <div class="icon">
                                    <img src={findUserInfo.profileImageUrl} width="36" alt="" height="36">
                                </div>
                                <div class="info">
                                    <div class="name"><span>{findUserInfo.name}</span></div>
                                    <div class="desc">{findUserInfo.previousTiers[0].string}</div>
                                </div>
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
        {/if}
    {/if}
</form>
