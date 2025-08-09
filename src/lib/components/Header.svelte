<script lang="ts">
    import { goto } from '$app/navigation'
    import { ValidateToken } from '$lib/api/Auth'
    import { getCookie } from '$lib/utils/Cookies'
    import { onMount } from 'svelte'

    let { page = '', title = ''} = $props()
    let loggedIn = $state(false)
    
    onMount(async () => {
        if (getCookie('logged_in') === '1') {
            loggedIn = await ValidateToken()
        }
    })

    const handleLogin = async () => {
        goto(loggedIn ? '/dashboard' : '/login')
    }
</script>

<header class="border-bottom bg-white-95 sticky-top-custom">
    <div class="container">
        <div class="d-flex align-items-center justify-content-between py-3">
            <div class="d-flex align-items-center">
                <a href="/" class="d-flex align-items-center text-decoration-none me-3">
                    <div
                        class="d-flex align-items-center justify-content-center rounded-2 bg-dark me-2"
                        style="width: 32px; height: 32px;">
                        <i class="bi bi-play-fill text-white"></i>
                    </div>
                    <span class="fs-4 fw-bold text-dark">vid.sh</span>
                </a>

                {#if title}
                    <div class="vr me-3"></div>
                    <h1 class="fs-5 fw-semibold mb-0">{title}</h1>
                {/if}
            </div>

            {#if page === 'main'}
                {#if loggedIn}
                    <div class="d-flex align-items-center gap-2">
                        <a href="/dashboard" class="btn btn-dark btn-sm">
                            <i class="bi bi-view-stacked me-1"></i>
                            Dashboard
                        </a>
                    </div>
                {:else}
                    <div class="d-flex align-items-center gap-2">
                        <button onclick={handleLogin} class="btn btn-outline-dark btn-sm"
                            >Log In</button>
                        <a href="/register" class="btn btn-dark btn-sm">Sign Up</a>
                    </div>
                {/if}
            {:else if page === 'register' || page === 'login'}
                <div class="d-flex align-items-center gap-2">
                    <a href="/" class="btn btn-dark btn-sm">
                        <i class="bi bi-arrow-left me-1"></i>
                        Go back</a>
                </div>
            {:else if page === 'dashboard'}
                <div class="d-flex align-items-center gap-2">
                    <a href="/editor" class="btn btn-dark btn-sm">
                        <i class="bi bi-pencil me-1"></i>
                        Editor</a>
                </div>
            {:else if page === 'editor'}
                    <div class="d-flex align-items-center gap-2">
                        <a href="/dashboard" class="btn btn-dark btn-sm">
                            <i class="bi bi-view-stacked me-1"></i>
                            Dashboard
                        </a>
                    </div>
            {/if}
        </div>
    </div>
</header>
