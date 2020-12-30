import React, { useState } from "react";
import "./ExploreContainer.css";
import { IonImg, IonLoading } from "@ionic/react";
import { useHistory } from "react-router-dom";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const history = useHistory();
  const [showLoading] = useState(true);

  setTimeout(() => {
    history.push("/home");
  }, 2000);

  return (
    <div className="container">
      <IonImg
        src="./assets/images/logo.png"
        className="logoloading"
        alt="logo"
      ></IonImg>
      <br></br>
      <strong className="mymbsp">MyMBSP</strong>
      <br></br>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => history.push("/home")}
        message={"Sila Tunggu..."}
        spinner="circles"
      />
    </div>
  );
};

export default ExploreContainer;
