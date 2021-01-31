export default class Advert {
    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.price = data.price;
        this.sale = data.sale;
        this.tags = data.tags;
    }
}

export class AdvertsCollection {
    constructor() {
        this.collection = [];
    }

    get all() {
        return this.collection;
    }

    push(article) {
        this.collection.push(article);
    }
}