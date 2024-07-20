import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { App } from "@/components/app/app";
import { LazyAbout } from "@/pages/about/About.lazy";
import { LazyShop } from "@/pages/shop/Shop.lazy";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root div not found");
}

const container = createRoot(root);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/about",
                element: (
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <LazyAbout />
                    </Suspense>
                ),
            },
            {
                path: "/shop",
                element: (
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <LazyShop />
                    </Suspense>
                ),
            },
        ],
    },
]);

container.render(<RouterProvider router={router} />);
