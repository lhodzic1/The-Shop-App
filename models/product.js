class Product {
    constructor(id, ownerId, title, imageUrl, description, price) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;

        console.log(id + " " + ownerId + " " + title + " " + imageUrl + " " + description + " " + price)
    }
}

export default Product;