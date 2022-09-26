<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatchEvent = createEventDispatcher();
  /**
   * Attempted to come up with the least descriptive name for
   * "elapsed time in seconds". Just so I have to add this comment.
   */
  export let value: number;

  /**
   * Return an array so that we can loop over them to render the time.
   * Each digit rendered individually for the giggles and that
   * digit entrance and exit animation.
   */
  const formatTimeFromProp = (time: number) => {
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor((time - hours * 60 * 60) / 60);
    const seconds = (time - hours * 60 * 60) % 60;

    switch (true) {
      case time < 60:
        return `${seconds}`;
      case time < 3600:
        return `${minutes}:${maybePadTime(seconds, minutes)}`;
      default:
        return `${hours}:${maybePadTime(minutes, hours)}:${maybePadTime(
          seconds,
          Math.max(minutes, hours),
        )}`;
    }
  };

  // For a minute and 6 seconds we want to display 1:06 not 1:6.
  // At the same time we don't want to display "07" for 7 seconds
  const maybePadTime = (smallerTimeUnit: number, biggerTimeUnit: number) => {
    return biggerTimeUnit > 0 && smallerTimeUnit < 10
      ? `0${smallerTimeUnit}`
      : `${smallerTimeUnit}`;
  };

  $: formattedElapsedTime = formatTimeFromProp(value);

  $: {
    if (value > 0) {
      dispatchEvent('changeDocumentTitle', {
        title: `${formattedElapsedTime}`,
      });
    } else {
      dispatchEvent('changeDocumentTitle', { title: `Running Clock` });
    }
  }

  $: digitElementsDisplayed = formattedElapsedTime.length;
</script>

<div
  class="clock"
  style="{`--fs-clock: ${72 - 4 * digitElementsDisplayed}px`}"
  role="timer">
  {#each formattedElapsedTime.split('') as digit}
    {#key digit}
      <span class="digit animate-digit">{digit}</span>
    {/key}
  {/each}
</div>

<style lang="scss">
  .clock {
    align-items: center;
    display: flex;
    font-size: var(--fs-clock);
    font-weight: var(--fw-bold);
    height: 100%;
    justify-content: center;
  }

  .digit {
    font-family: var(--ff-mono);
    color: var(--text-color);
    font-kerning: none;
    letter-spacing: 0ch;
    will-change: opacity, transform;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-digit {
      animation: 250ms animate-digit-entrance-with-no-motion ease-in;
    }
  }
  @media (prefers-reduced-motion: no-preference) {
    .animate-digit {
      animation: 250ms animate-digit-entrance-with-motion ease-in;
    }
  }

  @keyframes animate-digit-entrance-with-motion {
    0% {
      transform: translate(0px, calc(-1 * var(--spacing-5)));
      opacity: 0;
    }
    70% {
      transform: translate(0px, var(--spacing-2));
      opacity: 0.6;
    }
    100% {
      transform: translate(0px, 0px);
      opacity: 1;
    }
  }

  @keyframes animate-digit-entrance-with-no-motion {
    0% {
      opacity: 0.6;
    }
    70% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
</style>
