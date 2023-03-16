import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
  Router,
} from "react-router-dom";
import { routes } from "./app/routes";
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./features/Auth/thunk";
// import HomeScurity from "./features/Admin/HomeScurity";
import HomeAdmin from "./features/Admin/HomeAdmin";
import Film from "./features/Admin/components/Film";
import User from "./features/Admin/components/User";
import Signin from "./features/Auth/Signin";
// import Singup from "./features/Auth/Singup";
import HomeBooking from "./features/Booking/HomeBooking";
import RouteComponent from "./HOCs/RouteComponent";
import AddNew from "./features/Admin/components/AddNew";
import EditFilm from "./features/Admin/components/EditFilm";
import AddUser from "./features/Admin/components/AddUser";
import EditUser from "./features/Admin/components/EditUser";
import ShowTime from "./features/Admin/components/ShowTime";
import Seats from "./features/Booking/Seats";
import Detail from "./features/Booking/Detail";
import Signup from "./features/Auth/Signup";
let history = createBrowserHistory();
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile);
  }, []);
  return (
    // <BrowserRouter>
    //   <Header></Header>
    //   <Routes>

    //     {routes.map(({ path, component: Component }, index) => {
    //       return (
    //         <Route key={index} path={path} element={<Component />}>

    //         </Route>
    //       );
    //     })}

    //   </Routes>
    // </BrowserRouter>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteComponent Component={HomeBooking} />} />
        <Route
          path="/admin"
          element={
            <RouteComponent
              isAdmin={true}
              Component={HomeAdmin}
              redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/film"
          element={
            <RouteComponent
              isAdmin={true}
              
              Component={HomeAdmin}
              redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/film:page"
          element={
            <RouteComponent
              isAdmin={true}
              
              Component={HomeAdmin}
              redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/film/addnew"
          element={
            <RouteComponent
              isAdmin={true}
              
              Component={AddNew}
              redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/film/edit/:id"
          element={
            <RouteComponent
              isAdmin={true}
              
              Component={EditFilm}
              redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/user"
          element={
            <RouteComponent
              isAdmin={true}
              
              Component={User}
              redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/user/:page"
          element={
            <RouteComponent
              isAdmin={true}
              
              Component={User}
              redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/user/adduser"
          element={
            <RouteComponent
              isAdmin={true}
              
              Component={AddUser}
              redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/user/edituser/:id"
          element={
            <RouteComponent
              isAdmin={true}
              
              Component={EditUser}
              redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/showtime/:id"
          element={
            <RouteComponent
              isAdmin={true}
              Component={ShowTime}
              redirectPath="/signin"
            />
          }
        />
        <Route
          path="/seats/:id"
          element={
            <RouteComponent
              isLogin={true}
              Component={Seats}
              redirectPath="/signin"
            />
          }
        />
        <Route
          path="/detail/:id"
          element={
            <RouteComponent
              
              Component={Detail}
              
            />
          }
        />
        <Route path="/signin" element={<RouteComponent isAuth={true} Component={Signin} redirectPath="/"/>} />
        <Route path="/signup" element={<RouteComponent Component={Signup} />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
