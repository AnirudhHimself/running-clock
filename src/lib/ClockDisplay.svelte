<script lang="ts">
  // import { slide, fade} from 'svelte/transition';
  /**
   * Attempted to come up with the least descriptive name for
   * "elapsed time in seconds". Just so I have to add this comment.
   */
  export let value: number;

  /**
   * Return an array so that we can loop over them to render the correct time.
   * Yes, I felt like rendering each digit individually for the giggles and that
   * digit entrance and exit animation.
   */
  const formatTimeFromProp = (time: number) => {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;

    if (minutes > 0) {
      return `${minutes}:${maybePadSeconds(minutes, seconds)}`;
    } else {
      return `${maybePadSeconds(seconds, minutes)}`;
    }
  };

  const maybePadSeconds = (seconds: number, minutes: number) => {
    return minutes > 0 && seconds < 10
      ? '0' + String(seconds)
      : String(seconds);
  };

  $: formattedElapsedTime = formatTimeFromProp(value);

  $: {
    // Don't love that a child component is modifying document.title. But this is where the state for that lives.
    // Since the function of the page is entirely this stopwatch, it'll be okay for now.
    document.title = `${formattedElapsedTime}`;
  }
</script>

<div class="clock" role="timer">
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
