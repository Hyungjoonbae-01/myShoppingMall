const productController = {};
const Product = require("../model/Product");
const PAGE_SIZE = 4;
const LANDING_PAGE_SIZE = 12;

productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;
    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    });
    const exists = await Product.exists({ sku });
    if (exists)
      throw new Error("This Sku already exists. Try a different SKU.");
    await product.save();
    res.status(200).json({ status: "success", product });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

productController.getProducts = async (req, res) => {
  try {
    const { page, name, category } = req.query;
    let cond = {};

    // Add name filter if provided
    if (name) {
      cond.name = { $regex: name, $options: "i" };
    }

    // Add category filter if provided
    if (category) {
      // Convert category to lowercase to match stored data
      const categoryLower = category.toLowerCase();
      // Use $in to match any product that has this category in its category array
      cond.category = { $in: [categoryLower] };
    }

    let query = Product.find(cond);
    let response = { status: "success" };

    if (page) {
      if (category !== "") {
        query.skip((page - 1) * LANDING_PAGE_SIZE).limit(LANDING_PAGE_SIZE);
        const totalItemNum = await Product.countDocuments(cond);
        const totalPageNum = Math.ceil(totalItemNum / LANDING_PAGE_SIZE);
        response.totalPageNum = totalPageNum;
        response.currentPage = parseInt(page);
        response.totalItems = totalItemNum;
      } else {
        query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
        const totalItemNum = await Product.countDocuments(cond);
        const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
        response.totalPageNum = totalPageNum;
        response.currentPage = parseInt(page);
        response.totalItems = totalItemNum;
      }
    } else {
      // When no page is specified, get all products and set default pagination
      const totalItemNum = await Product.countDocuments(cond);
      response.totalPageNum = 1;
      response.currentPage = 1;
      response.totalItems = totalItemNum;
    }

    const productList = await query.exec();
    response.data = productList;
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getProducts:", error);
    res.status(400).json({ status: "fail", message: error.message });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      sku,
      name,
      size,
      image,
      price,
      description,
      category,
      stock,
      status,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      { sku, name, size, image, price, description, category, stock, status },
      { new: true }
    );
    if (!product) throw new Error("item doesn't exist");
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

productController.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) throw new Error("failed to delete the item.");
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

productController.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) throw new Error("failed to get the item.");
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

productController.checkStock = async (item, { session }) => {
  const product = await Product.findById(item.productId).session(session);
  if (product.stock[item.size] < item.qty) {
    return {
      isVerify: false,
      message: `${product.name}'s size ${item.size} is out of sotck.`,
    };
  }
  const newStock = { ...product.stock };
  newStock[item.size] -= item.qty;
  product.stock = newStock;

  await product.save({ session });
  return { isVerify: true };
};

productController.checkItemListStock = async (itemList, { session }) => {
  const insufficientStockItems = [];
  await Promise.all(
    itemList.map(async (item) => {
      const stockCheck = await productController.checkStock(item, { session });
      if (!stockCheck.isVerify) {
        insufficientStockItems.push({ item, message: stockCheck.message });
      }
      return stockCheck;
    })
  );

  return insufficientStockItems;
};

module.exports = productController;
