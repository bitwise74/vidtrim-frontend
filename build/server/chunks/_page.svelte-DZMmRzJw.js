import { S as head, w as push, W as store_get, Q as escape_html, Z as attr, a1 as attr_class, X as stringify, Y as unsubscribe_stores, y as pop } from './index2-Dgu0P2-C.js';
import { H as Header } from './Header-CvM3gj5P.js';
import { w as writable } from './index-Bc-wPjgp.js';
import './state.svelte-BPRzLwRl.js';

function LoginForm($$payload, $$props) {
  push();
  var $$store_subs;
  const showPassword = writable(false);
  const isLoading = writable(false);
  const error = writable();
  const formData = writable({ email: "", password: "" });
  $$payload.out.push(`<div class="card shadow-lg border-0" style="max-width: 28rem; margin: 0 auto;"><div class="card-header bg-white text-center border-0 py-4"><h2 class="card-title h3 fw-bold mb-2">Welcome back</h2> <p class="text-muted-foreground mb-0">Sign in to your vid.sh account to continue editing</p></div> <div class="card-body p-4"><form>`);
  if (store_get($$store_subs ??= {}, "$error", error)) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="alert alert-danger" role="alert">${escape_html(store_get($$store_subs ??= {}, "$error", error))}</div>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <div class="mb-3"><label for="email" class="form-label">Email</label> <div class="input-group"><span class="input-group-text"><i class="bi bi-envelope text-muted"></i></span> <input type="email" class="form-control" id="email" placeholder="Enter your email"${attr("value", store_get($$store_subs ??= {}, "$formData", formData).email)}/></div></div> <div class="mb-3"><label for="password" class="form-label">Password</label> <div class="input-group"><span class="input-group-text"><i class="bi bi-lock text-muted"></i></span> <input${attr("type", store_get($$store_subs ??= {}, "$showPassword", showPassword) ? "text" : "password")} class="form-control" id="password" placeholder="Enter your password"${attr("value", store_get($$store_subs ??= {}, "$formData", formData).password)} required/> <button type="button" class="btn btn-outline-secondary" aria-label="Toggle password visibility"><i${attr_class(`bi bi-eye${stringify(store_get($$store_subs ??= {}, "$showPassword", showPassword) ? "-slash" : "")}`)}></i></button></div></div> <div class="d-flex justify-content-between align-items-center mb-4"><div class="form-check"><input class="form-check-input" type="checkbox" id="remember"/> <label class="form-check-label small" for="remember">Remember me</label></div> <a href="/forgot-password" class="small text-decoration-none">Forgot password?</a></div> <button type="submit" class="btn btn-gradient w-100 mb-4"${attr("disabled", store_get($$store_subs ??= {}, "$isLoading", isLoading), true)}>`);
  if (store_get($$store_subs ??= {}, "$isLoading", isLoading)) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<span class="spinner-border spinner-border-sm me-2" role="status"></span> Signing in...`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`Sign In`);
  }
  $$payload.out.push(`<!--]--></button> <div class="text-center mb-4"><div class="position-relative"><hr/> <span class="position-absolute top-50 start-50 translate-middle bg-white px-3 small text-muted">Or continue with (coming soon)</span></div></div> <div class="row g-2 mb-4"><div class="col-6"><button type="button" class="btn btn-outline-secondary w-100" aria-label="Sign in with Google" disabled><i class="bi bi-google me-1"></i> Google</button></div> <div class="col-6"><button type="button" class="btn btn-outline-secondary w-100" aria-label="Sign in with GitHub" disabled><i class="bi bi-github me-1"></i> GitHub</button></div></div></form> <div class="text-center"><span class="text-muted-foreground">Don't have an account?</span> <a href="/register" class="text-decoration-none fw-medium">Sign up</a></div></div></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Sign In - vid.sh</title>`;
  });
  $$payload.out.push(`<div class="min-vh-100 gradient-bg">`);
  Header($$payload, { page: "login" });
  $$payload.out.push(`<!----> <main class="container py-5"><div class="row justify-content-center align-items-center" style="min-height: calc(100vh - 200px);"><div class="col-lg-10"><div class="row align-items-center g-5">`);
  LoginForm($$payload);
  $$payload.out.push(`<!----></div></div></div></main></div>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DZMmRzJw.js.map
