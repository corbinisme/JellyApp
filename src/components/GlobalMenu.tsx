import React from 'react';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle
} from '@ionic/react';


import { homeOutline, informationCircleOutline, extensionPuzzle, videocamOutline, pencilOutline,
    bookOutline, settingsOutline, fastFoodOutline } from 'ionicons/icons';

interface GlobalMenuProps {
  menuId: string;
}

const GlobalMenu: React.FC<GlobalMenuProps> = ({ menuId }) => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/home" routerDirection="none">
              <IonIcon slot="start" icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/coloring" routerDirection="none">
  
              <IonIcon slot="start" icon={bookOutline} />
              <IonLabel>Coloring Books</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/crossword" routerDirection="none">
  
              <IonIcon slot="start" icon={extensionPuzzle} />
              <IonLabel>Crossword Puzzles</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/trivia" routerDirection="none">
              <IonIcon slot="start" icon={informationCircleOutline} />
              <IonLabel>Trivia</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/meats" routerDirection="none">
              <IonIcon slot="start" icon={fastFoodOutline} />
              <IonLabel>Clean and Unclean Meats</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/videos" routerDirection="none">
              <IonIcon slot="start" icon={videocamOutline} />
              <IonLabel>Jelly Videos</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/lessons" routerDirection="none">
              <IonIcon slot="start" icon={pencilOutline} />
              <IonLabel>Lessons</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default GlobalMenu;
