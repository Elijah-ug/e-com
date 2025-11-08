import { prisma } from "../../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const addCustomer = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const existing = await prisma.buyer.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "User already exists" });
    const hashedPwd = await bcrypt.hash(password, 10);
    console.log("hashed password==>", hashedPwd, +" password==>", password);

    const customer = await prisma.buyer.create({
      data: {
        email,
        name,
        password: hashedPwd,
      },
    });
    // create a jwt token

    return res.status(200).json({ message: "Created User", buyer: customer, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const loginBuyer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const buyer = await prisma.buyer.findUnique({ where: { email } });
    if (!buyer) res.status(400).json({ message: "Does not exist" });
    const isPwdValid = await bcrypt.compare(password, buyer.password);
    if (!isPwdValid) return res.status(400).json({ Error: "Invalid Password" });
    // jwt token
    const token = jwt.sign({ id: buyer.id, email: buyer.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    // TODO: issue JWT here later || hashing passwords on reg etc
    res.status(200).json({ user: buyer, message: "✅ Login successful", accessToken: token, role: "buyer" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.buyer.findMany();
    return res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("buyerId here==>", userId, typeof userId);
    const user = await prisma.buyer.findUnique({
      where: {
        id: userId,
      },
    });
    const { password, ...safeUser } = user;
    return res.status(200).json({ message: "User's data fetched", data: safeUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    return res.status(200).json({ message: "route connected" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    return res.status(200).json({ message: "route connected" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
