<script>
  
  let s3Stats = $state({
    total_storage: 2147483648000, // 2TB
    monthly_uploads: 1073741824000, // 1TB
    monthly_downloads: 536870912000, // 500GB
    predicted_cost: 245.67,
    bandwidth_used: 2147483648000, // 2TB
    requests_count: 1250000,
    storage_classes: {
      standard: 1610612736000, // 1.5TB
      ia: 429496729600, // 400GB
      glacier: 107374182400 // 100GB
    }
  });
  
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
  
  function getStorageClassPercentage(classSize, total) {
    return Math.round((classSize / total) * 100);
  }
</script>

<div>
  <div class="mb-4">
    <h4 class="mb-1">S3 Storage Management</h4>
    <p class="text-muted mb-0">Monitor storage usage, costs, and performance metrics</p>
  </div>
  
  <!-- Cost Overview -->
  <div class="row g-4 mb-5">
    <div class="col-md-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <div class="display-6 fw-bold text-danger mb-2">{formatCurrency(s3Stats.predicted_cost)}</div>
          <h6 class="text-muted mb-0">Predicted Monthly Cost</h6>
          <small class="text-success">
            <i class="bi bi-arrow-down me-1"></i>
            12% vs last month
          </small>
        </div>
      </div>
    </div>
    
    <div class="col-md-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <div class="display-6 fw-bold text-primary mb-2">{formatFileSize(s3Stats.total_storage)}</div>
          <h6 class="text-muted mb-0">Total Storage</h6>
          <small class="text-info">
            <i class="bi bi-arrow-up me-1"></i>
            8% vs last month
          </small>
        </div>
      </div>
    </div>
    
    <div class="col-md-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <div class="display-6 fw-bold text-success mb-2">{s3Stats.requests_count.toLocaleString()}</div>
          <h6 class="text-muted mb-0">API Requests</h6>
          <small class="text-success">
            <i class="bi bi-arrow-up me-1"></i>
            15% vs last month
          </small>
        </div>
      </div>
    </div>
    
    <div class="col-md-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <div class="display-6 fw-bold text-warning mb-2">{formatFileSize(s3Stats.bandwidth_used)}</div>
          <h6 class="text-muted mb-0">Bandwidth Used</h6>
          <small class="text-warning">
            <i class="bi bi-arrow-up me-1"></i>
            22% vs last month
          </small>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Storage Classes -->
  <div class="row g-4 mb-5">
    <div class="col-md-8">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-bottom">
          <h6 class="mb-0 fw-semibold">Storage Classes Distribution</h6>
        </div>
        <div class="card-body">
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-medium">Standard Storage</span>
              <span class="text-muted">{formatFileSize(s3Stats.storage_classes.standard)}</span>
            </div>
            <div class="progress mb-3" style="height: 8px;">
              <div class="progress-bar bg-primary" 
                   style="width: {getStorageClassPercentage(s3Stats.storage_classes.standard, s3Stats.total_storage)}%"></div>
            </div>
          </div>
          
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-medium">Infrequent Access (IA)</span>
              <span class="text-muted">{formatFileSize(s3Stats.storage_classes.ia)}</span>
            </div>
            <div class="progress mb-3" style="height: 8px;">
              <div class="progress-bar bg-info" 
                   style="width: {getStorageClassPercentage(s3Stats.storage_classes.ia, s3Stats.total_storage)}%"></div>
            </div>
          </div>
          
          <div class="mb-0">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-medium">Glacier Archive</span>
              <span class="text-muted">{formatFileSize(s3Stats.storage_classes.glacier)}</span>
            </div>
            <div class="progress" style="height: 8px;">
              <div class="progress-bar bg-secondary" 
                   style="width: {getStorageClassPercentage(s3Stats.storage_classes.glacier, s3Stats.total_storage)}%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-4">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-bottom">
          <h6 class="mb-0 fw-semibold">Monthly Transfer</h6>
        </div>
        <div class="card-body">
          <div class="mb-4">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-success">
                <i class="bi bi-arrow-up me-2"></i>
                Uploads
              </span>
              <span class="fw-medium">{formatFileSize(s3Stats.monthly_uploads)}</span>
            </div>
          </div>
          
          <div class="mb-4">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-primary">
                <i class="bi bi-arrow-down me-2"></i>
                Downloads
              </span>
              <span class="fw-medium">{formatFileSize(s3Stats.monthly_downloads)}</span>
            </div>
          </div>
          
          <div class="border-top pt-3">
            <div class="d-flex align-items-center justify-content-between">
              <span class="fw-semibold">Total Transfer</span>
              <span class="fw-bold">{formatFileSize(s3Stats.monthly_uploads + s3Stats.monthly_downloads)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Cost Breakdown -->
  <div class="card border-0 shadow-sm">
    <div class="card-header bg-white border-bottom">
      <h6 class="mb-0 fw-semibold">Cost Breakdown</h6>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Service</th>
              <th>Usage</th>
              <th>Rate</th>
              <th class="text-end">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Standard Storage</td>
              <td>{formatFileSize(s3Stats.storage_classes.standard)}</td>
              <td>$0.023/GB</td>
              <td class="text-end">{formatCurrency((s3Stats.storage_classes.standard / 1073741824) * 0.023)}</td>
            </tr>
            <tr>
              <td>IA Storage</td>
              <td>{formatFileSize(s3Stats.storage_classes.ia)}</td>
              <td>$0.0125/GB</td>
              <td class="text-end">{formatCurrency((s3Stats.storage_classes.ia / 1073741824) * 0.0125)}</td>
            </tr>
            <tr>
              <td>Glacier Storage</td>
              <td>{formatFileSize(s3Stats.storage_classes.glacier)}</td>
              <td>$0.004/GB</td>
              <td class="text-end">{formatCurrency((s3Stats.storage_classes.glacier / 1073741824) * 0.004)}</td>
            </tr>
            <tr>
              <td>Data Transfer Out</td>
              <td>{formatFileSize(s3Stats.monthly_downloads)}</td>
              <td>$0.09/GB</td>
              <td class="text-end">{formatCurrency((s3Stats.monthly_downloads / 1073741824) * 0.09)}</td>
            </tr>
            <tr>
              <td>API Requests</td>
              <td>{s3Stats.requests_count.toLocaleString()}</td>
              <td>$0.0004/1K</td>
              <td class="text-end">{formatCurrency((s3Stats.requests_count / 1000) * 0.0004)}</td>
            </tr>
            <tr class="table-active">
              <td class="fw-bold">Total Estimated</td>
              <td></td>
              <td></td>
              <td class="text-end fw-bold">{formatCurrency(s3Stats.predicted_cost)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
