import {
  IonText,
  IonRow,
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonAlert,
  IonLoading,
  IonImg,
  IonIcon,
} from "@ionic/react";
import React, { useState } from "react";
import "../../pages/register/Signup.css";
import Axios from "axios";
import { useHistory } from "react-router";
import {
  calendarOutline,
  callOutline,
  cardOutline,
  keyOutline,
  locationOutline,
  mailOutline,
  personOutline,
} from "ionicons/icons";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vpassword, setVPassword] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [add3, setAdd3] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [district, setDistrict] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [race, setRace] = useState<string>();
  const [iserror, setIserror] = useState<boolean>(false);
  const [issuccess, setIssuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showLoading, setShowLoading] = useState(true);

  const history = useHistory();
  function SignupUser() {
    if (!name) {
      setMessage("Sila masukkan Nama");
      setIserror(true);
      return;
    }
    if (!email) {
      setMessage("Sila masukkan Email");
      setIserror(true);
      return;
    }
    if (!id) {
      setMessage("Sila masukkan MYID/Passport");
      setIserror(true);
      return;
    }
    if (!gender) {
      setMessage("Sila masukkan Jantina");
      setIserror(true);
      return;
    }
    if (!password) {
      setMessage("Sila masukkan Kata Laluan");
      setIserror(true);
      return;
    }
    if (!vpassword) {
      setMessage("Sila masukkan Verifikasi Kata Laluan");
      setIserror(true);
      return;
    }
    if (password != vpassword) {
      setMessage("Sila pastikan kata laluan sepadan");
      setIserror(true);
      return;
    }

    setShowLoading(true);

    Axios.post("http://localhost/mbsp-eaduan/api/create_user.php/", {
      IC: id,
      email: email,
      password: password,
      first_name: name,
      No_Jln_Lrg: add1,
      Taman_Kampung: add2,
      Bandar_Kawasan: add3,
      daerah: district,
      Poskod: postcode,
      gender: gender,
      user_role: 10,
      phoneNumber: phone,
      race: race,
      age: age,
    })
      .then((result) => result.data)
      .then((result) => {
        setTimeout(() => {
          setShowLoading(false);
        }, result.data);
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
          onDidDismiss={() => setIssuccess(false)}
          cssClass="my-custom-class"
          header={"Perhatian!"}
          message={"Pendaftaran Berjaya"}
          buttons={["Tutup"]}
        />
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Sila Tunggu..."}
          duration={5000}
          spinner="circles"
        />

        <IonRow class="ion-justify-content-center">
          <IonImg
            src="./assets/images/header-logo.png"
            className="logohead"
          ></IonImg>
        </IonRow>

        <div className="signupform">
          <IonInput
            name="name"
            onIonChange={(e: any) => setName(e.target.value)}
            className="name"
            placeholder="Nama Penuh"
            color="primary"
          >
            <IonIcon
              slot="start"
              icon={personOutline}
              color="primary"
              className="iconName"
            ></IonIcon>
          </IonInput>

          <IonInput
            name="MYID"
            onIonChange={(e: any) => setId(e.target.value)}
            color="primary"
            placeholder="MYID/Passport"
            className="MYID"
          >
            <IonIcon
              slot="start"
              icon={cardOutline}
              color="primary"
              className="iconID"
            ></IonIcon>
          </IonInput>

          <IonInput
            type="email"
            name="email"
            onIonChange={(e: any) => setEmail(e.target.value)}
            color="primary"
            placeholder="Email"
            className="email"
          >
            <IonIcon
              slot="start"
              icon={mailOutline}
              color="primary"
              className="iconEmail"
            ></IonIcon>
          </IonInput>

          <IonItem className="address">
            <IonLabel position="stacked" color="primary">
              Alamat
              <IonIcon
                slot="end"
                icon={locationOutline}
                color="primary"
                className="iconAddress"
              ></IonIcon>
            </IonLabel>
            <IonInput
              name="alamat1"
              onIonChange={(e: any) => setAdd1(e.target.value)}
              placeholder="No/Jln/Lrg"
              color="primary"
            />
            <IonInput
              name="alamat2"
              placeholder="Taman/Kampung"
              color="primary"
              onIonChange={(e: any) => setAdd2(e.target.value)}
            />
            <IonInput
              name="alamat3"
              placeholder="Bandar/Kawasan"
              color="primary"
              onIonChange={(e: any) => setAdd3(e.target.value)}
            />
          </IonItem>
          <IonRow>
            <IonCol>
              <IonInput
                name="poskod"
                onIonChange={(e: any) => setPostcode(e.target.value)}
                color="primary"
                className="poskod"
                placeholder="Poskod"
              >
                <IonIcon
                  slot="start"
                  icon={locationOutline}
                  color="primary"
                  className="iconPost"
                ></IonIcon>
              </IonInput>
            </IonCol>

            <IonCol>
              <IonSelect
                value={district}
                okText="Ya"
                cancelText="Batal"
                onIonChange={(e) => setDistrict(e.detail.value)}
                className="district"
                placeholder="Daerah"
              >
                <IonSelectOption>SPU: Seberang Perai Utara</IonSelectOption>
                <IonSelectOption>SPT: Seberang Perai Tengah</IonSelectOption>
                <IonSelectOption>SPS: Seberang Perai Selatan</IonSelectOption>
                <IonSelectOption>Lain-lain</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSelect
                value={gender}
                okText="Ya"
                cancelText="Batal"
                onIonChange={(e) => setGender(e.detail.value)}
                placeholder="Jantina"
                className="gender"
              >
                <IonSelectOption>Lelaki</IonSelectOption>
                <IonSelectOption>Perempuan</IonSelectOption>
                <IonSelectOption>Lain-lain agensi</IonSelectOption>
                <IonSelectOption>Tidak diketahui</IonSelectOption>
              </IonSelect>
            </IonCol>
            <IonCol>
              <IonInput
                name="phone"
                defaultValue="test"
                onIonChange={(e: any) => setPhone(e.target.value)}
                placeholder="Tel/HP"
                color="primary"
                className="phone"
              >
                <IonIcon
                  slot="start"
                  icon={callOutline}
                  color="primary"
                  className="iconPhone"
                ></IonIcon>
              </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSelect
                value={race}
                okText="Ya"
                cancelText="Batal"
                onIonChange={(e) => setRace(e.detail.value)}
                placeholder="Bangsa"
                className="races"
              >
                <IonSelectOption>Melayu</IonSelectOption>
                <IonSelectOption>Cina</IonSelectOption>
                <IonSelectOption>India</IonSelectOption>
                <IonSelectOption>Lain-lain</IonSelectOption>
                <IonSelectOption>Tidak diketahui</IonSelectOption>
              </IonSelect>
            </IonCol>
            <IonCol>
              <IonInput
                type="number"
                onIonChange={(e: any) => setAge(e.target.value)}
                placeholder="Umur"
                color="primary"
                className="age"
              >
                <IonIcon
                  slot="start"
                  icon={calendarOutline}
                  color="primary"
                  className="iconAge"
                ></IonIcon>
              </IonInput>
            </IonCol>
          </IonRow>

          <IonInput
            type="password"
            name="password"
            onIonChange={(e: any) => setPassword(e.target.value)}
            className="pass1"
            placeholder="Kata Laluan"
            color="primary"
          >
            <IonIcon
              slot="start"
              icon={keyOutline}
              color="primary"
              className="iconPass"
            ></IonIcon>
          </IonInput>

          <IonInput
            type="password"
            name="vpassword"
            onIonChange={(e: any) => setVPassword(e.target.value)}
            placeholder="Verifikasi Kata Laluan"
            className="vpassword"
            color="primary"
          >
            <IonIcon
              slot="start"
              color="primary"
              className="iconPass"
              icon={keyOutline}
            ></IonIcon>
          </IonInput>

          <IonButton onClick={SignupUser} className="daftar" color="primary">
            Daftar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
