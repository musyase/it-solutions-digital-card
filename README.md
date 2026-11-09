# Цифровая визитка

GraphQL API на NestJS, Prisma и PostgreSQL. Запрос `profile` возвращает профиль, навыки, опыт работы и проекты.

[Открыть Apollo Sandbox](https://it-solutions-digital-card.onrender.com/graphql)

## Локальный запуск

Нужен Docker. Из корня проекта:

```bash
docker compose up --build
```

Откройте http://localhost:3000/graphql. Проверка API:

```bash
docker compose exec app npm run smoke
```

Запрос для Apollo Sandbox:

```graphql
query {
  profile {
    name
    description
    githubUrl
    skills { name category }
    experience { company position period achievements }
    projects { name description url }
  }
}
```

Остановка: `docker compose down`. Данные PostgreSQL сохраняются в томе Docker.

## Развёртывание

`render.yaml` задаёт веб-сервис и PostgreSQL на Render. При старте контейнера применяются миграции и выполняется seed. Повторный запуск не создаёт дубликаты. На бесплатном плане первый запрос после простоя может занять около минуты; база [действует 30 дней](https://render.com/docs/free).

## Архитектура

- GraphQL-типы и запрос описаны в `src/profile`. Резолвер вызывает сервис; работа с базой находится в сервисе.
- В Prisma профиль связан с таблицами навыков, опыта и проектов. `findUnique` с `include` загружает связи без отдельного обращения за каждой записью. Для одной визитки этого достаточно. Если появится запрос списка профилей, понадобится пакетная загрузка связей.
- `PrismaService` управляет подключением к PostgreSQL. Миграция создаёт таблицы, а `prisma/seed.ts` добавляет данные через `upsert`.
- `docker-compose.yml` запускает приложение после проверки готовности PostgreSQL.

## Проверка

`npm run smoke` отправляет GraphQL-запрос и проверяет профиль вместе с вложенными данными. Для проверки публичного сервиса задайте `GRAPHQL_URL=https://it-solutions-digital-card.onrender.com/graphql`.
