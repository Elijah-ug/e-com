import { prisma } from "../../prisma/client.js";

export const addSeller = async (req, res) => {
  try {
    const {name, email} = req.body
    const newSeller = await prisma.seller.create({
        data:{
            name, email
        }
    })
    console.log("New seller =>", newSeller)
     return res.status(200).json({data: newSeller, message: "✅ Seller created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getSellers = async (req, res) => {
  try {
     const sellers = await prisma.seller.findMany()
     res.status(200).json({data: sellers, message: "✅ Data fetched successifully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getSeller = async (req, res) => {
  try {
    const sellerId = parseInt(req.params.id);
    const seller = await prisma.seller.findUnique({
      where:{id: sellerId}
    })
    return res.status(200).json({data: seller, message: "✅ Seller fetched" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateSeller = async (req, res) => {
  try {
     const sellerId = parseInt(req.params.id)
        const {name, email} = req.body;
        const seller = prisma.seller.update({
            where:{id: sellerId},
            data:{
                name, email
            }
        })
    return res.status(200).json({update: seller, message: "✅ seller updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSeller = async (req, res) => {
  try {
    const sellerId = parseInt(req.params.id)
    const removed = await prisma.seller.delete({
      where:{id: sellerId}
    })
    return res.status(200).json({data: removed, message: "✅  Seller deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
