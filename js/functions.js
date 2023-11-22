/*
=================================
        Helper Functions
=================================
*/

function tryCatch(func) {
  try {
    func();
  } catch (x) {
    //console.log(x);
  }
}

function editPrice(priceContent) {
  if (priceContent.textContent.includes("SAR")) return;

  let price = priceContent.textContent.replace(" ", "").replace("ر.س.", "");

  priceContent.innerHTML = "SAR " + price.split(",")[0];
}

function setLogoCategory(logo) {
  // get the acronym (short name) of the university
  let currentUniversity = location.pathname.split("/").pop();

  // set the path of the logo image using the acronym
  logo.setAttribute(
    "src",
    `https://cdn.jsdelivr.net/gh/ArshfaEdu/AFrontend/dist/images/${currentUniversity}.svg`
  );

  // set the alt
  logo.setAttribute("alt", currentUniversity);

  // set styles for the image
  logo.setAttribute("style", "width: 192px;height:192px");
}

function setSuggestBtnCategory(suggestBtn) {
  // get the acronym (short name) of the university
  let currentUniversity = location.pathname.split("/").pop();

  suggestBtn.setAttribute(
    "href",
    `/suggest-course?university=${currentUniversity}`
  );
  suggestBtn.setAttribute("target", "_blank");
  suggestBtn.setAttribute("class", "btn btn-primary mb-6 suggestBtn");
  suggestBtn.setAttribute("style", "width: 30vmin");
  suggestBtn.textContent = "اقترح مادة";
}

/*
================================
   General Purposes Functions
================================
*/

function addStyle(pagesToObserve, pageName) {
  const main = document.querySelector("main");
  if (pagesToObserve[pageName] === undefined) {
    return;
  }
  if (main.classList.contains(pagesToObserve[pageName])) {
    return;
  }

  main.setAttribute("class", "");
  main.classList.add(pagesToObserve[pageName]);
}

function clearOther(pagesToObserve) {
  const main = document.querySelector("main");
  for (const page in pagesToObserve) {
    main.classList.remove(pagesToObserve[page]);
  }
}

function getPageName(path) {
  if (path.includes("account")) {
    return path.includes("courses") ? "userCourses" : "account";
  } else if (path.includes("courses")) {
    return path.includes("contents") ? "contents" : "courses";
  } else if (path.includes("categories")) {
    return "category";
  } else if (path.startsWith("/@")) {
    return "profile";
  } else if (path.startsWith("/difficulties")) {
    return "level";
  } else {
    return "unknown";
  }
}

function redirect(links) {
  for (let link in links) {
    if (link === location.pathname) {
      document.body.innerHTML = "";
      location.href = "https://arshfa.net" + links[link];
    }
  }
}

/*
================================
   Main Components Functions
================================
*/
function cards() {
  const cards = document.querySelectorAll(".card.lift");
  if (cards.length === 0) {
    return;
  }
  cards.forEach((card) => {
    // for editing the price
    let priceContent = card.querySelector(".card-footer > div:first-child ins");
    editPrice(priceContent);

    // for editing the buttons
    const btns = card.querySelectorAll(
      ".card-footer>div:last-child>div button.btn"
    );

    if (btns.length !== 2) {
      return;
    }
    const browseBtn = btns[1];

    browseBtn.textContent = "تصفح المادة";

    browseBtn.addEventListener("click", (e) => {
      const target = e.target;
      const cardBody =
        target.parentElement.parentElement.parentElement.previousElementSibling;
      const titleLink = cardBody.querySelector("a.stretched-link");

      titleLink.click();
    });
  });
}

function header() {
  const header = document.querySelector(".app-layout > header");
  if (!header) {
    return;
  }

  window.addEventListener("scroll", function () {
    if (this.window.scrollY > 5) {
      header.style.boxShadow = "0 5px 30px rgba(100, 100, 100, 0.07)";
    }
  });
}

