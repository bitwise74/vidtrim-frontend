import { w as push, S as head, T as maybe_selected, y as pop, U as current_component, Q as escape_html, V as attr_style, W as store_get, X as stringify, Y as unsubscribe_stores, Z as attr, _ as ensure_array_like } from './index2-Dgu0P2-C.js';
import './state.svelte-BPRzLwRl.js';
import { H as Header } from './Header-CvM3gj5P.js';
import { w as writable } from './index-Bc-wPjgp.js';

function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
const PUBLIC_BASE_URL = "http://localhost:8080";
const currentVideoURL = writable("");
const videos = writable([]);
const stats = writable({});
function StatBlocks($$payload, $$props) {
  push();
  var $$store_subs;
  function convertGB(b, point = 2) {
    return (b / 1e9).toFixed(point);
  }
  $$payload.out.push(`<div class="row g-4 mb-5"><div class="col-md-6 col-lg-3 d-flex"><div class="card border-0 shadow-sm h-100 w-100"><div class="card-body d-flex flex-column justify-content-between"><div class="d-flex align-items-center justify-content-between"><div><h6 class="text-muted mb-2">Total Videos</h6> <h3 class="mb-0">${escape_html(store_get($$store_subs ??= {}, "$stats", stats).uploadedFiles)}</h3></div> <i class="bi bi-file-earmark-play text-muted fs-2"></i></div></div></div></div> <div class="col-md-6 col-lg-3 d-flex"><div class="card border-0 shadow-sm h-100 w-100"><div class="card-body d-flex flex-column justify-content-between"><div class="d-flex align-items-center justify-content-between"><div class="w-100"><h6 class="text-muted mb-2">Storage Used</h6> <h3 class="mb-2">${escape_html(convertGB(store_get($$store_subs ??= {}, "$stats", stats).usedStorage))}/${escape_html(convertGB(store_get($$store_subs ??= {}, "$stats", stats).maxStorage, 0) + " GB")}</h3> <div class="progress mb-2" style="height: 8px;"><div class="progress-bar bg-dark"${attr_style(`width: ${stringify(store_get($$store_subs ??= {}, "$stats", stats).usedStorage / store_get($$store_subs ??= {}, "$stats", stats).maxStorage * 100)}%`)}></div></div></div> <i class="bi bi-hdd text-muted fs-2"></i></div></div></div></div> <div class="col-md-6 col-lg-3 d-flex"><div class="card border-0 shadow-sm h-100 w-100"><div class="card-body d-flex flex-column justify-content-between"><div class="d-flex align-items-center justify-content-between"><div><h6 class="text-muted mb-2">Total Views</h6> <h3 class="mb-0">${escape_html(store_get($$store_subs ??= {}, "$stats", stats).totalViews)}</h3></div> <i class="bi bi-eye text-muted fs-2"></i></div></div></div></div> <div class="col-md-6 col-lg-3 d-flex"><div class="card border-0 shadow-sm h-100 w-100"><div class="card-body d-flex flex-column justify-content-between"><div class="d-flex align-items-center justify-content-between"><div><h6 class="text-muted mb-2">Watch Time</h6> <h3 class="mb-0">${escape_html(store_get($$store_subs ??= {}, "$stats", stats).totalWatchTime)}</h3></div> <i class="bi bi-clock text-muted fs-2"></i></div></div></div></div></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function VideoDropdown($$payload, $$props) {
  push();
  $$payload.out.push(`<div class="dropdown"><button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown" aria-label="Options" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></button> <ul class="dropdown-menu"><li><button class="dropdown-item" aria-label="Play video"><i class="bi bi-play me-2"></i>Play</button></li> <li><button class="dropdown-item" aria-label="Edit video"><i class="bi bi-pencil me-2"></i>Edit</button></li> <li><button class="dropdown-item" aria-label="Download video"><i class="bi bi-download me-2"></i>Download</button></li> <li><button class="dropdown-item" aria-label="Share video"><i class="bi bi-share me-2"></i>Share</button></li> <li><button class="dropdown-item" aria-label="Copy video link"><i class="bi bi-link me-2"></i>Copy Link</button></li> <li><hr class="dropdown-divider"/></li> <li><button class="dropdown-item text-danger" aria-label="Delete video"><i class="bi bi-trash me-2"></i>Delete</button></li></ul></div>`);
  pop();
}
function VideoList($$payload, $$props) {
  push();
  var $$store_subs;
  function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    } else {
      return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
  }
  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  }
  function formatDate(unix) {
    const date = new Date(unix * 1e3);
    return date.toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
  }
  if (store_get($$store_subs ??= {}, "$currentVideoURL", currentVideoURL) !== "") {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="modal-backdrop show pt-0"></div> <div class="modal show d-block pt-0 d-flex" tabindex="-1"><div class="modal-dialog modal-xl py-0 align-content-center justify-content-center"><div class="modal-content"><video controls autoplay class="w-100" volume="50"${attr("src", store_get($$store_subs ??= {}, "$currentVideoURL", currentVideoURL))}><track kind="captions"/></video></div></div></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> `);
  if (store_get($$store_subs ??= {}, "$videos", videos).length === 0) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="text-center py-5"><div class="d-flex align-items-center justify-content-center rounded-circle bg-light mx-auto mb-4" style="width: 96px; height: 96px;"><i class="bi bi-file-earmark-play text-muted display-4"></i></div> <h4 class="fw-semibold mb-3">No videos yet</h4> <p class="text-muted mb-4">Upload your first video by drag and dropping it here or going to the editor</p> <a href="/editor" class="btn btn-dark">Open Editor</a></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$videos", videos));
    $$payload.out.push(`<!--[-->`);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let video = each_array[$$index];
      $$payload.out.push(`<div class="col-sm-6 col-lg-4 col-xl-3 mb-3"><div class="card d-flex flex-column h-100 border-0 shadow-sm card-hover svelte-2id5j"><div class="position-relative aspect-video bg-light overflow-hidden rounded-2">`);
      if (video.state == "processing") {
        $$payload.out.push("<!--[-->");
        $$payload.out.push(`<img src="placeholder.svg" class="w-100 h-100 object-fit-cover" alt="placeholder"/> <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center flex-column opacity-1 gap-1" style="background: rgba(0,0,0,0.3);"><i class="spinner-border text-white mt-3" role="status"></i> <p class="text-white">Processing...</p></div>`);
      } else {
        $$payload.out.push("<!--[!-->");
        $$payload.out.push(`<img${attr("src", `${PUBLIC_BASE_URL}/api/files/${video.id}?t=1`)}${attr("alt", video.name)} class="w-100 h-100" style="object-fit: contain;"/> <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0 hover-overlay svelte-2id5j" style="background: rgba(0,0,0,0.3);"><button class="btn bg-black btn-sm text-white" aria-label="Play video"><i class="bi bi-play-fill me-1"></i>Play</button></div> <div class="position-absolute bottom-0 end-0 m-2"><span class="badge bg-black bg-opacity-75">${escape_html(formatDuration(video.duration))}</span></div>`);
      }
      $$payload.out.push(`<!--]--></div> <div class="card-body p-3"><div class="d-flex align-items-start justify-content-between mb-2"><h6 class="card-title mb-0 line-clamp-2 flex-grow-1 overflow-hidden pe-2">${escape_html(video.name)}</h6> `);
      VideoDropdown($$payload, { videoID: video.id });
      $$payload.out.push(`<!----></div> <div class="d-flex align-items-center justify-content-between small text-muted mb-2"><span>${escape_html(formatDate(video.created_at))}</span> <span class="badge bg-dark p-2">${escape_html(video.format.toUpperCase().slice(6))}</span></div> <div class="d-flex align-items-center justify-content-between small text-muted"><span>${escape_html(formatSize(video.size))}</span> <span>${escape_html(video.views)} views</span></div></div></div></div>`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]-->`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload, $$props) {
  push();
  let perPage = "10";
  let sortBy = "newest";
  let timeout;
  onDestroy(() => {
    clearTimeout(timeout);
  });
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Dashboard - vid.sh</title>`;
  });
  $$payload.out.push(`<div class="min-vh-100 bg-light position-relative"><div class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-none justify-content-center align-items-center z-3" id="dropOverlay"><div class="border border-3 border-dashed border-light rounded-4 p-5 text-center"><i class="bi bi-cloud-upload text-light display-1 mb-3"></i> <h3 class="text-light fw-semibold">Drop files to upload</h3></div></div> `);
  Header($$payload, { title: "Dashboard", page: "dashboard" });
  $$payload.out.push(`<!----> <main class="container py-4">`);
  {
    $$payload.out.push("<!--[!-->");
    StatBlocks($$payload);
    $$payload.out.push(`<!----> <div class="row g-3 mb-4"><div class="col-lg-8 col-md-7"><div class="input-group"><span class="input-group-text"><i class="bi bi-search"></i></span> <input type="text" class="form-control" placeholder="Search videos..."/></div></div> <div class="col-lg-3 col-md-3 col-sm-6"><select class="form-select">`);
    $$payload.select_value = sortBy;
    $$payload.out.push(`<option value="newest"${maybe_selected($$payload, "newest")}>Newest First</option><option value="oldest"${maybe_selected($$payload, "oldest")}>Oldest First</option><option value="az"${maybe_selected($$payload, "az")}>Name A-Z</option><option value="size"${maybe_selected($$payload, "size")}>Size</option><option value="views"${maybe_selected($$payload, "views")}>Most Views</option>`);
    $$payload.select_value = void 0;
    $$payload.out.push(`</select></div> <div class="col-lg-1 col-md-2 col-sm-6"><select class="form-select" disabled placeholder="Results per page">`);
    $$payload.select_value = perPage;
    $$payload.out.push(`<option value="10"${maybe_selected($$payload, "10")} selected>10</option><option value="20"${maybe_selected($$payload, "20")}>20</option><option value="50"${maybe_selected($$payload, "50")}>50</option><option value="100"${maybe_selected($$payload, "100")}>100</option><option value="250"${maybe_selected($$payload, "250")}>250</option>`);
    $$payload.select_value = void 0;
    $$payload.out.push(`</select></div></div> <div class="row">`);
    VideoList($$payload);
    $$payload.out.push(`<!----></div>`);
  }
  $$payload.out.push(`<!--]--> <div></div></main></div>`);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-MpbzVrCq.js.map
