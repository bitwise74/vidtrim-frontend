<script>
  import Header from '$lib/components/Header.svelte'
  import AdminSidebar from '$lib/components/admin/AdminSidebar.svelte'
  import S3Tab from '$lib/components/admin/S3Tab.svelte'
  import SettingsTab from '$lib/components/admin/SettingsTab.svelte'
  import StatsTab from '$lib/components/admin/StatsTab.svelte'
  import UsersTab from '$lib/components/admin/UsersTab.svelte'
  import { onMount } from 'svelte'
  import { activeTab } from './store'
  
  let isAdmin = $state(false);
  let isLoading = $state(true);
  
  // TODO: Implement JWT admin check
  async function checkAdminAccess() {
    // Simulate JWT check - in real app, verify JWT token
    // const token = localStorage.getItem('jwt_token');
    // const response = await fetch('/api/admin/verify', {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // isAdmin = response.ok;
    
    // For now, just simulate the check
//     await new Promise(resolve => setTimeout(resolve, 1000));
    isAdmin = true; // Disabled check as requested
    isLoading = false;
  }
  
  onMount(() => {
    checkAdminAccess();
  });
</script>

<svelte:head>
  <title>Admin Dashboard - vid.sh</title>
</svelte:head>

{#if isLoading}
  <div class="min-vh-100 d-flex align-items-center justify-content-center">
    <div class="text-center">
      <div class="spinner-border text-primary mb-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-muted">Verifying admin access...</p>
    </div>
  </div>
{:else if !isAdmin}
  <div class="min-vh-100 d-flex align-items-center justify-content-center">
    <div class="text-center">
      <div class="display-1 text-danger mb-4">403</div>
      <h2 class="mb-3">Access Denied</h2>
      <p class="text-muted mb-4">You don't have permission to access the admin dashboard.</p>
      <a href="/" class="btn btn-primary">Go Home</a>
    </div>
  </div>
{:else}
  <div class="min-vh-100 bg-light">
    <Header title="Admin Dashboard" />

    <main class="container-fluid py-4">
      <div class="row g-4">
        <AdminSidebar/>
        
        <div class="col-md-9">
          {#if $activeTab === 'users'}
            <UsersTab />
          {:else if $activeTab === 's3'}
            <S3Tab />
          {:else if $activeTab === 'stats'}
            <StatsTab />
          {:else if $activeTab === 'settings'}
            <SettingsTab />
          {/if}
        </div>
      </div>
    </main>
  </div>
{/if}
