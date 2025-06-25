import { IonContent, IonFooter, IonHeader, IonBackButton, IonButtons, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef, useState, useEffect, useCallback, ChangeEvent } from 'react';
import './Coloring.css'; // Import your custom styles
// Define the structure for a drawing stroke

const data = [
  {
    name: "Jelly and the Days of Creation",
    image: "https://cas-development.ucg.org/sites/default/files/public/styles/pub_promo_link_card/public/story-book-days_of_creation_ebook-hd3d.png.webp",
    description: "A coloring book about the days of creation, with illustrations for each day.",
    pdf: "https://ucgweb.s3.amazonaws.com/files/jelly/jelly-and-the-days-of-creation-coloring-book.pdf"
  },
  {
    name: "Jelly Learns the 10 Commandments",
    image: "https://cas-development.ucg.org/sites/default/files/public/styles/pub_promo_link_card/public/covers-01.png.webp",
    description: "A coloring book about the 10 commandments, with illustrations for each commandment.",
    pdf: "https://ucgweb.s3.amazonaws.com/files/jelly/jelly-learns-the-ten-commandments-coloring-book.pdf"
  }
  
]

const Coloring: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
           <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
           </IonButtons>
          
          <IonTitle>Coloring Books</IonTitle>
          <IonButtons slot="end"> {/* Toggler on the right slot */}
              <IonMenuButton />
              
            </IonButtons>
        </IonToolbar>

      </IonHeader>
      <IonContent>
        <div className='container pt-4'>
        <h1 className="mb-4">Coloring Books</h1>
        <div className="row">
        {data.map((item, index) => (
          <div className="col-md-6">
            <div key={index} className="coloring-item card mb-4">
              <div className="card-header bg-success text-white">
                <h3>{item.name}</h3>
              </div>

              <div className='card-body'>
              <img src={item.image} alt={item.name} className="coloring-image" />
              <div dangerouslySetInnerHTML={ { __html: item.description }} className="descript"></div>
              <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="text-primary btn-text d-block my-3">Download PDF</a>
              <button  className='btn btn-block w-100 d-block btn-lg btn-primary'>Color it!</button>
            </div>
            </div>
            </div>
        ))}
        </div>
              
        </div>
      </IonContent>
          
         
    </IonPage>
  );
};

export default Coloring;
