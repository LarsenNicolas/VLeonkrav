const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const company = await prisma.company.create({
        data: {
            name: 'LeonKrav',
            users: {
                create: {
                    email: 'admin@leonkrav.com',
                    password: 'admin', // ⚠️ En producción, usá bcrypt
                },
            },
            products: {
                create: [
                    {
                        name: 'Monocomando black',
                        description: 'Monocomando griferia bidet con transferencia',
                        price: 8000,
                        glbUrl: '/tasteful-life.glb',
                        category: "Baño",
                        stock: 10,
                        imagesUrl: ["/bathroom.png","/bathroom.png"],
                        estilo: "moderno",
                        material: "Metal",
                        linea: "Cromo Brillante",
                        codigo: "8981",
                        tecnologia: "Cierre ceramico 40mm",
                        discount: 15,
                        alto: 10,
                        largo: 7.8,
                        diametro: 6
                    },
                    {
                        name: 'Cocina black',
                        description: 'Monocomando doble griferia moderna, extensible',
                        price: 28000,
                        glbUrl: '/kitchen-faucet.glb',
                        category: "Cocina",
                        stock: 2,
                        imagesUrl: ["/monocomand.png","/monocomand.png"],
                        estilo: "moderno",
                        material: "Metal",
                        linea: "Cromo Brillante",
                        codigo: "8982",
                        tecnologia: "Cierre ceramico 40mm",
                        discount: 15,
                        alto: 10,
                        largo: 7.8,
                        diametro: 6
                    },
                ],
            },
        },
    });

    console.log('Datos creados:', company);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
