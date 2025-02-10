import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginView from "./Views/Auth/LoginView"
import RegisterView from "./Views/Auth/RegisterView"
import AuthLayout from "./Layouts/Auth/AuthLayout"
import AppLayout from "./Layouts/App/AppLayout"
import LinkTreeView from "./Views/App/LinkTreeView"
import ProfileView from "./Views/App/ProfileView"
import { HandleView } from "./Views/App/HandleView"
import NotFoundView from "./Views/App/NotFoundView"
import { HomeView } from "./Views/App/HomeView"


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>

                <Route path='/admin' element={<AppLayout />}>
                    <Route index={true} element={<LinkTreeView />} />
                    <Route path='profile' element={<ProfileView />} />
                </Route>


                <Route path="/:handle" element={<AuthLayout />}>
                    <Route element={<HandleView />} index={true} />
                </Route>

                <Route path="/" element={<HomeView />} />

                <Route path="/404" element={<AuthLayout />}>
                    <Route element={<NotFoundView />} index={true} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}