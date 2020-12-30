import { IonButtons,IonCard, IonCardContent, IonContent,  IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonButton, IonMenuButton } from '@ionic/react';
import React from 'react';
import { search } from 'ionicons/icons';
import './Perutusan.css';

const Perutusan: React.FC = () => {
  return (
    <IonPage>
        
        <IonHeader >
        <IonToolbar color="secondary">
        <IonButtons slot="start">
        <IonMenuButton autoHide={false} />
      </IonButtons>
      <IonTitle size="small">Perutusan Datuk Bandar</IonTitle>
    </IonToolbar>
        </IonHeader>
        


      <IonContent fullscreen >
      </IonContent>
    </IonPage>
    
  );
};

export default Perutusan;
