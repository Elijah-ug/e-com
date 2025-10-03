import {prisma} from "../../prisma/client.js"
export const addCustomer = async(req, res)=>{
    try{
        const {email, name, cartId} = req.body;
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