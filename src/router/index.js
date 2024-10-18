import { Fragment } from "react";
import {Home, Following, Ranking, Profile, Login, NewExplore, BookDetail, Register} from "../pages";

export const publicRoutes = [
    {
        path: "/login",
        com: Login,
        layout: Fragment
    },
    {
        path: "/",
        com: Home
    },
    {
        path: "/explore",
        com: NewExplore
    },
    {
        path: "/explore/:id",
        com: NewExplore
    },
    {
        path: "/follow",
        com: Following
    },
    {
        path: "/rank",
        com: Ranking
    },
    {
        path: "/profile",
        com: Profile
    },
    {
        path: "/book/:id",
        com: BookDetail,
    },
    {
        path: "/register",
        com: Register,
        layout: Fragment
    },
]