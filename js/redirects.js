/*
 * Specification for how the routes will be types
 * you must add / before the route name
 * if the page is xyz, then you must type /xyz, for all, the redirected from and the redirected to
 * no need to type the full url, just the pathname (i.e. the route after the domain name)
 * "/" means homepage
 * you must not enter / after the path, e.g. "/some/path/" WRONG!, "/some/path" CORRECT!
 */

const redirects = {
  "/courses": "/university",
  "/account/products": "/",
};

// For do the redirections
redirects(redirects);
