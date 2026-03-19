Инструкция для запуска и тестирования

1.  Установить My SQL workbranch и проект локально
    "npm i" for root folder
    "npm i" for server folder (server folder in root folder)
2.  Установить Docker на ПК
    docker-compose.yml - Файл для запуска докера, размещен в корне проекта.
3.  init.sql - Файл для создания таблиц в MySQL, размещен в корне проекта. Этот файл - docker-compose.yml запустит немного позже init.sql
4.  Запускаем Докер и выполняем команду в консоле "docker-compose up -d" (в консоле надо находится в корне проекта)
    Теперь работает база данных, к которой можно подключиться через MySQL Workbench (host: localhost, user: root, pass: root_password)
    В програме MySQL Workbench на главном екране создаем новое подключение используя эти креды
    environment: MYSQL_DATABASE: inv_DB
    MYSQL_ROOT_PASSWORD: root_password
    ports: 3308 // гuse only for MySQL Workbench
    Host name: 127.0.0.1
5.  После подключения к БД выбираем Schemas (таба в левой колонке)
    // Вставляем этот код что ниже в окно Query запроса и нажимаем на кнопку молнии, оно должно закинуть все данные в таблицы
    // это ваш код что вы предоставляли, я только вынес цены в отдельную таблицу и вместо названий картинок добавил реальные ссылки на картинки.
    INSERT INTO orders (id, title, date, description) VALUES
    (1, 'Order 1', '2017-06-29 12:09:33', 'desc'),
    (2, 'Order 2', '2017-06-29 12:09:33', 'desc'),
    (3, 'Order 3', '2017-06-29 12:09:33', 'desc');

-- Добавляем продукты
INSERT INTO products (id, serialNumber, isNew, photo, title, type, specification, guarantee_start, guarantee_end, order_id, date) VALUES
(1, 1234, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/LG_L194WT-SF_LCD_monitor.jpg/250px-LG_L194WT-SF_LCD_monitor.jpg', 'Product 1', 'Monitors', 'Specification 1', '2017-06-29 12:09:33', '2017-06-29 12:09:33', 1, '2017-06-29 12:09:33'),
(2, 1234, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/LG_L194WT-SF_LCD_monitor.jpg/250px-LG_L194WT-SF_LCD_monitor.jpg', 'Product 2', 'Monitors', 'Specification 1', '2017-06-29 12:09:33', '2017-06-29 12:09:33', 2, '2017-06-29 12:09:33');

-- Добавляем цены для продуктов
INSERT INTO prices (product_id, value, symbol, isDefault) VALUES
(1, 100, 'USD', 0),
(1, 2600, 'UAH', 1),
(2, 100, 'USD', 0),
(2, 2600, 'UAH', 1);

6. Добавил еще 2 товара для первых 2х ордеров (для простоты и удобства тестирования)
   (Так-же выполнить запрос в БД)

INSERT INTO products (id, serialNumber, isNew, photo, title, type, specification, guarantee_start, guarantee_end, order_id, date) VALUES
(3, 5678, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/LG_L194WT-SF_LCD_monitor.jpg/250px-LG_L194WT-SF_LCD_monitor.jpg', 'Samsung Odyssey G5', 'Monitors', '32 inch, Curved', '2024-01-01 10:00:00', '2025-01-01 10:00:00', 1, '2024-01-01 10:00:00'),
(4, 9012, 0, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/LG_L194WT-SF_LCD_monitor.jpg/250px-LG_L194WT-SF_LCD_monitor.jpg', 'MacBook Air M2', 'Laptops', '8GB RAM, 256GB SSD', '2024-02-15 11:00:00', '2025-02-15 11:00:00', 2, '2024-02-15 11:00:00');

-- Добавляем цены для этих новых продуктов
-- Для продукта №3 (в Order 1)
INSERT INTO prices (product_id, value, symbol, isDefault) VALUES
(3, 300, 'USD', 0),
(3, 12000, 'UAH', 1);

-- Для продукта №4 (в Order 2)
INSERT INTO prices (product_id, value, symbol, isDefault) VALUES
(4, 1100, 'USD', 0),
(4, 44000, 'UAH', 1);

7. В консоле, когда мы находимся в корне проекта выполняем команду
   PS C:\Petrenko\Inventory> npm run dev

8. Открываем еще одну вкладку консоли, переходим в папку сервер "cd server"
   Далее выполняем команду "npm run dev" (В этой же консоли)
   ===
   Теперь у нас запущен фронтенд и бекенд, можем тестировать приложение по ссылке http://localhost:5173/
