function modalInit(submitHandler) {
  const modalElement = document.querySelector("#modal");
  const backdrop = document.querySelector("#backdrop");
  const clearInputForm = formInit(submitHandler);

  const modalTrigger = () => {
    clearInputForm();
    modalElement.classList.toggle("open-modal");
    backdrop.classList.toggle("open-modal");
  };

  document.querySelector("#btn-bookmark").addEventListener("click", (e) => {
    modalTrigger();
  });

  backdrop.addEventListener("click", (e) => {
    modalTrigger();
  });
}

function formInit(submitHandler) {
  const inputWebsiteNameElment = document.querySelector("#website-name");
  const inputWebsiteLinkElement = document.querySelector("#website-link");
  const formElement = document.querySelector("form");
  const submitBtn = document.querySelector("#btn-bookmark");
  let websiteName = "";
  let websiteLink = "";

  inputWebsiteLinkElement.addEventListener("input", (e) => {
    websiteLink = e.target.value;
  });

  inputWebsiteNameElment.addEventListener("input", (e) => {
    websiteName = e.target.value;
  });

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    if ([websiteName, websiteLink].filter(Boolean).length === 2) {
      submitHandler({ websiteLink, websiteName });
      clearInputForm();
    }
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
  });

  const clearInputForm = () => {
    websiteName = "";
    websiteLink = "";
    inputWebsiteNameElment.value = websiteName;
    inputWebsiteLinkElement.value = websiteLink;
  };

  return clearInputForm;
}

function bookKeeperData() {
  const dataKey = "bookmarks";
  let bookmarks = localStorage.getItem(dataKey)
    ? JSON.parse(localStorage.getItem(dataKey))
    : [];
  console.log(bookmarks);
  return {
    getBookmarks: () => bookmarks,
    addBookmark: ({ websiteName, websiteLink }) => {
      bookmarks = [...bookmarks, { websiteName, websiteLink }];
      localStorage.setItem(dataKey, JSON.stringify(bookmarks));
      return true;
    },
    removeBookmark: (websiteName) => {
      bookmarks = bookmarks.filter(
        (bookmark) => bookmark.websiteName === websiteName
      );
      localStorage.setItem(dataKey, bookmarks);
      return true;
    },
  };
}

function updateBookmarksView(data) {
  const containerElement = document.querySelector(".container");
  const generateLinkElment = ({ websiteName, websiteLink }) => {
    return `<div class='link-container'>
    <a href=${websiteLink} class='bookmark-link'>${websiteName}</a>
    </div>`;
  };

  containerElement.innerHTML = data.reduce((element, bookmarkInfo) => {
    console.log({ ...bookmarkInfo });
    return (element += generateLinkElment(bookmarkInfo));
  }, "");
}

window.onload = () => {
  const bookmarkProvier = bookKeeperData();
  modalInit(bookmarkProvier.addBookmark);
  localStorage.clear();
};
