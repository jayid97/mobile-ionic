import React from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  isPlatform,
  setupConfig,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Import routing location */
import Menu from "./components/Menu";
import Login from "./pages/login/Login";
import Signup from "./pages/register/Signup";
import Home from "./pages/home/Home";
import LihatAduan from "./pages/client/LihatAduan";
import AduanClient from "./pages/client/Aduan";
import Perutusan from "./pages/client/Perutusan";
import Info from "./pages/client/Info";
import Loading from "./pages/loading/loading";
import EditAduan from "./pages/client/EditAduan";
import Profile from "./pages/profile/profile";
import Update from "./pages/profile/update_profile";
import ForgotPass from "./pages/password/forgotPass";

const App: React.FC = () => {
  setupConfig({
    swipeBackEnabled: false,
    hardwareBackButton: false,
    animated: !isPlatform("mobileweb"),
  });
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="" component={Loading} exact={true} />
            <Route path="/home" component={Home} exact={true} />
            <Route path="/client/lihat" component={LihatAduan} exact={true} />
            <Route path="/client/aduan" component={AduanClient} exact={true} />
            <Route path="/profile" component={Profile} exact={true} />
            <Route path="/profile/update" component={Update} exact={true} />
            <Route path="/forgotpass" component={ForgotPass} exact={true} />
            <Route
              path="/client/edit/:id/"
              component={EditAduan}
              exact={true}
            />
            <Route
              path="/client/perutusan"
              component={Perutusan}
              exact={true}
            />
            <Route path="/client/info" component={Info} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/signup" component={Signup} exact={true} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
