// Туториал по webpack
// https://www.youtube.com/watch?v=acAH2_YT6bs&t=28s

// npm init -y  -  инициализация с дефолтными настройками

// Для максимальной оптимизации приложения рекоммендуется декомпозировать его(разбить на модули) и реализовать Lazy-загрузку 

// Создаем src, index.ts, выводим сообщение в консоль для  проверки работоспособности

// Из src/test.ts пытаеммся экспортировать функцию - без webpack это не работает

// Ставим Webpack - webpack.js.org/guides/getting-started/#basic-setup
    // ставим npm i -D webpack-cli@5.1.4 webpack-dev-server@4.15.1
        /* (npm install webpack webpack-cli --save-dev) */
        /* (автор поставил "webpack": "^5.88.2" - установил и я) */
    
// На запуск прописываем "build": "webpack" в скриптах в package.json
    // теперь можно запускать сборку - npm run build - создало dist/main.js - если перейти в папку и запустить node main.js - все работает

// Bundle - результат сборки

// В корне проекта создаем webpack.config.js, в нем настраиваем сборку(подробнее в документе)

// npm i -D html-webpack-plugin@5.5.3 - плагин для автоматизации подключения скрипта с динамическим названием в index.html  

// Лоадеры - расширения для работы с неподдерживаемыми типами, в д.с для работы с TypeScript, также нужен будет SCSS и т.д

// npm i -D ts-loader@9.5.0 typescript@5.2.2 - ставим для работы с TS, для настройки создаем tsconfig.json, закидываем в него настройки из документации(webpack.js.org/guides/typescript/), оттуда же добавляем настройки в webpack.config.js(по ключам module и resolve подробнее в документе)

// npm i -D @types/node@20.8.3 @types/webpack@5.28.3 ts-node@10.9.1
// npm i -D @types/webpack-dev-server@4.7.2
    // - ставим зависимости для работы с TS - теперь можно webpack.config писать на TS, при подключениях сторонних файлов теперь можно использовать import вместо require, в tsconfig меняем "module": "es6" на "module": "ESNext", добавляем 
        // "allowSyntheticDefaultImports": true, /* (позволяет работать без дефолтного импорта - в импортах можем не писать *as) */
        // "esModuleInterop": true,  /* (позволит работать с import) */
        /* (также добавляем блок для работы с node) */
        // "ts-node": {
        //     "compilerOptions": {
        //         "module": "CommonJS"
        //     }
        // }

// Для отслеживания изменений ставим npm i -D webpack-dev-server@4.15.1, в package.json добавляем строку для запуска("start": "webpack serve",), в webpack.config добавляем настройки и типизацию для них, запускаем npm run start -- --env port=5000 (обязательно разделитель между start и --env, но порт можно не указывать, по умолчанию проставлен 3000)

// Ставим react
    // npm i react@18.2.0 react-dom@18.2.0 (как production-зависимости, без -D)
    // npm i -D @types/react@18.2.25 @types/react-dom@18.2.11

// В папке src создаем components/App.tsx и к нему css файл

// Для работы с css ставим 
        // npm i -D css-loader@6.8.1
        // npm i -D style-loader@3.3.3
            //  в webpack.config добавляем loader для css

// Если работаем с css, ставим 
        // npm i -D sass@1.69.0 sass-loader@13.3.2
        //  в webpack.config заменяем loader для css на loader для sass(в документации)

// На данный момент css встроены в script, если хотим стили в отдельном файле, ставим
        // npm i -D mini-css-extract-plugin@2.7.6
            // в webpack.config импортируем его и подключаем в массив с плагинами

// Далее файл webpack.config делим на несколько файлов для лучшей читаемости и динамичной работы - создаем папку config/build, в ней создаем модули под подключения, общий сборщик и папку types, в которую поместим типизацию 

// Для того, чтобы было удобнее давать названия классов(в режиме разработки могут повторяться в разных модулях, не вызывая конфликта, а в продакшине будут заменены на хеш-названия), создаем документ с декларацией модулей(global.d.ts - взят из интернета), в названия модулей стилей добавляем module(App.module.scss например), пример импорта и последующего подключения смотрим в App.tsx. В buildLoadeers настраиваем динамические построения названий классов

// npm i react-router-dom@6.16.0 ставим для построения навигации, работаем в index.tsx, для примера создаем папку pages и пару страниц, саму навигацию подключаем в index.tsx, в папках со страницами создаем дополнительные модули для ленивой загрузки

// npm i webpack-bundle-analyzer@4.9.1 - ставим плагин для анализа и контроля за сборкой, подключаем в buildPlugins.tsx 
        // npm install --save-dev @types/webpack-bundle-analyzer - также дополнительно ставим типы, иначе не работает
        // Подключаем в webpack.config, types.ts, buildPlugins - и при запуске npm run build:prod -- --env analyzer выдаст пдробный отчет по сборке

