import { IonContent, IonHeader, IonMenuButton, IonButtons, IonBackButton, IonPage, IonTitle, IonToolbar, IonFooter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import React, { useState, useEffect, useRef } from 'react';

import * as Tone from 'tone'; // Import Tone.js

const Trivia: React.FC = () => {


  const questions = [
    {
      question: "Who built the ark?",
      options: ["Moses", "Abraham", "Noah", "David"],
      answer: "Noah",
      type: "multiple-choice"
    },
    {
      question: "How many days and nights did it rain during the flood?",
      options: ["7 days and 7 nights", "40 days and 40 nights", "3 days and 3 nights", "10 days and 10 nights"],
      answer: "40 days and 40 nights",
      type: "multiple-choice"
    },
    {
      question: "Who was swallowed by a great fish?",
      options: ["Peter", "Jonah", "Paul", "John"],
      answer: "Jonah",
      type: "multiple-choice"
    },
    {
      question: "What was the first plague in Egypt?",
      options: ["Frogs", "Lice", "Water turned to blood", "Boils"],
      answer: "Water turned to blood",
      type: "multiple-choice"
    },
    {
      question: "Who led the Israelites out of Egypt?",
      options: ["Joshua", "Aaron", "Moses", "Joseph"],
      answer: "Moses",
      type: "multiple-choice"
    },
    {
      question: "The first book of the Bible is _________.",
      answer: "Genesis",
      type: "fill-in-the-blank"
    },
    {
      question: "Jesus was born in _________.",
      answer: "Bethlehem",
      type: "fill-in-the-blank"
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
  const [score, setScore] = useState(0); // Player's score
  const [showResults, setShowResults] = useState(false); // Flag to show results screen
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Currently selected answer option for multiple choice
  const [userAnswerInput, setUserAnswerInput] = useState(''); // User's input for fill-in-the-blank
  const [feedbackMessage, setFeedbackMessage] = useState(''); // Message for correct/incorrect feedback

  // State for Tone.js synth and sequence
  const [synth, setSynth] = useState<Tone.PolySynth | null>(null); // For general sounds (success notes)
  const [melodySynth, setMelodySynth] = useState<Tone.Synth | null>(null); // For the celebration song
  const [celebrationSequence, setCelebrationSequence] = useState<Tone.Sequence | null>(null);
  const confettiContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the confetti container

  
  // Initialize Tone.js synths and celebration sequence on component mount
  useEffect(() => {
    // Synth for general sounds (success notes)
    const generalSynth = new Tone.PolySynth(Tone.Synth, {
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).toDestination();
    setSynth(generalSynth);

    // Synth for the celebration song
    const newMelodySynth = new Tone.Synth({ // Use a new variable for initialization
        oscillator: {
            type: "triangle" // Use a different waveform for variety
        },
        envelope: {
            attack: 0.05,
            decay: 0.2,
            sustain: 0.5,
            release: 1
        }
    }).toDestination();
    setMelodySynth(newMelodySynth); // Store melodySynth in state

    // Define a simple celebratory melody
    const melody = [
        { time: 0, note: "C5", duration: "8n" },
        { time: "8n", note: "D5", duration: "8n" },
        { time: "4n", note: "E5", duration: "8n" },
        { time: "4n + 8n", note: "G5", duration: "8n" },
        { time: "2n", note: "C6", duration: "4n" }
    ];

    // Create a Tone.Sequence for the melody
    const sequence = new Tone.Sequence((time, note) => {
        newMelodySynth.triggerAttackRelease(note.note, note.duration, time); // Use newMelodySynth here
    }, melody);
    sequence.loop = false; // Play only once
    sequence.playbackRate = 1.2; // A bit faster for a more cheerful feel

    setCelebrationSequence(sequence);


    // Clean up synths on component unmount
    return () => {
      if (generalSynth) {
        generalSynth.dispose();
      }
      if (newMelodySynth) {
        newMelodySynth.dispose();
      }
      if (sequence) {
        sequence.dispose();
      }
    };
  }, []);


  const playSuccessSound = async () => {
    if (synth) {
      await Tone.start();
      synth.triggerAttackRelease(["C5", "E5", "G5"], "8n");
    }
  };

  // Function to play the celebratory song
  const playCelebrationSong = async () => {
    if (melodySynth && celebrationSequence) {
        await Tone.start();
        celebrationSequence.start(0);
    }
  };

  // Function to create confetti
  const createConfetti = () => {
    if (!confettiContainerRef.current) return;

    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
    const numConfetti = 50;

    for (let i = 0; i < numConfetti; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${-20 - Math.random() * 20}%`;
      confetti.style.opacity = '0.9';
      confetti.style.borderRadius = '2px';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.transition = 'transform 3s linear, top 3s ease-in, opacity 2s linear';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';

      confettiContainerRef.current.appendChild(confetti);

      setTimeout(() => {
        confetti.style.top = '100%';
        confetti.style.opacity = '0';
        confetti.style.transform = `translateY(100vh) rotate(${Math.random() * 720 + 360}deg)`;
      }, 10);

      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  };


  useEffect(() => {
    if (showResults) {
      playCelebrationSong();
      //createConfetti();
    }
  }, [showResults, melodySynth, celebrationSequence]);


   // Function to handle option selection for multiple choice
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setFeedbackMessage('');
  };

  // Function to handle input change for fill-in-the-blank
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswerInput(event.target.value);
    setFeedbackMessage('');
  };

  // Function to handle submitting an answer and moving to the next question
  const handleNextQuestion = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;

    if (currentQuestion.type === "multiple-choice") {
      if (selectedOption === null) {
        setFeedbackMessage("Please select an answer before proceeding.");
        return;
      }
      isCorrect = selectedOption === currentQuestion.answer;
    } else if (currentQuestion.type === "fill-in-the-blank") {
      const trimmedInput = userAnswerInput.trim().toLowerCase();
      const trimmedAnswer = currentQuestion.answer.toLowerCase();
      if (!trimmedInput) {
        setFeedbackMessage("Please enter an answer before proceeding.");
        return;
      }
      isCorrect = trimmedInput === trimmedAnswer;
    }

    if (isCorrect) {
      setScore(score + 1);
      setFeedbackMessage("Correct!");
      playSuccessSound();
    } else {
      setFeedbackMessage("Incorrect! The answer was: " + currentQuestion.answer);
    }

    setTimeout(() => {
      setFeedbackMessage('');
      setSelectedOption(null);
      setUserAnswerInput('');

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  // Function to restart the game
  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setUserAnswerInput('');
    setFeedbackMessage('');
    if (celebrationSequence) {
        celebrationSequence.stop();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Bible Trivia</IonTitle>
          <IonButtons slot="end"> {/* Toggler on the right slot */}
              <IonMenuButton />
              
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        
        <div className="d-flex align-items-center justify-content-center min-vh-100 p-3" style={{ background: 'linear-gradient(to bottom right, #e0f2f7, #c5dcf7)' }}>
      <div ref={confettiContainerRef} className="confetti-container position-absolute inset-0 pe-none z-index-100"></div>
      <div className="card shadow-lg p-4 rounded-3 text-center w-100" style={{ maxWidth: '400px', zIndex: 1, transform: showResults ? 'scale(1.05)' : 'scale(1)' }}>
        <img
          src="facebookbanner.png" // Changed image source
          alt="Jelly Bible Trivia Logo"
          className="mx-auto mb-4 img-fluid rounded-top" // Bootstrap classes for responsive image, rounded top
         
          
        />
        <h1 className="display-5 fw-bold text-primary mb-4 border-bottom pb-3 border-secondary">
          Jelly Bible Trivia
        </h1>

        {showResults ? (
          // Results screen
          <div className="text-center">
            <h2 className="h4 text-secondary mb-3">Quiz Complete!</h2>
            <p className="lead text-dark mb-4">
              You scored <span className="fw-bolder text-primary">{score}</span> out of <span className="fw-bolder text-primary">{questions.length}</span> questions.
            </p>
            <button
              onClick={handleRestartGame}
              className="btn btn-success btn-lg rounded-pill shadow-sm"
            >
              Play Again
            </button>
          </div>
        ) : (
          // Game screen
          <div>
            <div className="mb-4">
              <p className="text-muted mb-2">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              <h2 className="h5 text-dark mb-3">
                {questions[currentQuestionIndex].question}
              </h2>
            </div>

            {/* Conditional rendering for question types */}
            {questions[currentQuestionIndex].type === "multiple-choice" ? (
              <div className="d-grid gap-3 mb-4">
                {questions[currentQuestionIndex].options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`
                      btn btn-outline-primary text-start
                      ${selectedOption === option
                        ? 'active btn-primary text-white' // Active state for selected option
                        : ''
                      }
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              // Fill-in-the-blank input
              <div className="mb-4">
                <input
                  type="text"
                  value={userAnswerInput}
                  onChange={handleInputChange}
                  placeholder="Type your answer here..."
                  className="form-control"
                />
              </div>
            )}

            {/* Feedback message */}
            {feedbackMessage && (
              <p className={`fw-medium mb-4 ${feedbackMessage.includes('Correct') ? 'text-success' : 'text-danger'}`}>
                {feedbackMessage}
              </p>
            )}

            {/* Next Question button */}
            <button
              onClick={handleNextQuestion}
              className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm"
            >
              {currentQuestionIndex === questions.length - 1 ? "Show Results" : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
      </IonContent>
      <IonFooter>
        
          <IonTitle className="text-center p-3">
            Jelly Bible Trivia. Score: {score}
          </IonTitle>
        
      </IonFooter>
    </IonPage>
  );
};

export default Trivia;
