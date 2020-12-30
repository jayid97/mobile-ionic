import { IonSlide, IonCol, IonCard, IonCardHeader, IonCardContent, IonList, IonItem, IonButton, IonIcon } from '@ionic/react';
import { searchOutline, createOutline } from 'ionicons/icons';
import React from 'react';
import './AduanTicket.css';


const AduanTicket: React.FC = () => {
  return (
    <IonSlide>
        <IonCol size="12">
            <IonCard className="cardStyle">
                <IonCardHeader>
                    Aduan
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            No Rujukan:
                        </IonItem>
                        <IonItem>
                            Pengguna:
                        </IonItem>
                        <IonItem>
                            Kategori:
                        </IonItem>
                        <IonItem>
                            Lokasi:
                        </IonItem>
                        <IonItem>
                            Ditugaskan:
                        </IonItem>
                        <IonItem>
                            Status:
                        </IonItem>
                        <IonItem>
                            <IonButton>
                                <IonIcon slot="start" ios={ searchOutline } md={ searchOutline } />
                                Lihat
                            </IonButton>
                            <IonButton>
                                <IonIcon slot="start" ios={ createOutline } md={ createOutline } />
                                Kemaskini
                            </IonButton>
                        </IonItem>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </IonCol>
    </IonSlide>
  );
};

export default AduanTicket;