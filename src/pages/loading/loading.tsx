import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import ExploreContainer from "../../components/ExploreContainer";
import "./loading.css";

const Loading: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color="secondary">
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Loading;
