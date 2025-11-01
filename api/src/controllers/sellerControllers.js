import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/client.js";
import bcrypt from "bcrypt";

export const addSeller = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isAvailable = await prisma.seller.findUnique({
      where: { email },
    });
    if (isAvailable) return res.status(400).json({ Error: "User Exists" });
    const hashedPwd = await bcrypt.hash(password, 10);

    const newSeller = await prisma.seller.create({
      data: {
        name,
        email,
        password: hashedPwd,
      },
    });

    console.log("New seller =>", newSeller);
    return res.status(200).json({ data: newSeller, message: "✅ Seller created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getSellers = async (req, res) => {
  try {
    const sellers = await prisma.seller.findMany();
    res.status(200).json({ data: sellers, message: "✅ Data fetched successifully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const loginSeller = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUserAvailable = await prisma.seller.findUnique({
      where: { email },
    });
    if (!isUserAvailable) return res.status(400).json({ Error: "User Exists" });
    const isValidPwd = await bcrypt.compare(password, isUserAvailable.password);
    if (!isValidPwd) return res.status(401).json({ Error: "Invalid Password" });
    const loginToken = jwt.sign({ id: isUserAvailable.id, email: isUserAvailable.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ data: isUserAvailable, message: "✅ Login successful", accessToken: loginToken });
    console.log("loginToken==>", loginToken);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getSeller = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const seller = await prisma.seller.findUnique({
      where: { id: sellerId },
    });
    const { password, ...safeSeller } = seller;
    return res.status(200).json({ data: safeSeller, message: "✅ Seller fetched" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateSeller = async (req, res) => {
  try {
    const sellerId = parseInt(req.params.id);
    const { name, email } = req.body;
    const seller = prisma.seller.update({
      where: { id: sellerId },
      data: {
        name,
        email,
      },
    });
    return res.status(200).json({ update: seller, message: "✅ seller updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSeller = async (req, res) => {
  try {
    const sellerId = parseInt(req.params.id);
    const removed = await prisma.seller.delete({
      where: { id: sellerId },
    });
    return res.status(200).json({ data: removed, message: "✅  Seller deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
