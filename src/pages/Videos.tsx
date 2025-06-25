import { IonContent, IonHeader, IonMenuButton, IonButtons, IonBackButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {useEffect, useState} from 'react';
interface videoData {
  title: string;
  summary: string;
  url: string;
  downloads: string[];
  id: string;
}

const Videos: React.FC = () => {

  const [videoID, setVideoID] = useState<string>("");
  const [videos, setVideos] = useState<videoData[]>([]);

  const handleVideoClick = (id: string) => {
    console.log("Video clicked:", id);
    setVideoID(id);
  }
  useEffect(() => {
    document.title = "Jelly Videos";
    console.log("Fetching videos...");
    let videoUrls: Record<string, videoData> = {}; 
    fetch('https://cas-development.ucg.org/jsonapi/node/media_production?filter[field_ref_publication.drupal_internal__tid]=280&include=field_video')
    .then(response => response.json())
    .then(data => {
      console.log('Videos fetched successfully:', data);
      let videoIDs = data.data.map((item: any) => item.relationships.field_video.data.id);
      videoIDs.forEach((id: string) => {
        
        data.included.filter((video: any) => video.id === id).forEach((video: any) => {
          console.log("this is",video);
          const videoUrl = video.attributes.field_media_oembed_video;
          
          const originalVideo = data.data.filter((item: any) => item.relationships.field_video.data.id === id)[0];
          console.log("Original Video:", originalVideo);
          const attachments = originalVideo.relationships.field_attachment?.data || [];
          console.log("Attachments:", attachments);
          videoUrls[id] = {
            title: video.attributes.name,
            summary: video.attributes.field_summary,
            url: videoUrl,
            downloads: [],
            id: id
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

            {videoID ==""? (   
              <>
              {videos && videos.map((video: videoData, index: number) => {
const youtubeEmbedRegex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
            // extract the video ID from the URL
            const match = video.url.match(youtubeEmbedRegex)
            const youtubeEmbedUrl = video.url.replace(youtubeEmbedRegex, 'https://www.youtube.com/embed/$1')
            console.log("Video URL:", youtubeEmbedUrl, video);
            const image = video.url.replace(youtubeEmbedRegex, 'https://i.ytimg.com/vi/$1/maxresdefault.jpg')
            //const image = `https://i.ytimg.com/vi/tIqGddvWspU/maxresdefault.jpg`   
            return (


          <div key={index} className="video-item mb-4 col-lg-6 col-lg-4">
            <div className="card">
            <div className="card-header bg-primary text-white">
                <h3 className="m-0" onClick={()=>handleVideoClick(video.id)}>{video.title}</h3>
            </div>
            <p>{video.summary}</p>
            <img src={image} alt={video.title} className="video-thumbnail" />
            </div>
          </div>
           
              )
              })}
              </> 
            ) : (
          <div className="col-12">
            
            {videos && videos.filter((video: videoData) => video.id === videoID).map((video: videoData, index: number) => {
              const youtubeEmbedRegex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
              // extract the video ID from the URL
              const match = video.url.match(youtubeEmbedRegex)
              const youtubeEmbedUrl = video.url.replace(youtubeEmbedRegex, 'https://www.youtube.com/embed/$1')
              console.log("Video individual:", youtubeEmbedUrl, video);

              return (
                <div>
                  <button className="btn btn-secondary" onClick={() => setVideoID("")}>Back to Videos</button>
                  <h3 className="heading bg-primary text-white p-3">{video.title}</h3>
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
              )
            })}
          </div>
        )
        }
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Videos;
