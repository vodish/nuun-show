<script lang="ts">
  import Timer from "./Timer.svelte";
  import yaStore from "./questions.yaml?raw";

  let btn: HTMLButtonElement;
  $effect(() => btn.focus());

  let arr = yaStore.split(new RegExp("\r?\n")).filter((v) => v[0] == "-");

  let source = $state([...arr, ...arr]);
  let target = $state<string[]>([]);
  let topic = $derived(
    target[0]
      ?.replace(/^- /, "") // отрезать слева знаки
      .replace(/ (\S{1,2})\s+(?=\S{3,})/gi, " $1\u00A0"), // типографика
  );

  function next() {
    if (source.length == 0) {
      return;
    }

    let cur = target[0] || "";
    let r = Math.floor(Math.random() * source.length);
    for (; cur == source[r]; r = Math.floor(Math.random() * source.length)) {}

    let itm = source[r];
    target = [itm, ...target];
    source = source.filter((_, i) => i != r);
  }
  next();
</script>

<h3>
  <div><Timer /></div>
  <div>Вопросы: {source.length} / {target.length}</div>
</h3>

{#if source.length > 0}
  <h1>{topic}</h1>
{:else}
  <h3>Сказочке конец.</h3>
{/if}

<button onclick={next} bind:this={btn}>Дальше</button>

<style>
  h3 {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 5ch;
    font-weight: normal;
  }
  h1 {
    font-weight: 600;
    line-height: 1.3em;
  }
  button {
    margin: auto auto 0 auto;
    width: 70%;
  }
  button:active {
    background-color: black;
    color: #eee;
  }
</style>
