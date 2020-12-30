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
  useIonViewWillLeave,
  IonLoading,
  IonCard,
  IonCardContent,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./profile.css";

import Axios from "axios";
import { useHistory } from "react-router";

const Profile: React.FC = () => {
  const [data, setData] = useState({
    ID: "",
    email: "",
    username: "",
    phoneNumber: "",
    gender: "",
    race: "",
  });

  var email = localStorage.getItem("email");

  useIonViewWillEnter(() => {
    Axios.get("http://localhost/mbsp-eaduan/api/get_users.php/?email=" + email)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        return error;
      });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard key={data.ID} className="card">
          <IonCardContent>
            <IonImg
              src="./assets/images/default.png"
              className="avatar"
            ></IonImg>

            <IonText color="dark">
              <h1>{data.username}</h1>
            </IonText>
            <p>Email : {data.email} </p>

            <p>Jantina : {data.gender}</p>

            <p>No Telefon : {data.phoneNumber}</p>

            <p>Bangsa : {data.race}</p>

            <IonButton
              routerLink="/profile/update"
              className="updatepro"
              expand="block"
            >
              KemasKini
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
