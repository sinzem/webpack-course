
import {createRoot} from "react-dom/client";
import {App} from "@/components/App/App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LazyAbout } from "./pages/about/About.lazy";
import { Shop } from "./pages/shop";
import { Suspense } from "react";

const root = document.getElementById("root");

if (!root) {
    throw new Error("root not found");
}

const container = createRoot(root);

/* (создаем роутер) */
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, /* (как главный элемент подключаем страницу App, остальные пока как дочерние на ней же) */
        children: [ /* (к каждой странице подключаем Suspense(из реакта), передаем в него сообщение, которое будет выводиться во время загрузки) */
            {
                path: '/about',
                // element: <About />, /* (при обычной загрузке все страницы собираются в один скрипт, это замедляет загрузку) */
                element: <Suspense fallback={"Loading..."}><LazyAbout /></Suspense>, /* (при ленивой загрузке(создаем модуль в папке со страницей) скрипт делится на несколько частей и нужная страница подгружается только при переходе на нее) */
            },
            {
                path: '/shop',
                // element: <Shop />,
                element: <Suspense fallback={"Loading..."}><Shop /></Suspense>, /* (в д.с в папке со страницей создан модуль для обьединения самой страницы и ленивого модуля - подключаем его) */
            }
        ]
    }
])

/* (подключаем роутер) */
container.render(<RouterProvider router={router} />)

