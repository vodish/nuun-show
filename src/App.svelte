<script lang="ts">
  import { questions } from "./questions/questions.svelte";
  import Timer from "./Timer.svelte";

  let rand = $state(-1);
  let topic = $derived(questions[rand]);

  let stat = $state<{ [k: number]: number }>({});
  let count = $derived(stat[rand]);

  function re() {
    let arr = Object.keys(questions).filter((it) => it != String(rand));
    rand = Number(arr[Math.floor(Math.random() * arr.length)]);
    stat[rand] = stat[rand] ? (stat[rand] += 1) : 1;
  }
  re();

  let btn: HTMLButtonElement;
  $effect(() => btn.focus());
</script>

<h3>
  <div><Timer /></div>
  <!-- <div>Задано:</div> -->
  <div># {rand + 1} &nbsp; Повтор: {count}</div>
  <!-- <div>Статистика.</div> -->
</h3>

<h1>{topic.name}</h1>

<button onclick={re} bind:this={btn}>Обновить</button>

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
