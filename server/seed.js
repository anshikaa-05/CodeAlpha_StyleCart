const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");

dotenv.config();

// ==============================
// CONNECT DATABASE
// ==============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// ==============================
// PRODUCT DATA
// ==============================

const products = [
  {
    name: "Classic T-Shirt",
    price: 999,
    image: "images/tshirt.png",
    category: "Men",
    description: "Premium cotton classic fit t-shirt.",
    stock: 100,
  },

  {
    name: "Denim Jacket",
    price: 2499,
    image: "images/jacket.png",
    category: "Men",
    description: "Stylish blue denim jacket.",
    stock: 60,
  },

  {
    name: "Running Shoes",
    price: 3499,
    image: "images/shoes.png",
    category: "Footwear",
    description: "Comfortable lightweight running shoes.",
    stock: 80,
  },

  {
    name: "Oversized Hoodie",
    price: 1999,
    image: "images/hoodie.png",
    category: "Women",
    description: "Soft oversized hoodie for everyday wear.",
    stock: 70,
  },

  {
    name: "Cargo Pants",
    price: 1799,
    image: "images/cargo.png",
    category: "Men",
    description: "Relaxed fit cargo pants with multiple pockets.",
    stock: 55,
  },

  {
    name: "Leather Backpack",
    price: 2899,
    image: "images/bag.png",
    category: "Accessories",
    description: "Premium leather backpack for work and travel.",
    stock: 35,
  },

  {
    name: "Women's Sneakers",
    price: 2799,
    image: "images/sneakers.png",
    category: "Footwear",
    description: "Trendy sneakers for everyday comfort.",
    stock: 65,
  },

  {
    name: "Luxury Watch",
    price: 4999,
    image: "images/watch.png",
    category: "Accessories",
    description: "Elegant stainless steel wrist watch.",
    stock: 20,
  }
];

// ==============================
// INSERT DATA
// ==============================

async function seedDatabase() {
  try {
    await Product.deleteMany();

    console.log("🗑 Old products removed");

    await Product.insertMany(products);

    console.log("✅ Products inserted successfully!");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedDatabase();