import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import Axios from "axios";
import { callOutline, mailOutline, personOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./update_profile.css";

console.log(localStorage.token);

const Update: React.FC = () => {
  const [data, setData] = useState({
    ID: "",
    email: "",
    username: "",
    phoneNumber: "",
    gender: "",
    race: "",
  });
  const [username, setUsername] = useState<string>("");
  const [emailA, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>();
  const [race, setRace] = useState<string>();
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const history = useHistory();

  var email = localStorage.getItem("email");

  useIonViewWillEnter(() => {
    Axios.get(
      "http://localhost/mbsp-eaduan/api/get_users.php/?email=" + email,
      {}
    )
      .then((res) => {
        setData(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPhone(res.data.phoneNumber);
        setRace(res.data.race);
        setGender(res.data.gender);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  function update() {
    Axios.post("http://localhost/mbsp-eaduan/api/update_users.php/", {
      jwt: localStorage.token,
      username: username,
      email: emailA,
      phoneNumber: phone,
      gender: gender,
      race: race,
    })
      .then((res) => {
        setMessage("Profil Berjaya Dikemaskini");
        setIserror(true);
        history.push("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle>Kemaskini Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonAlert
        isOpen={iserror}
        onDidDismiss={() => setIserror(false)}
        cssClass="my-custom-class"
        header={"Terima Kasih!"}
        message={message}
        buttons={["Okay"]}
      />
      <IonContent fullscreen>
        <div className="updateproform">
          <IonInput
            value={data.username}
            onInput={(e: any) => setUsername(e.target.value)}
            className="usernamepro"
            color="primary"
          >
            <IonIcon
              slot="start"
              icon={personOutline}
              color="primary"
              className="usernameicon"
            ></IonIcon>
          </IonInput>

          <IonInput
            value={data.email}
            onInput={(e: any) => setEmail(e.target.value)}
            className="emailpro"
            color="primary"
          >
            <IonIcon
              slot="start"
              icon={mailOutline}
              color="primary"
              className="emailicon"
            ></IonIcon>
          </IonInput>

          <IonInput
            value={data.phoneNumber}
            onInput={(e: any) => setPhone(e.target.value)}
            className="phonepro"
            color="primary"
          >
            <IonIcon
              slot="start"
              icon={callOutline}
              color="primary"
              className="phoneicon"
            ></IonIcon>
          </IonInput>

          <IonSelect
            okText="Ya"
            cancelText="Batal"
            onIonChange={(e) => setGender(e.detail.value)}
            className="gender"
            placeholder={data.gender}
          >
            <IonSelectOption>Lelaki</IonSelectOption>
            <IonSelectOption>Perempuan</IonSelectOption>
            <IonSelectOption>Lain-lain agensi</IonSelectOption>
            <IonSelectOption>Tidak diketahui</IonSelectOption>
          </IonSelect>

          <IonSelect
            okText="Ya"
            cancelText="Batal"
            onIonChange={(e) => setRace(e.detail.value)}
            className="races"
            placeholder={data.race}
          >
            <IonSelectOption>Melayu</IonSelectOption>
            <IonSelectOption>Cina</IonSelectOption>
            <IonSelectOption>India</IonSelectOption>
            <IonSelectOption>Lain-lain</IonSelectOption>
            <IonSelectOption>Tidak diketahui</IonSelectOption>
          </IonSelect>

          <IonButton onClick={update} className="updatepro">
            KemasKini
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Update;
