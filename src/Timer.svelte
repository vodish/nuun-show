<script lang="ts">
  // Текущее время в секундах
  let seconds = $state(0);
  let mins = $state("00");
  let secs = $state("00");

  // Эффект для запуска таймера
  $effect(() => {
    const interval = setInterval(() => {
      seconds += 1;
      mins = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
      secs = (seconds % 60).toString().padStart(2, "0");
    }, 1000);

    // Очистка при размонтировании
    return () => clearInterval(interval);
  });
</script>

<span><b>{mins}</b><i>:{secs}</i></span>

<style>
  span {
    letter-spacing: 0.1ch;
  }
  span i {
    font-style: normal;
    opacity: 0.2;
  }
</style>
