import galleryItems from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  overlayEl: document.querySelector(".lightbox__overlay"),
  modalEl: document.querySelector(".js-lightbox"),
  modalImgEl: document.querySelector(".lightbox__image"),
  closeBtnEl: document.querySelector('button[data-action="close-lightbox"]'),
};

const cardsMarkup = createGalleryItems(galleryItems);
refs.galleryList.insertAdjacentHTML("beforeend", cardsMarkup);

function createGalleryItems(e) {
  return e
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

refs.galleryList.addEventListener("click", modalOpenClick);

function modalOpenClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  document.addEventListener("keydown", closeModalByEscape);

  refs.modalEl.classList.add("is-open");
  refs.modalImgEl.src = e.target.dataset.source;
  refs.modalImgEl.alt = e.target.alt;
}

refs.closeBtnEl.addEventListener("click", closeModal);

function closeModal() {
  document.removeEventListener("keydown", closeModalByEscape);
  refs.modalEl.classList.remove("is-open");
  refs.modalImgEl.src = "";
  refs.modalImgEl.alt = "";
}

refs.overlayEl.addEventListener("click", closeModal);

function closeModalByEscape(e) {
  if (e.code === "Escape") {
    closeModal();
  }
}
