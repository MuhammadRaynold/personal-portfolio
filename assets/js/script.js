'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// certificate modal
const certificateModal = document.querySelector("[data-certificate-modal]");
const certificateDialog = document.querySelector("[data-certificate-dialog]");
const certificateModalImage = document.querySelector("[data-certificate-modal-image]");
const certificateModalTitle = document.querySelector("[data-certificate-modal-title]");
const certificateModalDescription = document.querySelector("[data-certificate-modal-description]");
const certificateItems = document.querySelectorAll("[data-certificate-open]");
const certificateModalCloseButtons = document.querySelectorAll("[data-certificate-modal-close]");
let certificateTrigger = null;

const closeCertificateModal = function () {
  if (!certificateModal.classList.contains("active")) return;

  certificateModal.classList.remove("active");
  certificateModal.setAttribute("aria-hidden", "true");
  certificateTrigger.setAttribute("aria-expanded", "false");
  certificateTrigger.focus();
};

for (let i = 0; i < certificateItems.length; i++) {
  certificateItems[i].setAttribute("aria-expanded", "false");

  certificateItems[i].addEventListener("click", function () {
    certificateTrigger = this;
    certificateModalImage.src = this.dataset.certificateImage;
    certificateModalImage.alt = this.dataset.certificateAlt;
    certificateModalTitle.textContent = this.dataset.certificateTitle;
    certificateModalDescription.textContent = this.dataset.certificateDescription;
    certificateModal.classList.add("active");
    certificateModal.setAttribute("aria-hidden", "false");
    this.setAttribute("aria-expanded", "true");
    certificateDialog.focus();
  });
}

for (let i = 0; i < certificateModalCloseButtons.length; i++) {
  certificateModalCloseButtons[i].addEventListener("click", closeCertificateModal);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeCertificateModal();
});

// experience gallery modal
const experienceModal = document.querySelector("[data-experience-modal]");
const experienceDialog = document.querySelector("[data-experience-dialog]");
const experienceGallery = document.querySelector("[data-experience-gallery]");
const experienceGalleryControls = document.querySelector(".experience-gallery-controls");
const experienceCounter = document.querySelector("[data-experience-counter]");
const experienceModalCompany = document.querySelector("[data-experience-modal-company]");
const experienceModalPosition = document.querySelector("[data-experience-modal-position]");
const experienceModalPeriod = document.querySelector("[data-experience-modal-period]");
const experienceModalDescription = document.querySelector("[data-experience-modal-description]");
const experienceItems = document.querySelectorAll("[data-experience-open]");
const experienceModalCloseButtons = document.querySelectorAll("[data-experience-modal-close]");
const experienceGalleryPrev = document.querySelector("[data-experience-prev]");
const experienceGalleryNext = document.querySelector("[data-experience-next]");
let experienceTrigger = null;
let experienceGalleryScrollTimer;

const updateExperienceCounter = function () {
  const currentImage = Math.round(experienceGallery.scrollLeft / experienceGallery.clientWidth) + 1;
  experienceCounter.textContent = `${currentImage} / ${experienceGallery.children.length}`;
};

const closeExperienceModal = function () {
  if (!experienceModal.classList.contains("active")) return;

  experienceModal.classList.remove("active");
  experienceModal.setAttribute("aria-hidden", "true");
  experienceTrigger.setAttribute("aria-expanded", "false");
  experienceTrigger.focus();
};

