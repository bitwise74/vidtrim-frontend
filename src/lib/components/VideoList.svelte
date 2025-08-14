<script lang="ts">
    import { PUBLIC_BASE_URL } from '$env/static/public'
    import { currentVideo, currentVideoURL, videos } from '$lib/stores/VideoStore'
    import { inSub } from '$lib/utils/InsertSub'
    import VideoDropdown from './VideoDropdown.svelte'

    function formatDuration(seconds: number): string {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = Math.floor(seconds % 60)

        if (h > 0) {
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
        } else {
            return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
        }
    }

    function formatSize(bytes: number): string {
        if (bytes < 1024) return `${bytes} B`
        const kb = bytes / 1024
        if (kb < 1024) return `${kb.toFixed(2)} KB`
        const mb = kb / 1024
        if (mb < 1024) return `${mb.toFixed(2)} MB`
        const gb = mb / 1024
        return `${gb.toFixed(2)} GB`
    }

    function formatDate(unix: number): string {
        const date = new Date(unix * 1000)
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }
</script>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
{#if $currentVideoURL}
    <div class="modal-backdrop show pt-0" onclick={() => currentVideoURL.set('')}></div>
    <div
        class="modal show d-block pt-0 d-flex"
        tabindex="-1"
        onclick={() => currentVideoURL.set('')}>
        <div
            class="modal-dialog modal-xl py-0 align-content-center justify-content-center"
            onclick={(e) => e.stopPropagation()}>
            <div class="modal-content">
                <video controls autoplay class="w-100" volume=50 src={$currentVideoURL}>
                <track kind="captions" />
        </video>
            </div>
        </div>
    </div>
{/if}

{#if $videos.length === 0}
    <div class="text-center py-5">
        <div
            class="d-flex align-items-center justify-content-center rounded-circle bg-light mx-auto mb-4"
            style="width: 96px; height: 96px;">
            <i class="bi bi-file-earmark-play text-muted display-4"></i>
        </div>
        <h4 class="fw-semibold mb-3">No videos yet</h4>
        <p class="text-muted mb-4">
            Upload your first video by drag and dropping it here or going to the editor
        </p>
        <a href="/editor" class="btn btn-dark">Open Editor</a>
    </div>
{:else}
    {#each $videos as video}
        <div class="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <div class="card d-flex flex-column h-100 border-0 shadow-sm card-hover">
                <div class="position-relative aspect-video bg-light overflow-hidden rounded-2">
                    {#if video.state == 'processing'}
                    <img
                    src={"placeholder.svg"}
                    class="w-100 h-100 object-fit-cover"
                    alt="placeholder"
                    >
                    <div
                            class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center flex-column opacity-1 gap-1"
                            style="background: rgba(0,0,0,0.3);">
                            <i class="spinner-border text-white mt-3" role="status"></i>
                            <p class="text-white">Processing...</p>
                        </div>
                    {:else}
                        <img
                            src={`${inSub(PUBLIC_BASE_URL, 'cdn')}/${video.thumb_key}`}
                            alt={video.name}
                            class="w-100 h-100"
                            style="object-fit: contain;" />
                        <div
                            class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0 hover-overlay"
                            style="background: rgba(0,0,0,0.3);">
                            <button
                                class="btn bg-black btn-sm text-white"
                                onclick={() => currentVideo.set(video)}
                                aria-label="Play video">
                                <i class="bi bi-play-fill me-1"></i>Play
                            </button>
                        </div>
                        <div class="position-absolute bottom-0 end-0 m-2">
                            <span class="badge bg-black bg-opacity-75"
                                >{formatDuration(video.duration)}</span>
                        </div>
                    {/if}
                </div>

                <div class="card-body p-3">
                    <div class="d-flex align-items-start justify-content-between mb-2">
                        <h6 class="card-title mb-0 line-clamp-2 flex-grow-1 overflow-hidden pe-2">
                            {video.name}
                        </h6>
                        <VideoDropdown fileKey={video.file_key}></VideoDropdown>
                    </div>

                    <div
                        class="d-flex align-items-center justify-content-between small text-muted mb-2">
                        <span>{formatDate(video.created_at)}</span>
                        <span class="badge bg-dark p-2">{video.format.toUpperCase().slice(6)}</span>
                    </div>

                    <div class="d-flex align-items-center justify-content-between small text-muted">
                        <span>{formatSize(video.size)}</span>
                        <span>{video.views} views</span>
                    </div>
                </div>
            </div>
        </div>
    {/each}
{/if}

<style>
    .hover-overlay {
        transition: opacity 0.1s ease;
    }

    .card-hover:hover .hover-overlay {
        opacity: 1 !important;
    }
</style>