// Пример построения и подключения алиасов - сокращений для путей(в реальных проектах они могут быть очень длинными) - создаем в buildResolvers.tsx, типизируем в types.ts, регистрируем в tsconfig.json(строки baseUrl и paths), в webpack.config.ts передаем в путях необходимое значение и подключаем, где нужно(для примера в App.ts путь теперь "@/pages/about/About")

// Для работы с изображениями создаем папку assets, помещаем в нее изображения
    // npm i @svgr/webpack@8.1.0 - ставим отдельный лоадер для работы с svg, в интернете их много для этого формата, для остальных(png, jpg, jpeg) не ставили ничего
    // В buildLoaders.tsx подключаем лоадеры assetloader и svgLoader, в global.d.ts декларируем отдельно каждый тип
    // Пример подключения в App.tsx(svg подключаем как компонент)

// Для примера работы с глобальными переменными в package.json добавляем две команды запуска - "build:desktop" и "build:mobile", которые при запуске(npm run build:desktop/mobile) будут запускать сборку с соответствующей пеерменной среды(desktop или mobile), на основе которой можно запускать отдельные блоки проекта(например desktop-mobile, development-production или registered-unregistered)
    // Декларируем в global.d.ts, создаем тип в types.ts, подключаем его в webpack.config.ts и там же передаем в опциях в buildPlugins.ts, где настраиваем в соответствующем плагине. Пример использования(создания блоков в зависимости от пришедшей глобальной переменной) в App.tsx

// В buildLoaders.ts настраиваем лоадер TS на игнорирование ошибок - проверка при каждом изменении кода проект проверяется на наличие ошибок, отключив TS проверку, ускоряем сборку
    // npm i fork-ts-checker-webpack-plugin@9.0.0 - ставим плагин для отдельной проверки TS, добавляем в buildPlugins.ts - теперь проверка на ошибки TS идет отдельным процессом, ошибки выдает в терминал

// Для обновления страницы без перезагрузки при изменениях в коде есть встроенный Hot module replacement - в buildDevServer.ts добавляем опцию hot: true, но при работе с реактом лучше установить плагин 
    // npm i @pmmmwh/react-refresh-webpack-plugin@0.5.11
    // npm i react-refresh-typescript@2.0.9
        // Подключаем плагин в buildPlugins.ts и настройки лоадера в buildLoaders.ts
        /* (при изменениях в верстке сразу все отражается на экране(после сохранения кода), также сохраняются например данные, введенные в формах, накликаные состояния и т.д) */
    
// Для примера работы с иконками помещаем иконку в папку publiс, в webpack.config вносим путь к иконке в опции для плагинов, типизируем в types.ts, подключаем в плагин HtmlWebpackPlugin в buildPlugins.ts(на продакшне попадет в сборку и будет встроена в html) 

// Для примера простого копирования документов из src в prod создаем в public/locales пару json-документов и ставим
    // npm i -D copy-webpack-plugin@11.0.0
    // Добавляем настройку в buildPlugins.ts

// На данный момент за компиляцию скрипта отвечает ts-loader. Также популярные компиляторы - swc-loader(используется в next), esbuild-loader, babel(очень популярный, поддерживаемый и функциональный, но медленнее предыдущих). Заменим ts-loader на babel
    // npm i -D @babel/core@7.23.2 babel-loader@9.1.3
    // Подключаем лоадер(babel) в buildLoaders.ts, также для работы с TS и реакт нужны пресеты - устанавливаем и добавляем в массив пресетов в подключении лоадера в buildLoaders.ts(подключение подробно описано в документации, также описаны плагины, включенные в каждый пресет)
        // npm i -D @babel/preset-typescript@7.23.2 
        // npm i -D @babel/preset-react@7.22.15

        // Теперь можем заменить webpack на babel. Для примера создаем babel.config.json, в него выносим обьект с опциями из babelLoader

        // Для более удобной работы выносим babelLoader из buildLoaders.ts в отдельный документ - config/build/babel/buildBabelLoader.ts

        // Для примера написания собственных плагинов для babel создаем removeDataTestIdBabelPlugin.ts, в App.ts добавляем на некоторые элементы верстки дата-аттрибуты(data-testid, например для какого-нибудь тестирования) - плагин в prod версии должен их убрать. Для типизации ставим
            // npm i -D @types/babel__core@7.20.3
        // Создаем плагин removeDataTestIdBabelPlugin.ts, подключаем в buildBabelLoader.ts(описание в них) - теперь при билде прод-версии удалит указанные дата-аттрибуты

// Для примера работы sourceMap отключили в buildWebpack.ts создание карты исходников, в App.ts добавили две функции TODO с ошибкой - без исходников отследить ошибку почти невозможно. В д.с подключена inline-source-map, но на странице webpack.js.org/configuration/devtool представлено много возможных вариантов подключения sourceMap - отличаются скоростью, продуктивностью, работой в прод-версии и т.д

// Создаем репозиторий на git
    // создаем .gitinit
    // git init - инициализируемся
    // создаем новый репозиторий на github, копируем ссылку на удаленный репозиторий
        // git remote add origin https://github.com/sinzеm/webpack-course.git
    // git add . - индексируем все файлы
    // git commit -m "Initial"