for (let i = 0; i < experienceItems.length; i++) {
  experienceItems[i].setAttribute("aria-expanded", "false");

  experienceItems[i].addEventListener("click", function () {
    experienceTrigger = this;
    experienceModalCompany.textContent = this.dataset.experienceCompany;
    experienceModalPosition.textContent = this.dataset.experiencePosition;
    experienceModalPeriod.textContent = this.dataset.experiencePeriod;
    experienceModalDescription.replaceChildren();

    const responsibilities = this.dataset.experienceDescription.split("|");

    for (let responsibilityIndex = 0; responsibilityIndex < responsibilities.length; responsibilityIndex++) {
      const responsibilityItem = document.createElement("li");
      responsibilityItem.textContent = responsibilities[responsibilityIndex].trim();
      experienceModalDescription.appendChild(responsibilityItem);
    }

    experienceGallery.replaceChildren();

    const images = this.dataset.experienceImages.split("|");
    const captions = this.dataset.experienceCaptions.split("|");
    experienceGalleryControls.hidden = images.length < 2;

    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
      const slide = document.createElement("li");
      const frame = document.createElement("figure");
      const image = document.createElement("img");
      const caption = document.createElement("figcaption");
      slide.className = "experience-gallery-slide";
      frame.className = "experience-gallery-frame";
      image.alt = `${this.dataset.experienceCompany} - Foto ${imageIndex + 1}`;
      image.loading = "eager";
      image.addEventListener("load", function () {
        const scale = Math.min(slide.clientWidth / image.naturalWidth, slide.clientHeight / image.naturalHeight);
        frame.style.width = `${image.naturalWidth * scale}px`;
        frame.style.height = `${image.naturalHeight * scale}px`;
      });
      image.src = images[imageIndex].trim();
      caption.className = "experience-gallery-caption";
      caption.textContent = captions[imageIndex].trim();
      frame.append(image, caption);
      slide.appendChild(frame);
      experienceGallery.appendChild(slide);
    }

    experienceGallery.scrollLeft = 0;
    updateExperienceCounter();
    experienceModal.classList.add("active");
    experienceModal.setAttribute("aria-hidden", "false");
    this.setAttribute("aria-expanded", "true");
    experienceDialog.focus();
  });
}

for (let i = 0; i < experienceModalCloseButtons.length; i++) {
  experienceModalCloseButtons[i].addEventListener("click", closeExperienceModal);
}

experienceGalleryPrev.addEventListener("click", function () {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  experienceGallery.scrollBy({ left: -experienceGallery.clientWidth, behavior: behavior });
});

experienceGalleryNext.addEventListener("click", function () {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  experienceGallery.scrollBy({ left: experienceGallery.clientWidth, behavior: behavior });
});

experienceGallery.addEventListener("scroll", function () {
  window.clearTimeout(experienceGalleryScrollTimer);
  experienceGalleryScrollTimer = window.setTimeout(updateExperienceCounter, 120);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeExperienceModal();
});

// project gallery modal
const projectModal = document.querySelector("[data-project-modal]");
const projectDialog = document.querySelector("[data-project-dialog]");
const projectGallery = document.querySelector("[data-project-gallery]");
const projectCounter = document.querySelector("[data-project-counter]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectItems = document.querySelectorAll("[data-project-open]");
const projectModalCloseButtons = document.querySelectorAll("[data-project-modal-close]");
const projectGalleryPrev = document.querySelector("[data-project-prev]");
const projectGalleryNext = document.querySelector("[data-project-next]");
let projectTrigger = null;
let projectGalleryScrollTimer;

const updateProjectCounter = function () {
  const currentImage = Math.round(projectGallery.scrollLeft / projectGallery.clientWidth) + 1;
  projectCounter.textContent = `${currentImage} / ${projectGallery.children.length}`;
};

const closeProjectModal = function () {
  if (!projectModal.classList.contains("active")) return;

  projectModal.classList.remove("active");
  projectModal.setAttribute("aria-hidden", "true");
  projectTrigger.setAttribute("aria-expanded", "false");
  projectTrigger.focus();
};

for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].setAttribute("aria-expanded", "false");

  projectItems[i].addEventListener("click", function (event) {
    event.preventDefault();
    projectTrigger = this;
    const projectTitle = this.querySelector(".project-title").textContent.trim();
    const projectImages = this.dataset.projectImages.split("|");
    const projectDescription = this.closest(".project-item").querySelector("[data-project-description]");

    projectModalTitle.textContent = projectTitle;
    projectModalDescription.replaceChildren(projectDescription.content.cloneNode(true));
    projectGallery.replaceChildren();

    for (let imageIndex = 0; imageIndex < projectImages.length; imageIndex++) {
      const slide = document.createElement("li");
      const image = document.createElement("img");
      slide.className = "project-gallery-slide";
      image.src = projectImages[imageIndex].trim();
      image.alt = `${projectTitle} project photo ${imageIndex + 1}`;
      image.loading = "eager";
      slide.appendChild(image);
      projectGallery.appendChild(slide);
    }

    projectGallery.scrollLeft = 0;
    updateProjectCounter();
    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");
    this.setAttribute("aria-expanded", "true");
    projectDialog.focus();
  });
}

