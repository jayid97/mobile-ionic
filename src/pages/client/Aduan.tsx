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
} from "@ionic/react";
import React, { useEffect, useState } from "react";

import "./Aduan.css";
import Axios from "axios";
import { useHistory } from "react-router";
import Apimap from "../../components/Apimap";
import { usePhotoGallery } from "../../hooks/usePhotoGallery";
import { image } from "ionicons/icons";

const Aduan: React.FC = () => {
  const [cases, setCase] = useState<string>();
  const [comment, setComment] = useState("");
  const history = useHistory();
  const { photos, takePhoto } = usePhotoGallery();
  const [success, ifsuccess] = useState<boolean>(false);
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  var lat = JSON.parse(localStorage.getItem("lat") || "0");
  var lng = JSON.parse(localStorage.getItem("lng") || "0");
  console.log(lat, lng);
  var locat = localStorage.getItem("location");

  useEffect(() => {
    let session = localStorage.token;
    if (session == null) {
      history.push("/login");
    }
  }, []);

  function aduan() {
    if (!cases) {
      setMessage("Sila masukkan kes");
      setIserror(true);
      return;
    }
    if (!comment) {
      setMessage("Sila masukkan komen");
      setIserror(true);
      return;
    }

    Axios.post(
      "http://localhost/mbsp-eaduan/api/create_tickets.php/",
      {
        jwt: localStorage.token,
        title: cases,
        body: comment,
        lat: lat,
        lng: lng,
        KesLokasi: locat,
        KesAgensi: "Individu",
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      }
    )
      .then((result) => result.data)
      .then((result) => {
        setMessage("Aduan Berjaya Didafarkan");
        ifsuccess(true);
        history.push("/client/lihat");
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
          <IonTitle>Lapor Aduan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonAlert
          isOpen={iserror}
          onDidDismiss={() => setIserror(false)}
          cssClass="my-custom-class"
          header={"Ralat!"}
          message={message}
          buttons={["Okay"]}
        />
        <IonAlert
          isOpen={success}
          onDidDismiss={() => ifsuccess(false)}
          cssClass="my-custom-class"
          header={"Terima Kasih!"}
          message={message}
          buttons={["Okay"]}
        />

        <div className="aduanform">
          <IonItem>
            <IonLabel position="floating">Kes/Jenis</IonLabel>
            <IonSelect
              value={cases}
              okText="Ya"
              cancelText="Batal"
              onIonChange={(e) => setCase(e.detail.value)}
            >
              <IonSelectOption>Penguatkuasaan</IonSelectOption>
              <IonSelectOption>Binaan</IonSelectOption>
              <IonSelectOption>
                Binaan Tanpa Kebenaran/Binaan Haram
              </IonSelectOption>
              <IonSelectOption>Ubahsuai Binaan Tanpa Kebenaran</IonSelectOption>
              <IonSelectOption>
                Gangguan Akibat Binaan / Kerja Binaan
              </IonSelectOption>
              <IonSelectOption>Sisa-Sisa Binaan Yang Dibiarkan</IonSelectOption>
              <IonSelectOption>
                Gangguan Dari Kerja Binaan Yang Tak Diselesaikan
              </IonSelectOption>
              <IonSelectOption>
                Binaan Yang Tidak Mematuhi Syarat / Peraturan
              </IonSelectOption>
              <IonSelectOption>Aduan Tak Berasas/Tak Lengkap</IonSelectOption>
              <IonSelectOption>Permohonan / Pertanyaan</IonSelectOption>
              <IonSelectOption>
                Ubahsuai Binaan Untuk Burung Layang-Layang
              </IonSelectOption>
              <IonSelectOption>Menara Telekomunikasi</IonSelectOption>
              <IonSelectOption>Haiwan</IonSelectOption>
              <IonSelectOption>
                Ternakan / Belaan Haiwan Tanpa Lesen
              </IonSelectOption>
              <IonSelectOption>Gangguan Haiwan Merayau / Liar</IonSelectOption>
              <IonSelectOption>Haiwan Mati</IonSelectOption>
              <IonSelectOption>Aduan Tak Berasas</IonSelectOption>
              <IonSelectOption>
                Gangguan Akibat Pemeliharaan Burung Layang-Layang{" "}
              </IonSelectOption>
              <IonSelectOption>
                Lain-lain Aduan Berkaitan Haiwan
              </IonSelectOption>
              <IonSelectOption>
                Halangan Kenderaan / Lain-Lain / Kenderaan Tinggal
              </IonSelectOption>
              <IonSelectOption>Halangan Kenderaan</IonSelectOption>
              <IonSelectOption>Kenderaan Tinggal</IonSelectOption>
              <IonSelectOption>Lain-lain </IonSelectOption>
              <IonSelectOption>Aduan Tak Berasas</IonSelectOption>
              <IonSelectOption>Penyelenggaraan</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Komen</IonLabel>
            <IonTextarea
              onIonChange={(e: any) => setComment(e.target.value)}
              color="primary"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">GPS Lokasi Aduan</IonLabel>
            {Apimap()}
          </IonItem>
          {photos.map((photo, index) => (
            <IonCol size="5" key={index}>
              <IonImg src={photo.webviewPath} />
            </IonCol>
          ))}
          <IonItem>
            <IonLabel position="fixed">Lampiran</IonLabel>
            <IonButton onClick={() => takePhoto()} className="gambarbtn">
              <IonIcon slot="start" icon={image}></IonIcon>Tambah Gambar
            </IonButton>
          </IonItem>

          <IonButton onClick={aduan} className="submit" expand="block">
            Hantar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Aduan;
