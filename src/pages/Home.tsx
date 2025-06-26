import { IonContent, IonIcon, IonButtons, IonMenuButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef, useEffect, useState } from 'react';

import './Home.css';
import { homeOutline, informationCircleOutline, extensionPuzzle, videocamOutline, pencilOutline,
    bookOutline, settingsOutline, fastFoodOutline } from 'ionicons/icons';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faCoffee, faHouse } from '@fortawesome/free-solid-svg-icons' // Example icon, add more as needed
const Home: React.FC = () => {
document.title = "Jelly Activities";
library.add(faBook, faHouse);

const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const [pathData, setPathData] = useState('');

  useEffect(() => {
    const updatePath = () => {
      if (section1Ref.current && section2Ref.current && section3Ref.current) {
        const s1 = section1Ref.current.getBoundingClientRect();
        const s2 = section2Ref.current.getBoundingClientRect();
        const s3 = section3Ref.current.getBoundingClientRect();

        // Get the container's position to make SVG coordinates relative
        const containerElement = document.getElementById('svg-container');
        if (!containerElement) return;
        const containerRect = containerElement.getBoundingClientRect();

        // Calculate connection points (e.g., center-right of s1 to center-left of s2)
        const p1 = { x: s1.right - containerRect.left, y: s1.top + s1.height / 2 - containerRect.top };
        const p2 = { x: s2.left - containerRect.left, y: s2.top + s2.height / 2 - containerRect.top };
        const p3 = { x: s2.right - containerRect.left, y: s2.top + s2.height / 2 - containerRect.top };
        const p4 = { x: s3.left - containerRect.left, y: s3.top + s3.height / 2 - containerRect.top };


        // --- Curve 1: s1 to s2 (e.g., from right of s1 to left of s2, curving top) ---
        // Adjust control points for desired curve and side
        const cp1_x = (p1.x + p2.x) / 2;
        const cp1_y = Math.min(p1.y, p2.y) - 100; // Curve upwards

        const curve1 = `M ${p1.x} ${p1.y} C ${cp1_x} ${cp1_y}, ${cp1_x} ${cp1_y}, ${p2.x} ${p2.y}`;

        // --- Curve 2: s2 to s3 (e.g., from right of s2 to left of s3, curving bottom) ---
        const cp2_x = (p3.x + p4.x) / 2;
        const cp2_y = Math.max(p3.y, p4.y) + 100; // Curve downwards

        const curve2 = `M ${p3.x} ${p3.y} C ${cp2_x} ${cp2_y}, ${cp2_x} ${cp2_y}, ${p4.x} ${p4.y}`;


        setPathData(`${curve1} ${curve2}`);
      }
    };

    updatePath(); // Initial render
    window.addEventListener('resize', updatePath); // Update on resize

    return () => window.removeEventListener('resize', updatePath);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
    
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
           
          <IonTitle>Jelly Activities</IonTitle>
          <IonButtons slot="end"> {/* Toggler on the right slot */}
            <IonMenuButton />
            
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <div className="heroTop text-center">
          <img src="facebookbanner.png" alt="Jelly Activities Banner" className="img-fluid w-100" />
          
          
        </div>
        <div className="hero">
            <h1 className="text-center display-4 knewave-regular">Jelly Activities</h1>
            <p className="text-center">Explore a variety of fun and educational activities for kids!</p>
          </div>
        <div className="container p-0">
        
        <div className="rows"  style={{ position: 'relative', overflow: 'hidden', border: '1px dashed grey', padding: '20px' }}>
          <div className="mb-3 section" ref={section1Ref}>
            <div className="big-button">
              <div className="text-center card-header">
              <IonIcon size="large" icon={bookOutline} />
              </div>
              <div className="card-body">
                <h5 className="card-title">Coloring Books</h5>
                <p className="card-text">Explore our collection of coloring books.</p>
                <a href="/coloring" className="btn btn-tertiary">Yes!</a>
              </div>
            </div>
          </div>
          <div className="mb-3 section" ref={section2Ref}>
            <div className="big-button">
              <div className="text-center card-header">
                <IonIcon size="large" icon={extensionPuzzle} />
                </div>
              <div className="card-body">
                <h5 className="card-title">Crossword Puzzles</h5>
                <p className="card-text">Challenge your mind with our crossword puzzles.</p>
                <a href="/crossword" className="btn btn-tertiary">Yes!</a>
              </div>
            </div>
          </div>
          <div className="mb-3 section" ref={section3Ref}>
            <div className="big-button">
              <div className="text-center card-header">
              <IonIcon size="large"  icon={informationCircleOutline} />
              </div>
              <div className="card-body">
                <h5 className="card-title">Trivia</h5>
                <p className="card-text">Test your knowledge with our trivia questions.</p>
                <a href="/trivia" className="btn btn-tertiary">Yes!</a>
              </div>
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
        
      </IonContent>
    </IonPage>
    </>
  );
};

export default Home;
