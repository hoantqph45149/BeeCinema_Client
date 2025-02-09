import React from "react";
import { Navigate } from "react-router-dom";

import Account from "../pages/Admin/account";
import Banner from "../pages/Admin/banner";
import Branch from "../pages/Admin/branch/index";
import Cinema from "../pages/Admin/cinema/index";
import Combo from "../pages/Admin/combo";
import Food from "../pages/Admin/food";
import Movie from "../pages/Admin/movie/index";
import Overview from "../pages/Admin/overview/index";
import Post from "../pages/Admin/post";
import Room from "../pages/Admin/room/index";
import Showtime from "../pages/Admin/showtime";
import Ticket from "../pages/Admin/ticket";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Home from "../pages/Client/Home";

import AddCinema from "../pages/Admin/cinema/AddCinema";
import AddPost from "../pages/Admin/post/AddPost";
import UpdatePost from "../pages/Admin/post/UpdatePost";
import AddVoucher from "../pages/Admin/voucher/AddVoucher";
import EditVoucher from "../pages/Admin/voucher/EditVoucher";

import ThongkeCombo from "./../pages/Admin/thongke/thongkeCombo";
import ThongkeDoanhthu from "../pages/Admin/thongke/thongkeDoanhthu";
import ThongkePhim from "../pages/Admin/thongke/thongkePhim";

import MoviesClient from "../pages/Client/movie";
import ShowtimeClient from "../pages/Client/showtime";

import ChooseSeat from "../pages/Client/choose-seat/ChooseSeat";
const authProtectedRoutes = [
  // quản lý chi nhánh
  { path: "/admin/Branch", component: <Branch /> },

  // quản lý vé
  {
    path: "/admin/ticket",
    component: <Ticket />,
  },

  // quản lý phòng chiếu
  { path: "/admin/room", component: <Room /> },

  // quản lý suất chiếu
  {
    path: "/admin/showtime",
    component: <Showtime />,
  },

  // quản lý rạp
  { path: "/admin/cinema", component: <Cinema /> },
  { path: "/admin/cinema/add", component: <AddCinema /> },

  // quản lý phim
  { path: "/admin/movie", component: <Movie /> },

  // quản lý đồ ăn
  { path: "/admin/food", component: <Food /> },

  // quản lý combo
  { path: "/admin/combo", component: <Combo /> },

  // quản lý tài khoản
  { path: "/admin/account", component: <Account /> },
  // quản lý giảm giá
  { path: "/admin/voucher/add", component: <AddVoucher /> },
  { path: "/admin/voucher/edit", component: <EditVoucher /> },

  // quản lý bài viết
  { path: "/admin/post", component: <Post /> },
  { path: "/admin/post/add", component: <AddPost /> },
  { path: "/admin/post/edit", component: <UpdatePost /> },

  // quản lý banner
  { path: "/admin/banner", component: <Banner /> },
  // thống kê
  { path: "/admin/thongkeCombo", component: <ThongkeCombo /> },
  { path: "/admin/thongkeDoanhthu", component: <ThongkeDoanhthu /> },
  { path: "/admin/thongkePhim", component: <ThongkePhim /> },
  // trang chủ
  {
    path: "/admin/overview",
    component: <Overview />,
  },
  {
    path: "/admin",
    exact: true,
    component: <Navigate to="/admin/overview" />,
  },
  { path: "*", component: <Navigate to="/admin/overview" /> },
];

const publicRoutes = [
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
];

const clientRoutes = [
  {
    path: "/",
    component: <Home />,
  },

  {
    path: "/showtime",
    component: <ShowtimeClient />,
  },

  {
    path: "/movies",
    component: <MoviesClient />,
  },

  {
    path: "/choose-seat",
    component: <ChooseSeat />,
  },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/" />,
  },

  { path: "*", component: <Navigate to="/" /> },
];

export { authProtectedRoutes, clientRoutes, publicRoutes };
