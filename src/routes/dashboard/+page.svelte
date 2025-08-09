<script lang="ts">
    import Header from '$lib/components/Header.svelte'
    import StatBlocks from '$lib/components/StatBlocks.svelte'
    import VideoList from '$lib/components/VideoList.svelte'
    import { stats, videos } from '$lib/stores/VideoStore'
    import { onDestroy, onMount } from 'svelte'
    import { SaveToCloud } from '../editor/Logic'
    import { LoadVideos, searchFiles, type Video } from './dashboard'

    const { data } = $props()

    videos.set(data.Videos)
    stats.set(data.Stats)

    let err: Error | null = $state(null)
    let page = 0
    let perPage = $state('10')
    let sortBy = $state('newest')
    let loading = false

    let dropOverlay: HTMLElement | null
    let timeout: number | undefined
    let sentinel: Element
    onMount(() => {
        dropOverlay = document.getElementById('dropOverlay')
        window.addEventListener('dragenter', showOverlay)
        window.addEventListener('dragend', hideOverlay)

         const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadModeContent();
      }
    });

    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
    })

    onDestroy(() => {
        clearTimeout(timeout)
    })

    function handleInput(e: any) {
        clearTimeout(timeout)
        const search = e.target.value

        timeout = setTimeout(async () => {
            videos.set(await searchFiles(search, perPage))
        }, 300)
    }

    function showOverlay(e: any) {
        if (e.dataTransfer.types.includes('Files') && dropOverlay) {
            dropOverlay.classList.remove('d-none')
            dropOverlay.classList.add('d-flex')
        }
    }

    function hideOverlay() {
        if (!dropOverlay) return
        dropOverlay.classList.add('d-none')
        dropOverlay.classList.remove('d-flex')
    }

    async function handleDrop(e: DragEvent) {
        hideOverlay()
        e.preventDefault()

        if (!e.dataTransfer) return

        const files = Array.from(e.dataTransfer.files)
        const videoFile = files.find((file) => file.type.startsWith('video/'))

        if (!videoFile) return

        videos.set([
            {
                state: 'processing',
                size: videoFile.size,
                format: 'video/mp4',
                created_at: Date.now(),
                views: 0,
                name: videoFile.name
            } as Video,
            ...$videos
        ])

        try {
            await SaveToCloud(videoFile)
            window.location.reload()
        } catch (error) {
            err = error
            window.scrollTo(0, 0)
        }
    }

    async function loadModeContent() {
        if (loading) return
        loading = true

        page++

        try {
                const newVideos = await LoadVideos(page)
                videos.set([...$videos, ...newVideos])
        } catch (error) {
                err = error
                window.scrollTo(0, 0)
        } finally {
                loading = false
        }
    }

</script>

<svelte:head>
    <title>Dashboard - vid.sh</title>
</svelte:head>

<div class="min-vh-100 bg-light position-relative">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
        class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-none
           justify-content-center align-items-center z-3"
        id="dropOverlay"
        ondragenter={showOverlay}
        ondragover={(e) => e.preventDefault()}
        ondragend={hideOverlay}
        ondragleave={hideOverlay}
        ondrop={handleDrop}>
        <div class="border border-3 border-dashed border-light rounded-4 p-5 text-center">
            <i class="bi bi-cloud-upload text-light display-1 mb-3"></i>
            <h3 class="text-light fw-semibold">Drop files to upload</h3>
        </div>
    </div>

    <Header title="Dashboard" page="dashboard" />
    <main class="container py-4">
        {#if err}
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Failed to load your dashboard:</strong>
                {err}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                ></button>
            </div>
        {:else}
            <StatBlocks></StatBlocks>

            <div class="row g-3 mb-4">
                <div class="col-lg-8 col-md-7">
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Search videos..."
                            oninput={handleInput} />
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6">
                    <select class="form-select" bind:value={sortBy}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="az">Name A-Z</option>
                        <option value="size">Size</option>
                        <option value="views">Most Views</option>
                    </select>
                </div>
                <div class="col-lg-1 col-md-2 col-sm-6">
                    <select class="form-select" bind:value={perPage} disabled placeholder="Results per page">
                        <option value="10" selected>10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="250">250</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <VideoList></VideoList>
            </div>
        {/if}
        <div bind:this={sentinel}></div>
    </main>
</div>
