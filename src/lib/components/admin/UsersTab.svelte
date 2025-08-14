<script>
  import { preventDefault } from 'svelte/legacy'

  let users = $state([
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      created_at: 1704067200,
      last_login: 1705276800,
      storage_used: 2147483648, // 2GB
      storage_limit: 10737418240, // 10GB
      video_count: 15,
      total_views: 5420,
      status: 'active',
      role: 'user'
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      created_at: 1703980800,
      last_login: 1705190400,
      storage_used: 5368709120, // 5GB
      storage_limit: 21474836480, // 20GB
      video_count: 32,
      total_views: 12840,
      status: 'active',
      role: 'user'
    },
    {
      id: 3,
      email: 'admin@vidsh.com',
      name: 'Admin User',
      created_at: 1703894400,
      last_login: 1705363200,
      storage_used: 1073741824, // 1GB
      storage_limit: 107374182400, // 100GB
      video_count: 8,
      total_views: 2150,
      status: 'active',
      role: 'admin'
    },
    {
      id: 4,
      email: 'banned.user@example.com',
      name: 'Banned User',
      created_at: 1703808000,
      last_login: 1704412800,
      storage_used: 536870912, // 512MB
      storage_limit: 5368709120, // 5GB
      video_count: 3,
      total_views: 150,
      status: 'banned',
      role: 'user'
    }
  ]);
  
  let searchQuery = $state('');
  let statusFilter = $state('all');
  let roleFilter = $state('all');
  let showCreateModal = $state(false);
  let showEditModal = $state(false);
  let selectedUser = $state(null);
  let sortBy = $state('created_at');
  let sortOrder = $state('desc');
  
  let newUser = $state({
    email: '',
    name: '',
    storage_limit: 10737418240, // 10GB default
    role: 'user'
  });
  
  let editUser = $state({
    storage_limit: 0,
    status: 'active',
    role: 'user'
  });
  
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  function formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  function getStatusColor(status) {
    switch (status) {
      case 'active': return 'success';
      case 'banned': return 'danger';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  }
  
  function getRoleColor(role) {
    return role === 'admin' ? 'primary' : 'secondary';
  }
  
  function getStoragePercentage(used, limit) {
    return Math.round((used / limit) * 100);
  }
  
  function openCreateModal() {
    newUser = {
      email: '',
      name: '',
      storage_limit: 10737418240,
      role: 'user'
    };
    showCreateModal = true;
  }
  
  function closeCreateModal() {
    showCreateModal = false;
  }
  
  function openEditModal(user) {
    selectedUser = user;
    editUser = {
      storage_limit: user.storage_limit,
      status: user.status,
      role: user.role
    };
    showEditModal = true;
  }
  
  function closeEditModal() {
    showEditModal = false;
    selectedUser = null;
  }
  
  function handleCreateUser() {
    const user = {
      id: Math.max(...users.map(u => u.id)) + 1,
      email: newUser.email,
      name: newUser.name,
      created_at: Math.floor(Date.now() / 1000),
      last_login: 0,
      storage_used: 0,
      storage_limit: newUser.storage_limit,
      video_count: 0,
      total_views: 0,
      status: 'active',
      role: newUser.role
    };
    
    users = [user, ...users];
    closeCreateModal();
  }
  
  function handleUpdateUser() {
    if (!selectedUser) return;
    
    users = users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, ...editUser }
        : user
    );
    
    closeEditModal();
  }
  
  function handleBanUser(userId) {
    if (confirm('Are you sure you want to ban this user?')) {
      users = users.map(user => 
        user.id === userId 
          ? { ...user, status: 'banned' }
          : user
      );
    }
  }
  
  function handleUnbanUser(userId) {
    users = users.map(user => 
      user.id === userId 
        ? { ...user, status: 'active' }
        : user
    );
  }
  
  function handleDeleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      users = users.filter(user => user.id !== userId);
    }
  }
  
  function sortUsers(field) {
    if (sortBy === field) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = field;
      sortOrder = 'desc';
    }
  }
  
  let filteredUsers = $derived(users);
  
  // Search filter
  if (searchQuery) {
    filteredUsers = filteredUsers.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Status filter
  if (statusFilter !== 'all') {
    filteredUsers = filteredUsers.filter(user => user.status === statusFilter);
  }
  
  // Role filter
  if (roleFilter !== 'all') {
    filteredUsers = filteredUsers.filter(user => user.role === roleFilter);
  }
  
  // Sort
  filteredUsers.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
</script>

<div>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h4 class="mb-1">User Management</h4>
      <p class="text-muted mb-0">Manage user accounts, permissions, and storage limits</p>
    </div>
    <button class="btn btn-primary" onclick={openCreateModal} aria-label="Create User">
      <i class="bi bi-plus me-2"></i>
      Create User
    </button>
  </div>
  
  <!-- Filters -->
  <div class="row g-3 mb-4">
    <div class="col-md-4">
      <div class="input-group">
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Search users..."
          bind:value={searchQuery}
        />
      </div>
    </div>
    <div class="col-md-2">
      <select class="form-select" bind:value={statusFilter}>
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="banned">Banned</option>
        <option value="pending">Pending</option>
      </select>
    </div>
    <div class="col-md-2">
      <select class="form-select" bind:value={roleFilter}>
        <option value="all">All Roles</option>
        <option value="user">Users</option>
        <option value="admin">Admins</option>
      </select>
    </div>
    <div class="col-md-4 text-end">
      <span class="text-muted small">
        Showing {filteredUsers.length} of {users.length} users
      </span>
    </div>
  </div>
  
  <!-- Users Table -->
  <div class="card border-0 shadow-sm">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead class="table-light">
          <tr>
            <th scope="col" class="border-0">
              <button class="btn btn-link p-0 text-decoration-none text-dark fw-semibold" onclick={() => sortUsers('name')} aria-label="Sort by Name">
                User
                {#if sortBy === 'name'}
                  <i class="bi bi-chevron-{sortOrder === 'asc' ? 'up' : 'down'} ms-1"></i>
                {/if}
              </button>
            </th>
            <th scope="col" class="border-0">
              <button class="btn btn-link p-0 text-decoration-none text-dark fw-semibold" onclick={() => sortUsers('created_at')} aria-label="Sort by Created Date">
                Created
                {#if sortBy === 'created_at'}
                  <i class="bi bi-chevron-{sortOrder === 'asc' ? 'up' : 'down'} ms-1"></i>
                {/if}
              </button>
            </th>
            <th scope="col" class="border-0">Storage Usage</th>
            <th scope="col" class="border-0">
              <button class="btn btn-link p-0 text-decoration-none text-dark fw-semibold" onclick={() => sortUsers('video_count')} aria-label="Sort by Video Count">
                Videos
                {#if sortBy === 'video_count'}
                  <i class="bi bi-chevron-{sortOrder === 'asc' ? 'up' : 'down'} ms-1"></i>
                {/if}
              </button>
            </th>
            <th scope="col" class="border-0">Status</th>
            <th scope="col" class="border-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredUsers as user}
            <tr>
              <td class="border-0">
                <div class="d-flex align-items-center">
                  <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-semibold me-3"
                       style="width: 40px; height: 40px;">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div class="fw-medium">{user.name}</div>
                    <div class="small text-muted">{user.email}</div>
                    <span class="badge bg-{getRoleColor(user.role)} badge-sm">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>
                </div>
              </td>
              <td class="border-0">
                <div class="small">
                  <div>{formatDate(user.created_at)}</div>
                  {#if user.last_login > 0}
                    <div class="text-muted">Last: {formatDate(user.last_login)}</div>
                  {:else}
                    <div class="text-muted">Never logged in</div>
                  {/if}
                </div>
              </td>
              <td class="border-0">
                <div class="small">
                  <div>{formatFileSize(user.storage_used)} / {formatFileSize(user.storage_limit)}</div>
                  <div class="progress mt-1" style="height: 4px;">
                    <div class="progress-bar" style="width: {getStoragePercentage(user.storage_used, user.storage_limit)}%"></div>
                  </div>
                  <div class="text-muted">{getStoragePercentage(user.storage_used, user.storage_limit)}% used</div>
                </div>
              </td>
              <td class="border-0">
                <div class="small">
                  <div class="fw-medium">{user.video_count}</div>
                  <div class="text-muted">{user.total_views.toLocaleString()} views</div>
                </div>
              </td>
              <td class="border-0">
                <span class="badge bg-{getStatusColor(user.status)}">
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </td>
              <td class="border-0">
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" onclick={() => openEditModal(user)} aria-label="Edit User">
                        <i class="bi bi-pencil me-2"></i>Edit
                      </button>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    {#if user.status === 'active'}
                      <li>
                        <button class="dropdown-item text-warning" onclick={() => handleBanUser(user.id)} aria-label="Ban User">
                          <i class="bi bi-ban me-2"></i>Ban User
                        </button>
                      </li>
                    {:else if user.status === 'banned'}
                      <li>
                        <button class="dropdown-item text-success" onclick={() => handleUnbanUser(user.id)} aria-label="Unban User">
                          <i class="bi bi-check-circle me-2"></i>Unban User
                        </button>
                      </li>
                    {/if}
                    <li>
                      <button class="dropdown-item text-danger" onclick={() => handleDeleteUser(user.id)} aria-label="Delete User">
                        <i class="bi bi-trash me-2"></i>Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Create User Modal -->
{#if showCreateModal}
  <div class="modal show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create New User</h5>
          <button type="button" class="btn-close" onclick={closeCreateModal} aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form onsubmit={preventDefault(handleCreateUser)}>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" bind:value={newUser.email} required />
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Full Name</label>
              <input type="text" class="form-control" id="name" bind:value={newUser.name} required />
            </div>
            <div class="mb-3">
              <label for="storage_limit" class="form-label">Storage Limit</label>
              <select class="form-select" id="storage_limit" bind:value={newUser.storage_limit}>
                <option value={5368709120}>5 GB</option>
                <option value={10737418240}>10 GB</option>
                <option value={21474836480}>20 GB</option>
                <option value={53687091200}>50 GB</option>
                <option value={107374182400}>100 GB</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="role" class="form-label">Role</label>
              <select class="form-select" id="role" bind:value={newUser.role}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick={closeCreateModal} aria-label="Cancel">Cancel</button>
          <button type="button" class="btn btn-primary" onclick={handleCreateUser} aria-label="Create User">Create User</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Edit User Modal -->
{#if showEditModal && selectedUser}
  <div class="modal show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit User: {selectedUser.name}</h5>
          <button type="button" class="btn-close" onclick={closeEditModal} aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form onsubmit={preventDefault(handleUpdateUser)}>
            <div class="mb-3">
              <label for="edit_storage_limit" class="form-label">Storage Limit</label>
              <select class="form-select" id="edit_storage_limit" bind:value={editUser.storage_limit}>
                <option value={5368709120}>5 GB</option>
                <option value={10737418240}>10 GB</option>
                <option value={21474836480}>20 GB</option>
                <option value={53687091200}>50 GB</option>
                <option value={107374182400}>100 GB</option>
                <option value={1073741824000}>1 TB</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="edit_status" class="form-label">Status</label>
              <select class="form-select" id="edit_status" bind:value={editUser.status}>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="edit_role" class="form-label">Role</label>
              <select class="form-select" id="edit_role" bind:value={editUser.role}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick={closeEditModal} aria-label="Cancel">Cancel</button>
          <button type="button" class="btn btn-primary" onclick={handleUpdateUser} aria-label="Update User">Update User</button>
        </div>
      </div>
    </div>
  </div>
{/if}
