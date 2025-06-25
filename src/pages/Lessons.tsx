import { IonContent, IonMenuButton, IonList, IonItem, IonLabel, IonHeader, IonButtons, IonBackButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useEffect, useState } from 'react';  
import lessonsData from '../data/Lessons';
import { Lesson } from '../data/Lessons';

const Lessons: React.FC = () => {

  const [lessonVals, setLessonVals] = useState<Lesson[]>([]);
  const [level, setLevel] = useState<string>(''); // State to hold the selected level
  const levels =['K', '1', '2', '3', '4', '5', 'Junior High']; // Array of levels


  useEffect(() => {
    
    let lessonObj = lessonsData.filter((lesson: Lesson) => lesson.level === level);
    console.log("Filtered lessons for level", level, ":", lessonObj);
    setLessonVals(lessonObj);
    
  }, []);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Lessons {level}</IonTitle>
          <IonButtons slot="end"> {/* Toggler on the right slot */}
              <IonMenuButton />
              
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        {level==""? (
          <div className="container ion-padding">
            <h2>Select a Level</h2>
            <IonList className="level-list">
              {levels.map((lvl) => (
                <IonItem key={lvl}>
                  <IonLabel className={`btn btn-block text-left btn-primary text-white level-button ${level === lvl ? 'active' : ''}`}
                  onClick={() => setLevel(lvl)}> {lvl}</IonLabel>
                </IonItem>
                
              ))}
            </IonList>
          </div>
        ): (
          <>
          <div className="text-center level-select mt-4">
            <button className="btn btn-secondary" onClick={()=> setLevel("")}>Select Level</button>
          </div>
          <div><hr />
            {level == "K" && <>
            <h2 className="text-center">Kindergarten Lessons</h2>
            <div className="container-sm mt-4" dangerouslySetInnerHTML={{ __html: lessonsData[0].content }}></div>
            </>}
          </div>
          </>

        )}
      </IonContent>
    </IonPage>
  );
};

export default Lessons;
