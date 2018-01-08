Бот на странице ВКонтакте (NodeJS)
==================================

[Примеры модулей](./Modules/)
Создание своего модуля:
* Создать папку в ```Modules```
* В созданной папке создать ```index.js```
Пример содержимого ```index.js```:
```javascript
const Module = require('../../utils/Module');

class AwesomeModule extends Module {

    constructor(vk, pluginDir) {
        super(vk, pluginDir);
        // Необходимые действия перед началом работы...
    }
    
    // Зарезервированные обработчики событий...
}

module.exports = AwesomeModule;
```
Или [Ознакомиться с базовым модулем](./utils/Module.js)

Все обработчики принимают один параметр: объект события ([все события](./utils/Event/))
Зарезервированные обработчики:
```
onEvent(event) - Все события
onUpdateFlag(event) - Обновление флагов сообщения
onSetFlag(event) - Установка флагов сообщения
onReplaceFlag(event) - Замена флагов сообщения
onMessage(event) - Новое сообщение
onCommand(event) - Новая команда (команды начинаются с / )
onEditMessage(event) - Сообщение отредактировано
onReadOutput(event) - Прочтение всех входящих сообщений 
onReadInput(event) - Прочтение всех исходящих сообщений  
onFriendOnline(event) - Друг онлайн
onFriendOffline(event) - Друг оффлайн
onChatChange(event) - Изменение беседы (изменение состава или названия)
onUserWrite(event) - Пользователь пишет в ЛС
onUserWriteInChat(event) - Пользователь пишет в беседе
```

Вся система работает на обещаниях (Promise)

Первый запуск:
* Установить [NodeJS](https://nodejs.org/en/download/)
* Пройти в директорию с ботом
* Выполнить ```npm i``` и дождаться окончания
* Запускать

В дальнейшем запуск производится только командой ```node start```