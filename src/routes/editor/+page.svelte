<script lang="ts">
    import { goto } from '$app/navigation'
    import { ValidateToken } from '$lib/api/Auth'
    import Header from '$lib/components/Header.svelte'
    import VideoPlayer from '$lib/components/VideoPlayer.svelte'
    import VideoUpload from '$lib/components/VideoUpload.svelte'
    import { currentTime } from '$lib/stores/VideoStore'
    import { getCookie } from '$lib/utils/Cookies'
    import { onMount } from 'svelte'
    import RangeSlider from 'svelte-range-slider-pips'
    import { Turnstile } from 'svelte-turnstile'
    import { jobProgress, processVideo, SaveToCloud, turnstileToken } from './Logic'

    let targetSize: number = $state(0)
    let trimStart: number = $state(0)
    let trimEnd: number = $state(0)
    let processingSpeed = $state('superfast')

    let videoDuration = $state(0)
    let isLoggedIn = $state(false)
    let isProcessing = $state(false)

    let selectedVideo: File | null = $state(null)
    let fileSize = $state(0)
    let error: Error | null = $state(null)

    const settingsUnchanged = $derived(() => {
        return (
            targetSize === -1 &&
            trimStart === 0 &&
            Math.trunc(trimEnd) === Math.trunc(videoDuration)
        )
    })

    onMount(async () => {
        if (getCookie('logged_in') == '1') {
            const valid = await ValidateToken()

            if (!valid) {
                goto('/login')
            }

            isLoggedIn = true
        }
    })

    const handleVideoSelect = (f: File) => {
        selectedVideo = f

        fileSize = Math.trunc(f.size / (1024 * 1024))

        const url = URL.createObjectURL(f)
        const video = document.createElement('video')
        video.src = url

        video.addEventListener('loadedmetadata', () => {
            videoDuration = video.duration
            trimEnd = video.duration
            URL.revokeObjectURL(url)
            video.removeEventListener('loadmetadata', () => {})
        })
    }

    const handleVideoClear = () => {
        selectedVideo = null
        videoDuration = 0
        trimStart = 0
        trimEnd = 0
        fileSize = 0
    }

    const handleTimeUpdate = (_, duration: number) => {
        if (videoDuration === 0) {
            videoDuration = Math.trunc(duration)
            trimEnd = Math.trunc(duration)
        }
    }

    const handleCompressChange = (e: CustomEvent<{ value: number }>) => {
        targetSize = e.detail.value
    }

    function handleTrimChange(e: CustomEvent<{ values: number[] }>) {
        const [start, end] = e.detail.values
        trimStart = start
        trimEnd = end
    }

    async function handleExport(save = false) {
        if (!selectedVideo) return

        isProcessing = true

        try {
            if (save) {
                let file = selectedVideo

                if (!settingsUnchanged()) {
                    const processedVideo = await processVideo({
                        file: selectedVideo,
                        targetSize: targetSize,
                        trimEnd: trimEnd,
                        trimStart: trimStart,
                        processingSpeed: processingSpeed
                    })

                    file = new File([processedVideo], selectedVideo.name, { type: 'video/mp4' })
                }

                await SaveToCloud(file)
                return
            }

            const a = document.createElement('a')
            let url = ''

            const processedVideo = await processVideo({
                file: selectedVideo,
                targetSize: targetSize,
                trimEnd: trimEnd,
                trimStart: trimStart,
                processingSpeed: processingSpeed
            })

            url = URL.createObjectURL(processedVideo)
            a.href = url
            a.download = `edited_${selectedVideo.name!}`

            document.body.appendChild(a)

            // Timeout to let the animation play out
            setTimeout(() => {
                isProcessing = false

                a.click()

                document.body.removeChild(a)
                URL.revokeObjectURL(url)
            }, 750)
        } catch (err) {
            error = err
            window.scrollTo(0, 0)
        } finally {
            isProcessing = false
        }
    }

    function formatTime(time: number) {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
</script>

<svelte:head>
    <title>Video Editor - vid.sh</title>
</svelte:head>

<div class="min-vh-100 bg-light">
    <Header title="Editor" page="editor" />

    <Turnstile
        siteKey="0x4AAAAAABkH5R_4hvXLiZqn"
        appearance="interaction-only"
        on:turnstile-callback={(e: CustomEvent<{ token: string }>) => {
            turnstileToken.set(e.detail.token)
        }}></Turnstile>

    <main class="container py-4">
        <div class="row g-4">
            {#if error}
                <div class="alert alert-danger" role="alert">
                    <p>
                        {error}
                        <button
                            class="btn btn-outline-danger btn-sm"
                            aria-label="Dismiss error"
                            onclick={(error = null)}>
                            <i class="bi bi-x"></i>
                        </button>
                    </p>
                </div>
            {/if}

            {#if selectedVideo}
                <div class="col-lg-8">
                    <div class="mb-4">
                        <VideoUpload
                            onVideoSelect={handleVideoSelect}
                            {selectedVideo}
                            onClear={handleVideoClear} />
                    </div>

                    <div class="mb-4">
                        <VideoPlayer
                            video={selectedVideo}
                            onTimeUpdate={handleTimeUpdate}
                            {trimEnd}
                            {trimStart} />
                    </div>
                </div>
            {:else}
                <div class="col-lg-12"></div>
                <div class="mb-4">
                    <VideoUpload
                        onVideoSelect={handleVideoSelect}
                        {selectedVideo}
                        onClear={handleVideoClear} />
                </div>
            {/if}

            {#if selectedVideo}
                <div class="col-lg-4">
                    <div class="card shadow">
                        <div class="card-header bg-white">
                            <h5 class="card-title mb-0 d-flex align-items-center">
                                <i class="bi bi-scissors me-2"></i>
                                Editing Tools
                            </h5>
                        </div>
                        <div class="card-body">
                            {#if selectedVideo}
                                <!-- Tabs -->
                                <ul class="nav nav-tabs mb-4" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button
                                            class="nav-link active"
                                            data-bs-toggle="tab"
                                            data-bs-target="#trim-tab"
                                            type="button">
                                            Trim
                                        </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button
                                            class="nav-link"
                                            data-bs-toggle="tab"
                                            data-bs-target="#compress-tab"
                                            type="button">
                                            Compress
                                        </button>
                                    </li>
                                </ul>

                                <div class="tab-content">
                                    <div class="tab-pane fade show active" id="trim-tab">
                                        <p>
                                            From: {formatTime(trimStart)} to: {formatTime(trimEnd)}
                                        </p>
                                        <div class="mb-3">
                                            <RangeSlider
                                                values={[trimStart, trimEnd]}
                                                min={0}
                                                max={videoDuration}
                                                step={1}
                                                pipstep={1}
                                                float
                                                range
                                                draggy={true}
                                                on:change={handleTrimChange}
                                                formatter={formatTime}
                                                style="--range-range: #1463DA"></RangeSlider>
                                            <div class="d-flex justify-content-between">
                                                <button
                                                    class="btn btn-outline-primary"
                                                    data-bs-toggle="tooltip"
                                                    title="Set Trim Start to Current Time"
                                                    aria-label="Set Trim Start to Current Time"
                                                    onclick={() => {
                                                        trimStart = $currentTime
                                                    }}>
                                                    <i class="bi bi-skip-start-fill"></i>
                                                </button>
                                                <button
                                                    class="btn btn-outline-primary"
                                                    data-bs-toggle="tooltip"
                                                    title="Set Trim End to Current Time"
                                                    aria-label="Set Trim End to Current Time"
                                                    onclick={() => {
                                                        trimEnd = $currentTime
                                                    }}>
                                                    <i class="bi bi-skip-end-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="small text-muted">
                                            New duration:
                                            {formatTime(trimEnd - trimStart)}
                                        </div>
                                    </div>

                                    <!-- Compress Tab -->
                                    <div class="tab-pane fade" id="compress-tab">
                                        <div class="mb-3">
                                            <label for="target-size">
                                                Target Size:
                                                {#if targetSize <= 0 || targetSize >= fileSize}
                                                    Not set
                                                {:else}
                                                    {targetSize} MB
                                                {/if}
                                            </label>

                                            <RangeSlider
                                                value={0}
                                                min={0}
                                                max={fileSize}
                                                step={1}
                                                pipstep={1}
                                                float
                                                on:change={handleCompressChange}
                                                formatter={(val) => {
                                                    if (val == 0 || val == fileSize) {
                                                        targetSize = -1
                                                        return 'Not set'
                                                    }

                                                    return val.toString() + ' MB'
                                                }}></RangeSlider>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="processing-speed"
                                                >Processing Speed</label>
                                            <p class="small text-muted">
                                                Slower processing will give you a better quality.
                                                Faster processing may result in file sizes
                                                inaccurate to the requested target size (just
                                                decrease it a bit more)
                                            </p>
                                            <select
                                                class="form-select"
                                                id="processing-speed"
                                                bind:value={processingSpeed}>
                                                <option value="ultrafast">Fastest</option>
                                                <option value="superfast">Faster</option>
                                                <option value="faster">Fast</option>
                                                <option value="fast">Normal</option>
                                                <option value="medium">Slower</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="border-top pt-4 mt-4">
                                    <div class="d-grid gap-3">
                                        <button
                                            class="btn btn-primary"
                                            onclick={() => handleExport()}
                                            disabled={isProcessing || settingsUnchanged()}>
                                            {#if isProcessing}
                                                <span class="spinner-border spinner-border-sm me-2"
                                                ></span>
                                                Processing...
                                            {:else}
                                                <i class="bi bi-download me-2"></i>
                                                Export Video
                                            {/if}
                                        </button>

                                        {#if isLoggedIn}
                                            <button
                                                class="btn btn-outline-primary"
                                                disabled={isProcessing}
                                                onclick={() => handleExport(true)}>
                                                {#if isProcessing}
                                                    <span
                                                        class="spinner-border spinner-border-sm me-2"
                                                    ></span>
                                                    Saving...
                                                {:else}
                                                    <i class="bi bi-cloud me-2"></i>
                                                    Save to Cloud
                                                {/if}
                                            </button>
                                        {:else}
                                            <div class="text-center p-3 bg-light rounded">
                                                <p class="small text-muted mb-2">
                                                    Sign in to save your videos to the cloud
                                                </p>
                                                <a
                                                    href="/login"
                                                    class="btn btn-outline-secondary btn-sm"
                                                    >Sign In</a>
                                            </div>
                                        {/if}
                                        {#if isProcessing}
                                            <div class="progress mt-2" style="height: 6px;">
                                                <div
                                                    class="progress-bar progress-bar-animated bg-success"
                                                    role="progressbar"
                                                    style="width: {$jobProgress}%;"
                                                    aria-valuenow={$jobProgress}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100">
                                                </div>
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </main>
</div>
