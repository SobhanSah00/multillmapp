import { Request,Response } from "express";

export const handleLLMQuery = async (req : Request,res : Response) => {
    const {prompt,models} = req.body;

    if(!prompt || !Array.isArray(models) || models.length === 0) {
        return res.status(400).json({
            error : "Prompt and models are required ."
        })
    }

    try {
        const results = await callLLms(prompt,models);
        res.json({
            prompt,results
        })
    } catch (error) {
        res.status(500).json({ error: "Something went wrong with llm query." });
    }
}