import { useState } from 'react';
import classes from  "@/components/App/App.module.scss"; /* (подключаем модуль со стилями как classes, при вызове берем эти классы как ключи из classes) */
import { Link, Outlet } from 'react-router-dom';
import About from "@/pages/about/About";
import picPng from "@/assets/06-lightbulb-middle.png";
import picJpg from "@/assets/Apple-iPhone-15.jpg";
import PicSvg from "@/assets/Facebook.svg";

// TREE SHAKING - функции, которые нигде не используются, автоматически будут отсеяны и в сборку не попадут
// function TODO() {
//     console.log("TODO_FUNCTION");
// }

// ---------------------------------
/* (функции для примера работы sourceMap - вызов навешен на клик по кнопке) */
// function TODO() {
//     TODO2();
// }

// function TODO2() {
//     throw new Error();
// }
// ----------------------------------
export const App = () => {

    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1)/* TODO() */;

    /* (пример построения условий и функционала на основе пришедших глобальных переменных) */
    // if (__PLATFORM__ === 'desktop') {
    //     return <div>IS_DESKTOP_PLATFORM</div>
    // }

    // if (__PLATFORM__ === 'mobile') {
    //     return <div>IS_MOBILE_PLATFORM</div>
    // }

    // if (__ENV__ === "development") {
    //     // addDevtools();
    // }

    return (
        <div data-testid={'App.DataTestId'}>
            {/* (пример построения условий и функционала на основе пришедших глобальных переменных) */}
            <h1 data-testid={'Platform'}>PLATFORM={__PLATFORM__}</h1>
            {/* (подключаем избражения, с svg работаем как с компонентом(настраиваем в buildLoaders)) */}
            <div>
                <img width={100} height={100} src={picPng} alt="pic" />
                <img width={100} height={100} src={picJpg} alt="pic" />
            </div>
            <div>
                <PicSvg className={classes.icon}/* style={{color: "green"}} */ width={80} height={80} fill={'red'} />
            </div>
            <Link to={'/about'}>about</Link>
            <br />
            <Link to={'/shop'}>shop</Link>
            <h1 className={classes.value}>{count}</h1>
            <button className={classes.button} onClick={increment}>ink</button>
            {/* <Outlet/> */} 
           {/*  (outlet - вставит дочерние элементы навигации - при переходе будет открывать не отдельную страницу, а ее содержание вставит на место outlet) */}
            <About />
        </div>
    );
};

