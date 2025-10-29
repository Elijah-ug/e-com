import {prisma} from "../../prisma/client.js"
export const addCustomer = async(req, res)=>{
    try{
        const {email, name, cartId} = req.body;
        const existing = await prisma.buyer.findUnique({where:{email}})
        if (existing) return res.status(400).json({ message: "User already exists" });

        const customers = await prisma.buyer.create({
            data:{
                email, name
            }
        })
        console.log("created customer")
        return res.status(200).json(customers)
    }catch(error){
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}

export const loginBuyer=async(req, res)=>{
    try {
        const {email}=req.body;
        const buyer = await prisma.buyer.findUnique({where:{email}})
        if(!buyer) res.status(400).json({message: "Does not exist"});

        // TODO: issue JWT here later || hashing passwords on reg etc
        res.status(200).json({buyer, message: "Logged In"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getCustomers = async(req, res)=>{
    try{
        const customers = await prisma.buyer.findMany();
        return res.status(200).json(customers)
    }catch(error){
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}

export const getCustomer = async(req, res)=>{
    try{
        return res.status(200).json({message: "route connected"})
    }catch(error){
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}

export const updateCustomer = async(req, res)=>{
    try{
        return res.status(200).json({message: "route connected"})
    }catch(error){
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}

export const deleteCustomer = async(req, res)=>{
    try{
        return res.status(200).json({message: "route connected"})
    }catch(error){
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}