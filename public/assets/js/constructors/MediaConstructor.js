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
    get mediaType() {
        if (this._image) {
            return `
            <img 
                src="./../assets/img/media/${this.photographerId}/${this.image}" 
                alt="Photo nommée ${this.title}"
                class="img"
            >
            `;
        } else {
            return `
            <video 
                src="./../assets/img/media/${this.photographerId}/${this.video}" 
                alt="Vidéo nommée ${this.title}"
                type="video/mp4"
                class="img">
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
        <article class="media-element" data-id="${this.id}">
            <a href="#" >
                ${this.mediaType}
            </a>
            <header>
                <h2 title="Titre : ${this.title}">${this.title}</h2>
                <p class="like">
                    <span class="number">${like}</span>
                    <i class="fa-solid fa-heart card-icon-like" data-liked="${isLiked}"></i>
                </p>
            </header>
        </article>
        `;
    }
}