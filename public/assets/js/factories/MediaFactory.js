class MediaFactory {
    constructor() {
        this.PhotographersApi = new PhotographersApi('./../../../data/photographers.json', "media")
    }

    /**
     * Fetches media data from the PhotographersApi and returns a 
     * collection of MediaConstructor objects.
     * @async
     * @returns {Promise<MediaConstructor[]>} A promise that resolves to 
     * an array of MediaConstructor objects.
     */
    async main() {
        const Mediasdata = await this.PhotographersApi.getPhotographers();

        let media = Mediasdata
            .map(media => {
                return new MediaConstructor(media)
            });

        return media;
    }
}