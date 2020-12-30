import {
  IonIcon,
  IonRow,
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  IonCard,
  IonAlert,
  IonText,
  IonImg,
  IonFooter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../../pages/login/Login.css";
import Axios from "axios";
import { useHistory } from "react-router";
import { keyOutline, mail, mailOutline } from "ionicons/icons";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const history = useHistory();
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showLoading, setShowLoading] = useState(true);

  function loginUser() {
    //console.log(email, password);

    if (!email) {
      setMessage("Sila masukkan email");
      setIserror(true);
      return;
    }
    if (!password) {
      setMessage("Sila masukkan kata laluan");
      setIserror(true);
      return;
    }

    setShowLoading(true);

    Axios.post("http://localhost/mbsp-eaduan/api/login.php/", {
      strategy: "local",
      email: email,
      password: password,
    })
      .then((result) => result.data)
      .then((result) => {
        localStorage.token = result.jwt;
        console.log(localStorage.token);
        setTimeout(() => {
          setShowLoading(false);
        }, localStorage.token);
        localStorage.setItem("email", email);
        window.localStorage.setItem("role", "client");
        window.localStorage.setItem("department", "");
        if (
          window.localStorage.getItem("role") === "admin" ||
          "head_department" ||
          "staff"
        ) {
          history.push("/dashboard/");
        }
        if (window.localStorage.getItem("role") === "client") {
          history.push("/client/aduan");
        }
      })
      .catch((error) => {
        if ((error = 401)) {
          setMessage("Kata Laluan Dan Email tidak sepadan");
          setIserror(true);
        } else {
          setMessage(error);
          setIserror(true);
        }
      });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonAlert
          isOpen={iserror}
          onDidDismiss={() => setIserror(false)}
          cssClass="my-custom-class"
          header={"Ralat!"}
          message={message}
          buttons={["Tutup"]}
        />

        <div className="form">
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonImg
                src="./assets/images/header-logo.png"
                className="logolog"
              ></IonImg>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>

          <div className="logform">
            <IonInput
              type="email"
              onIonChange={(e: any) => setEmail(e.target.value)}
              placeholder="Email"
              required
              color="primary"
              className="email"
            >
              <IonIcon
                slot="start"
                icon={mailOutline}
                color="primary"
                className="iconEmail"
              ></IonIcon>
            </IonInput>

            <IonInput
              type="password"
              onIonChange={(e: any) => setPass(e.target.value)}
              placeholder="Kata Laluan"
              color="primary"
              className="password"
              required
            >
              <IonIcon
                slot="start"
                icon={keyOutline}
                color="primary"
                className="iconPass"
              ></IonIcon>
            </IonInput>
            <IonRow>
              <IonButton
                onClick={loginUser}
                expand="block"
                className="login"
                color="primary"
              >
                Log Masuk
              </IonButton>
            </IonRow>

            <IonRow>
              <IonButton
                routerLink="/signup"
                className="signup"
                color="warning"
                expand="block"
              >
                Daftar
              </IonButton>
            </IonRow>
            <IonRow class="ion-justify-content-center" className="bottom">
              Lupa Kata Laluan ?
              <IonRouterLink routerLink="/forgotpass">Tekan Sini</IonRouterLink>
            </IonRow>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
