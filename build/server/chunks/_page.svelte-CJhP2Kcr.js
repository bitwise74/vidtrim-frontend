import { w as push, S as head, y as pop, $ as fallback, a0 as bind_props, a1 as attr_class, X as stringify } from './index2-Dgu0P2-C.js';
import './state.svelte-BPRzLwRl.js';
import { H as Header } from './Header-CvM3gj5P.js';

function VideoUpload($$payload, $$props) {
  push();
  {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<label for="video-upload"${attr_class(`card border-2 border-dashed ${stringify("border-secondary")}`)} style="cursor: pointer; transition: all 0.3s ease;" aria-label="Upload your video"><div class="card-body p-5 text-center"><i class="bi bi-cloud-upload text-secondary display-4 mb-4"></i> <h5 class="fw-semibold mb-3">Upload your video</h5> <p class="text-muted-foreground mb-4">Drag and drop your video file here, or click to browse</p> <input type="file" accept="video/*" class="d-none" id="video-upload"/> <div class="btn btn-gradient mt-2">Choose File</div> <p class="small text-muted mt-3">MP4 up to 2GB</p></div></label>`);
  }
  $$payload.out.push(`<!--]-->`);
  pop();
}
function Turnstile($$payload, $$props) {
  push();
  let loaded = typeof window != "undefined" && "turnstile" in window;
  let widgetId = fallback($$props["widgetId"], null);
  let turnstile = fallback($$props["turnstile"], null);
  let siteKey = $$props["siteKey"];
  let appearance = fallback($$props["appearance"], "always");
  let language = fallback($$props["language"], "auto");
  let execution = fallback($$props["execution"], "render");
  let action = fallback($$props["action"], () => void 0, true);
  let cData = fallback($$props["cData"], () => void 0, true);
  let retryInterval = fallback($$props["retryInterval"], 8e3);
  let retry = fallback($$props["retry"], "auto");
  let refreshExpired = fallback($$props["refreshExpired"], "auto");
  let theme = fallback($$props["theme"], "auto");
  let size = fallback($$props["size"], "normal");
  let tabIndex = fallback($$props["tabIndex"], 0);
  let forms = fallback($$props["forms"], () => void 0, true);
  let responseField = fallback($$props["responseField"], () => void 0, true);
  let formsField = fallback($$props["formsField"], () => void 0, true);
  let responseFieldName = fallback($$props["responseFieldName"], () => void 0, true);
  let _class = fallback($$props["class"], () => void 0, true);
  const reset = () => {
    widgetId && window?.turnstile?.reset(widgetId);
  };
  turnstile = loaded && window.turnstile || null;
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]-->`);
  bind_props($$props, {
    widgetId,
    turnstile,
    siteKey,
    appearance,
    language,
    execution,
    action,
    cData,
    retryInterval,
    retry,
    refreshExpired,
    theme,
    size,
    tabIndex,
    forms,
    responseField,
    formsField,
    responseFieldName,
    class: _class,
    reset
  });
  pop();
}
function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Video Editor - vid.sh</title>`;
  });
  $$payload.out.push(`<div class="min-vh-100 bg-light">`);
  Header($$payload, { title: "Editor", page: "editor" });
  $$payload.out.push(`<!----> `);
  Turnstile($$payload, {
    siteKey: "0x4AAAAAABkH5R_4hvXLiZqn",
    appearance: "interaction-only"
  });
  $$payload.out.push(`<!----> <main class="container py-4"><div class="row g-4">`);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> `);
  {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<div class="col-lg-12"></div> <div class="mb-4">`);
    VideoUpload($$payload);
    $$payload.out.push(`<!----></div>`);
  }
  $$payload.out.push(`<!--]--> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></main></div>`);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CJhP2Kcr.js.map
