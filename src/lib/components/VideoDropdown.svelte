<script lang="ts">
    import { goto } from '$app/navigation'
    import { PUBLIC_BASE_URL } from '$env/static/public'
    import { currentVideoURL, stats, videos } from '$lib/stores/VideoStore'
    import type { Stats } from '../../routes/dashboard/dashboard'

    const { videoID } = $props()

    export async function deleteVideo(): Promise<Stats> {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/files/${videoID}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        
        const body = await resp.json()

        if (resp.status === 200) {
            return body
        }

        throw new Error(body.error)
    }

    async function handleVideoAction(action: string) {
        const video = $videos.find((v) => v.id === videoID)
        if (!video) return
        switch (action) {
            case 'play':
                currentVideoURL.set(`${PUBLIC_BASE_URL}/api/files/${videoID}?t=0`)
                break
            case 'edit':
                goto(`/editor&id=${videoID}`)
                break
            case 'download':
                window.location.href = `${PUBLIC_BASE_URL}/api/files/${videoID}?t=0`
                break
            case 'share':
                navigator.share({
                    url: `${PUBLIC_BASE_URL}/api/files/${videoID}?t=0`
                })
                break
            case 'copy-link':
                navigator.clipboard.writeText(`${PUBLIC_BASE_URL}/files/${videoID}`)
                break
            case 'delete':
                const resp = await deleteVideo()

                videos.set($videos.filter(v => v.id != videoID))
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
