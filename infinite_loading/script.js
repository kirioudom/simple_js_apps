async function requestPhotos() {
  const api = "https://thawing-reef-88329.herokuapp.com/";
  try {
    const response = await fetch(apiLocal);
    const result = await response.json();
    console.log("requesting");
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function displayPhotos(photos, onElement) {
  photos.forEach((data) => {
    const img = document.createElement("img");
    img.src = `${data["urls"]["regular"]}`;
    img.alt = `${data["alt_description"]}`;
    onElement.append(img);
  });
}

function displayPhotosOnContainerImg(photos) {
  const containerImgs = document.querySelector(".container__image");
  displayPhotos(photos, containerImgs);
}

async function getPhotoAndAppend() {
  displayLoader();
  const photos = await requestPhotos();
  console.log(photos);
  displayPhotosOnContainerImg(photos);
  displayLoader();
}

function isScrollNearBottom() {
  const documentHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const scrollOffset = window.pageYOffset;
  const trackScrollingOffset = viewportHeight + scrollOffset;
  return trackScrollingOffset >= documentHeight - 1000;
}

function displayLoader() {
  const loaderEle = document.querySelector(".loader");
  loaderEle.classList.toggle("show-loader");
}

async function main() {
  let isRequesting = true;
  await getPhotoAndAppend();
  isRequesting = false;
  //make first request

  window.addEventListener("scroll", async () => {
    if (isScrollNearBottom() && !isRequesting) {
      isRequesting = true;
      await getPhotoAndAppend();
      isRequesting = false;
    }
  });
}

window.onload = main;
