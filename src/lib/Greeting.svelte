<script lang="ts">
  const currentDay = Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
  }).format(Date.now());

  var pr = new Intl.PluralRules('en-US', { type: 'ordinal' });

  const suffixes = new Map([
    ['one', 'st'],
    ['two', 'nd'],
    ['few', 'rd'],
    ['other', 'th'],
  ]);

  const formatDay = (day: string) => {
    const rule = pr.select(Number(day.slice(-1)));
    const suffix = suffixes.get(rule);
    return `${day}${suffix}`;
  };
  const today = formatDay(currentDay);
</script>

<header>
  <h1 class="headline">
    Today is <span class="headline-accent is-block">{today}</span>
  </h1>
  <sub class="subheadline">
    There’s a <span class="headline-accent">running clock</span>{' '}
    somewhere.
  </sub>
</header>

<style lang="scss">
  @import '../styles/mixins.scss';

  .headline {
    color: var(--text-color);
    font-family: var(--ff);
    font-size: var(--fs-h3);
    line-height: var(--lh-default);
    padding: 0 0 var(--spacing-1);
    @include respond-to('medium') {
      font-size: var(--fs-headline-medium-screen);
    }
    @include respond-to('large') {
      font-size: var(--fs-headline-large-screen);
    }
  }

  .headline-accent {
    color: var(--primary-5);
  }

  .subheadline {
    font-size: var(--fs-subheadline-small-screen);
    font-family: var(--ff);
    line-height: var(--lh-default);
    margin-bottom: var(--spacing-1);
    @include respond-to('medium') {
      font-size: var(--fs-subheadline-medium-screen);
    }
  }
</style>
