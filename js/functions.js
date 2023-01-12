function courseInfo() {
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
}

function courseContent() {}

function addStyle(pagesToObserve, pageRoute) {
  if (pagesToObserve[pageRoute[0]] === undefined) {
    return;
  }

  const main = document.querySelector("main");

  let className = pagesToObserve[pageRoute[0]].class;
  let i = 0;
  while (i < pageRoute.length) {
    let currentKeyword = pagesToObserve[pageRoute[i]].keywords;
    for (let j = 0; j < currentKeyword.length; j++) {
      if (pageRoute.includes(currentKeyword[j].keyword)) {
        className = currentKeyword[j].class;
        break;
      }
    }
    i++;
  }

  if (main.classList.contains(className)) {
    return;
  }

  main.setAttribute("class", "");
  main.classList.add(className);
}

function clearOther(pagesToObserve) {
  const main = document.querySelector("main");
  if (main.classList.length === 0) {
    return;
  }
  for (const page in pagesToObserve) {
    main.classList.remove(pagesToObserve[page].class);
    let keywords = pagesToObserve[page].keywords;

    for (let i = 0; i < keywords.length; i++) {
      main.classList.remove(keywords[i].class);
    }
  }
}

function headerLinks() {
  const navLinks = document.querySelectorAll(
    "header nav .navbar-collapse .nav-link"
  );
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  let path = "/" + location.pathname.split("/")[1];
  if (path === "/") {
    navLinks.item(0).classList.add("active");
  } else if (path === "/university" || path === "/categories") {
    navLinks.item(1).classList.add("active");
  } else if (location.pathname === "/account/courses") {
    navLinks.item(2).classList.add("active");
  }
}

function Footer() {
  // check if the the div is the payments div
  if (
    !document
      .querySelector("footer .row > div > div:first-of-type")
      .children[0].classList.contains("payment-logo")
  ) {
    return;
  }

  // save clone for payments methods
  let paymentsMethods = document
    .querySelector("footer .row > div > div:first-of-type")
    .cloneNode(true);

  // make style changes for the cloned
  paymentsMethods.style.padding = "1rem 0 1.5rem";

  // add  the cloned to the page (after footer tag)
  document.querySelector(".app-layout").appendChild(paymentsMethods);

  // remove the original one
  document.querySelector("footer .row > div > div:first-of-type").remove();

  //=============== Add logo ===============//

  let logo = `<svg class="logo" width="154" height="73" viewBox="0 0 154 73" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_51_105)">
    <path
      d="M116.585 7.96962C113.752 3.03503 108.471 0 102.752 0H50.4033L92.6715 72.7665L154 73.0106L116.585 7.96962ZM54.9679 3.22605H102.699C107.915 3.22605 112.726 5.99579 115.313 10.4953L149.425 69.7846L93.5054 69.5617L54.9679 3.22605Z"
      fill="url(#paint0_linear_51_105)" />
    <path
      d="M103.597 0H51.2478C45.5287 0 40.2478 3.04565 37.415 7.96962L0 73L61.3285 72.7559L103.597 0Z"
      fill="white" />
  </g>
  <defs>
    <linearGradient id="paint0_linear_51_105" x1="50.4033" y1="36.5053" x2="154" y2="36.5053"
      gradientUnits="userSpaceOnUse">
      <stop stop-color="white" />
      <stop offset="0.43" stop-color="#4493D0" />
      <stop offset="0.75" stop-color="#5BC3B5" />
    </linearGradient>
    <clipPath id="clip0_51_105">
      <rect width="154" height="73" fill="white" />
    </clipPath>
  </defs>
</svg>
  `;
  let footer = document.querySelector("footer");
  footer.innerHTML = footer.innerHTML + logo.repeat(2);
}
