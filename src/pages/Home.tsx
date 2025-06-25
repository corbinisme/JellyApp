import { IonContent, IonIcon, IonButtons, IonMenuButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';


import { homeOutline, informationCircleOutline, extensionPuzzle, videocamOutline, pencilOutline,
    bookOutline, settingsOutline, fastFoodOutline } from 'ionicons/icons';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faCoffee, faHouse } from '@fortawesome/free-solid-svg-icons' // Example icon, add more as needed
const Home: React.FC = () => {
document.title = "Jelly Activities";
library.add(faBook, faHouse)
  return (
    <>
    
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
           
          <IonTitle>Jelly Activities here</IonTitle>
          <IonButtons slot="end"> {/* Toggler on the right slot */}
            <IonMenuButton />
            
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <div className="heroTop ">
          <img src="facebookbanner.png" alt="Jelly Activities Banner" className="img-fluid w-100" />
          
          <div className="hero">
            <h1 className="text-center">Jelly Activities</h1>
            <p className="text-center">Explore a variety of fun and educational activities for kids!</p>
          </div>
        </div>
        <div className="container p-0">
        
        <div className="row">
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="text-center card-header">
              <IonIcon size="large" icon={bookOutline} />
              </div>
              <div className="card-body">
                <h5 className="card-title">Coloring Books</h5>
                <p className="card-text">Explore our collection of coloring books.</p>
                <a href="/coloring" className="btn btn-primary">Yes!</a>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="text-center card-header">
                <IonIcon size="large" icon={extensionPuzzle} />
                </div>
              <div className="card-body">
                <h5 className="card-title">Crossword Puzzles</h5>
                <p className="card-text">Challenge your mind with our crossword puzzles.</p>
                <a href="/crossword" className="btn btn-primary">Yes!</a>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="text-center card-header">
              <IonIcon size="large"  icon={informationCircleOutline} />
              </div>
              <div className="card-body">
                <h5 className="card-title">Trivia</h5>
                <p className="card-text">Test your knowledge with our trivia questions.</p>
                <a href="/trivia" className="btn btn-primary">Yes!</a>
              </div>
            </div>
          </div>
        </div>
        <div className="position-relative videoWrapper">
          <img src="Jelly-wide.jpg" alt="Jelly Activities" className="img-fluid mt-4" />
          <button className="btn video-btn btn-xl btn-secondary position-absolute bottom-0 end-0 m-3" onClick={() => window.location.href = '/meats'}>
            Videos
          </button>
        </div>
        </div>
        
      </IonContent>
    </IonPage>
    </>
  );
};

export default Home;
