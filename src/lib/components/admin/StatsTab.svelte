<script>
  
  let systemStats = $state({
    total_users: 15420,
    active_users_24h: 3240,
    total_videos: 89650,
    videos_uploaded_today: 156,
    error_rate: 0.02, // 2%
    uptime: 99.97,
    total_data_transferred: 5497558138880, // 5TB
    avg_response_time: 245, // ms
    failed_uploads: 23,
    successful_uploads: 1456
  });
  
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  function formatPercentage(value) {
    return (value * 100).toFixed(2) + '%';
  }
  
  function getUptimeColor(uptime) {
    if (uptime >= 99.9) return 'success';
    if (uptime >= 99.0) return 'warning';
    return 'danger';
  }
  
  function getErrorRateColor(errorRate) {
    if (errorRate <= 0.01) return 'success';
    if (errorRate <= 0.05) return 'warning';
    return 'danger';
  }
  
  function getResponseTimeColor(responseTime) {
    if (responseTime <= 200) return 'success';
    if (responseTime <= 500) return 'warning';
    return 'danger';
  }
</script>

<div>
  <div class="mb-4">
    <h4 class="mb-1">System Statistics</h4>
    <p class="text-muted mb-0">Monitor system performance, usage metrics, and health indicators</p>
  </div>
  
  <!-- Key Metrics -->
  <div class="row g-4 mb-5">
    <div class="col-md-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <div class="display-6 fw-bold text-primary mb-2">{systemStats.total_users.toLocaleString()}</div>
          <h6 class="text-muted mb-1">Total Users</h6>
          <small class="text-success">
            <i class="bi bi-arrow-up me-1"></i>
            +{systemStats.active_users_24h.toLocaleString()} active (24h)
          </small>
        </div>
      </div>
    </div>
    
    <div class="col-md-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <div class="display-6 fw-bold text-info mb-2">{systemStats.total_videos.toLocaleString()}</div>
          <h6 class="text-muted mb-1">Total Videos</h6>
          <small class="text-info">
            <i class="bi bi-plus me-1"></i>
            +{systemStats.videos_uploaded_today} today
          </small>
        </div>
      </div>
    </div>
    
    <div class="col-md-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <div class="display-6 fw-bold text-{getUptimeColor(systemStats.uptime)} mb-2">{systemStats.uptime}%</div>
          <h6 class="text-muted mb-1">System Uptime</h6>
          <small class="text-muted">Last 30 days</small>
        </div>
      </div>
    </div>
    
    <div class="col-md-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <div class="display-6 fw-bold text-warning mb-2">{formatFileSize(systemStats.total_data_transferred)}</div>
          <h6 class="text-muted mb-1">Data Transferred</h6>
          <small class="text-muted">This month</small>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Performance Metrics -->
  <div class="row g-4 mb-5">
    <div class="col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-bottom">
          <h6 class="mb-0 fw-semibold">Performance Metrics</h6>
        </div>
        <div class="card-body">
          <div class="row g-4">
            <div class="col-6">
              <div class="text-center">
                <div class="display-6 fw-bold text-{getErrorRateColor(systemStats.error_rate)} mb-2">
                  {formatPercentage(systemStats.error_rate)}
                </div>
                <h6 class="text-muted mb-0">Error Rate</h6>
                <small class="text-{getErrorRateColor(systemStats.error_rate)}">
                  {systemStats.error_rate <= 0.01 ? 'Excellent' : systemStats.error_rate <= 0.05 ? 'Good' : 'Needs Attention'}
                </small>
              </div>
            </div>
            <div class="col-6">
              <div class="text-center">
                <div class="display-6 fw-bold text-{getResponseTimeColor(systemStats.avg_response_time)} mb-2">
                  {systemStats.avg_response_time}ms
                </div>
                <h6 class="text-muted mb-0">Avg Response Time</h6>
                <small class="text-{getResponseTimeColor(systemStats.avg_response_time)}">
                  {systemStats.avg_response_time <= 200 ? 'Fast' : systemStats.avg_response_time <= 500 ? 'Moderate' : 'Slow'}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-bottom">
          <h6 class="mb-0 fw-semibold">Upload Statistics (Today)</h6>
        </div>
        <div class="card-body">
          <div class="row g-4">
            <div class="col-6">
              <div class="text-center">
                <div class="display-6 fw-bold text-success mb-2">{systemStats.successful_uploads}</div>
                <h6 class="text-muted mb-0">Successful</h6>
                <small class="text-success">
                  {((systemStats.successful_uploads / (systemStats.successful_uploads + systemStats.failed_uploads)) * 100).toFixed(1)}% success rate
                </small>
              </div>
            </div>
            <div class="col-6">
              <div class="text-center">
                <div class="display-6 fw-bold text-danger mb-2">{systemStats.failed_uploads}</div>
                <h6 class="text-muted mb-0">Failed</h6>
                <small class="text-danger">
                  {((systemStats.failed_uploads / (systemStats.successful_uploads + systemStats.failed_uploads)) * 100).toFixed(1)}% failure rate
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Detailed Statistics -->
  <div class="row g-4">
    <div class="col-md-8">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-bottom">
          <h6 class="mb-0 fw-semibold">System Health Overview</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Current Value</th>
                  <th>Status</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>System Uptime</td>
                  <td>{systemStats.uptime}%</td>
                  <td>
                    <span class="badge bg-{getUptimeColor(systemStats.uptime)}">
                      {systemStats.uptime >= 99.9 ? 'Excellent' : systemStats.uptime >= 99.0 ? 'Good' : 'Poor'}
                    </span>
                  </td>
                  <td class="text-success">
                    <i class="bi bi-arrow-up"></i> +0.02%
                  </td>
                </tr>
                <tr>
                  <td>Error Rate</td>
                  <td>{formatPercentage(systemStats.error_rate)}</td>
                  <td>
                    <span class="badge bg-{getErrorRateColor(systemStats.error_rate)}">
                      {systemStats.error_rate <= 0.01 ? 'Excellent' : systemStats.error_rate <= 0.05 ? 'Good' : 'Poor'}
                    </span>
                  </td>
                  <td class="text-success">
                    <i class="bi bi-arrow-down"></i> -0.01%
                  </td>
                </tr>
                <tr>
                  <td>Response Time</td>
                  <td>{systemStats.avg_response_time}ms</td>
                  <td>
                    <span class="badge bg-{getResponseTimeColor(systemStats.avg_response_time)}">
                      {systemStats.avg_response_time <= 200 ? 'Fast' : systemStats.avg_response_time <= 500 ? 'Moderate' : 'Slow'}
                    </span>
                  </td>
                  <td class="text-warning">
                    <i class="bi bi-arrow-up"></i> +15ms
                  </td>
                </tr>
                <tr>
                  <td>Active Users (24h)</td>
                  <td>{systemStats.active_users_24h.toLocaleString()}</td>
                  <td>
                    <span class="badge bg-success">High</span>
                  </td>
                  <td class="text-success">
                    <i class="bi bi-arrow-up"></i> +8%
                  </td>
                </tr>
                <tr>
                  <td>Data Transfer</td>
                  <td>{formatFileSize(systemStats.total_data_transferred)}</td>
                  <td>
                    <span class="badge bg-info">Normal</span>
                  </td>
                  <td class="text-info">
                    <i class="bi bi-arrow-up"></i> +12%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-4">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-bottom">
          <h6 class="mb-0 fw-semibold">Quick Actions</h6>
        </div>
        <div class="card-body">
          <div class="d-grid gap-2">
            <button class="btn btn-outline-primary btn-sm">
              <i class="bi bi-download me-2"></i>
              Export System Logs
            </button>
            <button class="btn btn-outline-info btn-sm">
              <i class="bi bi-graph-up me-2"></i>
              View Detailed Analytics
            </button>
            <button class="btn btn-outline-warning btn-sm">
              <i class="bi bi-exclamation-triangle me-2"></i>
              System Health Check
            </button>
            <button class="btn btn-outline-success btn-sm">
              <i class="bi bi-arrow-clockwise me-2"></i>
              Refresh Metrics
            </button>
          </div>
        </div>
      </div>
      
      <div class="card border-0 shadow-sm mt-4">
        <div class="card-header bg-white border-bottom">
          <h6 class="mb-0 fw-semibold">System Alerts</h6>
        </div>
        <div class="card-body">
          <div class="alert alert-warning alert-sm mb-2">
            <i class="bi bi-exclamation-triangle me-2"></i>
            <small>High memory usage detected on server-02</small>
          </div>
          <div class="alert alert-info alert-sm mb-0">
            <i class="bi bi-info-circle me-2"></i>
            <small>Scheduled maintenance in 2 days</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
