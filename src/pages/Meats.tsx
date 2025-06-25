import { IonContent, IonHeader, IonBackButton, IonButtons, IonMenuButton, IonPage, IonTitle, IonToolbar, IonFooter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Meats.css';
import * as Tone from 'tone'; // Import Tone.js

import React, { useState, useRef, useEffect, useCallback, use } from 'react';
// Define Animal interface for type safety
import { Animal } from '../data/Animals';
import animalsData from '../data/Animals';
import { c } from 'vitest/dist/reporters-5f784f42';

let synth: Tone.PolySynth<Tone.Synth> | null = null;
const initTone = async () => {
  if (!synth) {
    // A simple polyphonic synth
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "sine" // Simple sine wave for clear tones
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.1,
        release: 0.5,
      }
    }).toDestination();
    // Start Tone.js context, required for audio to play
    await Tone.start();
    console.log('Tone.js audio context started.');
  }
};

const Meats: React.FC = () => {
const [animals, setAnimals] = useState<Animal[]>(animalsData); // Type useState with Animal array
  // State to hold the ID of the animal currently being dragged
  const [draggedAnimalId, setDraggedAnimalId] = useState<string | null>(null); // Type useState with string or null
  // State for user feedback messages
  const messageImage = useRef<HTMLImageElement>(null); // Ref for message image
  // Use a ReactNode for message so it can be a string, image, or JSX
  const [message, setMessage] = useState<React.ReactNode>(''); // Type useState with ReactNode
  // State for score
  const [score, setScore] = useState<number>(0); // Type useState with number
  // New state for incorrect drops counter
  const [incorrectDrops, setIncorrectDrops] = useState<number>(0); // Type useState with number
  // State to track if an animal is currently being touched/dragged for mobile
  const [isTouchDragging, setIsTouchDragging] = useState<boolean>(false); // Type useState with boolean
  // State to hold the current position of the touch-dragged animal
  const [touchDragPosition, setTouchDragPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 }); // Type useState with object
  // New state to track the ID of an animal incorrectly dropped, for highlighting
  const [incorrectlyDroppedAnimalId, setIncorrectlyDroppedAnimalId] = useState<string | null>(null); // Type useState with string or null
  // New states to hold animals correctly sorted into their respective containers
  const [plateAnimals, setPlateAnimals] = useState<Animal[]>([]); // Type useState with Animal array
  const [trashAnimals, setTrashAnimals] = useState<Animal[]>([]); // Type useState with Animal array


  // Refs for the drop zones to determine their positions for touch events
  const plateRef = useRef<HTMLDivElement>(null); // Type useRef with HTMLDivElement
  const trashRef = useRef<HTMLDivElement>(null); // Type useRef with HTMLDivElement
  const gameAreaRef = useRef<HTMLDivElement>(null); // Ref for the main game area to handle touchmove/touchend // Type useRef with HTMLDivElement

  // Initialize Tone.js when the component mounts
  useEffect(() => {
    initTone();
  }, []);

  // Effect to clear the highlight for incorrectly dropped animals after a delay
  useEffect(() => {
    if (incorrectlyDroppedAnimalId) {
      const timer = setTimeout(() => {
        setIncorrectlyDroppedAnimalId(null);
      }, 1500); // Highlight for 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, [incorrectlyDroppedAnimalId]);

  // --- Drag & Drop (Mouse/Desktop) Handlers ---

  // Event handler when dragging of an animal starts (mouse)
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, animalId: string) => { // Type event and animalId
    setDraggedAnimalId(animalId); // Store the ID of the animal being dragged
    e.dataTransfer.setData('text/plain', animalId); // Set data for the drag operation
    // For visual feedback during drag (optional, but good practice)
    e.dataTransfer.effectAllowed = "move";
    setIncorrectlyDroppedAnimalId(null); // Clear highlight when a new drag starts
  };

  // Event handler for when a draggable element is dragged over a drop target (mouse)
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { // Type event
    e.preventDefault(); // Prevent default to allow drop
    e.dataTransfer.dropEffect = "move";
  };

  // --- Common Drop Logic for both Mouse and Touch ---
  const handleDropLogic = useCallback((animalId: string, targetType: 'plate' | 'trash') => { // Type parameters
    const animal = animalsData.find(a => a.id === animalId); // Use animalsData for original properties

    if (animal) {
      let isCorrect = false;
      const correctImage = <img src="Jelly-correct.png" alt="Correct" className='messageImage message-correct' />; // Correct image for feedback
      const incorrectImage = <img src="Jelly-ERROR-Art.png" alt="Incorrect" className='messageImage message-incorrect' />; // Incorrect image for feedback
      if (targetType === 'plate') {
        if (animal.isEdible) {
          setMessage(<><span className="me-2 d-block">{correctImage}</span><span>Correct! You can eat {animal.name}.</span></>);
          setScore(prevScore => prevScore + 1);
          if (synth) synth.triggerAttackRelease("C5", "8n"); // Correct sound (higher pitch)
          // Remove the correctly dropped animal from the main list
          setAnimals(prevAnimals => prevAnimals.filter(a => a.id !== animalId));
          // Add to plate animals
          setPlateAnimals(prev => [...prev, animal]);
          isCorrect = true;
        } else {
          setMessage(<><span className="me-2 d-block">{incorrectImage}</span><span>Oops! You can't eat {animal.name}. Try dragging it to the trash.</span></>);
          setScore(prevScore => Math.max(0, prevScore - 1)); // Deduct score, but not below 0
          setIncorrectDrops(prev => prev + 1); // Increment incorrect drops
          if (synth) synth.triggerAttackRelease("C3", "8n"); // Incorrect sound (lower pitch)
          setIncorrectlyDroppedAnimalId(animalId); // Highlight this animal
          // Animal stays in the list if dropped incorrectly - no filter action
        }
      } else if (targetType === 'trash') {
        if (!animal.isEdible) {
          setMessage(<><span className="me-2 d-block">{correctImage}</span><span>Correct! {animal.name} goes to the trash.</span></>);
          setScore(prevScore => prevScore + 1);
          if (synth) synth.triggerAttackRelease("C5", "8n"); // Correct sound
          // Remove the correctly dropped animal from the main list
          setAnimals(prevAnimals => prevAnimals.filter(a => a.id !== animalId));
          // Add to trash animals
          setTrashAnimals(prev => [...prev, animal]);
          isCorrect = true;
        } else {
          setMessage(<><span className="me-2 d-block">{incorrectImage}</span><span>{animal.name} is edible. Maybe drag it to the plate?</span></>);
          setScore(prevScore => Math.max(0, prevScore - 1));
          setIncorrectDrops(prev => prev + 1); // Increment incorrect drops
          if (synth) synth.triggerAttackRelease("C3", "8n"); // Incorrect sound
          setIncorrectlyDroppedAnimalId(animalId); // Highlight this animal
          // Animal stays in the list if dropped incorrectly - no filter action
        }
      }
      if (isCorrect) {
        setIncorrectlyDroppedAnimalId(null); // Clear highlight on correct drop
      }
    }
  }, [animals, setScore, setMessage, setAnimals, setPlateAnimals, setTrashAnimals, setIncorrectlyDroppedAnimalId, setIncorrectDrops]);

  // Event handler for when an animal is dropped on the dinner plate (mouse)
  const handleDropPlate = useCallback((e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, droppedId: string | null = null) => { // Type event and droppedId
    e.preventDefault();
    const id = droppedId || (e as React.DragEvent<HTMLDivElement>).dataTransfer?.getData('text/plain'); // Use type assertion
    if (id) {
        handleDropLogic(id, 'plate');
    }
    setDraggedAnimalId(null); // Reset dragged animal
  }, [handleDropLogic]);

  // Event handler for when an animal is dropped on the trash can (mouse)
  const handleDropTrash = useCallback((e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, droppedId: string | null = null) => { // Type event and droppedId
    e.preventDefault();
    const id = droppedId || (e as React.DragEvent<HTMLDivElement>).dataTransfer?.getData('text/plain'); // Use type assertion
    if (id) {
        handleDropLogic(id, 'trash');
    }
    setDraggedAnimalId(null); // Reset dragged animal
  }, [handleDropLogic]);


  // --- Touch Event Handlers ---

  // Event handler when touching an animal starts
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, animalId: string) => { // Type event and animalId
    // Prevent default browser behavior (e.g., scrolling) but allow click events after touch
    e.preventDefault();
    setDraggedAnimalId(animalId);
    setIsTouchDragging(true);

    // Set initial touch drag position to the touch point
    const touch = e.touches[0];
    setTouchDragPosition({
      x: touch.clientX,
      y: touch.clientY,
    });
    setIncorrectlyDroppedAnimalId(null); // Clear highlight when a new drag starts
  };

  // Event handler when touch moves
  const handleTouchMove = useCallback((e: TouchEvent) => { // Type event
    if (!isTouchDragging || !draggedAnimalId) return;

    e.preventDefault(); // Prevent scrolling while dragging

    const touch = e.touches[0];
    setTouchDragPosition({
      x: touch.clientX,
      y: touch.clientY,
    });
  }, [isTouchDragging, draggedAnimalId]);

  // Event handler when touch ends (release)
  const handleTouchEnd = useCallback((e: TouchEvent) => { // Type event
    if (!isTouchDragging || !draggedAnimalId) return;

    e.preventDefault(); // Prevent click events after drag

    setIsTouchDragging(false);

    const touch = e.changedTouches[0]; // Get the touch point when touch ended
    const x = touch.clientX;
    const y = touch.clientY;

    // Determine which drop zone the touch ended over
    const plateRect = plateRef.current?.getBoundingClientRect(); // Use optional chaining for safety
    const trashRect = trashRef.current?.getBoundingClientRect(); // Use optional chaining for safety

    // Ensure refs are not null before checking collision
    if (plateRect &&
      x >= plateRect.left && x <= plateRect.right &&
      y >= plateRect.top && y <= plateRect.bottom
    ) {
      handleDropPlate(e as unknown as React.TouchEvent<HTMLDivElement>, draggedAnimalId); // Cast to React.TouchEvent
    } else if (trashRect &&
      x >= trashRect.left && x <= trashRect.right &&
      y >= trashRect.top && y <= trashRect.bottom
    ) {
      handleDropTrash(e as unknown as React.TouchEvent<HTMLDivElement>, draggedAnimalId); // Cast to React.TouchEvent
    } else {
      // If dropped outside target zones
      setMessage('Animal dropped outside target zones.');
      setIncorrectlyDroppedAnimalId(draggedAnimalId); // Highlight if dropped outside
      setIncorrectDrops(prev => prev + 1); // Increment incorrect drops for outside drops
    }
    setDraggedAnimalId(null);
  }, [isTouchDragging, draggedAnimalId, handleDropPlate, handleDropTrash, setMessage, setIncorrectlyDroppedAnimalId, setIncorrectDrops]);

  // Effect to add global touchmove and touchend listeners
  // This is crucial because touchmove and touchend might occur outside the initial element
  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (gameArea) {
      gameArea.addEventListener('touchmove', handleTouchMove, { passive: false });
      gameArea.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    return () => {
      if (gameArea) {
        gameArea.removeEventListener('touchmove', handleTouchMove);
        gameArea.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleTouchMove, handleTouchEnd]);

  // Reset the game
  const resetGame = (): void => { // Type return as void
    setAnimals(animalsData); // Restore initial animals
    setMessage('');
    setScore(0);
    setIncorrectDrops(0); // Reset incorrect drops
    setDraggedAnimalId(null);
    setIsTouchDragging(false);
    setTouchDragPosition({ x: 0, y: 0 });
    setIncorrectlyDroppedAnimalId(null); // Clear highlight on reset
    setPlateAnimals([]); // Clear sorted animals
    setTrashAnimals([]); // Clear sorted animals
  };

  // Find the currently dragged animal to display it floating under the finger
  const currentDraggedAnimal = animalsData.find(a => a.id === draggedAnimalId);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
            </IonButtons>
          <IonTitle>Clean and Unclean Meats</IonTitle>
          <IonButtons slot="end"> {/* Toggler on the right slot */}
              <IonMenuButton />
              
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <div
      ref={gameAreaRef} // Attach ref for global touch events
      className="d-flex flex-column align-items-center justify-content-center  bg-light min-vh-100 position-relative overflow-hidden" // Bootstrap classes
    >
     

      {/* Game Title */}
      <h3 className="display-6 d-flex align-items-center fw-bold text-primary mb-4 text-center"> {/* Bootstrap classes */}
        Jelly Food Game
        <button
          onClick={resetGame}
          className="btn btn-sm ms-3 btn-secondary m-0 rounded-pill shadow-lg" // Bootstrap classes
          >Reset</button>
      </h3>

      <div className="layoutWrapper">
       
      <div
          ref={plateRef} // Attach ref
          className="flex-grow-1 bg-success p-2 mb-5 rounded shadow-lg d-flex flex-column align-items-center justify-content-center border border-dashed border-white drop-zone-hover" // Bootstrap classes
          onDragOver={handleDragOver}
          onDrop={handleDropPlate}
          style={{ minHeight: '180px' }}
        >
          {/* Dinner plate icon/image (using simple text for now) */}
          <span style={{ fontSize: '4rem' }} className="mb-2" role="img" aria-label="dinner plate">🍽️</span> {/* Inline style for emoji size */}
          <p className="fs-3 fw-semibold text-white text-shadow">Dinner Plate</p> {/* Bootstrap classes */}
          <p className="small text-white opacity-75 mt-1">(Drag Edible Animals Here)</p> {/* Bootstrap classes */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3"> {/* Bootstrap classes */}
            {plateAnimals.map(animal => (
              <span key={`plate-${animal.id}`} className="p-1 rounded bg-success-subtle" style={{ fontSize: '1.8rem' }}> {/* Bootstrap classes with inline style */}
                {animal.emoji}
              </span>
            ))}
          </div>
        </div>
   

      {/* Draggable Animals Container */}
      <div className="d-flex flex-wrap justify-content-center draggableArea gap-3 mb-5 p-4 bg-white rounded shadow-lg w-100" style={{ minHeight: '120px' }}> {/* Bootstrap classes with inline styles */}
        {animals.length > 0 ? (
          // Sort animals alphabetically by name for consistent display
          [...animals].sort((a, b) => a.name.localeCompare(b.name)).map(animal => (
            <div
              key={animal.id}
              className={`
                d-flex flex-column align-items-center justify-content-center p-3
                bg-white rounded shadow-sm cursor-grab animal-card
                ${draggedAnimalId === animal.id && !isTouchDragging ? 'opacity-50 border border-primary' : ''}
                ${isTouchDragging && draggedAnimalId === animal.id ? 'opacity-0' : ''}
                ${incorrectlyDroppedAnimalId === animal.id ? 'border border-danger border-2' : ''} {/* Bootstrap classes */}
              `}
              draggable="true" // Retain draggable for desktop
              onDragStart={(e) => handleDragStart(e, animal.id)}
              onTouchStart={(e) => handleTouchStart(e, animal.id)} // Add touch start
            >
              <span style={{ fontSize: '2.5rem' }}>{animal.emoji}</span> {/* Inline style for emoji size */}
              <span className="text-sm text-muted mt-1">{animal.name}</span> {/* Bootstrap classes */}
            </div>
          ))
        ) : (
          <div className="text-center text-muted fs-5"> {/* Bootstrap classes */}
            All animals sorted! Click Reset to play again.
          </div>
        )}
      </div>

      
        {/* Dinner Plate Drop Zone */}
        

        {/* Trash Can Drop Zone */}
        <div
          ref={trashRef} // Attach ref
          className="flex-grow-1 bg-danger p-2 mb-5 rounded shadow-lg d-flex flex-column align-items-center justify-content-center border border-dashed border-white drop-zone-hover" // Bootstrap classes
          onDragOver={handleDragOver}
          onDrop={handleDropTrash}
          style={{ minHeight: '180px' }}
        >
          {/* Trash can icon/image (using simple text for now) */}
          <span style={{ fontSize: '4rem' }} className="mb-2" role="img" aria-label="trash can">🗑️</span> {/* Inline style for emoji size */}
          <p className="fs-3 fw-semibold text-white text-shadow">Trash Can</p> {/* Bootstrap classes */}
          <p className="small text-white opacity-75 mt-1">(Drag Non-Edible Animals Here)</p> {/* Bootstrap classes */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3"> {/* Bootstrap classes */}
            {trashAnimals.map(animal => (
              <span key={`trash-${animal.id}`} className="p-1 rounded bg-danger-subtle" style={{ fontSize: '1.8rem' }}> {/* Bootstrap classes with inline style */}
                {animal.emoji}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {animals.length === 0 && (
        <button
          onClick={resetGame}
          className="btn btn-primary btn-lg rounded-pill shadow-lg mt-5" // Bootstrap classes
          // Custom hover effects for Bootstrap buttons need to be handled via custom CSS or JS
          style={{
            transition: 'transform .3s ease-in-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Reset Game
        </button>
      )}

      {/* Floating element for touch dragging */}
      {isTouchDragging && currentDraggedAnimal && (
        <div
          className="floating-dragged-item d-flex flex-column align-items-center justify-content-center p-3 bg-white rounded shadow-lg" // Bootstrap classes
          style={{ left: touchDragPosition.x, top: touchDragPosition.y }}
        >
          <span style={{ fontSize: '2.5rem' }}>{currentDraggedAnimal.emoji}</span> {/* Inline style for emoji size */}
          <span className="text-sm text-muted mt-1">{currentDraggedAnimal.name}</span> {/* Bootstrap classes */}
        </div>
      )}
    </div>
        
        
      </IonContent>
      <IonFooter className="ion-no-border p-2">
       
         
          <div className="row">

              <div className="ps-2 text-secondary mb-0 col-3">
                Correct: <span className="fw-semibold text-info">{score}</span>
              </div>
              <div className="col-6 text-center">
              
          
                {message}
            </div>
            <div className="pe-2 d-flex justify-content-end text-secondary mb-0 col-3">
              Incorrect: 
              <span className="fw-semibold text-danger">{incorrectDrops}
              </span>
            </div>
          </div>
        
      </IonFooter>
    </IonPage>
  );
};

export default Meats;
