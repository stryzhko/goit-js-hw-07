import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
 
const renderMarkupGallery = (items) => {
  return items.reduce(
    (acc, { preview, original, description }) =>
      (acc += `<div class="gallery__item">
        <a class="gallery__link" href="${preview}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
  </a>
  </div>`),
    ""
  );
};

const insertMarkingGallery = (string) => {
    const galleryEl = document.querySelector(".gallery");
    galleryEl.insertAdjacentHTML("beforeend", string);
}

const instance = basicLightbox.create(
  `<img src="" width="800" height="600" alt="" loading= "lazy">`,
  {
    onShow: addBtnListener,
    onClose: removeBtnListener,
  }
);

const lightboxImg = instance.element().querySelector("img"); 

const changeModalImage = (img) => {
  const source = img.dataset.source;
  const description = img.alt;
  lightboxImg.src = source;
  lightboxImg.alt = description;
};

const onSmallImageClick = (e) => {
  e.preventDefault();
  if (e.target.nodeName.toLowerCase() != "img") {
    return;
  }
  changeModalImage(e.target);
  instance.show();
};

const closeLightBoxOnBtnEsc = (e) => {
  if (instance.visible() && e.key === "Escape") {
    instance.close();
  }
};

function addBtnListener() {
  document.addEventListener("keydown", closeLightBoxOnBtnEsc);
}

function removeBtnListener() {
  document.removeEventListener("keydown", closeLightBoxOnBtnEsc);
}

insertMarkingGallery(renderMarkupGallery(galleryItems));
document.addEventListener("click", onSmallImageClick);

