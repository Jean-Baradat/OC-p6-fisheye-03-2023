// eslint-disable-next-line no-unused-vars
class PhotographerFactory {
    constructor() {
        // eslint-disable-next-line no-undef
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
                // eslint-disable-next-line no-undef
                return new PhotographerConstructor(photographer)
            });

        return photographer;
    }
}
