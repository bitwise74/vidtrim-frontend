<script lang="ts">
    import { goto } from '$app/navigation'
    import { PUBLIC_BASE_URL } from '$env/static/public'
    import { DeleteVideo } from '$lib/api/Files'
    import { currentVideoURL, stats, videos } from '$lib/stores/VideoStore'
    import { inSub } from '$lib/utils/InsertSub'

    const { fileKey } = $props()

    async function handleVideoAction(action: string) {
        const video = $videos.find((v) => v.file_key === fileKey)
        if (!video) return
        switch (action) {
            case 'play':
                currentVideoURL.set(`${inSub(PUBLIC_BASE_URL, 'cdn')}/${fileKey}`)
                break
            case 'edit':
                goto(`/editor&id=${video.id}`)
                break
            case 'download':
                window.location.href = `${inSub(PUBLIC_BASE_URL, 'cdn')}/${fileKey}`
                break
            case 'share':
                navigator.share({
                    url: `${inSub(PUBLIC_BASE_URL, 'cdn')}/${fileKey}`
                })
                break
            case 'copy-link':
                navigator.clipboard.writeText(`${inSub(PUBLIC_BASE_URL, 'cdn')}/${fileKey}`)
                break
            case 'delete':
                const resp = await DeleteVideo(video.id)

                videos.set($videos.filter(v => v.id != video.id))
                stats.set(resp)
                break

            default:
                console.error('unknown video action', action)
        }
    }
</script>

<div class="dropdown">
    <button
        class="btn btn-sm btn-outline-secondary"
        type="button"
        data-bs-toggle="dropdown"
        aria-label="Options"
        aria-expanded="false">
        <i class="bi bi-three-dots-vertical"></i>
    </button>
    <ul class="dropdown-menu">
        <li>
            <button
                class="dropdown-item"
                onclick={() => handleVideoAction('play')}
                aria-label="Play video">
                <i class="bi bi-play me-2"></i>Play
            </button>
        </li>
        <li>
            <button
                class="dropdown-item"
                onclick={() => handleVideoAction('edit')}
                aria-label="Edit video">
                <i class="bi bi-pencil me-2"></i>Edit
            </button>
        </li>
        <li>
            <button
                class="dropdown-item"
                onclick={() => handleVideoAction('download')}
                aria-label="Download video">
                <i class="bi bi-download me-2"></i>Download
            </button>
        </li>
        <li>
            <button
                class="dropdown-item"
                onclick={() => handleVideoAction('share')}
                aria-label="Share video">
                <i class="bi bi-share me-2"></i>Share
            </button>
        </li>
        <li>
            <button
                class="dropdown-item"
                onclick={() => handleVideoAction('copy-link')}
                aria-label="Copy video link">
                <i class="bi bi-link me-2"></i>Copy Link
            </button>
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
            <button
                class="dropdown-item text-danger"
                onclick={() => handleVideoAction('delete')}
                aria-label="Delete video">
                <i class="bi bi-trash me-2"></i>Delete
            </button>
        </li>
    </ul>
</div>
