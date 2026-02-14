<script lang="ts">
    // Текущее время в секундах
    let seconds = $state(0);

    // Форматирование в MM:SS
    let formattedTime = $derived.by(() => {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    });

    // Эффект для запуска таймера
    $effect(() => {
        const interval = setInterval(() => {
            seconds += 1;
        }, 1000);

        // Очистка при размонтировании
        return () => clearInterval(interval);
    });
</script>

<span>
    {formattedTime}
</span>

<style>
    span {
        letter-spacing: 0.2ch;
    }
</style>
