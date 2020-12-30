import {
  IonMenuButton,
  IonButtons,
  IonIcon,
  IonCol,
  IonLabel,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonImg,
  IonAlert,
  useIonViewDidEnter,
  useIonViewWillEnter,
  IonCard,
  IonCardContent,
  IonRow,
  IonText,
  IonInput,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

import Axios from "axios";
import { useHistory } from "react-router";
import { keyOutline, mailOutline } from "ionicons/icons";
import "../../pages/password/forgotPass.css";

const ForgotPass: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vpassword, setPassword2] = useState("");
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [issuccess, setIssuccess] = useState<boolean>(false);
  const [successmessage, setSuccessMessage] = useState<string>("");
  function update() {
    if (!email) {
      setMessage("Sila masukkan Email");
      setIserror(true);
      return;
    }
    if (!password) {
      setMessage("Sila masukkan Kata Laluan");
      setIserror(true);
      return;
    }
    if (!vpassword) {
      setMessage("Sila masukkan Semak Kata Laluan");
      setIserror(true);
      return;
    }
    if (password != vpassword) {
      setMessage("Sila pastikan kata laluan sepadan");
      setIserror(true);
      return;
    }

    Axios.post("http://localhost/mbsp-eaduan/api/update_pass.php/", {
      email: email,
      password: password,
    })
      .then((res) => {
        setSuccessMessage("Kata Laluan Berjaya Dikemaskini");
        setIssuccess(true);
        history.push("/login");
      })
      .catch((error) => {
        setMessage(error);
        setIserror(true);
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
        <IonAlert
          isOpen={issuccess}
          onDidDismiss={() => setIserror(false)}
          cssClass="my-custom-class"
          header={"Berjaya!"}
          message={successmessage}
          buttons={["Tutup"]}
        />
        <IonRow class="ion-justify-content-center">
          <IonImg
            src="./assets/images/header-logo.png"
            className="logolog"
          ></IonImg>
        </IonRow>
        <IonRow class="ion-justify-content-center">
          <h1>Tukar Kata Laluan</h1>
        </IonRow>
        <div className="passform">
          <IonRow>
            <IonInput
              placeholder="Email Pengguna"
              color="primary"
              className="oldpass"
              type="email"
              onIonChange={(e: any) => setEmail(e.target.value)}
            >
              <IonIcon
                slot="start"
                icon={mailOutline}
                color="primary"
                className="forgotpassicon"
              ></IonIcon>
            </IonInput>
          </IonRow>
          <IonRow>
            <IonInput
              placeholder="Kata Laluan Baru"
              name="password"
              color="primary"
              className="oldpass"
              type="password"
              onIonChange={(e: any) => setPassword(e.target.value)}
            >
              <IonIcon
                slot="start"
                icon={keyOutline}
                color="primary"
                className="forgotpassicon"
              ></IonIcon>
            </IonInput>
          </IonRow>
          <IonRow>
            <IonInput
              placeholder="Semak Kata Laluan"
              name="vpassword"
              type="password"
              color="primary"
              className="oldpass"
              onIonChange={(e: any) => setPassword2(e.target.value)}
            >
              <IonIcon
                slot="start"
                icon={keyOutline}
                color="primary"
                className="forgotpassicon"
              ></IonIcon>
            </IonInput>
          </IonRow>
          <IonRow>
            <IonButton className="updatepass" onClick={update}>
              Kemaskini
            </IonButton>
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPass;
