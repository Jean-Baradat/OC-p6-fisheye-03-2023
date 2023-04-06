class MediaFactory {
    constructor() {
        this.PhotographersApi = new PhotographersApi('./../../../data/photographers.json', "media")
    }

    /**
     *
     * @returns {object}
     */
    async main() {
        const Mediasdata = await this.PhotographersApi.getPhotographers();

        let media = Mediasdata
            .map(media => {
                return new MediaConstructor(media)
            });

        // console.log(media);

        return media;
    }
}