<script>
    import { activeTab } from '../../../routes/admin/store'

  
  const tabs = [
    { id: 'users', label: 'Users', icon: 'bi-people' },
    { id: 's3', label: 'S3 Storage', icon: 'bi-cloud' },
    { id: 'stats', label: 'Statistics', icon: 'bi-graph-up' },
    { id: 'settings', label: 'Settings', icon: 'bi-gear' }
  ];
</script>

<div class="col-md-3">
  <div class="card border-0 shadow-sm">
    <div class="card-header bg-white border-bottom">
      <h6 class="mb-0 fw-semibold">
        <i class="bi bi-shield-check me-2 text-danger"></i>
        Admin Dashboard
      </h6>
    </div>
    <div class="list-group list-group-flush">
      {#each tabs as tab}
        <button
          class="list-group-item list-group-item-action border-0 d-flex align-items-center {$activeTab === tab.id ? 'active' : ''}"
          onclick={() => activeTab.set(tab.id)}
          aria-label="Switch to {tab.label} tab"
        >
          <i class="{tab.icon} me-3"></i>
          {tab.label}
        </button>
      {/each}
    </div>
  </div>
  
  <div class="card border-0 shadow-sm mt-4">
    <div class="card-body">
      <h6 class="fw-semibold mb-3">Quick Actions</h6>
      <div class="d-grid gap-2">
        <button class="btn btn-outline-primary btn-sm">
          <i class="bi bi-plus me-2"></i>
          Create User
        </button>
        <button class="btn btn-outline-warning btn-sm">
          <i class="bi bi-exclamation-triangle me-2"></i>
          Maintenance Mode
        </button>
        <button class="btn btn-outline-info btn-sm">
          <i class="bi bi-download me-2"></i>
          Export Data
        </button>
      </div>
    </div>
  </div>
</div>