function headerLinks() {
  if (!document.querySelector(".app-layout > header")) {
    return;
  }

  const navLinks = document.querySelectorAll(
    "header nav .navbar-collapse .nav-link"
  );
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  let path = "/" + location.pathname.split("/")[1];
  if (path === "/") {
    navLinks.item(0).classList.add("active");
  } else if (
    path === "/university" ||
    path === "/categories" ||
    path === "/courses"
  ) {
    navLinks.item(1).classList.add("active");
  } else if (location.pathname === "/account/courses") {
    navLinks.item(2).classList.add("active");
  } else if (location.pathname === "/instructor") {
    navLinks.item(3).classList.add("active");
  }
}

function auth() {
  const header = document.querySelector(".app-layout > header");
  if (!header) {
    return;
  }

  let navLinks = document.querySelectorAll(
    "header nav .navbar-collapse .navbar-nav .nav-item"
  );

  if (document.querySelector("body > .popper-container")) {
    // logged in
    navLinks.forEach((el) => {
      if (el.children[0].getAttribute("href").includes("account/courses")) {
        el.style.display = "block";
      }
    });

    header.classList.add("logged-in");
  } else {
    navLinks.forEach((el) => {
      // logged out
      if (el.children[0].getAttribute("href").includes("account/courses")) {
        el.style.display = "none";
      }
    });

    header.classList.remove("logged-in");
  }
}

function Footer() {
  let footer = document.querySelector(".app-layout > footer.footer");

  footer.innerHTML = `<div><div class="columns is-centered is-multiline is-variable is-2-mobile is-1-tablet is-3-desktop is-8-widescreen is-1-fullhd"><div class="column"><img class="header-stuff header-imgs" src="https://a-frontend-one.vercel.app/dist/images/fullLogoWhite.svg" alt="Arshafa Logo"><div class="logo-container columns is-justify-content-right is-1"><a target="_blank" href="http://youtube.com/@kfupmarshfa598" class="column"><img class="icon is-large img-layout" src="https://a-frontend-one.vercel.app/dist/images/new/yt.avif" alt="Youtube"></a><a class="column" target="_blank" href="https://twitter.com/ArshfaEdu"><img class="icon is-large img-layout" src="https://a-frontend-one.vercel.app/dist/images/new/Twitter.webp" alt="Twitter"></a><a class="column" target="_blank" href="https://sa.linkedin.com/company/arshfa"><img class="icon is-large img-layout" src="https://a-frontend-one.vercel.app/dist/images/new/Linkedin.webp" alt="Linkedin"></a></div></div><div class="column is-one-quarter text-large"><div class="text-bold text-white">أرشفة</div><a class="text-white" target="_blank" href="https://twitter.com/ArshfaEdu">ما هي أرشفة</a><br><a class="text-white" target="_blank" href="https://arshfa.net/terms-and-condition">الشروط والأحكام</a></div><div class="column is-one-quarter text-large"><div class="text-bold text-white">انضم لنا</div><a class="text-white" target="_blank" href="https://arshfa.net/instructor">انضم كمعلم</a><br><a class="text-white" target="_blank" href="https://arshfa.net/arshfa-ambassador">انضم كسفير</a></div><div class="column is-one-quarter text-large"><div class="text-bold text-white">مركز المساعدة</div><a class="text-white" target="_blank" href="https://arshfa.net/contactus">تواصل معنا</a><br><a class="text-white" target="_blank" href="https://arshfa.net/faq">الأسئلة الشائعة</a><br><a class="text-white" target="_blank" href="https://arshfa.net/suggest-course">الإقتراحات</a></div></div><div class="columns is-justify-content-right is-vcentered is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd"><div class="column text-normal text-grey"><div>أرشفة &copy;<script>document.write((new Date).getFullYear()+",")</script>جميع الحقوق محفوظة</div><br><div class="logo-container columns is-justify-content-right is-vcentered is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd"><a class="column"><img class="icon is-large img-layout" src="https://a-frontend-one.vercel.app/dist/images/new/mada-dark.webp" alt="Mada"></a><a class="column"><img class="icon is-large img-layout" src="https://a-frontend-one.vercel.app/dist/images/Stc_pay.svg.png" alt="stc pay"></a><a class="column"><img class="icon is-large img-layout" src="https://a-frontend-one.vercel.app/dist/images/new/1280px-Apple_Pay_logo.svg.webp" alt="apple pay"></a><a class="column"><img class="icon is-large img-layout" src="https://a-frontend-one.vercel.app/dist/images/new/Visa_2021.svg.png" alt="Visa"></a><a target="_blank" class="column"><img class="icon is-large img-layout" src="https://a-frontend-one.vercel.app/dist/images/new/Mastercard-Logo.png" alt="MasterCard"></a><a target="_blank" class="column"><img class="icon is-large img-layout" src="https://a-frontend-one.vercel.app/dist/images/new/tamara.png" alt="Tamara"></a><div class="column is-1-mobile is-5-desktop"></div><a target="_blank" href="https://maroof.sa/276429" class="column"><img class="icon is-large img-layout" src="https://a-frontend-one.vercel.app/dist/images/maroof.svg" alt="Maroof"></a><a target="_blank" class="column"><img class="icon is-large img-layout" src="https://a-frontend-one.vercel.app/dist/images/new/VAT.webp" alt="VAT"></a></div></div></div></div>`;
}

