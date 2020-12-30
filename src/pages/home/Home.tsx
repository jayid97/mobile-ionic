import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonCardHeader,
  IonCard,
  IonIcon,
  IonText,
  IonItem,
  IonButton,
} from "@ionic/react";
import { documentsOutline, laptopOutline } from "ionicons/icons";
import React from "react";
import { RouteComponentProps, useParams } from "react-router";
import "./Home.css";

const Dashboard: React.FC<RouteComponentProps> = ({ history }) => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Halaman Utama</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonItem>
          <IonCardHeader>
            <h1>Selamat Datang!</h1>
            <h4>Sistem Aduan MBSP. Anda berada di halaman utama.</h4>
          </IonCardHeader>
        </IonItem>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonRow>
                    <IonCol size="2">
                      <IonIcon
                        className="ionIcon"
                        md={laptopOutline}
                        ios={laptopOutline}
                      ></IonIcon>
                    </IonCol>
                    <IonCol size="10">
                      <IonText>
                        <h2>Kami sentiasa disini untuk membantu anda</h2>
                      </IonText>
                      <IonText>
                        <p>
                          Anda boleh ajukan sebarang permasalahan disini. Sistem
                          ini secara automatik akan majukan proses tindakan ke
                          pihak berwajib.
                        </p>
                      </IonText>
                    </IonCol>
                    <IonButton
                      className="ionButton"
                      onClick={(e: { preventDefault: () => void }) => {
                        e.preventDefault();
                        history.push("/client/aduan");
                      }}
                    >
                      Saya ada masalah
                    </IonButton>
                  </IonRow>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonRow>
                    <IonCol size="2">
                      <IonIcon
                        className="ionIcon"
                        md={documentsOutline}
                        ios={documentsOutline}
                      ></IonIcon>
                    </IonCol>
                    <IonCol size="10">
                      <IonText>
                        <h2>Lihat Senarai Aduan Anda</h2>
                      </IonText>
                      <IonText>
                        <p>
                          Klik butang di bawah untuk melihat senarai aduan anda
                        </p>
                      </IonText>
                    </IonCol>
                    <IonButton
                      className="ionButton"
                      color="light"
                      onClick={(e: { preventDefault: () => void }) => {
                        e.preventDefault();
                        history.push("/client/lihat");
                      }}
                    >
                      Lihat Rekod Aduan
                    </IonButton>
                  </IonRow>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
