import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import EventBus from "./common/EventBus";
import StudentAE from "./components/Student/StudentAE";
import StudentLV from "./components/Student/StudentLV";
import StudentDetails from "./components/Student/StudentDetails";
import TeacherLV from "./components/Teacher/TeacherLV";
import TeacherAE from "./components/Teacher/TeacherAE";
import FormAE from "./components/Form/FormAE";


const logo = "/ISNA.png";

const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {


    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand gray-bg">
          <Link to={"/"} className="navbar-brand">
            <img
              src={logo}
              alt="profile-img"
              className="menu-logo"
            />
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link menu-items">
                Screening Form
              </Link>
            </li>


            {currentUser && (
              <>
                <li className="nav-item">
                  <Link to={"/students"} className="nav-link  menu-items">
                    Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/teachers"} className="nav-link  menu-items">
                    Teachers
                  </Link>
                </li>
              </>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link menu-items" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/covid-form"]} component={FormAE} />
            <Route exact path="/covid-form/:id" component={FormAE} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/students" component={StudentLV} />
            <Route exact path="/students/add" component={StudentAE} />
            <Route path="/students/edit/:id" component={StudentAE} />
            <Route path="/students/details/:id" component={StudentDetails} />

            <Route exact path="/teachers" component={TeacherLV} />
            <Route exact path="/teachers/add" component={TeacherAE} />
            <Route path="/teachers/edit/:id" component={TeacherAE} />
          </Switch>
        </div>

        {/* <AuthVerify logOut={logOut}/> */}
      </div>
    </Router>
  );
};

export default App;
