<script lang="ts">
    import { currentTime, duration } from '$lib/stores/VideoStore'
    import { onDestroy, onMount } from 'svelte'
    import RangeSlider from 'svelte-range-slider-pips'
    import { writable } from 'svelte/store'

    type N<T> = T | null

    export let video: N<File> = null;
    export let onTimeUpdate: N<((current: number, duration: number) => void)> = null;
    export let trimStart: number = 0;
    export let trimEnd: number = 0;

    let videoRef: HTMLVideoElement | null = null;
    let objectUrl = '';

    const isPlaying = writable(false);
    const volume = writable(1);
    const isMuted = writable(false);
    const videoUrl = writable('');


    $: if (video) {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        objectUrl = URL.createObjectURL(video);
        videoUrl.set(objectUrl);
    }

    onDestroy(() => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
    });

    onMount(() => {
        if (!videoRef) return;

        const handleTimeUpdate = () => {
            const current = videoRef!.currentTime;
            currentTime.set(current);
            onTimeUpdate?.(current, videoRef!.duration);

            if (current >= (trimEnd)) {
                videoRef!.pause();
            }
        };

        const handleLoadedMetadata = () => {
            duration.set(videoRef!.duration);
            if (trimStart && trimStart > 0) {
                videoRef!.currentTime = trimStart;
            }
        };

        videoRef.addEventListener('timeupdate', handleTimeUpdate);
        videoRef.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            videoRef?.removeEventListener('timeupdate', handleTimeUpdate);
            videoRef?.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    });

    function togglePlay() {
        if (!videoRef) return;

        if (trimEnd && trimStart && videoRef.currentTime >= trimEnd && trimEnd > trimStart) {
            videoRef.currentTime = trimStart;
            currentTime.set(trimStart);
        }

        videoRef.paused ? videoRef.play() : videoRef.pause();
    }

    function handleSeek(e: CustomEvent<{ value: number }>) {
        if (!videoRef) return;
        const maxTime = trimEnd ?? $duration;
        const newTime = Math.max(trimStart, Math.min(e.detail.value, maxTime));
        videoRef.currentTime = newTime;
        currentTime.set(newTime);
    }

    function handleVolumeChange(e: Event) {
        if (!videoRef) return;
        const newVolume = parseFloat((e.target as HTMLInputElement).value);
        videoRef.volume = newVolume;
        volume.set(newVolume);
        isMuted.set(newVolume === 0);
    }

    function toggleMute() {
        if (!videoRef) return;
        if ($isMuted) {
            videoRef.volume = $volume;
            isMuted.set(false);
        } else {
            videoRef.volume = 0;
            isMuted.set(true);
        }
    }

    function formatTime(time: number) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
</script>

{#if !video || !$videoUrl}
    <div class="aspect-video bg-light rounded d-flex align-items-center justify-content-center">
        <p class="text-muted">No video selected</p>
    </div>
{:else}
    <div>
        <div class="position-relative aspect-video bg-dark rounded overflow-hidden mb-3">
            <video
                bind:this={videoRef}
                volume=50
                src={$videoUrl}
                class="w-100 h-100"
                style="object-fit: contain;"
                onplay={() => isPlaying.set(true)}
                onpause={() => isPlaying.set(false)}
            >
                <track kind="captions" />
            </video>
        </div>

        <div>
            <div class="mb-3">
                <RangeSlider
                    limits={[trimStart, trimEnd]}
                    max={$duration}
                    pips
                    step={0.5}
                    value={$currentTime}
                    float
                    formatter={formatTime}
                    on:change={(e: CustomEvent<{ value: number }>) => handleSeek(e)}
                ></RangeSlider>
                <div class="d-flex justify-content-between small text-muted">
                    <span>{formatTime($currentTime)}</span>
                    <span>{formatTime($duration)}</span>
                </div>
            </div>

            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-2">
                    <button
                        class="btn btn-outline-secondary btn-sm"
                        onclick={togglePlay}
                        aria-label="Play/Pause"
                    >
                        <i class="bi bi-{$isPlaying ? 'pause' : 'play'}-fill"></i>
                    </button>

                    <div class="d-flex align-items-center gap-2">
                        <button
                            class="btn btn-outline-secondary btn-sm"
                            onclick={toggleMute}
                            aria-label="Mute/Unmute"
                        >
                            <i class="bi bi-volume-{$isMuted ? 'mute' : 'up'}-fill"></i>
                        </button>
                        <input
                            type="range"
                            class="form-range"
                            style="width: 80px;"
                            min="0"
                            max="1"
                            step="0.1"
                            value={$isMuted ? 0 : $volume}
                            oninput={handleVolumeChange}
                        />
                    </div>
                </div>

                <button class="btn btn-outline-secondary btn-sm" aria-label="Fullscreen">
                    <i class="bi bi-arrows-fullscreen"></i>
                </button>
            </div>
        </div>
    </div>
{/if}
