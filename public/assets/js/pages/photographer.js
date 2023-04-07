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

    /*
        Initialize the PhotographerFactory and execute the main 
        method to get the data (in photographerData)
    */
    let photographerFactory = new PhotographerFactory();
    let photographerData = photographerFactory.main();
    /*
        Initialize the MediaFactory and execute the main method 
        to get the data (in mediaData)
    */
    let mediaFactory = new MediaFactory();
    let mediaData = mediaFactory.main();


    // Variables --------------------------------------------------------------------
    let totalLikes = 0;


    // Asynchronous data retrieval and DOM manipulation -----------------------------
    mediaData.then((res) => {
        const filteredMedia = res.filter(dataTest => checkPhotographerId(dataTest, "photographerId"));
        filteredMedia
            .forEach(media => {
                totalLikes += media.likes;
                sectionMedia.innerHTML += media.templateMediaPageInfo();
            });
        totalLikePriceLike.innerHTML += filteredMedia[0].templateOfTotalLikes(totalLikes);
    });

    photographerData.then((res) => {
        const filteredPhotographer = res.filter(dataTest => checkPhotographerId(dataTest, "id"));
        headerInformations.innerHTML += filteredPhotographer[0].templatePhotographerPageInfo();
        headerProfilePhoto.innerHTML += filteredPhotographer[0].templatePhotographerPagePhoto();
        totalLikePricePrice.innerHTML += filteredPhotographer[0].templateOfPrice();
    });


    // Event ------------------------------------------------------------------------
    // Event for the filter button
    filterBtn.addEventListener('click', toggleFilterBtnMenu);
    options.forEach(option => {
        option.addEventListener('click', () => filterMediaByType(option.dataset));
    });
    // Event for the click outside the filter button and the menu
    document.addEventListener("click", (e) => hideFilterMenuOnClickOutside(e));


    // Functions --------------------------------------------------------------------
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
        sectionMedia.innerHTML = "";
        toggleFilterBtnMenu();
        selectedFilterBtnText.innerHTML = dataAttributes.content;
        mediaData.then((res) => {
            const filteredMedia = res.filter(dataTest => checkPhotographerId(dataTest, "photographerId"));
            filteredMedia
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
                    sectionMedia.innerHTML += media.templateMediaPageInfo();
                });
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

}, false);