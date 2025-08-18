<script lang="ts">
    import { goto } from '$app/navigation'
    import { ValidateToken } from '$lib/api/Auth'
    import { getCookie } from '$lib/utils/Cookies'
    import { onMount } from 'svelte'
    import { toastStore } from './toast/toastStore'

    let { page = '', subpage = '', title = '' } = $props()
    let loggedIn = $state(false)

    onMount(async () => {
        if (getCookie('logged_in') === '1') {
            loggedIn = await ValidateToken()
        }
    })

    const handleLogin = async () => {
        goto(loggedIn ? '/dashboard' : '/login')
    }

    const buttonConfig = {
        main: () =>
            loggedIn
                ? [
                      {
                          text: 'Dashboard',
                          href: '/dashboard',
                          icon: 'bi-view-stacked',
                          class: 'btn-dark'
                      }
                  ]
                : [
                      {
                          text: 'Log in',
                          action: handleLogin,
                          class: 'btn-outline-dark'
                      },
                      {
                       
                        text: 'Register',
                        href: '/register',
                        class: 'btn-dark'
                      }
                  ],
        dashboard: () => [
            {
                text: 'Upload Video',
                action: () => {
                        toastStore.warning("Not implemented yet", "Drag & drop files here to upload")
                },
                icon: 'bi-upload',
                class: 'btn-outline-dark'
            },
            {
                text: 'Editor',
                href: '/editor',
                icon: 'bi-pencil',
                class: 'btn-dark'
            }
        ],
        login: () => [
            { text: 'Go Back', href: '/', icon: 'bi-arrow-left', class: 'btn-outline-dark' }
        ],
        register: () => [
            { text: 'Go Back', href: '/', icon: 'bi-arrow-left', class: 'btn-outline-dark' }
        ],
        editor: () => [
            { text: 'Dashboard', href: '/dashboard', icon: 'bi-view-stacked', class: 'btn-dark' }
        ]
    }

    const buttons = buttonConfig[subpage ? `${page}/${subpage}` : page]?.() || []
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

            <!-- Render buttons dynamically -->
            <div class="d-flex align-items-center gap-3">
                {#each buttons as btn}
                    {#if btn.href}
                        <a href={btn.href} class="btn btn-sm {btn.class}">
                            {#if btn.icon}<i class="bi {btn.icon} me-1"></i>{/if}
                            {btn.text}
                        </a>
                    {:else if btn.action}
                        <button onclick={btn.action} class="btn btn-sm {btn.class}">
                            {#if btn.icon}<i class="bi {btn.icon} me-1"></i>{/if}
                            {btn.text}
                        </button>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</header>
