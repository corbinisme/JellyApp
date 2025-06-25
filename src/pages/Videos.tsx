import { IonContent, IonHeader, IonMenuButton, IonButtons, IonBackButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {useEffect, useState} from 'react';
interface videoData {
  title: string;
  summary: string;
  url: string;
}

const Videos: React.FC = () => {

  const [videos, setVideos] = useState<videoData[]>([]);
  useEffect(() => {
    document.title = "Jelly Videos";
    console.log("Fetching videos...");
    let videoUrls: Record<string, videoData> = {}; 
    fetch('https://cas-development.ucg.org/jsonapi/views/kids/block_1?include=field_video')
    .then(response => response.json())
    .then(data => {
      console.log('Videos fetched successfully:', data);
      let videoIDs = data.data.map((item: any) => item.relationships.field_video.data.id);
      videoIDs.forEach((id: string) => {
        
        data.included.filter((video: any) => video.id === id).forEach((video: any) => {
          console.log("this is",video);
          const videoUrl = video.attributes.field_media_oembed_video;
          videoUrls[id] = {
            title: video.attributes.name,
            summary: video.attributes.field_summary,
            url: videoUrl
          }
        });
      });
      
      setVideos(Object.values(videoUrls));
      console.log("Videos state updated:", videoUrls);
    })
    .catch(error => {
      console.error('Error fetching videos:', error);
    });

  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Videos</IonTitle>
          <IonButtons slot="end"> {/* Toggler on the right slot */}
              <IonMenuButton />
              
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding container">
          <div className="row">
        {videos && videos.map((video: videoData, index: number) => {

            
            const youtubeEmbedRegex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
            // extract the video ID from the URL
            const match = video.url.match(youtubeEmbedRegex)
            const youtubeEmbedUrl = video.url.replace(youtubeEmbedRegex, 'https://www.youtube.com/embed/$1')
            console.log("Video URL:", youtubeEmbedUrl, video);
          return (


          <div key={index} className="video-item mb-4 col-md-6 col-lg-4">
            <div className="card">
            <div className="card-header">
                <h3 className="m-0">{video.title}</h3>
            </div>
            <p>{video.summary}</p>
            <iframe
              width="560"
              className="iframe-responsive"
              height="315"
              src={youtubeEmbedUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            </div>
          </div>
          
        )
        })
        }
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Videos;
