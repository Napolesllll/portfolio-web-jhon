import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Limpiar datos existentes (solo en desarrollo)
  await prisma.reaction.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.project.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuario admin
  const hashedPassword = await hash("admin123", 12);
  const admin = await prisma.user.create({
    data: {
      name: "Jhon Cano",
      email: "canojhon148@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  console.log("✅ Usuario admin creado");

  // Crear categorías
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Desarrollo Web",
        slug: "desarrollo-web",
        description: "Artículos sobre desarrollo web moderno",
        color: "#3b82f6",
      },
    }),
    prisma.category.create({
      data: {
        name: "React & Next.js",
        slug: "react-nextjs",
        description: "Todo sobre React y Next.js",
        color: "#8b5cf6",
      },
    }),
    prisma.category.create({
      data: {
        name: "TypeScript",
        slug: "typescript",
        description: "Guías y tips de TypeScript",
        color: "#06b6d4",
      },
    }),
    prisma.category.create({
      data: {
        name: "Backend",
        slug: "backend",
        description: "Node.js, APIs y bases de datos",
        color: "#10b981",
      },
    }),
  ]);

  console.log("✅ Categorías creadas");

  // Crear tags
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: "Next.js", slug: "nextjs" } }),
    prisma.tag.create({ data: { name: "React", slug: "react" } }),
    prisma.tag.create({ data: { name: "TypeScript", slug: "typescript" } }),
    prisma.tag.create({ data: { name: "Tailwind CSS", slug: "tailwind" } }),
    prisma.tag.create({ data: { name: "Prisma", slug: "prisma" } }),
    prisma.tag.create({ data: { name: "API", slug: "api" } }),
    prisma.tag.create({ data: { name: "Tutorial", slug: "tutorial" } }),
    prisma.tag.create({ data: { name: "Performance", slug: "performance" } }),
  ]);

  console.log("✅ Tags creados");

  // Crear posts de ejemplo
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: "Cómo construir un blog moderno con Next.js 15 y Prisma",
        slug: "blog-nextjs-15-prisma",
        excerpt:
          "Aprende a crear un blog profesional desde cero usando las últimas tecnologías web.",
        content: `
          <h2>Introducción</h2>
          <p>En este tutorial, vamos a construir un blog completo usando Next.js 15, Prisma y PostgreSQL.</p>
          
          <h2>Requisitos previos</h2>
          <ul>
            <li>Node.js 18+</li>
            <li>Conocimientos básicos de React</li>
            <li>PostgreSQL instalado</li>
          </ul>
          
          <h2>Configuración inicial</h2>
          <p>Primero, creamos nuestro proyecto con el siguiente comando:</p>
          <pre><code>npx create-next-app@latest mi-blog</code></pre>
          
          <h2>Instalando Prisma</h2>
          <p>Prisma es un ORM moderno que nos facilita trabajar con bases de datos:</p>
          <pre><code>npm install @prisma/client
npm install -D prisma</code></pre>
          
          <h2>Conclusión</h2>
          <p>Con estas herramientas, podemos crear aplicaciones web modernas y escalables.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
        published: true,
        publishedAt: new Date(),
        readingTime: 8,
        views: 145,
        authorId: admin.id,
        categoryId: categories[1].id,
        tags: {
          connect: [{ id: tags[0].id }, { id: tags[2].id }, { id: tags[4].id }],
        },
      },
    }),
    prisma.post.create({
      data: {
        title: "10 tips para mejorar el performance en React",
        slug: "tips-performance-react",
        excerpt:
          "Optimiza tus aplicaciones React con estas técnicas probadas en producción.",
        content: `
          <h2>Introducción</h2>
          <p>El performance es crucial en aplicaciones web modernas. Aquí te comparto 10 tips.</p>
          
          <h2>1. Usa React.memo sabiamente</h2>
          <p>React.memo previene re-renders innecesarios en componentes funcionales.</p>
          
          <h2>2. Implementa lazy loading</h2>
          <p>Carga componentes solo cuando los necesites con React.lazy().</p>
          
          <h2>3. Optimiza imágenes</h2>
          <p>Usa Next.js Image para optimización automática de imágenes.</p>
          
          <p>... y 7 tips más en el artículo completo.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
        published: true,
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Hace 7 días
        readingTime: 6,
        views: 89,
        authorId: admin.id,
        categoryId: categories[1].id,
        tags: {
          connect: [{ id: tags[1].id }, { id: tags[7].id }],
        },
      },
    }),
    prisma.post.create({
      data: {
        title: "TypeScript: De básico a avanzado en 30 días",
        slug: "typescript-basico-avanzado",
        excerpt:
          "Una guía completa para dominar TypeScript y llevar tu código al siguiente nivel.",
        content: `
          <h2>¿Por qué TypeScript?</h2>
          <p>TypeScript añade tipos estáticos a JavaScript, previniendo errores antes de ejecutar el código.</p>
          
          <h2>Semana 1: Fundamentos</h2>
          <p>Tipos básicos, interfaces y type aliases.</p>
          
          <h2>Semana 2: Tipos avanzados</h2>
          <p>Generics, utility types y type guards.</p>
          
          <h2>Semana 3: Patrones de diseño</h2>
          <p>Decorators, mixins y patrones comunes.</p>
          
          <h2>Semana 4: Proyecto real</h2>
          <p>Construyendo una API REST con TypeScript y Express.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200",
        published: true,
        publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // Hace 14 días
        readingTime: 12,
        views: 234,
        authorId: admin.id,
        categoryId: categories[2].id,
        tags: {
          connect: [{ id: tags[2].id }, { id: tags[6].id }],
        },
      },
    }),
    prisma.post.create({
      data: {
        title: "Construyendo APIs RESTful con Node.js y Prisma",
        slug: "apis-restful-nodejs-prisma",
        excerpt:
          "Aprende a crear APIs escalables y type-safe con las mejores prácticas.",
        content: `
          <h2>Arquitectura de la API</h2>
          <p>Vamos a crear una API REST siguiendo los principios de diseño RESTful.</p>
          
          <h2>Setup del proyecto</h2>
          <p>Configuración de Express, Prisma y TypeScript.</p>
          
          <h2>Rutas y controladores</h2>
          <p>Organización del código en capas para mejor mantenibilidad.</p>
          
          <h2>Validación y manejo de errores</h2>
          <p>Usando Zod para validación type-safe de datos.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
        published: false, // Draft
        readingTime: 15,
        views: 0,
        authorId: admin.id,
        categoryId: categories[3].id,
        tags: {
          connect: [{ id: tags[4].id }, { id: tags[5].id }],
        },
      },
    }),
  ]);

  console.log("✅ Posts creados");

  // Crear proyectos
  await Promise.all([
    prisma.project.create({
      data: {
        title: "E-commerce Platform",
        slug: "ecommerce-platform",
        description:
          "Plataforma de e-commerce completa con panel de administración, pasarela de pagos y sistema de inventario.",
        content: `
          <h2>Problema</h2>
          <p>Una empresa necesitaba migrar su tienda física a digital con una solución escalable.</p>
          
          <h2>Solución</h2>
          <p>Desarrollé una plataforma completa usando Next.js, Stripe y PostgreSQL.</p>
          
          <h2>Resultados</h2>
          <ul>
            <li>+150% en ventas mensuales</li>
            <li>Tiempo de carga: 1.2s</li>
            <li>99.9% uptime</li>
          </ul>
        `,
        coverImage: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200",
        images: [],
        stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
        liveUrl: "https://example-ecommerce.com",
        githubUrl: "https://github.com/jhoncano/ecommerce",
        featured: true,
        status: "COMPLETED",
        order: 1,
        metrics: {
          users: "5000+",
          performance: "98/100",
          revenue: "+150%",
        },
      },
    }),
    prisma.project.create({
      data: {
        title: "Task Management SaaS",
        slug: "task-management-saas",
        description:
          "Aplicación SaaS para gestión de tareas con colaboración en tiempo real.",
        content: `
          <h2>Características</h2>
          <p>Sistema de tareas con tableros Kanban, asignaciones y notificaciones en tiempo real.</p>
          
          <h2>Tech Stack</h2>
          <p>Next.js, Socket.IO, Prisma, PostgreSQL y Redis para caché.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
        images: [],
        stack: ["Next.js", "Socket.IO", "Prisma", "Redis", "PostgreSQL"],
        liveUrl: "https://example-tasks.com",
        featured: true,
        status: "IN_PROGRESS",
        order: 2,
        metrics: {
          users: "1200+",
          uptime: "99.9%",
        },
      },
    }),
  ]);

  console.log("✅ Proyectos creados");

  console.log("🎉 Seed completado!");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });