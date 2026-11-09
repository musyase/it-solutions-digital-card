import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is required');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main(): Promise<void> {
  await prisma.profile.upsert({
    where: { id: 'kirill' },
    update: {},
    create: {
      id: 'kirill',
      name: 'Кирилл Колнооченко',
      description:
        'Начинающий backend-разработчик. Самостоятельно развиваю SaaS CRM Zapix и создаю инструменты автоматизации на Python. Преподаю основы мобильной разработки на Java и Kotlin.',
      githubUrl: 'https://github.com/musyase',
      skills: {
        create: [
          { id: 'typescript', name: 'TypeScript', category: 'Проекты' },
          { id: 'nestjs', name: 'NestJS', category: 'Проекты' },
          { id: 'postgresql', name: 'PostgreSQL', category: 'Работа и проекты' },
          { id: 'prisma', name: 'Prisma', category: 'Проекты' },
          { id: 'docker', name: 'Docker', category: 'Проекты' },
          { id: 'python', name: 'Python', category: 'Проекты' },
          { id: 'java', name: 'Java', category: 'Преподавание и проекты' },
          { id: 'kotlin', name: 'Kotlin', category: 'Преподавание и проекты' },
          { id: 'git', name: 'Git', category: 'Базовый уровень' },
        ],
      },
      experience: {
        create: [
          {
            id: '01-stgau',
            company: 'Ставропольский государственный аграрный университет',
            position: 'Преподаватель разработки мобильных приложений',
            period: 'с сентября 2026',
            achievements:
              'Преподаю основы Java и Kotlin более чем 100 студентам, готовлю учебные материалы и практические задания.',
          },
          {
            id: '02-stavelektroset',
            company: 'АО «Ставэлектросеть»',
            position: 'Практикант отдела АСУП',
            period: '2023–2026, семь учебных и производственных практик',
            achievements:
              'Разработал локальную автоматизацию заполнения документов для нескольких отделов; инструмент использовали ориентировочно 20–30 сотрудников. Дорабатывал БД и внутреннее ПО вместе с наставником.',
          },
        ],
      },
      projects: {
        create: [
          {
            id: 'zapix',
            name: 'Zapix',
            description:
              'Действующий собственный SaaS CRM на TypeScript, NestJS, PostgreSQL и Prisma. Реализованы авторизация, роли, изоляция данных компаний, онлайн-запись, уведомления и фоновые задачи.',
            url: 'https://github.com/musyase/zapix',
          },
          {
            id: 'student-ai-checker',
            name: 'Student AI Checker',
            description:
              'Работающий прототип проверки студенческих работ: Python, Qwen через Ollama, обработка DOCX, Pydantic, JSON Schema, пакетная обработка и pytest.',
            url: 'https://github.com/musyase/student-ai-checker',
          },
        ],
      },
    },
  });
}

main()
  .finally(async () => prisma.$disconnect())
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
