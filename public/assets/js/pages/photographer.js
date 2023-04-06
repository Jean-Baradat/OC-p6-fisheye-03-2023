window.addEventListener("load", () => {
    // DOM
    let headerInformations = document.querySelector('#informations');
    let headerProfilePhoto = document.querySelector('#profile-photo');
    let sectionMedia = document.querySelector('.medias');

    // initialize the PhotographerFactory and 
    // execute the main method to get the data (in photographerData)
    let photographerFactory = new PhotographerFactory();
    let photographerData = photographerFactory.main();
    // initialize the MediaFactory and execute the main method to get the data (in mediaData)
    let mediaFactory = new MediaFactory();
    let mediaData = mediaFactory.main();

    mediaData.then((res) => {
        const filteredMedia = res.filter(dataTest => checkPhotographerId(dataTest, "photographerId"));
        filteredMedia.forEach(element => {
            sectionMedia.innerHTML += element.templateMediaPageInfo();
        });
    });

    photographerData.then((res) => {
        const filteredPhotographer = res.filter(dataTest => checkPhotographerId(dataTest, "id"));
        headerInformations.innerHTML += filteredPhotographer[0].templatePhotographerPageInfo();
        headerProfilePhoto.innerHTML += filteredPhotographer[0].templatePhotographerPagePhoto();
    });

    // Functions
    /**
     * This function check if id in query is equal to one of photographerData id or 
     * mediaData photographerId
     * @param {object} data 
     * @param {string} nameId 
     * @returns {boolean} true/false condition for the filter
     */
    function checkPhotographerId(data, nameId) {
        return data[nameId] == getQueryId();
    }

    /**
     * This function get the id in the url query
     * @returns {string} the id in query
     */
    function getQueryId() {
        return new URLSearchParams(window.location.search).get("id");
    }

}, false);