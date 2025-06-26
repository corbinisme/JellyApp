import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonMenu,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import "./Global.css";

import { ellipse, square, triangle } from 'ionicons/icons';
import Trivia from './pages/Trivia';
import Meats from './pages/Meats';
import Coloring from './pages/Coloring';
import Home from './pages/Home';
import GlobalMenu from './components/GlobalMenu';
import Videos from './pages/Videos';
import Lessons from './pages/Lessons';
import Songs from './pages/Songs';

import 'bootstrap/dist/css/bootstrap.min.css';

/* Font Awesome imports */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons'; // If you installed regular icons
import { fab } from '@fortawesome/free-brands-svg-icons'; // If you installed brand icons


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Crossword from './pages/Crossword';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <GlobalMenu menuId="mainMenu" />
        <IonRouterOutlet  id="main-content">
          <Route exact path="/Trivia">
            <Trivia />
          </Route>
           <Route exact path="/home">
            <Home />
           </Route>
          <Route exact path="/Meats">
            <Meats />
          </Route>
          <Route path="/Coloring">
            <Coloring />
          </Route>
          <Route path="/crossword">
            <Crossword />
          </Route>
          <Route path="/Videos">
            <Videos />
          </Route>
          <Route path="/Lessons">
            <Lessons />
          </Route>
          <Route path="/Songs">
            <Songs />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        
  
     
      
    </IonReactRouter>
    
  </IonApp>
);

export default App;
