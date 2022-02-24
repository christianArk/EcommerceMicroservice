import { ItemService } from "../services/itemService"

const products = [
    {
        name: "Iphone 11 Pro",
        description: "Refurbished Apple product",
        price: 258490,
    },
    {
        name: "Tecno Spark 7",
        description: "2GB RAM + 32GB ROM, 5000mAh, 16MP Dual Camera +8MP Selfie, Android 11, 4G, Fingerprint -Green",
        price: 58490,
    },
    {
        name: "Infinix Smart 5",
        description: "2GB RAM + 32GB ROM, 5000mAh",
        price: 58490,
    },
    {
        name: "Xiaomi Poco X3",
        description: "16MP Dual Camera +8MP Selfie, Android 11, 4G, Fingerprint",
        price: 58490,
    }
]

export const seedProducts = async () => {
    const itemService = new ItemService()
    // check if products table is empty
    let existingProducts = await itemService.getAllItems()
    if (existingProducts.length == 0)
    {
        itemService.insertMany(products)
        console.log("Products seeded!")
    }
}