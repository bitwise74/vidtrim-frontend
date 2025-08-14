<script>
  
  let settings = $state({
    lockdown_mode: false,
    max_file_size: 524288000, // 500MB
    allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
    registration_enabled: true,
    maintenance_mode: false
  });
  
  let availableFormats = ['mp4', 'mov', 'avi', 'webm', 'mkv', 'flv', '3gp'];
  
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  function toggleFormat(format) {
    if (settings.allowed_formats.includes(format)) {
      settings.allowed_formats = settings.allowed_formats.filter(f => f !== format);
    } else {
      settings.allowed_formats = [...settings.allowed_formats, format];
    }
  }
  
  function saveSettings() {
    // In a real app, this would make an API call
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  }
  
  function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      settings = {
        lockdown_mode: false,
        max_file_size: 524288000,
        allowed_formats: ['mp4'],
        registration_enabled: true,
        maintenance_mode: false
      };
    }
  }
</script>

<div>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h4 class="mb-1">System Settings</h4>
      <p class="text-muted mb-0">Configure system-wide settings and security options</p>
    </div>
    <div class="d-flex gap-2">
      <button class="btn btn-outline-secondary" onclick={resetSettings}>
        <i class="bi bi-arrow-clockwise me-2"></i>
        Reset to Defaults
      </button>
      <button class="btn btn-primary" onclick={saveSettings}>
        <i class="bi bi-check-lg me-2"></i>
        Save Changes
      </button>
    </div>
  </div>
  
  <!-- Security Settings -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white border-bottom">
      <h6 class="mb-0 fw-semibold">
        <i class="bi bi-shield-check me-2 text-danger"></i>
        Security Settings
      </h6>
    </div>
    <div class="card-body">
      <div class="row g-4">
        <div class="col-md-6">
          <div class="form-check form-switch">
            <input 
              class="form-check-input" 
              type="checkbox" 
              id="lockdown_mode"
              bind:checked={settings.lockdown_mode}
            />
            <label class="form-check-label" for="lockdown_mode">
              <strong>Lockdown Mode</strong>
            </label>
          </div>
          <small class="text-muted">
            Disables new user registration and file uploads.
            {#if settings.lockdown_mode}
              <span class="text-warning fw-medium">⚠️ Currently active</span>
            {/if}
          </small>
        </div>
        
        <div class="col-md-6">
          <div class="form-check form-switch">
            <input 
              class="form-check-input" 
              type="checkbox" 
              id="registration_enabled"
              bind:checked={settings.registration_enabled}
              disabled={settings.lockdown_mode}
            />
            <label class="form-check-label" for="registration_enabled">
              <strong>File Uploads</strong>
            </label>
          </div>
          <small class="text-muted">
            Allow users to upload new video.
            {#if settings.lockdown_mode}
              <span class="text-muted">(Disabled by lockdown mode)</span>
            {/if}
          </small>
        </div>
      </div>
    </div>
  </div>
  
  <!-- System Settings -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white border-bottom">
      <h6 class="mb-0 fw-semibold">
        <i class="bi bi-gear me-2 text-primary"></i>
        System Configuration
      </h6>
    </div>
    <div class="card-body">
      <div class="row g-4">
        <div class="col-md-6">
          <div class="form-check form-switch">
            <input 
              class="form-check-input" 
              type="checkbox" 
              id="maintenance_mode"
              bind:checked={settings.maintenance_mode}
            />
            <label class="form-check-label" for="maintenance_mode">
              <strong>Maintenance Mode</strong>
            </label>
          </div>
          <small class="text-muted">
            Temporarily disable the application for maintenance. Shows a maintenance page to users.
            {#if settings.maintenance_mode}
              <span class="text-danger fw-medium">🔧 Currently active</span>
            {/if}
          </small>
        </div>
        
        <div class="col-md-6">
          <label for="max_file_size" class="form-label fw-medium">Maximum File Size</label>
          <select class="form-select" id="max_file_size" bind:value={settings.max_file_size}>
            <option value={104857600}>100 MB</option>
            <option value={262144000}>250 MB</option>
            <option value={524288000}>500 MB</option>
            <option value={1073741824}>1 GB</option>
            <option value={2147483648}>2 GB</option>
          </select>
          <small class="text-muted">
            Current limit: {formatFileSize(settings.max_file_size)}
          </small>
        </div>
      </div>
    </div>
  </div>
  
  <!-- File Format Settings -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white border-bottom">
      <h6 class="mb-0 fw-semibold">
        <i class="bi bi-file-earmark-play me-2 text-info"></i>
        Allowed File Formats
      </h6>
    </div>
    <div class="card-body">
      <p class="text-muted mb-3">Select which video formats users can upload to the platform.</p>
      <div class="row g-3">
        {#each availableFormats as format}
          <div class="col-md-3">
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                id="format_{format}"
                checked={settings.allowed_formats.includes(format)}
                onchange={() => toggleFormat(format)}
              />
              <label class="form-check-label text-uppercase fw-medium" for="format_{format}">
                {format}
              </label>
            </div>
          </div>
        {/each}
      </div>
      <div class="mt-3">
        <small class="text-muted">
          Currently allowed: 
          <span class="fw-medium">
            {settings.allowed_formats.map(f => f.toUpperCase()).join(', ')}
          </span>
        </small>
      </div>
    </div>
  </div>
  
  <!-- System Status -->
  <div class="card border-0 shadow-sm">
    <div class="card-header bg-white border-bottom">
      <h6 class="mb-0 fw-semibold">
        <i class="bi bi-activity me-2 text-success"></i>
        Current System Status
      </h6>
    </div>
    <div class="card-body">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="d-flex align-items-center">
            <div class="rounded-circle bg-{settings.lockdown_mode ? 'warning' : 'success'} me-3" 
                 style="width: 12px; height: 12px;"></div>
            <div>
              <div class="fw-medium">Access Control</div>
              <small class="text-muted">
                {settings.lockdown_mode ? 'Lockdown Active' : 'Normal Operation'}
              </small>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="d-flex align-items-center">
            <div class="rounded-circle bg-{settings.registration_enabled && !settings.lockdown_mode ? 'success' : 'danger'} me-3" 
                 style="width: 12px; height: 12px;"></div>
            <div>
              <div class="fw-medium">Registration</div>
              <small class="text-muted">
                {settings.registration_enabled && !settings.lockdown_mode ? 'Open' : 'Closed'}
              </small>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="d-flex align-items-center">
            <div class="rounded-circle bg-{settings.maintenance_mode ? 'danger' : 'success'} me-3" 
                 style="width: 12px; height: 12px;"></div>
            <div>
              <div class="fw-medium">System Status</div>
              <small class="text-muted">
                {settings.maintenance_mode ? 'Maintenance' : 'Operational'}
              </small>
            </div>
          </div>
        </div>
      </div>
      
      {#if settings.lockdown_mode || settings.maintenance_mode}
        <div class="alert alert-warning mt-4 mb-0">
          <i class="bi bi-exclamation-triangle me-2"></i>
          <strong>Warning:</strong>
          {#if settings.maintenance_mode}
            The system is currently in maintenance mode. Users will see a maintenance page.
          {:else if settings.lockdown_mode}
            The system is in lockdown mode. New registrations are disabled.
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>
