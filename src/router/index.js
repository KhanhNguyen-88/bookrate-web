import { Fragment } from "react";
import { Explore, Home, Following, Ranking, Profile, Login} from "../pages";

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
        com: Explore
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
]