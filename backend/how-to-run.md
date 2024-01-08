### Деплой

Подготовка env файлов
В корне есть 3 файла заканчивающиеся на -example
удалите из их названия -example

Выполните команды
```bash
npm run buildDockerImage
docker compose --file ./docker-compose.yml --project-name "fit-friends" up -d
```
