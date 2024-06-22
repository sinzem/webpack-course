import path from "path"; /* (модуль для работы с путями) */
import webpack from 'webpack'; 
import { buildWebpack } from "./config/build/buildWebpack"; /* (сборочный модуль, в который перенесли все подключения по группам) */
import { BuildMode, BuildPaths, BuildPlatform } from "./config/build/types/types"; /* (модули с типизацией) */

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform; /* (тип для приходящей при билде глобальной переменной) */
}

export default (env: EnvVariables) => { 

    /* (переменная с путями для подключения сборочного модуля webpack) */
    const paths: BuildPaths = {
      output: path.resolve(__dirname, "build"),
      entry: path.resolve(__dirname, "src", "index.tsx"),
      html: path.resolve(__dirname, "public", "index.html"),
      public: path.resolve(__dirname, 'public'), /* (добавляем участок пути для примера работы с иконками) */
      src: path.resolve(__dirname, 'src'), /* (передаем путь для алиаса) */
    }

    /* (подключаем сборочный модуль, типизируем типами из вебпака, передаем в него настройки подключения и пути) */
    const config: webpack.Configuration = buildWebpack({
      port: env.port ?? 3000,
      mode: env.mode ?? "development",
      paths,
      analyzer: env.analyzer, /* (для запуска сборки с аналайзером npm run build:prod -- --env analyzer) */
      platform: env.platform ?? "desktop", /* (для запуска сборки с указанием платформы - npm run build:mobile или npm run build:desktoр, который передаст соответствующее значение в глобальные переменные среды) */
    });
    
    return config;
}