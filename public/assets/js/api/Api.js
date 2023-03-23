class Api {
    constructor(url) {
        this._url = url;
    }

    /**
     * fetch the data from the API
     * @param {string} type 
     * @returns {(object|string)} object is data of fetch or string is error log
     */
    async get(type) {
        return fetch(this._url)
            .then((res) => {
                return res.json()
            }).then(data => {
                return data[type];
            }).catch((err) => {
                console.error("Error", err);
            });
    }
}

class PhotographersApi extends Api {
    constructor(url, type) {
        super(url);
        this._type = type;
    }

    /**
     * Return the value of get method with type parameter
     * @returns {array}
     */
    async getPhotographers() {
        return await this.get(this._type);
    }
}