import { IonContent, IonFooter, IonHeader, IonBackButton, IonButtons, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef, useState, useEffect, useCallback, ChangeEvent } from 'react';


const Songs: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
           <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
           </IonButtons>
          
          <IonTitle>Jelly Songs</IonTitle>
          <IonButtons slot="end"> {/* Toggler on the right slot */}
              <IonMenuButton />
              
            </IonButtons>
        </IonToolbar>

      </IonHeader>
      <IonContent>
        View Spotify albums
      </IonContent>
          
         
    </IonPage>
  );
};

export default Songs;
