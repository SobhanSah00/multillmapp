import app from "./app";
import {prisma} from "./config/db"

const port = process.env.PORT || 3000 

const server = app.listen(port, () => {
    console.log(`server running on ${port}`);
})

process.on('SIGINT',async () => {
    await prisma.$disconnect();
    server.close(() => process.exit(0))
})