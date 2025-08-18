<script lang="ts">
  import Toast from './Toast.svelte'
  import { toastStore } from './toastStore'

  let toasts = $derived($toastStore);
</script>

<div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 9999;">
  {#each toasts as toast (toast.id)}
    <Toast dismiss={() => {toastStore.remove(toast.id)}} toast={toast}/>
  {/each}
</div>
