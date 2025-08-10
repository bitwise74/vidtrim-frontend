import { S as head, w as push, Z as attr, a1 as attr_class, y as pop, X as stringify } from './index2-Dgu0P2-C.js';
import { H as Header } from './Header-CvM3gj5P.js';
import './state.svelte-BPRzLwRl.js';

/* empty css                  */
function RegisterForm($$payload, $$props) {
  push();
  let formData = {
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  };
  function validatePassword(password) {
    const minLength = password.length >= 8;
    return { minLength, isValid: minLength };
  }
  let passwordValidation = validatePassword(formData.password);
  {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<div class="card shadow-lg border-0" style="max-width: 28rem; margin: 0 auto;"><div class="card-header bg-white text-center border-0 py-4"><h2 class="card-title h3 fw-bold mb-2">Create your account</h2> <p class="text-muted-foreground mb-0">Provide your details in the form</p></div> <div class="card-body p-4"><form>`);
    {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--> <div class="mb-3"><label for="email" class="form-label">Email</label> <div class="input-group"><span class="input-group-text"><i class="bi bi-envelope text-muted"></i></span> <input type="email" class="form-control" id="email" placeholder="john@example.com"${attr("value", formData.email)} required/></div></div> <div class="mb-3"><label for="password" class="form-label">Password</label> <div class="input-group"><span class="input-group-text"><i class="bi bi-lock text-muted"></i></span> <input${attr("type", "password")} class="form-control" id="password" placeholder="Create a strong password"${attr("value", formData.password)} required/> <button type="button" class="btn btn-outline-secondary" aria-label="Toggle password visibility"><i${attr_class(`bi bi-eye${stringify("")}`)}></i></button></div> `);
    {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div> <div class="mb-3"><label for="confirmPassword" class="form-label">Confirm Password</label> <div class="input-group"><span class="input-group-text"><i class="bi bi-lock text-muted"></i></span> <input${attr("type", "password")} class="form-control" id="confirmPassword" placeholder="Confirm your password"${attr("value", formData.confirmPassword)} required/> <button type="button" class="btn btn-outline-secondary" aria-label="Toggle confirm password visibility"><i${attr_class(`bi bi-eye${stringify("")}`)}></i></button></div> `);
    {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div> <div class="mb-4"><div class="form-check mb-3"><input class="form-check-input" type="checkbox" id="agreeToTerms"${attr("checked", formData.agreeToTerms, true)}/> <label class="form-check-label small" for="agreeToTerms">I agree to the <a href="/terms" class="text-decoration-none">Terms of Service</a> and <a href="/privacy" class="text-decoration-none">Privacy Policy</a></label></div></div> <button type="submit" class="btn btn-gradient w-100 mb-4"${attr("disabled", !passwordValidation.isValid, true)}>`);
    {
      $$payload.out.push("<!--[!-->");
      $$payload.out.push(`Create Account`);
    }
    $$payload.out.push(`<!--]--></button> <div class="text-center mb-4"><div class="position-relative"><hr/> <span class="position-absolute top-50 start-50 translate-middle bg-white px-3 small text-muted">Or continue with</span></div></div> <div class="row g-2 mb-4"><div class="col-6"><button type="button" class="btn btn-outline-secondary w-100" aria-label="Sign in with Google"><i class="bi bi-google me-1"></i> Google</button></div> <div class="col-6"><button type="button" class="btn btn-outline-secondary w-100" aria-label="Sign in with GitHub"><i class="bi bi-github me-1"></i> GitHub</button></div></div></form> <div class="text-center"><span class="text-muted-foreground">Already have an account?</span> <a href="/login" class="text-decoration-none fw-medium" aria-label="Sign in">Sign in</a></div></div></div>`);
  }
  $$payload.out.push(`<!--]-->`);
  pop();
}
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Create Account - vid.sh</title>`;
  });
  $$payload.out.push(`<div class="min-vh-100 gradient-bg">`);
  Header($$payload, { page: "register" });
  $$payload.out.push(`<!----> <main class="container py-5"><div class="row justify-content-center align-items-center" style="min-height: calc(100vh - 200px);"><div class="col-lg-10"><div class="row align-items-center g-5">`);
  RegisterForm($$payload);
  $$payload.out.push(`<!----></div></div></div></main></div>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CqsNLa2r.js.map
