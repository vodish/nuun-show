<script lang="ts">
  let seconds = $state(0);
  let limit = 60;
  let h = $state("0");
  let m = $state("00");
  let s = $state("00");

  let hv = $derived(h == "0" ? "" : h + ":");

  $effect(() => {
    const interval = setInterval(updateDisplay, 1000);
    return () => clearInterval(interval);
  });

  function updateDisplay() {
    seconds += 1;
    h = Math.floor(seconds / (limit * limit))
      .toString()
      .at(-1) as string;
    m = Math.floor(seconds / limit)
      .toString()
      .padStart(2, "0");
    s = (seconds % limit).toString().padStart(2, "0");
  }

  function re(e: Event) {
    e.preventDefault();
    seconds = -1;
    updateDisplay();
  }
</script>

<a href="?" onclick={re}>
  <b>{hv}</b>{m}<i>:{s}</i>
</a>

<style>
  a {
    font-family: monospace;
    font-size: 1.3em;
    letter-spacing: 0.1ch;
    padding: 3px 0.5ch 3px 1ch;
    border-radius: 3px;
    background-color: #540c0c9f;
    color: white;
    opacity: 0.8;
  }
  a:active {
    color: #540c0c9f;
  }
  i {
    font-style: normal;
    opacity: 0.3;
  }
</style>
