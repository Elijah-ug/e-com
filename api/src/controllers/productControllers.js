import { prisma } from "../../prisma/client.js";
import { notificationQueue } from "../jobs/notificationQueue.js";
export const addProduct = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const { name, description, price } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        image: req.uploadedFileUrl,
        description,
        price: parseFloat(price),
        owner: {
          connect: { id: parseInt(ownerId) },
        },
      },
      include: {
        owner: true,
      },
    });
    // get the owner's lat and lon
    const owner = await prisma.seller.findUnique({
      where: { id: ownerId },
    });
    console.log("Owner or creator==>", owner);
    // create a job to the que
    await notificationQueue.add("notifications", {
      productId: product.id,
      sellerLat: owner.latitude,
      sellerLon: owner.longitude,
    });
    console.log("added a notificationQue", product.id, owner.latitude, owner.longitude);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    // get query params {default: page=1, limit=10}
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      where: { ownerId: { gt: 0 } },
      orderBy: { createdAt: "asc" },
    });
    console.log("paginated products==>", products);
    // count total for frontend pagination UI
    const total = await prisma.product.count({
      where: { ownerId: { gt: 0 } },
    });
    const pages = Math.ceil(total / limit);
    // nav links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
    const nextPage = `${baseUrl}?page=${page + 1}&limit=${limit}`;
    const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null;

    res.status(200).json({
      currentPage: page, 
      lim: limit,
      totalProducts: total,
      totalPages: pages,
      next: nextPage,
      prev: prevPage,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }
    const search = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    console.log("Hello world ==>", req.query); // ✅ shows search query
    console.log("Hello world ==>", req.params); // ✅ shows route params
    console.log("Hello world ==>", req.body); // ✅ if it’s a POST

    return res.status(200).json(search);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.product);
    const newProduct = await prisma.product.findUnique({
      where: { id },
      include: { owner: true },
    });
    // console.log("productId ==>", id, "product==>", newProduct);
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, image, description, price } = req.body;
    const update = prisma.product.update({
      where: { id: productId },
      data: {
        name,
        image,
        description,
        price: parseFloat(price),
      },
    });
    res.status(200).json({ data: update, message: "Product connected" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });
    res.status(200).json({ deleted: deletedProduct, message: "Product connected" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