/*
================================
      Main Pages Functions
================================
*/

function courseInfo() {
  /* === For editign price content === */
  let priceContent = document.querySelector(
    ".container>.row>div:last-child>div>div>div:not(.plyr) ins"
  );
  editPrice(priceContent);

  /* ==== For the tabs ==== */

  // save all the nav items except the first
  const navItems = [];
  document
    .querySelectorAll("main > .container > .row nav.course-tab-v1 .nav-item")
    .forEach((el, i) => {
      if (i !== 0) {
        const item = el.cloneNode(true);
        item.querySelector("a").classList.remove("active");
        navItems.push(item);
      }
    });

  // save the nav
  const nav = document
    .querySelector("main > .container > .row > div:first-child #overview > nav")
    .cloneNode(true);

  // remove all the  pre-navs
  document
    .querySelectorAll(
      "main > .container > .row > div:first-child > div:not(:first-of-type) nav"
    )
    .forEach((el) => el.remove());

  // reference the overview section to insert nav before it and add active class
  const overview = document.querySelector("#overview");
  overview.classList.add("active");

  // insert all the saved nav items
  navItems.forEach((el) => nav.appendChild(el));

  // insert the saved node before overview section
  document
    .querySelector("main > .container > .row > div:first-child")
    .insertBefore(nav, overview);

  // reference the nav links to add click listener
  const links = document.querySelectorAll(
    "main > .container > .row > div:first-child nav .nav-item .nav-link"
  );

  // click listener for nav links
  function click(e) {
    e.preventDefault();
    // toggle active class for nav links
    links.forEach((el) => {
      if (el.classList.contains("active")) {
        el.classList.remove("active");
      }
    });
    e.target.classList.add("active");

    // display the nav link content
    let navContent = e.target.getAttribute("href");
    document
      .querySelectorAll(
        "main > .container > .row > div:first-child > div:not(:first-of-type)"
      )
      .forEach((content) => content.classList.remove("active"));
    document.querySelector(navContent).classList.add("active");
  }
  links.forEach((el) => el.addEventListener("click", click));

  /* ==== For instructor ==== */
  const instructorContainer = document.querySelector(
    "#instructors .media-body"
  );

  const instructor = document.querySelector(
    "main.academy-courses-show>.container>.row>div:first-child>div:first-of-type a[href*='difficulties']"
  );

  const button = document.createElement("button");
  button.setAttribute("class", "d-block");
  button.textContent = instructor.textContent;
  button.addEventListener("click", (e) => {
    location.href = instructor.getAttribute("href");
  });

  const wrapperAvatar = document.createElement("div");
  wrapperAvatar.setAttribute("class", "avatar avatar-custom");
  let avatar = instructorContainer.parentElement.querySelector(
    "a.avatar.avatar-custom"
  );
  wrapperAvatar.innerHTML = avatar.innerHTML;
  instructorContainer.parentElement
    .querySelector(".rounded-circle")
    .replaceChild(wrapperAvatar, avatar);

  instructorContainer.replaceChild(
    button,
    instructorContainer.querySelector("a")
  );
}

