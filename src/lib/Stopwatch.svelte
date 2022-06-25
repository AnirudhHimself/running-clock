<script lang="ts">
  import { onDestroy } from 'svelte';
  import ClockDisplay from './ClockDisplay.svelte';
  import Button from './Button.svelte';

  import { readFromStorage } from './utils/storage';
  import { writeToStorage } from './utils/storage';

  let secondsElapsed = readFromStorage('elapsedTime', 0) as number;
  let isClockRunning = readFromStorage('isRunning', false) as boolean;
  let startTime = readFromStorage('timestamp', 0) as number;

  let intervalId: number;

  if (startTime > 0 && isClockRunning) {
    secondsElapsed = Math.round((Date.now() - startTime) / 1000);
  }
  if (secondsElapsed > 0 && !isClockRunning) {
    startTime = Date.now() - (startTime - secondsElapsed);
  }

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === 'isRunning') {
      isClockRunning = JSON.parse(e.newValue ?? 'false');
    }
    if (e.key === 'timestamp' && e.newValue === '0') {
      handleResetClick();
    }
  };

  window.addEventListener('storage', e => handleStorageEvent(e));

  onDestroy(() => {
    window.removeEventListener('storage', e => handleStorageEvent(e));
  });

  const handleStartClick = () => {
    isClockRunning = !isClockRunning;
  };

  const handleResetClick = () => {
    secondsElapsed = 0;
    isClockRunning = false;
    startTime = 0;
  };

  $: {
    writeToStorage('elapsedTime', secondsElapsed);
  }

  $: {
    writeToStorage('isRunning', isClockRunning);
  }

  $: {
    writeToStorage('timestamp', startTime);
  }

  $: if (isClockRunning) {
    startTime = Date.now() - secondsElapsed * 1000;
    intervalId = window.setInterval(() => {
      secondsElapsed = Math.round((Date.now() - startTime) / 1000);
      clearInterval(intervalId);
    }, 1000);
  }

  $: if (!isClockRunning) {
    clearInterval(intervalId);
  }
</script>

<figure class="stopwatch">
  <ClockDisplay on:changeDocumentTitle value="{secondsElapsed}" />
  <div class="control-container">
    <div class="controls-button-group">
      <Button on:click="{handleStartClick}">
        {#if isClockRunning}
          Pause
        {:else if secondsElapsed === 0}
          Start
        {:else}
          Resume
        {/if}
      </Button>
      <Button on:click="{handleResetClick}" variant="{'secondary'}">
        Reset
      </Button>
    </div>
  </div>
</figure>

<style lang="scss">
  .stopwatch {
    align-items: center;
    background: white;
    border-radius: var(--radius-16);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 448px;
    min-width: 275px; /* For the ~Aesthetic~ */
    min-height: 256px;
    overflow: hidden;
  }

  .control-container {
    background: var(--grey-2);
    padding: var(--spacing-3) var(--spacing-3);
    width: 100%;
  }

  .controls-button-group {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    & > :global(button) {
      width: 40%;
    }
  }
</style>
