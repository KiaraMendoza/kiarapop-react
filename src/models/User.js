export default class User {
    constructor(data) {
        this._id = data._id;
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
    }
}

export default class UsersCollection {
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