function courseContent() {
  // for sidebar
  const chapters = document.querySelectorAll(
    "#chaptersSidebarCollapse .sidebar-collapse-scroll a.m-chapter-item"
  );

  chapters.forEach((chapter) => {
    if (chapter.querySelector("s")) {
      chapter.classList.add("finished");
    }
  });

  // for left side (content)
  const contents = document.querySelectorAll(
    "main > div > section:nth-of-type(1) > .container > .row:last-child > div > *"
  );

  contents.forEach((content) => {
    if (
      content.querySelector("iframe[src*='mediadelivery']") ||
      content.querySelector(".plyr")
    ) {
      content.setAttribute("data-order", "1");
    } else if (content.nodeName === "H2") {
      content.setAttribute("data-order", "2");
    } else if (content.classList.contains(".alert-info")) {
      content.setAttribute("data-order", "3");
    } else if (content.querySelector("h2")) {
      content.setAttribute("data-order", "4");
    } else {
      content.setAttribute("data-order", "5");
    }
  });
}

function category() {
  // create img for the logo
  let logo = document.createElement("img");
  setLogoCategory(logo);

  /* Add suggest course button */
  let suggestBtn = document.createElement("a");
  setSuggestBtnCategory(suggestBtn);

  let container = null;
  let main = document.querySelector("main.academy-categories-show");

  // to add coming soon
  if (main.children.length === 0 && !main.querySelector(".no-courses")) {
    container = document.createElement("div");
    container.setAttribute(
      "class",
      "d-flex no-courses w-75 mx-auto justify-content-center align-items-center text-align-center"
    );
    container.setAttribute(
      "style",
      "flex-direction:column;row-gap:4rem;padding:4rem 0;"
    );
    let h1 = document.createElement("h1");
    h1.setAttribute(
      "style",
      "color:var(--ar-dark)!important;font-size:8vmin;font-weight:bold;text-align:center;"
    );
    h1.textContent = "جايينكم قريب ...";
    container.appendChild(logo);
    container.appendChild(suggestBtn);
    container.appendChild(h1);

    let comment = document.querySelector("main.academy-categories-show")
      .childNodes[3];
    comment.replaceWith(container);
  } else {
    // get the title to replace
    const title = document.querySelector(
      "main .container > div:first-of-type h1"
    );

    // replace the title with the new created image
    title.parentElement.setAttribute("style", "margin-bottom: 3rem;");
    title.replaceWith(logo);

    let cardsContainer = logo.parentElement.parentElement.nextElementSibling;
    let cardsParent = cardsContainer.children[0];
    cardsContainer.insertBefore(suggestBtn, cardsParent);
  }
}

function level() {
  if (document.querySelector("img[alt='instructor']")) {
    return;
  }
  const img = document.createElement("img");
  img.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/gh/ArshfaEdu/AFrontend/dist/images/avatar.svg"
  );
  img.setAttribute("alt", "instructor");
  img.setAttribute("class", "avatar-img");

  const avatarWrapper = document.createElement("div");
  avatarWrapper.setAttribute(
    "style",
    "width:148px;margin-bottom:1.4rem;margin-left:auto;margin-right:auto;"
  );
  avatarWrapper.appendChild(img);

  let levelName = document.querySelector(
    "main .container>div:first-of-type>.col-12 h1"
  );

  levelName.parentElement.insertBefore(avatarWrapper, levelName);

  // title of the page
  let title = document.createElement("h2");
  title.textContent = "دورات المحاضر";
  title.setAttribute(
    "style",
    "margin-bottom:3rem;color:var(--ar-secondary)!important;"
  );
  let coursesCotainer = document.querySelector(
    "main.teacher-page .container > .mt-30px > .row"
  );

  coursesCotainer.parentElement.insertBefore(title, coursesCotainer);
}

function userCourses() {
  document
    .querySelector(".app-layout > header nav .navbar-collapse")
    .classList.remove("show");
}
