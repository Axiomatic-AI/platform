-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "selectedImage" TEXT NOT NULL,
    "plotData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Model_documentId_idx" ON "Model"("documentId");

-- CreateIndex
CREATE INDEX "Model_createdAt_idx" ON "Model"("createdAt");

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
