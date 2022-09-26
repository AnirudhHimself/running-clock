<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button class:secondary="{variant === 'secondary'}" on:click>
  <slot />
</button>

<style lang="scss">
  // One day we could improve our css var usage
  // here to reduce duplication of rules between variants.
  button {
    background-color: var(--primary-5);
    border: 1px solid transparent;
    border-radius: var(--radius-8);
    color: white;
    font-family: var(--ff);
    font-size: var(--fs-button);
    font-weight: var(--fw-bold);
    padding: var(--spacing-2) var(--spacing-3);
    text-transform: capitalize;
    transition: background-color 150ms ease-in;
    user-select: none;
    &:hover {
      background-color: var(--primary-6);
      text-decoration: underline;
    }
    // There's some browser variation on this one.
    // Firefox doesn't seem to handle it properly when "clicking"
    // via the spacebar :(
    // https://bugzilla.mozilla.org/show_bug.cgi?id=68851\
    &:active {
      background-color: var(--primary-7);
    }
    &:focus {
      outline: 2px dashed var(--primary-5);
      outline-offset: 2px;
    }
  }

  .secondary {
    background-color: white;
    border: 1px solid var(--grey-3);
    color: var(--text-color);
    transition: border 150ms ease-in, background-color 150ms ease-in,
      box-shadow 150ms ease-in, color 150ms ease-in;
    &:hover {
      background-color: var(--primary-1);
      border: 1px solid var(--primary-3);
      color: var(--primary-7);
    }
    &:active {
      background-color: var(--primary-2);
      border: 1px solid var(--primary-5);
      color: var(--primary-7);
    }
  }
</style>
