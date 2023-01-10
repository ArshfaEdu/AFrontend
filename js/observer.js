let splitted_url = location.href.split("#")[0];
splitted_url = splitted_url.split("/");
let page = splitted_url[splitted_url.length - 2];
const pagesToObserve = {
  courses: "academy-courses-show",
  contents: "academy-contents-show",
  userCourses: "academy-user-account-courses",
};

const observer = new MutationObserver((mutations) =>
  mutations.forEach((mutation) => {
    if (mutation.type !== "childList")
      if (mutation.addedNodes.length === 0) return;
    const node = mutation.addedNodes[0];
    if (!node || !node.querySelector) return;

    let url = location.href.split("#")[0];
    url = url.split("/");
    let pageRoute = url[url.length - 2];

    try {
      // add style to main tag based on page
      addStyle(pagesToObserve, pageRoute);

      switch (pageRoute) {
        case "courses":
          courseInfo();
          break;
        case "contents":
          courseContent();
          break;
        default:
          clearOther(pagesToObserve);
          break;
      }
    } catch (e) {
      return;
    }
  })
);

observer.observe(document.body, { subtree: true, childList: true });