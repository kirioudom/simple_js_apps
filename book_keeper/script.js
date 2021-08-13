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
    console.log("click");
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
  return {
    getBookmarks: () => bookmarks,
    addBookmark: ({ websiteName, websiteLink }) => {
      bookmarks = [...bookmarks, { websiteName, websiteLink }];
      localStorage.setItem(dataKey, JSON.stringify(bookmarks));
      return true;
    },
    removeBookmark: (websiteName) => {
      bookmarks = bookmarks.filter(
        (bookmark) => bookmark.websiteName !== websiteName
      );
      localStorage.setItem(dataKey, JSON.stringify(bookmarks));

      return true;
    },
  };
}

function buildBookmarks(data) {
  const generateLinkElment = ({ websiteName, websiteLink }) => {
    return `<div class='link-container'>
      <a href=${websiteLink} class='bookmark-link'>${websiteName}</a>
      <button id='remove-bookmark' type="button" class='remove-btn' data-name=${websiteName}>
        <i class="fas fa-times" ></i>
      </button>
    </div>`;
  };

  return data.reduce((element, bookmarkInfo) => {
    return (element += generateLinkElment(bookmarkInfo));
  }, "");
}

function bookmarkList(removeBookmarkHandler) {
  const bookmarksContainer = document.querySelector(".container");

  return function updateBookmarkList(data) {
    bookmarksContainer.innerHTML = buildBookmarks(data);
    document.querySelectorAll("#remove-bookmark").forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log(button.dataset);
        removeBookmarkHandler(button.dataset.name);
      });
    });
  };
}

function main() {
  const bookmarkProvier = bookKeeperData();
  const updateBookmarkList = bookmarkList((websiteName) => {
    bookmarkProvier.removeBookmark(websiteName);
    updateBookmarkList(bookmarkProvier.getBookmarks());
  });
  updateBookmarkList(bookmarkProvier.getBookmarks());
  modalInit(({ websiteName, websiteLink }) => {
    const isAdded = bookmarkProvier.addBookmark({ websiteLink, websiteName });
    console.log("added");
    if (isAdded) {
      updateBookmarkList(bookmarkProvier.getBookmarks());
    }
  });
}

window.onload = main;
