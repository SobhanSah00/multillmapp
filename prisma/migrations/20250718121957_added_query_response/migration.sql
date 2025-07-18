-- CreateTable
CREATE TABLE "Query" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LLMresponse" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "queryId" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LLMresponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LLMresponse" ADD CONSTRAINT "LLMresponse_queryId_fkey" FOREIGN KEY ("queryId") REFERENCES "Query"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
