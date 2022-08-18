<div class="spinner-wrapper">
    <div class="spinner"></div>
</div>

<style lang="scss">
  .spinner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    .spinner {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      border: 0.4rem solid transparent;
      border-top-color: #ee2554;
      border-left-color: #ee2554;
      animation: spinner 1s ease infinite;
    }

    @keyframes spinner {
      from {transform: rotate(0deg); }
      to {transform: rotate(360deg);}
    }
  }
</style>
