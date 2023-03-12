import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
  Router,
} from "react-router-dom";

import HomeAdmin from "./features/Admin/HomeAdmin";
import User from "./features/Admin/components/User";
import RouteComponent from "./HOCs/RouteComponent";
import AddNew from "./features/Admin/components/AddNew";
import EditFilm from "./features/Admin/components/EditFilm";
import AddUser from "./features/Admin/components/AddUser";
import EditUser from "./features/Admin/components/EditUser";
import ShowTime from "./features/Admin/components/ShowTime";
import Signin from './features/Auth/Signin';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route
          path="/admin"
          element={
            <RouteComponent
              // isAdmin={true}
              Component={HomeAdmin}
              // redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/film"
          element={
            <RouteComponent
              // isAdmin={true}
              
              Component={HomeAdmin}
              // redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/film:page"
          element={
            <RouteComponent
              // isAdmin={true}
              
              Component={HomeAdmin}
              // redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/film/addnew"
          element={
            <RouteComponent
              // isAdmin={true}
              
              Component={AddNew}
              // redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/film/edit/:id"
          element={
            <RouteComponent
              // isAdmin={true}
              
              Component={EditFilm}
              // redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/user"
          element={
            <RouteComponent
              // isAdmin={true}
              
              Component={User}
              // redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/user/:page"
          element={
            <RouteComponent
              // isAdmin={true}
              
              Component={User}
              // redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/user/adduser"
          element={
            <RouteComponent
              // isAdmin={true}
              
              Component={AddUser}
              // redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/user/edituser/:id"
          element={
            <RouteComponent
              // isAdmin={true}
              
              Component={EditUser}
              // redirectPath="/signin"
            />
          }
        />
        <Route
          path="/admin/showtime/:id"
          element={
            <RouteComponent
              // isAdmin={true}
              Component={ShowTime}
              // redirectPath="/signin"
            />
          }
        />
        <Route path="/signin" element={<RouteComponent Component={Signin}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
