// eslint-disable-next-line no-unused-vars
class MediaConstructor {
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._image = data.image;
        this._video = data.video;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
    }

    get id() {
        return this._id;
    }
    get photographerId() {
        return this._photographerId;
    }
    get title() {
        return this._title;
    }
    get image() {
        return this._image;
    }
    get video() {
        return this._video;
    }
    get likes() {
        return this._likes;
    }
    get date() {
        return this._date;
    }
    get price() {
        return this._price;
    }

    mediaType(isModal) {
        if (this._image) {
            return `
            <img 
                src="./../assets/img/media/${this.photographerId}/${this.image}" 
                alt="${this.title}"
                title="${this.title}"
                class="media"
            >
            `;
        } else {
            return `
            <video 
                ${isModal ? "controls" : ""}
                src="./../assets/img/media/${this.photographerId}/${this.video}" 
                type="video/mp4"
                title="${this.title}"
                class="media">
            </video>
            `;
        }
    }

    /**
     * Generates an HTML card to display a media on the photographer page
     * @param {Array<number|boolean>[]} likeData - Contains likes informations
     * @param {number} likeData[].like - Number of likes for the media
     * @param {boolean} likeData[].isLiked - Is liked by the user
     * @returns {string} Template HTML
     */
    templateMediaPageInfo([like, isLiked]) {
        return `
        <article 
            class="media-element" 
            data-id="${this.id}" 
            data-like="${this.likes}" 
            data-date="${this.date}" 
            data-title="${this.title}">
            <div class="media-image">
                ${this.mediaType(false)}
            </div>
            <header>
                <h3>${this.title}</h3>
                <div class="like">
                    <p class="number">${like}</p>
                    <i class="fa-solid fa-heart card-icon-like" data-liked="${isLiked}"></i>
                </div>
            </header>
        </article>
        `;
    }

    templateMediaLightbox() {
        return `
        <div 
            class="media-lightbox hidden" 
            data-id="${this.id}"
            data-like="${this.likes}" 
            data-date="${this.date}" 
            data-title="${this.title}">
            <figure>
                ${this.mediaType(true)}
                <figcaption>${this.title}</figcaption>
            </figure>
        </div>
        `;
    }
}