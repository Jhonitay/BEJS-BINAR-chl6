const {PrismaClient} = require('@prisma/client'),
    prisma = new PrismaClient()

module.exports = {
    seniman : prisma.seniman,
    product : prisma.product
}