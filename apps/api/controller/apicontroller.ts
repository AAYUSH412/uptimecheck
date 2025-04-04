import { Request, Response } from 'express';
import { prismaclient } from "db/client"


export const postWebsite = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { url } = req.body;

    if (!userId) {
        res.status(401).send("Unauthorized");
        return;
    }

     const data=await prismaclient.website.create({
        data: {
            userId,
            url
        }
    })

    res.json({ id:data.id });
};

export const getWebsite = async (req: Request, res: Response) => {
    const userId = req.userId;
    
    // If the websiteId is provided as a query parameter, fetch that specific website
    // Otherwise, fetch all websites for the user
    if (req.query.websiteid) {
        const websiteId = req.query.websiteid as string;
        
        const data = await prismaclient.website.findFirst({
            where: {
                id: websiteId,
                userId,
                disabled: false
            },
            include: {
                ticks: true
            }
        });
        
        if (!data) {
            res.status(404).send("Not Found");
            return;
        }
        
        res.json(data);
    } else {
        // Fetch all websites for the user
        const websites = await prismaclient.website.findMany({
            where: {
                userId,
                disabled: false
            },
            include: {
                ticks: true
            }
        });
        
        res.json(websites);
    }
};

export const getWebsiteStatus = async (req: Request, res: Response) => {
    const userId = req.userId;

    const websites= await prismaclient.website.findMany({
        where:{
            userId,
            disabled:false
        },
        include:{
            ticks : true
        }
    })

    res.json(websites);
};

export const deleteWebsite = async (req: Request, res: Response) => {
    const userId = req.userId;
    const websiteId = req.query.websiteid! as unknown as string;

    await prismaclient.website.update({
        where:{
            id:websiteId,
            userId
        },
        data:{
            disabled:true
        }
    });
    res.json({ message: "Website Deleted" });
};