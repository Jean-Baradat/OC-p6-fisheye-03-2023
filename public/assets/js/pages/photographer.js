window.addEventListener("load", () => {
    // DOM --------------------------------------------------------------------------
    let headerInformations = document.querySelector('#informations');
    let headerProfilePhoto = document.querySelector('#profile-photo');
    let sectionMedia = document.querySelector('.medias');
    let filterBtnOptions = document.querySelector('#filter-btn-options');
    let filterBtn = document.querySelector('.filter-btn');
    let options = document.querySelectorAll('.option');
    let selectedFilterBtnText = document.querySelector('.selected-filter-btn-text');
    let filterButton = document.querySelector('.filter .button');
    let filterIcon = document.querySelector('#filter-icon');
    let totalLikePricePrice = document.querySelector('.total-like-price .price');
    let totalLikePriceLike = document.querySelector('.total-like-price .like');
    let contactModalName = document.querySelector('#contact_modal .name');

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


    // Asynchronous data retrieval and DOM manipulation -----------------------------
    mediaData.then((res) => {
        let allMediaHTML = "";
        const filteredMedia = res.filter(dataTest => checkPhotographerId(dataTest, "photographerId"));
        filteredMedia
            .forEach(media => {
                totalLikes += media.likes;
                likeData.push(
                    {
                        "id": media.id,
                        "like": media.likes,
                        "liked": false,
                    }
                );

                allMediaHTML += media.templateMediaPageInfo(getLikeData(media, likeData));
            });
        sectionMedia.innerHTML += allMediaHTML;
        totalLikePriceLike.innerText += totalLikes;

        let cardsIconLike = sectionMedia.querySelectorAll('.card-icon-like');
        handleLike(cardsIconLike, likeData);
    });

    photographerData.then((res) => {
        const filteredPhotographer = res.filter(dataTest => checkPhotographerId(dataTest, "id"));
        headerInformations.innerHTML += filteredPhotographer[0].templatePhotographerPageInfo();
        headerProfilePhoto.innerHTML += filteredPhotographer[0].templatePhotographerPagePhoto();
        totalLikePricePrice.innerText += filteredPhotographer[0].price;
        contactModalName.innerText += filteredPhotographer[0].name;
    });


    // EVENT ------------------------------------------------------------------------
    // Event for the filter button
    filterBtn.addEventListener('click', toggleFilterBtnMenu);
    options.forEach(option => {
        option.addEventListener('click', () => filterMediaByType(option.dataset));
    });
    // Event for the click outside the filter button and the menu
    document.addEventListener("click", (e) => hideFilterMenuOnClickOutside(e));


    // FUNCTIONS --------------------------------------------------------------------
    /**
     * Checks if a photographer ID matches the ID parameter in the URL
     * @param {object} data 
     * @param {string} nameId 
     * @returns {boolean} Returns true if the ID in the data object 
     * matches the ID parameter in the URL, otherwise false
     */
    function checkPhotographerId(data, nameId) {
        return data[nameId] == new URLSearchParams(window.location.search).get("id");
    }

    /**
     * Toggles the visibility and style of the filter button menu and its icon
     * @returns {void}
     */
    function toggleFilterBtnMenu() {
        filterBtnOptions.classList.toggle("hidden");
        filterBtn.classList.toggle("rounded-b");
        filterIcon.classList.toggle("fa-angle-down");
        filterIcon.classList.toggle("fa-angle-up");
    }

    /**
     * This function sort the media by popularity, date or title
     * @param {object} dataAttributes - The data attributes of the clicked option
     */
    function filterMediaByType(dataAttributes) {
        sectionMedia.innerText = "";
        let allMediaHTML = "";
        toggleFilterBtnMenu();
        selectedFilterBtnText.innerHTML = dataAttributes.content;
        mediaData.then((res) => {
            const filteredMedia = res.filter(dataTest => checkPhotographerId(dataTest, "photographerId"));
            [...filteredMedia]
                .sort((a, b) => {
                    if (dataAttributes.type == "popularity") {
                        return b.likes - a.likes;
                    } else if (dataAttributes.type == "date") {
                        return new Date(b.date) - new Date(a.date);
                    } else if (dataAttributes.type == "title") {
                        return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
                    }
                })
                .forEach(media => {
                    allMediaHTML += media.templateMediaPageInfo(getLikeData(media, likeData));
                });
            sectionMedia.innerHTML = allMediaHTML;
            let cardsIconLike = sectionMedia.querySelectorAll('.card-icon-like');
            handleLike(cardsIconLike, likeData);
        });
    }

    /**
     * This function hides the filter button menu and its icon 
     * if the user clicks outside the filter button and the menu
     * @param {object} e - The event object
     */
    function hideFilterMenuOnClickOutside(e) {
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
    function handleLike(cardsIconLike, likeData) {
        cardsIconLike.forEach(cardIconLike => {
            cardIconLike.addEventListener('click', (event) => {
                if (event.target.dataset.liked === "false") {
                    let idOfMedia = event.target.parentElement.parentElement.parentElement.dataset.id;

                    likeData.forEach(data => {
                        if (data.id === parseInt(idOfMedia)) {
                            data.like++;
                            data.liked = true;
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
    function getLikeData(media, likeData) {
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

}, false);