import styles from "./app.module.scss";
import "../global.css";
import { Link, Outlet } from "react-router-dom";
import dogPng from "@/assets/dog.png";

export const App = () => {
    return (
        <div>
            <span>Hello world</span>
            <div>сборка запущена в режиме {__PLATFORM__}</div>
            <button className={styles.button}>Кнопка</button>
            <Link to={"/shop"}>Магазин</Link>
            <Link to={"/about"}>О нас </Link>
            <Outlet />
            <img src={dogPng} alt="dog" />
        </div>
    );
};
