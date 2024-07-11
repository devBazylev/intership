1. С помощью команды `git log --oneline` посмотреть список коммитов. Коммиты идут сверху вниз от новых к старым, выглядит это примерно вот так:

    ```bash
    c0ea9d8 1.2 Создаст функцию для генерации разметки меню WIP
    1a34516 1.1 Подключит скрипт `src/main.js` к `public/index.html`
    45f1ffe :hatching_chick: начальное состояние проекта
    ```

2. Найти нужный коммит, скопировать его хэш (цифро-буквенный код в начале строки).

3. Встать на нужный коммит с помощью команды `git checkout хэш_коммита`. Например, вот так `git checkout c0ea9d8`.

4. Всё, изучайте код конкретного коммита. Чтобы вернуть всё как было, используйте команду `git checkout master`.