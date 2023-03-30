window.addEventListener("load", () => {
    // DOM
    let headerInformations = document.querySelector('#informations');
    let headerProfilePhoto = document.querySelector('#profile-photo');

    // initialize the PhotographerFactory and execute the main method to get the data
    let photographerFactory = new PhotographerFactory();
    let data = photographerFactory.main();

    data.then((res) => {
        const filteredPhotographer = res.filter(checkPhotographerId);
        headerInformations.innerHTML += filteredPhotographer[0].templatePhotographerPageInfo()
        headerProfilePhoto.innerHTML += filteredPhotographer[0].templatePhotographerPagePhoto()
    });

    // Functions
    /**
     * This function check if id in query is equal to one of photographer
     * @param {object} photographer 
     * @returns {boolean} true/false condition for the filter
     */
    function checkPhotographerId(photographer) {
        return photographer.id == getQueryId();
    }

    /**
     * This function get the id in the url query
     * @returns {string} the id in query
     */
    function getQueryId() {
        return new URLSearchParams(window.location.search).get("id");
    }

}, false);