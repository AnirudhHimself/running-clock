<script lang="ts">
  import Greeting from '../lib/Greeting.svelte';
  import Stopwatch from '../lib/Stopwatch.svelte';

  const updateDocumentTitle = (e: CustomEvent) => {
    document.title = e.detail.title;
  };
</script>

<main class="home-page">
  <div class="heading-content">
    <Greeting />
  </div>
  <div class="clock-content">
    <Stopwatch on:changeDocumentTitle="{updateDocumentTitle}" />
  </div>
  <span class="background"></span>
</main>

<style lang="scss">
  @import '../styles/mixins';

  .clock-content {
    display: grid;
    place-content: center;
  }

  .heading-content {
    display: grid;
    place-content: center;
    padding: var(--spacing-4) 0 var(--spacing-2) 0;
    @include respond-to('medium') {
      padding: 0 var(--spacing-2) 0 0;
    }
  }

  .home-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1048px;
    padding: var(--spacing-4);
    position: relative;
    @include respond-to('small') {
      justify-content: space-evenly;
      flex-direction: row;
    }
  }

  .background {
    background: var(--bg-color);
    height: 100%;
    left: 0;
    min-height: 100vh;
    min-width: 100vw;
    position: fixed;
    top: 0;
    opacity: 0.25;
    z-index: -1;
  }
</style>
