import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is required');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const projects = [
  {
    id: 'zapix',
    name: 'Zapix',
    description:
      'Собственная CRM для онлайн-записи. Пишу backend на TypeScript, NestJS, Prisma и PostgreSQL. Есть авторизация, роли, изоляция данных компаний, уведомления и фоновые задачи.',
    url: 'https://zapixapp.ru',
  },
  {
    id: 'student-ai-checker',
    name: 'Student AI Checker',
    description:
      'Прототип проверки студенческих работ на Python. Разбирает DOCX, запускает Qwen через Ollama, обрабатывает работы пакетами. Есть очередь ручной проверки.',
    url: 'https://github.com/musyase/student-ai-checker',
  },
  {
    id: 'stav-electroset-app',
    name: 'Android-приложение для АО «Ставэлектросеть»',
    description:
      'Дипломный проект на Java. Использовал Room, Retrofit, OkHttp, Gson и Jsoup; есть авторизация, профиль и раздел администратора.',
    url: 'https://github.com/musyase/stav-electroset-app',
  },
];

const experience = [
  {
    id: '00-zapix',
    company: 'Zapix (собственный проект)',
    position: 'Разработчик',
    period: 'действующий проект',
    achievements:
      'Разрабатываю CRM для онлайн-записи на TypeScript, NestJS, Prisma и PostgreSQL. Сделал авторизацию, роли, изоляцию данных компаний, уведомления и фоновые задачи.',
  },
  {
    id: '01-stgau',
    company: 'Ставропольский государственный аграрный университет',
    position: 'Преподаватель разработки мобильных приложений',
    period: 'с сентября 2026 года',
    achievements:
      'Преподаю основы Java и Kotlin более чем 100 студентам, готовлю учебные материалы и практические задания.',
  },
  {
    id: '02-stavelektroset',
    company: 'АО «Ставэлектросеть»',
    position: 'Практикант отдела АСУП',
    period: 'с 2023 по 2026 год, семь практик',
    achievements:
      'Сделал программу для заполнения рабочих документов; ей пользовались несколько отделов, от 20 до 30 сотрудников. Вместе с наставником дорабатывал БД и внутреннее ПО.',
  },
];

async function main(): Promise<void> {
  await prisma.profile.upsert({
    where: { id: 'kirill' },
    update: {
      description:
        'Разрабатываю Zapix, CRM на NestJS и PostgreSQL. Преподаю основы мобильной разработки на Java и Kotlin. Во время практики в «Ставэлектросети» занимался автоматизацией рабочих документов.',
      experience: {
        deleteMany: {},
        create: experience,
      },
      projects: {
        deleteMany: {},
        create: projects,
      },
    },
    create: {
      id: 'kirill',
      name: 'Кирилл Колнооченко',
      description:
        'Разрабатываю Zapix, CRM на NestJS и PostgreSQL. Преподаю основы мобильной разработки на Java и Kotlin. Во время практики в «Ставэлектросети» занимался автоматизацией рабочих документов.',
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
      experience: { create: experience },
      projects: { create: projects },
    },
  });
}

main()
  .finally(async () => prisma.$disconnect())
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
