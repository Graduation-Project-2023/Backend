-- CreateTable
CREATE TABLE "payments" (
    "id" INTEGER NOT NULL,
    "student" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isRefunded" BOOLEAN NOT NULL,
    "isVoided" BOOLEAN NOT NULL,
    "order_id" INTEGER NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);
