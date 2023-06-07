import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tasks } from "../pages/tasks";
import { Organizations } from "../pages/organizations";

export function Router () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Organizations} />
                <Route path="/tasks/:organizarionId" Component={Tasks} />
            </Routes>
        </BrowserRouter>
    )
}