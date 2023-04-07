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
                alt="${this.title}"
                title="${this.title}"
                class="img"
            >
            `;
        } else {
            return `
            <video 
                src="./../assets/img/media/${this.photographerId}/${this.video}" 
                type="video/mp4"
                title="${this.title}"
                class="img">
            </video>
            `;
        }
    }

    /**
     * Generates an HTML card to display a media
     * @returns {string} Template HTML
     */
    templateMediaPageInfo() {
        return `
        <article class="media-element">
            <a href="#" >
                ${this.mediaType}
            </a>
            <header>
                <h3>${this.title}</h3>
                <div class="like">
                    <p>${this.likes}</p>
                    <i class="fa-solid fa-heart"></i>
                </div>
            </header>
        </article>
        `;
    }

    /**
     * Template of total likes in photographer profile page
     * @param {number} totalLikes - Total likes of the photographer
     * @returns {string} Template HTML
     */
    templateOfTotalLikes(totalLikes) {
        return `
        <p>${totalLikes}</p>
        <i class="fa-solid fa-heart"></i>
        `;
    }

}