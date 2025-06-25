import { IonContent, IonHeader, IonBackButton, IonButtons, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {MyCrossword} from 'mycrossword';
import 'mycrossword/style.css';


const data = {
  id: 'simple/1',
  number: 1,
  name: 'Simple Crossword #1',
  date: 1542326400000,
  entries: [
    {
      id: '1-across',
      number: 1,
      humanNumber: '1',
      clue: 'Toy on a string (2-2)',
      direction: 'across',
      length: 4,
      group: ['1-across'],
      position: { x: 0, y: 0 },
      separatorLocations: {
        '-': [2],
      },
      solution: 'YOYO',
    },
    {
      id: '4-across',
      number: 4,
      humanNumber: '4',
      clue: 'Have a rest (3,4)',
      direction: 'across',
      length: 7,
      group: ['4-across'],
      position: { x: 0, y: 2 },
      separatorLocations: {
        ',': [3],
      },
      solution: 'LIEDOWN',
    },
    {
      id: '1-down',
      number: 1,
      humanNumber: '1',
      clue: 'Colour (6)',
      direction: 'down',
      length: 6,
      group: ['1-down'],
      position: { x: 0, y: 0 },
      separatorLocations: {},
      solution: 'YELLOW',
    },
    {
      id: '2-down',
      number: 2,
      humanNumber: '2',
      clue: 'Bits and bobs (4,3,4)',
      direction: 'down',
      length: 7,
      group: ['2-down', '3-down'],
      position: { x: 3, y: 0 },
      separatorLocations: {
        ',': [4, 7],
      },
      solution: 'ODDSAND',
    },
    {
      id: '3-down',
      number: 3,
      humanNumber: '3',
      clue: 'See 2',
      direction: 'down',
      length: 4,
      group: ['2-down', '3-down'],
      position: {
        x: 6,
        y: 1,
      },
      separatorLocations: {},
      solution: 'ENDS',
    },
    
  ],
  solutionAvailable: true,
  dateSolutionAvailable: 1542326400000,
  dimensions: {
    cols: 13,
    rows: 13,
  },
  crosswordType: 'quick',
};
const data4 = {
  id: "bible/1",
  number: 1,
  name: "Bible Crossword #1",
  date: 1719235925232,
  entries: [
    {
      "id": "1-across",
      "number": 1,
      "humanNumber": "1",
      "clue": "Builder of the ark. (4)",
      "direction": "across",
      "length": 4,
      "group": [
        "1-across"
      ],
      "position": {
        "x": 0,
        "y": 0
      },
      "separatorLocations": {},
      "solution": "NOAH"
    },
    {
      "id": "3-across",
      "number": 3,
      "humanNumber": "3",
      "clue": "First man. (4)",
      "direction": "across",
      "length": 4,
      "group": [
        "3-across"
      ],
      "position": {
        "x": 5,
        "y": 0
      },
      "separatorLocations": {},
      "solution": "ADAM"
    },
    /*
    {
      id: "5-across",
      number: 5,
      humanNumber: "5",
      clue: "Belief, a spiritual gift. (5)",
      direction: "across",
      length: 5,
      group: [
        "5-across"
      ],
      position: {
        x: 10,
        y: 0
      },
      separatorLocations: {},
      solution: "FAITH"
    },
    
    {
      id: "7-across",
      number: 7,
      humanNumber: "7",
      clue: "Led the Israelites out of Egypt. (5)",
      direction: "across",
      length: 5,
      group: [
        "7-across"
      ],
      position: {
        x: 0,
        y: 2
      },
      separatorLocations: {},
      solution: "MOSES"
    }
    
    {
      id: "9-across",
      number: 9,
      humanNumber: "9",
      clue: "Good news. (6)",
      direction: "across",
      length: 6,
      group: [
        "9-across"
      ],
      position: {
        x: 7,
        y: 2
      },
      separatorLocations: {},
      solution: "GOSPEL"
    },
    {
      id: "10-across",
      number: 10,
      humanNumber: "10",
      clue: "Abraham's original name. (5)",
      direction: "across",
      length: 5,
      group: [
        "10-across"
      ],
      position: {
        x: 0,
        y: 4
      },
      separatorLocations: {},
      solution: "ABRAM"
    },
    {
      id: "12-across",
      number: 12,
      humanNumber: "12",
      clue: "A sacred song or poem. (5)",
      direction: "across",
      length: 5,
      group: [
        "12-across"
      ],
      position: {
        x: 9,
        "y": 4
      },
      separatorLocations: {},
      solution: "PSALM"
    },
    {
      id: "14-across",
      number: 14,
      humanNumber: "14",
      clue: "Son of God. (5)",
      direction: "across",
      length: 5,
      group: [
        "14-across"
      ],
      position: {
        x: 0,
        y: 6
      },
      separatorLocations: {},
      solution: "JESUS"
    },
    {
      id: "16-across",
      number: 16,
      humanNumber: "16",
      clue: "Book detailing the Israelites' departure from Egypt. (6)",
      direction: "across",
      length: 6,
      group: [
        "16-across"
      ],
      position: {
        x: 7,
        y: 6
      },
      separatorLocations: {},
      solution: "EXODUS"
    },
    {
      id: "17-across",
      number: 17,
      humanNumber: "17",
      clue: "Shepherd boy who slew Goliath. (5)",
      direction: "across",
      length: 5,
      group: [
        "17-across"
      ],
      position: {
        x: 0,
        y: 8
      },
      separatorLocations: {},
      solution: "DAVID"
    },
    {
      id: "19-across",
      number: 19,
      humanNumber: "19",
      clue: "Mother of Jesus. (4)",
      direction: "across",
      length: 4,
      group: [
        "19-across"
      ],
      position: {
        x: 0,
        y: 10
      },
      separatorLocations: {},
      solution: "MARY"
    },
    {
      id: "2-down",
      number: 2,
      humanNumber: "2",
      clue: "Set apart for God. (4)",
      direction: "down",
      length: 4,
      group: [
        "2-down"
      ],
      position: {
        x: 2,
        y: 0
      },
      separatorLocations: {},
      solution: "HOLY"
    },
    {
      id: "4-down",
      number: 4,
      humanNumber: "4",
      clue: "Saved pairs of animals. (3)",
      direction: "down",
      length: 3,
      group: [
        "4-down"
      ],
      position: {
        x: 6,
        y: 0
      },
      separatorLocations: {},
      solution: "ARK"
    },
    {
      id: "6-down",
      number: 6,
      humanNumber: "6",
      clue: "Disciple who denied Jesus three times. (5)",
      direction: "down",
      length: 5,
      group: [
        "6-down"
      ],
      position: {
        x: 11,
        y: 0
      },
      separatorLocations: {},
      solution: "PETER"
    },
    {
      id: "8-down",
      number: 8,
      humanNumber: "8",
      clue: "First woman. (3)",
      direction: "down",
      length: 3,
      group: [
        "8-down"
      ],
      position: {
        x: 4,
        y: 2
      },
      separatorLocations: {},
      solution: "EVE"
    },
    {
      id: "11-down",
      number: 11,
      humanNumber: "11",
      clue: "Often a sacrifice in ancient times. (4)",
      direction: "down",
      length: 4,
      group: [
        "11-down"
      ],
      position: {
        x: 2,
        y: 4
      },
      separatorLocations: {},
      solution: "LAMB"
    },
    {
      id: "13-down",
      number: 13,
      humanNumber: "13",
      clue: "Son of Abraham and Sarah. (5)",
      direction: "down",
      length: 5,
      group: [
        "13-down"
      ],
      position: {
        x: 10,
        y: 4
      },
      separatorLocations: {},
      solution: "ISAAC"
    },
    {
      id: "15-down",
      number: 15,
      humanNumber: "15",
      clue: "River where Jesus was baptized. (6)",
      direction: "down",
      length: 6,
      group: [
        "15-down"
      ],
      position: {
        x: 3,
        y: 6
      },
      separatorLocations: {},
      solution: "JORDAN"
    },
    {
      id: "18-down",
      number: 18,
      humanNumber: "18",
      clue: "Prophet who anointed Saul and David. (6)",
      direction: "down",
      length: 6,
      group: [
        "18-down"
      ],
      position: {
        x: 1,
        y: 8
      },
      separatorLocations: {},
      solution: "SAMUEL"
    },
    {
      id: "20-down",
      number: 20,
      humanNumber: "20",
      clue: "Ruth's mother-in-law. (5)",
      direction: "down",
      length: 5,
      group: [
        "20-down"
      ],
      position: {
        x: 2,
        y: 10
      },
      separatorLocations: {},
      solution: "NAOMI"
    },
    {
      id: "21-down",
      number: 21,
      humanNumber: "21",
      clue: "Holy ____. (6)",
      direction: "down",
      length: 6,
      group: [
        "21-down"
      ],
      position: {
        x: 12,
        y: 10
      },
      separatorLocations: {},
      solution: "SPIRIT"
    },
    {
      id: "22-down",
      number: 22,
      humanNumber: "22",
      clue: "Abel's brother. (4)",
      direction: "down",
      length: 4,
      group: [
        "22-down"
      ],
      position: {
        x: 4,
        y: 12
      },
      separatorLocations: {},
      solution: "CAIN"
    }
      */
    
  ],
  solutionAvailable: true,
  dateSolutionAvailable: 1719235925232,
  dimensions: {
    cols: 15,
    rows: 15
  },
  crosswordType: "themed"
}
const data3 = {
  id: "bible/1",
  number: 1,
  name: "Bible Crossword #1",
  date: 1719235925232,
  entries: [
    {
      id: "1-across",
      number: 1,
      humanNumber: "1",
      clue: "Builder of the ark. (4)",
      direction: "across",
      length: 4,
      group: [
        "1-across"
      ],
      position: {
        x: 0,
        y: 0
      },
      separatorLocations: {},
      solution: "NOAH"
    },
    {
      id: "3-across",
      number: 3,
      humanNumber: "3",
      clue: "First man. (4)",
      direction: "across",
      length: 4,
      group: [
        "3-across"
      ],
      position: {
        x: 5,
        y: 0
      },
      separatorLocations: {},
      solution: "ADAM"
    },
    {
      id: "5-across",
      number: 5,
      humanNumber: "5",
      clue: "Belief, a spiritual gift. (5)",
      direction: "across",
      length: 5,
      group: [
        "5-across"
      ],
      position: {
        x: 10,
        y: 0
      },
      separatorLocations: {},
      solution: "FAITH"
    },
    {
      id: "7-across",
      number: 7,
      humanNumber: "7",
      clue: "Led the Israelites out of Egypt. (5)",
      direction: "across",
      length: 5,
      group: [
        "7-across"
      ],
      position: {
        x: 0,
        y: 2
      },
      separatorLocations: {},
      solution: "MOSES"
    },
    {
      id: "9-across",
      number: 9,
      humanNumber: "9",
      clue: "Good news. (6)",
      direction: "across",
      length: 6,
      group: [
        "9-across"
      ],
      position: {
        x: 7,
        y: 2
      },
      separatorLocations: {},
      solution: "GOSPEL"
    },
    {
      id: "10-across",
      number: 10,
      humanNumber: "10",
      clue: "Abraham's original name. (5)",
      direction: "across",
      length: 5,
      group: [
        "10-across"
      ],
      position: {
        x: 0,
        y: 4
      },
      separatorLocations: {},
      solution: "ABRAM"
    },
    {
      id: "12-across",
      number: 12,
      humanNumber: "12",
      clue: "A sacred song or poem. (5)",
      direction: "across",
      length: 5,
      group: [
        "12-across"
      ],
      position: {
        x: 9,
        "y": 4
      },
      separatorLocations: {},
      solution: "PSALM"
    },
    {
      id: "14-across",
      number: 14,
      humanNumber: "14",
      clue: "Son of God. (5)",
      direction: "across",
      length: 5,
      group: [
        "14-across"
      ],
      position: {
        x: 0,
        y: 6
      },
      separatorLocations: {},
      solution: "JESUS"
    },
    {
      id: "16-across",
      number: 16,
      humanNumber: "16",
      clue: "Book detailing the Israelites' departure from Egypt. (6)",
      direction: "across",
      length: 6,
      group: [
        "16-across"
      ],
      position: {
        x: 7,
        y: 6
      },
      separatorLocations: {},
      solution: "EXODUS"
    },
    {
      id: "17-across",
      number: 17,
      humanNumber: "17",
      clue: "Shepherd boy who slew Goliath. (5)",
      direction: "across",
      length: 5,
      group: [
        "17-across"
      ],
      position: {
        x: 0,
        y: 8
      },
      separatorLocations: {},
      solution: "DAVID"
    },
    {
      id: "19-across",
      number: 19,
      humanNumber: "19",
      clue: "Mother of Jesus. (4)",
      direction: "across",
      length: 4,
      group: [
        "19-across"
      ],
      position: {
        x: 0,
        y: 10
      },
      separatorLocations: {},
      solution: "MARY"
    },
    {
      id: "2-down",
      number: 2,
      humanNumber: "2",
      clue: "Set apart for God. (4)",
      direction: "down",
      length: 4,
      group: [
        "2-down"
      ],
      position: {
        x: 2,
        y: 0
      },
      separatorLocations: {},
      solution: "HOLY"
    },
    {
      id: "4-down",
      number: 4,
      humanNumber: "4",
      clue: "Saved pairs of animals. (3)",
      direction: "down",
      length: 3,
      group: [
        "4-down"
      ],
      position: {
        x: 6,
        y: 0
      },
      separatorLocations: {},
      solution: "ARK"
    },
    {
      id: "6-down",
      number: 6,
      humanNumber: "6",
      clue: "Disciple who denied Jesus three times. (5)",
      direction: "down",
      length: 5,
      group: [
        "6-down"
      ],
      position: {
        x: 11,
        y: 0
      },
      separatorLocations: {},
      solution: "PETER"
    },
    {
      id: "8-down",
      number: 8,
      humanNumber: "8",
      clue: "First woman. (3)",
      direction: "down",
      length: 3,
      group: [
        "8-down"
      ],
      position: {
        x: 4,
        y: 2
      },
      separatorLocations: {},
      solution: "EVE"
    },
    {
      id: "11-down",
      number: 11,
      humanNumber: "11",
      clue: "Often a sacrifice in ancient times. (4)",
      direction: "down",
      length: 4,
      group: [
        "11-down"
      ],
      position: {
        x: 2,
        y: 4
      },
      separatorLocations: {},
      solution: "LAMB"
    },
    {
      id: "13-down",
      number: 13,
      humanNumber: "13",
      clue: "Son of Abraham and Sarah. (5)",
      direction: "down",
      length: 5,
      group: [
        "13-down"
      ],
      position: {
        x: 10,
        y: 4
      },
      separatorLocations: {},
      solution: "ISAAC"
    },
    {
      id: "15-down",
      number: 15,
      humanNumber: "15",
      clue: "River where Jesus was baptized. (6)",
      direction: "down",
      length: 6,
      group: [
        "15-down"
      ],
      position: {
        x: 3,
        y: 6
      },
      separatorLocations: {},
      solution: "JORDAN"
    },
    {
      id: "18-down",
      number: 18,
      humanNumber: "18",
      clue: "Prophet who anointed Saul and David. (6)",
      direction: "down",
      length: 6,
      group: [
        "18-down"
      ],
      position: {
        x: 1,
        y: 8
      },
      separatorLocations: {},
      solution: "SAMUEL"
    },
    {
      id: "20-down",
      number: 20,
      humanNumber: "20",
      clue: "Ruth's mother-in-law. (5)",
      direction: "down",
      length: 5,
      group: [
        "20-down"
      ],
      position: {
        x: 2,
        y: 10
      },
      separatorLocations: {},
      solution: "NAOMI"
    },
    {
      id: "21-down",
      number: 21,
      humanNumber: "21",
      clue: "Holy ____. (6)",
      direction: "down",
      length: 6,
      group: [
        "21-down"
      ],
      position: {
        x: 12,
        y: 10
      },
      separatorLocations: {},
      solution: "SPIRIT"
    },
    {
      id: "22-down",
      number: 22,
      humanNumber: "22",
      clue: "Abel's brother. (4)",
      direction: "down",
      length: 4,
      group: [
        "22-down"
      ],
      position: {
        x: 4,
        y: 12
      },
      separatorLocations: {},
      solution: "CAIN"
    }
  ],
  solutionAvailable: true,
  dateSolutionAvailable: 1719235925232,
  dimensions: {
    cols: 15,
    rows: 15
  },
  crosswordType: "themed"
}



const Crossword: React.FC = () => {

    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
           <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
           </IonButtons>
          
          <IonTitle>Word puzzles</IonTitle>
          <IonButtons slot="end"> {/* Toggler on the right slot */}
              <IonMenuButton />
              
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent >
       <MyCrossword id="crossword-1" data={data} />

      </IonContent>
    </IonPage>
  );
};

export default Crossword;
