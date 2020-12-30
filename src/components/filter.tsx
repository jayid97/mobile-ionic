import React, { useState } from "react";
import { IonSelect, IonSelectOption } from "@ionic/react";

const FilterButton: React.FC = () => {
  const [cases, setCase] = useState<string>();

  return (
    <IonSelect
      value={cases}
      okText="Ya"
      cancelText="Batal"
      onIonChange={(e) => setCase(e.detail.value)}
    >
      <IonSelectOption>Jalan Berlubang(Potholes)</IonSelectOption>
      <IonSelectOption>Jalan Berlubang(Potholes)</IonSelectOption>
      <IonSelectOption>Isu Parit(Drainage Issue)</IonSelectOption>
      <IonSelectOption>Rumput Tidak Dipotong(Uncut Grass)</IonSelectOption>
    </IonSelect>
  );
};

export default FilterButton;
