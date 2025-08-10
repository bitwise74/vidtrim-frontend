import { w as push, Q as escape_html, y as pop } from './index2-Dgu0P2-C.js';
import './state.svelte-BPRzLwRl.js';

function Header($$payload, $$props) {
  push();
  let { page = "", title = "" } = $$props;
  $$payload.out.push(`<header class="border-bottom bg-white-95 sticky-top-custom"><div class="container"><div class="d-flex align-items-center justify-content-between py-3"><div class="d-flex align-items-center"><a href="/" class="d-flex align-items-center text-decoration-none me-3"><div class="d-flex align-items-center justify-content-center rounded-2 bg-dark me-2" style="width: 32px; height: 32px;"><i class="bi bi-play-fill text-white"></i></div> <span class="fs-4 fw-bold text-dark">vid.sh</span></a> `);
  if (title) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="vr me-3"></div> <h1 class="fs-5 fw-semibold mb-0">${escape_html(title)}</h1>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> `);
  if (page === "main") {
    $$payload.out.push("<!--[-->");
    {
      $$payload.out.push("<!--[!-->");
      $$payload.out.push(`<div class="d-flex align-items-center gap-2"><button class="btn btn-outline-dark btn-sm">Log In</button> <a href="/register" class="btn btn-dark btn-sm">Sign Up</a></div>`);
    }
    $$payload.out.push(`<!--]-->`);
  } else {
    $$payload.out.push("<!--[!-->");
    if (page === "register" || page === "login") {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div class="d-flex align-items-center gap-2"><a href="/" class="btn btn-dark btn-sm"><i class="bi bi-arrow-left me-1"></i> Go back</a></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
      if (page === "dashboard") {
        $$payload.out.push("<!--[-->");
        $$payload.out.push(`<div class="d-flex align-items-center gap-2"><a href="/editor" class="btn btn-dark btn-sm"><i class="bi bi-pencil me-1"></i> Editor</a></div>`);
      } else {
        $$payload.out.push("<!--[!-->");
        if (page === "editor") {
          $$payload.out.push("<!--[-->");
          $$payload.out.push(`<div class="d-flex align-items-center gap-2"><a href="/dashboard" class="btn btn-dark btn-sm"><i class="bi bi-view-stacked me-1"></i> Dashboard</a></div>`);
        } else {
          $$payload.out.push("<!--[!-->");
        }
        $$payload.out.push(`<!--]-->`);
      }
      $$payload.out.push(`<!--]-->`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></div></div></header>`);
  pop();
}

export { Header as H };
//# sourceMappingURL=Header-CvM3gj5P.js.map