for (let i = 0; i < projectModalCloseButtons.length; i++) {
  projectModalCloseButtons[i].addEventListener("click", closeProjectModal);
}

projectGalleryPrev.addEventListener("click", function () {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  projectGallery.scrollBy({ left: -projectGallery.clientWidth, behavior: behavior });
});

projectGalleryNext.addEventListener("click", function () {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  projectGallery.scrollBy({ left: projectGallery.clientWidth, behavior: behavior });
});

projectGallery.addEventListener("scroll", function () {
  window.clearTimeout(projectGalleryScrollTimer);
  projectGalleryScrollTimer = window.setTimeout(updateProjectCounter, 120);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeProjectModal();
});

// blog article modal
const blogModal = document.querySelector("[data-blog-modal]");
const blogDialog = document.querySelector("[data-blog-dialog]");
const blogModalImage = document.querySelector("[data-blog-modal-image]");
const blogModalTitle = document.querySelector("[data-blog-modal-title]");
const blogModalBody = document.querySelector("[data-blog-modal-body]");
const blogItems = document.querySelectorAll("[data-blog-open]");
const blogModalCloseButtons = document.querySelectorAll("[data-blog-modal-close]");
let blogTrigger = null;

const closeBlogModal = function () {
  if (!blogModal.classList.contains("active")) return;

  blogModal.classList.remove("active");
  blogModal.setAttribute("aria-hidden", "true");
  blogTrigger.setAttribute("aria-expanded", "false");
  blogTrigger.focus();
};

for (let i = 0; i < blogItems.length; i++) {
  blogItems[i].setAttribute("aria-expanded", "false");

  blogItems[i].addEventListener("click", function (event) {
    event.preventDefault();
    blogTrigger = this;
    const articleTitle = this.querySelector(".blog-item-title").textContent.trim();
    const articleImage = this.querySelector(".blog-banner-box img");

    blogModalTitle.textContent = articleTitle;
    blogModalImage.src = articleImage.src;
    blogModalImage.alt = articleImage.alt || `${articleTitle} article image`;
    blogModalBody.replaceChildren();

    const articleContent = this.closest(".blog-post-item")
      .querySelector("[data-blog-content]")
      .content.textContent;
    const articleParagraphs = articleContent
      .split(/\r?\n/)
      .map(function (paragraphText) { return paragraphText.trim(); })
      .filter(Boolean);

    for (let paragraphIndex = 0; paragraphIndex < articleParagraphs.length; paragraphIndex++) {
      const paragraph = document.createElement("p");
      paragraph.textContent = articleParagraphs[paragraphIndex].trim();
      blogModalBody.appendChild(paragraph);
    }

    blogModal.classList.add("active");
    blogModal.setAttribute("aria-hidden", "false");
    this.setAttribute("aria-expanded", "true");
    blogDialog.focus();
  });
}

for (let i = 0; i < blogModalCloseButtons.length; i++) {
  blogModalCloseButtons[i].addEventListener("click", closeBlogModal);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeBlogModal();
});

// skills category filters
const skillFilterButtons = document.querySelectorAll("[data-skill-filter]");
const skillItems = document.querySelectorAll("[data-skill-item]");

for (let i = 0; i < skillFilterButtons.length; i++) {
  skillFilterButtons[i].addEventListener("click", function () {
    const selectedCategory = this.dataset.skillFilter;

    for (let j = 0; j < skillItems.length; j++) {
      const isVisible = selectedCategory === "all"
        || skillItems[j].dataset.skillCategory === selectedCategory;
      skillItems[j].classList.toggle("active", isVisible);
    }

    for (let j = 0; j < skillFilterButtons.length; j++) {
      const isSelected = skillFilterButtons[j] === this;
      skillFilterButtons[j].classList.toggle("active", isSelected);
      skillFilterButtons[j].setAttribute("aria-pressed", isSelected ? "true" : "false");
    }
  });
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}