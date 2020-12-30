import { IonButton,IonMenuButton,IonContent, IonHeader, IonButtons, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Info.css';

const Info: React.FC = () => {
  
  return (
    <IonPage>
         <IonHeader >
        <IonToolbar color="secondary">
        <IonButtons slot="start">
        <IonMenuButton autoHide={false} />
      </IonButtons>
      <IonTitle size="small">Info MBSP</IonTitle>
    </IonToolbar>
        </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
    
  );
};

export default Info;
