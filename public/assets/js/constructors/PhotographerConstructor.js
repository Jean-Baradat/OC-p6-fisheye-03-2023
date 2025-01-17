// eslint-disable-next-line no-unused-vars
class PhotographerConstructor {
    constructor(data) {
        this._name = data.name;
        this._id = data.id;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = data.portrait;
    }

    get name() {
        return this._name;
    }
    get id() {
        return this._id;
    }
    get city() {
        return this._city;
    }
    get country() {
        return this._country;
    }
    get tagline() {
        return this._tagline;
    }
    get price() {
        return this._price;
    }
    get portrait() {
        return `assets/img/profile-photo/${this._portrait}`;
    }


    /**
     * Template of the photographer profile card
     * @returns {string} Template HTML
     */
    templatePhotographerCard() {
        return `
        <article>
            <a href="./pages/photographer.html?id=${this.id}">
                <img src="./${this.portrait}" alt="Photo de profil de ${this.name}">
                <h2>${this.name}</h2>
                <p class="info">
                    <span class="locate">
                        ${this.city}, ${this.country}
                    </span>
                    <span class="tagline">
                        ${this.tagline}
                    </span>
                    <span class="price">
                        ${this.price}€/jour
                    </span>
                </p>
            </a>
        </article>
        `;
    }

    /**
     * Template of infos in photographer profile page
     * @returns {string} Template HTML
     */
    templatePhotographerPageInfo() {
        return `
        <h1 class="photographer-h1">${this.name}</h1>
        <p class="photographer-info">
            <span class="locate">
                ${this.city}, ${this.country}
            </span>
            <span class="tagline">
                ${this.tagline}
            </span>
        </p>
        `;
    }

    /**
     * Template of photo in photographer profile page
     * @returns {string} Template HTML
     */
    templatePhotographerPagePhoto() {
        return `
        <img src="./../${this.portrait}" alt="Photo de profil de ${this.name}">
        `;
    }
}