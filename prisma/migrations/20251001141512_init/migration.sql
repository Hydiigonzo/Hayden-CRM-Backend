-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT
);

-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "domain" TEXT,
    "industry" TEXT,
    "address" TEXT
);

-- CreateTable
CREATE TABLE "Deal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "Deal_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactCompany" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contactId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "ContactCompany_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ContactCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DealContact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dealId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,
    CONSTRAINT "DealContact_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DealContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContactCompany_contactId_companyId_key" ON "ContactCompany"("contactId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "DealContact_dealId_contactId_key" ON "DealContact"("dealId", "contactId");
