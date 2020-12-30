import {
  IonButton,
  IonMenuButton,
  IonContent,
  IonHeader,
  IonButtons,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonInput,
  useIonViewDidEnter,
  IonBackButton,
  IonAlert,
  useIonViewWillEnter,
  IonTextarea,
  IonLoading,
} from "@ionic/react";
import Axios from "axios";
import { useHistory } from "react-router";
import React, { useEffect } from "react";
import { useState } from "react";
import "./EditAduan.css";

const EditAduan: React.FC = (props: any) => {
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const history = useHistory();
  var id = props.match.params.id;
  const [ticket, setTickets] = useState({
    ID: "",
    title: "",
    body: "",
    KesLokasi: "",
  });
  const [comment, setComment] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [showLoading, setShowLoading] = useState(true);

  useIonViewWillEnter(() => {
    setShowLoading(true);
    Axios.get(
      "http://localhost/mbsp-eaduan/api/get_singleTickets.php/?ID=" + id,
      {}
    )
      .then((res) => {
        console.log("data", res.data);
        setTimeout(() => {
          setShowLoading(false);
        }, res.data);
        setTickets(res.data);
        setComment(res.data.body);
        setLocation(res.data.KesLokasi);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  function updateTicket() {
    console.log(ticket.ID);
    Axios.post(
      "http://localhost/mbsp-eaduan/api/update_tickets.php/",
      {
        jwt: localStorage.token,
        ID: ticket.ID,
        body: comment,
        KesLokasi: location,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      }
    )
      .then((res) => res.data)
      .then((result) => {
        setMessage("Aduan Berjaya DiKemaskini");
        setIserror(true);
        history.push("/client/lihat");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle>KemasKini Aduan</IonTitle>
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
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Sila Tunggu..."}
        spinner="circles"
      />
      <IonContent>
        <IonItem key={ticket["ID"]}>
          <IonLabel position="floating">No Rujukan</IonLabel>
          <IonInput value={ticket.ID} readonly></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Tajuk</IonLabel>
          <IonInput value={ticket.title} readonly></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Komen</IonLabel>
          <IonInput
            placeholder={ticket.body}
            value={ticket.body}
            onInput={(e: any) => setComment(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Lokasi</IonLabel>
          <IonInput
            onInput={(e: any) => setLocation(e.target.value)}
            placeholder={ticket.KesLokasi}
            value={ticket.KesLokasi}
          ></IonInput>
        </IonItem>
        <IonButton onClick={updateTicket}>KemasKini</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditAduan;
