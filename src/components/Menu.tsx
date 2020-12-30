import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  addOutline,
  chevronDownOutline,
  documentTextOutline,
  gridOutline,
  homeOutline,
  searchOutline,
  personCircleOutline,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const mainPages: AppPage[] = [
  {
    title: "Halaman Utama",
    url: "/Home",
    iosIcon: homeOutline,
    mdIcon: homeOutline,
  },
];

const clientPages: AppPage[] = [
  {
    title: "Aduan",
    url: "/client/aduan",
    iosIcon: addOutline,
    mdIcon: addOutline,
  },
  {
    title: "Lihat Aduan",
    url: "/client/lihat",
    iosIcon: searchOutline,
    mdIcon: searchOutline,
  },
  {
    title: "Profile",
    url: "/profile",
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline,
  },
];

const appPages: AppPage[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    iosIcon: gridOutline,
    mdIcon: gridOutline,
  },
  {
    title: "Aduan",
    url: "/admin/aduan",
    iosIcon: documentTextOutline,
    mdIcon: documentTextOutline,
  },
];

const Menu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [menuAduanStatus, setMenuAduanStatus] = useState<boolean>(true);

  const checkRole = window.localStorage.getItem("role");
  //const checkRole = "admin";

  // Cipta aduan button only show if user is admin, hod or staff
  function aduanButton() {
    if (checkRole === "admin")
      return (
        <IonButton routerLink="/cipta/page1" expand="block" type="button">
          Cipta Aduan
        </IonButton>
      );
    return null;
  }

  // Sub menu function for aduan (admin)
  function menuAduan() {
    if (menuAduanStatus === false) {
      setMenuAduanStatus(true);
    } else {
      setMenuAduanStatus(false);
    }
  }

  // Show this menu if user role is admin, hod or staff
  function adminList() {
    if (checkRole === "admin")
      return (
        <IonList id="labels-list">
          <IonListHeader>Aktiviti</IonListHeader>
          <IonItem
            routerLink="/dashboard"
            routerDirection="none"
            lines="none"
            detail={false}
          >
            <IonIcon slot="start" ios={gridOutline} md={gridOutline} />
            <IonLabel>Dashboard</IonLabel>
          </IonItem>
          <IonItem lines="none" onClick={menuAduan}>
            <IonIcon
              slot="start"
              ios={documentTextOutline}
              md={documentTextOutline}
            />
            <IonLabel>Aduan</IonLabel>
            <IonIcon
              slot="end"
              ios={chevronDownOutline}
              md={chevronDownOutline}
            />
          </IonItem>
          <IonMenuToggle hidden={menuAduanStatus}>
            <IonList lines="none">
              <IonItem
                routerLink="/ticket"
                routerDirection="none"
                lines="none"
                detail={false}
                class="ion-padding-start"
              >
                <IonIcon
                  slot="start"
                  ios={documentTextOutline}
                  md={documentTextOutline}
                ></IonIcon>
                Senarai Aduan Baru
              </IonItem>
              <IonItem
                routerLink="/ticket/assigned"
                routerDirection="none"
                lines="none"
                detail={false}
                class="ion-padding-start"
              >
                <IonIcon
                  slot="start"
                  ios={documentTextOutline}
                  md={documentTextOutline}
                ></IonIcon>
                Aduan Ditugaskan
              </IonItem>
              <IonItem
                routerLink="/ticket/department"
                routerDirection="none"
                lines="none"
                detail={false}
                class="ion-padding-start"
              >
                <IonIcon
                  slot="start"
                  ios={documentTextOutline}
                  md={documentTextOutline}
                ></IonIcon>
                Keseluruhan Aduan Jabatan
              </IonItem>
              <IonItem
                routerLink="/ticket/closed"
                routerDirection="none"
                lines="none"
                detail={false}
                class="ion-padding-start"
              >
                <IonIcon
                  slot="start"
                  ios={documentTextOutline}
                  md={documentTextOutline}
                ></IonIcon>
                Aduan Ditutup
              </IonItem>
              <IonItem
                routerLink="/ticket/opened"
                routerDirection="none"
                lines="none"
                detail={false}
                class="ion-padding-start"
              >
                <IonIcon
                  slot="start"
                  ios={documentTextOutline}
                  md={documentTextOutline}
                ></IonIcon>
                Aduan Baru Dibuka
              </IonItem>
              <IonItem
                routerLink="/ticket/problem"
                routerDirection="none"
                lines="none"
                detail={false}
                class="ion-padding-start"
              >
                <IonIcon
                  slot="start"
                  ios={documentTextOutline}
                  md={documentTextOutline}
                ></IonIcon>
                Aduan Bermasalah
              </IonItem>
            </IonList>
          </IonMenuToggle>
        </IonList>
      );

    // Show this menu if user role is client
    if (checkRole === "client")
      return (
        <IonList id="labels-list">
          <IonListHeader>Aktiviti</IonListHeader>
          {clientPages.map((clientPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === clientPage.url ? "selected" : ""
                  }
                  routerLink={clientPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={clientPage.iosIcon}
                    md={clientPage.mdIcon}
                  />
                  <IonLabel>{clientPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      );
    return null;
  }

  // Function to show logout button if user already logged in or vice versa
  function logButton() {
    if (checkRole != null)
      return (
        <IonButton expand="block" type="button" color="danger" onClick={logOut}>
          Log Keluar
        </IonButton>
      );
    return (
      <IonButton
        routerLink="/login"
        expand="block"
        type="button"
        color="primary"
      >
        Log Masuk
      </IonButton>
    );
  }

  // Clear local storage when logout
  function logOut() {
    window.localStorage.clear();
    history.push("/login");
    return null;
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent class="ion-padding">
        <div className="header">
          <IonList id="inbox-list" class="ion-margin-bottom">
            <img
              src="./assets/images/header-logo.png"
              className="header-logo"
            />
          </IonList>
        </div>

        {aduanButton()}

        <IonList id="labels-list">
          {mainPages.map((mainPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === mainPage.url ? "selected" : ""
                  }
                  routerLink={mainPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={mainPage.iosIcon}
                    md={mainPage.mdIcon}
                  />
                  <IonLabel>{mainPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {adminList()}

        <IonList id="labels-list">
          <IonListHeader>Log Keluar/Masuk</IonListHeader>
          {logButton()}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
