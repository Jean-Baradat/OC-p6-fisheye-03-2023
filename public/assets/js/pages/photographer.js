window.addEventListener("load", () => {
    // DOM --------------------------------------------------------------------------
    let headerInformations = document.querySelector('#informations');
    let headerProfilePhoto = document.querySelector('#profile-photo');
    let medias = document.querySelector('.medias');
    let mediasCarrousel = document.querySelector('.medias-carrousel');
    let filterBtnOptions = document.querySelector('#filter-btn-options');
    let filterBtn = document.querySelector('.filter-btn');
    let options = document.querySelectorAll('.option');
    let selectedFilterBtnText = document.querySelector('.selected-filter-btn-text');
    let filterButton = document.querySelector('.filter .button');
    let filterIcon = document.querySelector('#filter-icon');
    let totalLikePricePrice = document.querySelector('.total-like-price .price');
    let totalLikePriceLike = document.querySelector('.total-like-price .like');
    let contactModalName = document.querySelector('#contact_modal .name');
    const html = document.querySelector('html');
    let sectionMedia = document.querySelector('.section-media');
    let carrouselIsOpen = false;
    let carrousel = sectionMedia.querySelector('.carrousel');
    let mediaLightboxClose = carrousel.querySelector('.btn-close-lightbox');
    let btnRightLightbox = carrousel.querySelector('.btn-right-lightbox');
    let btnLeftLightbox = carrousel.querySelector('.btn-left-lightbox');
    let logo = document.querySelector('.logo').parentElement;
    logo.focus();

    /*
        Initialize the PhotographerFactory and execute the main 
        method to get the data (in photographerData)
    */
    // eslint-disable-next-line no-undef
    let photographerFactory = new PhotographerFactory();
    let photographerData = photographerFactory.main();
    /*
        Initialize the MediaFactory and execute the main method 
        to get the data (in mediaData)
    */
    // eslint-disable-next-line no-undef
    let mediaFactory = new MediaFactory();
    let mediaData = mediaFactory.main();


    // VARIABLES --------------------------------------------------------------------
    let totalLikes = 0;
    let likeData = [];


    // PROMISE ----------------------------------------------------------------------
    // Filter the media by photographer ID
    let filteredPhotographerMedia = mediaData.then(res => {
        return res.filter(dataTest => checkPhotographerId(dataTest, "photographerId"));
    });

    // Filter the photographer by ID
    let filteredPhotographerData = photographerData.then((res) => {
        return res.filter(dataTest => checkPhotographerId(dataTest, "id"));
    });

    // Display the photographer media
    filteredPhotographerMedia.then(res => {
        let allMediaHTML = "";
        let allMediaCarrouselHTML = "";
        res.forEach(media => {
            totalLikes += media.likes;
            likeData.push(
                {
                    "id": media.id,
                    "like": media.likes,
                    "liked": false,
                }
            );
            allMediaHTML += media.templateMediaPageInfo(getLikeData(media, likeData));
            allMediaCarrouselHTML += media.templateMediaLightbox();
        });
        medias.innerHTML += allMediaHTML;
        mediasCarrousel.innerHTML += allMediaCarrouselHTML;
        totalLikePriceLike.innerText += totalLikes;

        handleClickOfMediaImage(sectionMedia);

        handleLike(medias.querySelectorAll('.card-icon-like'), likeData);
    });

    // Display the photographer informations
    filteredPhotographerData.then(res => {
        let photographerInfos = res[0];
        headerInformations.innerHTML += photographerInfos.templatePhotographerPageInfo();
        headerProfilePhoto.innerHTML += photographerInfos.templatePhotographerPagePhoto();
        totalLikePricePrice.innerText += photographerInfos.price;
        contactModalName.innerText += photographerInfos.name;
    });


    // EVENT ------------------------------------------------------------------------
    // Event for the filter button
    filterBtn.addEventListener('click', () => toggleFilterBtnMenu());
    options.forEach(option => {
        option.addEventListener('click', () => filterMediaByType(option.dataset));
    });
    // Event for the click outside the filter button and the menu
    document.addEventListener("click", (e) => hideFilterMenuOnClickOutside(e));

    mediaLightboxClose.addEventListener('click', () => {
        carrouselIsOpen = false;
        carrousel.classList.add("hidden");
        html.style.overflowY = 'scroll';
        carrouselLightboxManager(sectionMedia, "close");
    });

    btnRightLightbox.addEventListener('click', () =>
        carrouselLightboxManager(sectionMedia, "right")
    );

    btnLeftLightbox.addEventListener('click', () =>
        carrouselLightboxManager(sectionMedia, "left")
    );

    document.addEventListener("keydown", e => {
        if (carrouselIsOpen) {
            if (e.key == "ArrowRight") {
                carrouselLightboxManager(sectionMedia, "right");
            }
        }
    });

    document.addEventListener("keydown", e => {
        if (carrouselIsOpen) {
            if (e.key == "ArrowLeft") {
                carrouselLightboxManager(sectionMedia, "left");
            }
        }
    });

    carrousel.addEventListener('keydown', e => handleFocusCarrousel(e));

    filterButton.addEventListener('keydown', e => handleFocusFilterButton(e));


    // FUNCTIONS --------------------------------------------------------------------
    /**
     * Checks if a photographer ID matches the ID parameter in the URL
     * @param {object} data 
     * @param {string} nameId 
     * @returns {boolean} Returns true if the ID in the data object 
     * matches the ID parameter in the URL, otherwise false
     */
    const checkPhotographerId = (data, nameId) => {
        return data[nameId] == new URLSearchParams(window.location.search).get("id");
    }

    /**
     * Toggles the visibility and style of the filter button menu and its icon
     * @returns {void}
     */
    const toggleFilterBtnMenu = () => {
        if (!filterBtnOptions.classList.contains("hidden")) {
            filterBtn.focus();
            filterBtn.setAttribute("aria-expanded", "false");
            if (selectedFilterBtnText.innerHTML.replace(/\s/g, '') !== "Sélectionner") {
                filterBtn.setAttribute(
                    "aria-label",
                    `Ouvrir le menu de filtre. Option sélectionnée : ${selectedFilterBtnText.innerHTML}`
                );
            } else {
                filterBtn.setAttribute("aria-label", "Ouvrir le menu de filtre");
            }
        } else {
            filterBtn.setAttribute("aria-expanded", "true");
            filterBtn.setAttribute("aria-label", "Fermer le menu de filtre");
        }
        filterBtnOptions.classList.toggle("hidden");
        filterBtn.classList.toggle("rounded-b");
        filterIcon.classList.toggle("fa-angle-down");
        filterIcon.classList.toggle("fa-angle-up");
    }

    /**
     * This function sort the media by popularity, date or title and insert in the page
     * @param {object} dataAttributes - The data attributes of the clicked option
     */
    const filterMediaByType = (dataAttributes) => {
        selectedFilterBtnText.innerHTML = dataAttributes.content;
        toggleFilterBtnMenu();
        filteredPhotographerMedia.then(() => {
            let mediaElement = document.querySelectorAll('.media-element');
            let mediaLightbox = document.querySelectorAll('.media-lightbox');

            medias.innerHTML = sort(dataAttributes, mediaElement);
            mediasCarrousel.innerHTML = sort(dataAttributes, mediaLightbox);

            handleClickOfMediaImage(sectionMedia);

            handleLike(medias.querySelectorAll('.card-icon-like'), likeData);
        });
    }

    /**
     * This function sort medias and carrousel medias by popularity, date or 
     * title and return it in HTML
     * @param {object} dataAttributes
     * @param {array} mediaToSort
     * @returns {string} Returns the HTML of the sorted medias
     */
    const sort = (dataAttributes, mediaToSort) => {
        let allHTML = "";
        [...mediaToSort]
            .sort((a, b) => {
                if (dataAttributes.type == "popularity") {
                    return b.dataset.like - a.dataset.like;
                } else if (dataAttributes.type == "date") {
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                } else if (dataAttributes.type == "title") {
                    return a.dataset.title.localeCompare(b.dataset.title, undefined, { sensitivity: 'base' });
                }
            })
            .forEach(media => {
                allHTML += media.outerHTML;
            });
        return allHTML;
    }

    /**
     * This function hides the filter button menu and its icon 
     * if the user clicks outside the filter button and the menu
     * @param {object} e - The event object
     */
    const hideFilterMenuOnClickOutside = (e) => {
        if (e.target !== filterButton && !filterButton.contains(e.target)) {
            filterBtnOptions.classList.add("hidden");
            filterBtn.classList.add("rounded-b");
            filterIcon.classList.replace("fa-angle-up", "fa-angle-down");
        }
    }

    /**
     * This function update the like data and previous like number
     * @param {array} cardsIconLike
     * @param {array} likeData
     */
    const handleLike = (cardsIconLike, likeData) => {
        cardsIconLike.forEach(cardIconLike => {
            cardIconLike.addEventListener('click', (event) => {
                if (event.target.dataset.liked === "false") {
                    let idOfMedia = event.target.parentElement.parentElement.parentElement.dataset.id;
                    let mediaLightbox = document.querySelectorAll('.media-lightbox');

                    mediaLightbox.forEach(lightbox => {
                        if (lightbox.dataset.id == idOfMedia) {
                            lightbox.dataset.like++;
                        }
                    });

                    likeData.forEach(data => {
                        if (data.id === parseInt(idOfMedia)) {
                            event.target.parentElement.parentElement.parentElement.dataset.like++;
                            data.like++;
                            data.liked = true;
                            event.target.setAttribute('aria-pressed', 'true');
                            event.target.previousElementSibling.innerText = data.like;
                            event.target.dataset.liked = data.liked;
                        }
                    });
                    totalLikes++;
                    totalLikePriceLike.innerText = totalLikes;
                }
            });
        });
    }

    /**
     * This function get the like data of a media and return it
     * @param {object} media 
     * @param {array} likeData 
     * @returns {array} Returns an array with the like number and the liked status
     */
    const getLikeData = (media, likeData) => {
        let like = null;
        let isLiked = null;
        likeData.forEach(data => {
            if (data.id === media.id) {
                like = data.like;
                isLiked = data.liked;
            }
        });
        return [like, isLiked];
    }

    /**
     * This function manage the carrousel lightbox by reload the lightbox 
     * (media-lightbox) and after with the action parameter (close, right, left) 
     * it close or toggle the next/previous lightbox 
     * @param {html} sectionMedia - The section media
     * @param {string} action - The action to do (close, right, left)
     */
    const carrouselLightboxManager = (sectionMedia, action) => {
        let mediaLightbox = sectionMedia.querySelectorAll('.media-lightbox');
        let mediaImage = sectionMedia.querySelectorAll('.media-element .media-image');

        if (action === "close") {
            mediaImage[0].focus();
            mediaLightbox.forEach(lightbox => {
                lightbox.classList.add("hidden");
            });
        } else if (action === "right") {
            toggleNextLightbox("right", mediaLightbox);
            mediaLightbox.forEach(lightbox => {
                lightbox.querySelector('figure').focus();
            });
        } else if (action === "left") {
            toggleNextLightbox("left", mediaLightbox);
            mediaLightbox.forEach(lightbox => {
                lightbox.querySelector('figure').focus();
            });
        }
    }

    /**
     * This function add event listener on the media image to open 
     * the carrousel and open the carrousel and the lightbox
     * @param {html} sectionMedia - The section media
     */
    const handleClickOfMediaImage = (sectionMedia) => {
        let mediaLightbox = sectionMedia.querySelectorAll('.media-lightbox');
        let mediaImage = sectionMedia.querySelectorAll('.media-element .media-image');

        mediaImage.forEach(media => {
            media.addEventListener('click', () => {
                carrouselIsOpen = true;
                let idOfMedia = media.parentElement.dataset.id;
                carrousel.classList.remove("hidden");

                mediaLightbox.forEach(lightbox => {
                    if (lightbox.dataset.id == idOfMedia) {
                        lightbox.classList.remove("hidden");
                        html.style.overflowY = 'hidden';
                        lightbox.querySelector('figure').focus();
                    }
                });
            });
        });
    }

    /**
     * This function toggle the next lightbox when the user click 
     * on the right or left button
     * @param {string} direction - The direction of the toggle (right, left)
     * @param {array} mediaLightbox - The array of all media lightbox
     */
    const toggleNextLightbox = (direction, mediaLightbox) => {
        let stopLoop = false;

        mediaLightbox.forEach((lightbox, index) => {
            if (!stopLoop && !lightbox.classList.contains("hidden")) {
                lightbox.classList.add("hidden");

                let newIndex;
                if (direction === "right") {
                    newIndex = (index + 1) % mediaLightbox.length;
                } else if (direction === "left") {
                    newIndex = (index - 1 + mediaLightbox.length) % mediaLightbox.length;
                }

                mediaLightbox[newIndex].classList.remove("hidden");
                stopLoop = true;
            }
        });
    }

    /**
     * Block the focus on the carrousel when the user press tab
     * @param {KeyboardEvent} e - The event object
     */
    const handleFocusCarrousel = (e) => {
        let isTabPressed = e.key === 'Tab';

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) {
            if (document.activeElement === btnLeftLightbox) {
                mediaLightboxClose.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === mediaLightboxClose) {
                btnLeftLightbox.focus();
                e.preventDefault();
            }
        }
    }

    /**
     * Block the focus on the filter button when the user press tab
     * @param {KeyboardEvent} e - The event object 
     * @returns 
     */
    const handleFocusFilterButton = (e) => {
        let isTabPressed = e.key === 'Tab';

        if (!isTabPressed) {
            return;
        }

        if (filterBtn.getAttribute("aria-expanded") === "true") {
            if (e.shiftKey) {
                if (document.activeElement === filterBtn) {
                    filterBtnOptions.querySelectorAll('button')[2].focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === filterBtnOptions.querySelectorAll('button')[2]) {
                    filterBtn.focus();
                    e.preventDefault();
                }
            }
        }
    }

}, false);