class PhotographerFactory {
    constructor() {
        this.PhotographersApi = new PhotographersApi('./../../../data/photographers.json', "photographers")
    }

    /**
     * Map in array all "photographers" (PhotographersData) with the constructor
     * @returns {object} "photographer" is an array of call API
     */
    async main() {
        const PhotographersData = await this.PhotographersApi.getPhotographers();

        let photographer = PhotographersData
            .map(photographer => {
                return new PhotographerConstructor(photographer)
            });

        return photographer;
    }
}
