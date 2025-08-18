<script lang="ts">
    import { currentTime } from '$lib/stores/VideoStore'
    import { onMount } from 'svelte'
    import RangeSlider from 'svelte-range-slider-pips'

    let {
        src,
        trimStart,
        trimEnd,
        onTimeUpdate
    }: {
        src: string
        trimStart: number
        trimEnd: number
        onTimeUpdate: (current: number, duration: number) => void
    } = $props()

    let video: HTMLVideoElement

    let isPlaying = $state(false)
    let isMuted = $state(false)
    let volume = $state(0.75)
    let duration = $state(0)

    onMount(() => {
        if (!video) return

        const handleTimeUpdate = () => {
            currentTime.set(video.currentTime)
            onTimeUpdate(video.currentTime, video.duration)

            if (video.currentTime >= trimEnd) {
                video.pause()
            }
        }

        const handleLoadedMetadata = () => {
            duration = video.duration

            if (trimStart > 0) video.currentTime = trimStart
        }

        video.addEventListener('timeupdate', handleTimeUpdate)
        video.addEventListener('loadedmetadata', handleLoadedMetadata)

        return () => {
            video?.removeEventListener('timeupdate', handleTimeUpdate)
            video?.removeEventListener('loadedmetadata', handleLoadedMetadata)
        }
    })

    function togglePlay() {
        if (video.currentTime >= trimEnd && trimEnd > trimStart) {
            video.currentTime = trimStart
            currentTime.set(trimStart)
        }

        video.paused ? video.play() : video.pause()
    }

    function handleSeek(e: CustomEvent<{ value: number }>) {
        const maxTime = duration
        const newTime = Math.max(trimStart, Math.min(e.detail.value, maxTime))
        video.currentTime = newTime
        currentTime.set(newTime)
    }

    function handleVolumeChange(e: Event) {
        volume = parseFloat((e.target as HTMLInputElement).value)

        video.volume = volume
        isMuted = volume === 0
    }

    function toggleMute() {
        if (isMuted) {
            volume = 0.5
            isMuted = false
        } else {
            volume = 0
            isMuted = true
        }
    }

    function formatTime(time: number) {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const milliseconds = Math.floor((time % 1) * 100)
        return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    }
</script>

<div>
    <div class="position-relative aspect-video bg-dark rounded overflow-hidden mb-3">
        <video
            bind:this={video}
            {volume}
            bind:currentTime={$currentTime}
            {src}
            class="w-100 h-100"
            style="object-fit: contain;"
            onclick={togglePlay}
            onplay={() => (isPlaying = true)}
            onpause={() => (isPlaying = false)}>
            <track kind="captions" />
        </video>
    </div>

    <div>
        <div class="mb-3">
            <RangeSlider
                limits={[trimStart, trimEnd]}
                max={duration}
                step={0.01}
                value={$currentTime}
                formatter={formatTime}
                on:change={(e: CustomEvent<{ value: number }>) => handleSeek(e)} />
            <div class="d-flex justify-content-between small text-muted">
                <span>{formatTime($currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>

        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
                <button
                    class="btn btn-outline-dark btn-sm"
                    onclick={togglePlay}
                    aria-label="Play/Pause">
                    <i class="bi bi-{isPlaying ? 'pause' : 'play'}-fill"></i>
                </button>

                <div class="d-flex align-items-center gap-2">
                    <button
                        class="btn btn-outline-dark btn-sm"
                        onclick={toggleMute}
                        aria-label="Mute/Unmute">
                        <i class="bi bi-volume-{isMuted ? 'mute' : 'up'}-fill"></i>
                    </button>
                    <input
                        type="range"
                        class="form-range"
                        style="width: 80px;"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        oninput={handleVolumeChange} />
                </div>
            </div>

            <button
                class="btn btn-outline-dark btn-sm"
                aria-label="Fullscreen"
                onclick={() => video.requestFullscreen()}>
                <i class="bi bi-arrows-fullscreen"></i>
            </button>
        </div>
    </div>
</div>
