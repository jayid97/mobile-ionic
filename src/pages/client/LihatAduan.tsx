import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonMenuButton,
  IonSearchbar,
  IonRow,
  IonCol,
  useIonViewDidEnter,
  IonAlert,
  useIonViewWillEnter,
  IonLoading,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../../pages/client/LihatAduan.css";
import Axios from "axios";
import { useHistory } from "react-router";
import { syncOutline, trashBinOutline } from "ionicons/icons";

const LihatAduan: React.FC = () => {
  const [tickets, setTickets] = useState([]);

  const history = useHistory();
  const [isconfirm, setConfirmation] = useState<boolean>(false);
  const [issuccess, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showLoading, setShowLoading] = useState(true);

  useIonViewWillEnter(() => {
    var email = localStorage.getItem("email");
    var id = localStorage.getItem("id");
    setShowLoading(true);
    let session = localStorage.token;
    if (session == null) {
      history.push("/login");
    } else {
      const fetchTicket = () => {
        return Axios.get(
          "http://localhost/mbsp-eaduan/api/get_tickets.php/?guest_email=" +
            email
        ).then((result) => {
          console.log("data", result.data.ticket);
          setTimeout(() => {
            setShowLoading(false);
          }, result.data.ticket);
          return result.data.ticket;
        });
      };

      fetchTicket()
        .then((result) => setTickets(result))
        .catch((error) => {
          setTimeout(() => {
            setShowLoading(false);
          }, error);
          return error;
        });
    }
  }, []);

  function deleteUser(ID: string) {
    console.log("id", ID);
    Axios.delete("http://localhost/mbsp-eaduan/api/delete_tickets.php", {
      data: {
        jwt: localStorage.token,
        ID: ID,
      },
    })
      .then((result) => {
        window.location.reload();
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
          <IonTitle>Aduan Saya</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonAlert
          isOpen={issuccess}
          onDidDismiss={() => setSuccess(false)}
          cssClass="my-custom-class"
          header={"Perhatian!"}
          message={"Aduan Berjaya Dipadamkan"}
          buttons={[
            {
              text: "Tutup",
              handler: () => {
                window.location.reload();
              },
            },
          ]}
        />
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Sila Tunggu..."}
          spinner="circles"
        />

        {tickets.map((result) => {
          return (
            <IonCard key={result["ID"]}>
              <IonCardContent>
                <IonRow>
                  <IonCol>
                    <p>No Rujukan: {result["ID"]}</p>
                    <p>Tajuk: {result["title"]}</p>
                    <p>Komen: {result["body"]}</p>
                    <p>Tarikh Cipta: {result["ticket_date"]}</p>
                    <p>Lokasi Alamat: {result["KesLokasi"]}</p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonButton
                      routerLink={"/client/edit/" + result["ID"]}
                      className="ionButton"
                    >
                      <IonIcon slot="start" icon={syncOutline}></IonIcon>
                      KemasKini
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      onClick={() => setConfirmation(true)}
                      className="ionButton"
                    >
                      <IonIcon slot="start" icon={trashBinOutline}></IonIcon>
                      Padam
                    </IonButton>
                  </IonCol>

                  <IonAlert
                    isOpen={isconfirm}
                    onDidDismiss={() => setConfirmation(false)}
                    cssClass="my-custom-class"
                    header={"Perhatian!"}
                    message={"Anda Pasti Untuk Padam Aduan?"}
                    buttons={[
                      {
                        text: "Batal",
                        role: "cancel",
                      },
                      {
                        text: "Padam",
                        role: "delete",
                        handler: () => {
                          deleteUser(result["ID"]);
                        },
                      },
                    ]}
                  />
                </IonRow>
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default LihatAduan;
