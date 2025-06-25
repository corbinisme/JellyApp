import { IonContent, IonFooter, IonHeader, IonBackButton, IonButtons, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef, useState, useEffect, useCallback, ChangeEvent } from 'react';
import './Coloring.css'; // Import your custom styles
// Define the structure for a drawing stroke
interface Stroke {
  points: { x: number; y: number }[];
  color: string;
  thickness: number;
  tool: 'pen' | 'eraser';
}


import coloringbookTexture3 from '../assets/coloringbook_texture_3.png';
import coloringbookTexture4 from '../assets/coloringbook_texture_4.png';
import coloringbookTexture5 from '../assets/coloringbook_texture_5.png';
import coloringbookTexture6 from '../assets/coloringbook_texture_6.png';    


// Hardcoded PNG image URLs (using placehold.co for demonstration)
const PRESET_IMAGES = [
  coloringbookTexture3,
  coloringbookTexture4,
  coloringbookTexture5,
  coloringbookTexture6,
  'https://placehold.co/200x200/FF00FF/000000?text=Image+5',
];

const ColoringGemini: React.FC = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [currentTool, setCurrentTool] = useState<'pen' | 'eraser'>('pen');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentLineThickness, setCurrentLineThickness] = useState(5);
  const [allStrokes, setAllStrokes] = useState<Stroke[]>([]);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0); // Index of the currently selected preset image

  // Pan and zoom state
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  // For tracking mouse/touch start positions for drawing and panning
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const initialTouchDistance = useRef(0);
  const initialTouchMidX = useRef(0);
  const initialTouchMidY = useRef(0);

  // Function to redraw the entire canvas based on current state (strokes, image, pan/zoom)
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save the untransformed state
    ctx.save();

    // Apply global transformations for pan and zoom
    ctx.translate(translateX, translateY);
    ctx.scale(scale, scale);

    // Draw the uploaded image first, if available
    if (uploadedImage) {
      console.log("Drawing uploaded image:", uploadedImage.width, uploadedImage.height);

      ctx.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height);
    }

    // Draw all recorded strokes
    allStrokes.forEach(stroke => {
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.thickness;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      // If the tool was an eraser, use 'destination-out' to clear pixels
      if (stroke.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out'; // This makes the eraser truly erase
      } else {
        ctx.globalCompositeOperation = 'source-over'; // Default for drawing
      }

      // Move to the first point of the stroke
      if (stroke.points.length > 0) {
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        // Draw lines to subsequent points
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
      }
      ctx.stroke();
    });

    // Restore the canvas context to its original untransformed state
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over'; // Reset blend mode for next operations
  }, [scale, translateX, translateY, allStrokes, uploadedImage]);

  // Load the initial preset image or when selectedImageIndex changes
  useEffect(() => {
    const loadImage = (url: string) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage(img);
        // Reset pan/zoom and clear previous strokes when a new image is loaded
        setAllStrokes([]);
        setScale(1);
        setTranslateX(0);
        setTranslateY(0);
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
        setUploadedImage(null); // Clear image if loading fails
      };
      img.src = url;
    };

    if (PRESET_IMAGES.length > 0) {
      loadImage(PRESET_IMAGES[selectedImageIndex]);
    } else {
      setUploadedImage(null);
    }
  }, [selectedImageIndex]);

  // Initialize canvas context and set up responsiveness
  // This useEffect now runs only once on mount and during window resize,
  // preventing it from re-running on every stroke update.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }

    const handleResize = () => {
      if (parent) {
        // Only update dimensions if they actually changed
        if (canvas.width !== parent.offsetWidth || canvas.height !== parent.offsetHeight) {
           canvas.width = parent.offsetWidth;
           canvas.height = parent.offsetHeight;
           // Immediately redraw after resize to prevent visual distortions
           redrawCanvas();
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  // Redraw canvas whenever drawing state or pan/zoom state changes
  // This useEffect remains responsible for updating the drawing on the canvas
  useEffect(() => {
    redrawCanvas();
  }, [scale, translateX, translateY, allStrokes, uploadedImage, redrawCanvas]);

  // Helper function to get canvas coordinates, accounting for current pan/zoom
  const getTransformedCoords = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Reverse the scale and translation to get the actual coordinate on the "drawing" layer
    const transformedX = (x - translateX) / scale;
    const transformedY = (y - translateY) / scale;

    return { x: transformedX, y: transformedY };
  }, [scale, translateX, translateY]);

  // Mouse/Touch Event Handlers for Drawing and Panning
  const startDrawingOrPanning = useCallback((event: MouseEvent | TouchEvent) => {
    if (!canvasRef.current) return;

    // Determine event coordinates based on mouse or touch
    let clientX, clientY;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else { // TouchEvent
      if (event.touches.length === 1) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else if (event.touches.length === 2) {
        // For two-finger touch, we're setting up for panning/zooming, no drawing initiated
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];

        initialTouchDistance.current = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        initialTouchMidX.current = (touch1.clientX + touch2.clientX) / 2;
        initialTouchMidY.current = (touch1.clientY + touch2.clientY) / 2;
        setIsPanning(true);
        return; // Don't proceed with drawing logic for two touches
      } else {
        return; // Ignore more than two touches
      }
    }

    // Set drawing state and record initial point for single touch/mouse click
    setIsDrawing(true);
    lastMouseX.current = clientX;
    lastMouseY.current = clientY;

    const { x, y } = getTransformedCoords(clientX, clientY);
    setAllStrokes(prev => [
      ...prev,
      { points: [{ x, y }], color: currentColor, thickness: currentLineThickness, tool: currentTool }
    ]);
  }, [currentColor, currentLineThickness, currentTool, getTransformedCoords]);


  const drawOrPan = useCallback((event: MouseEvent | TouchEvent) => {
    if (!canvasRef.current) return;

    let clientX, clientY;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else { // TouchEvent
      if (event.touches.length === 1 && isDrawing) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else if (event.touches.length === 2 && isPanning) {
        // Panning with two fingers
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];

        const currentMidX = (touch1.clientX + touch2.clientX) / 2;
        const currentMidY = (touch1.clientY + touch2.clientY) / 2;
        const dx = currentMidX - initialTouchMidX.current;
        const dy = currentMidY - initialTouchMidY.current;
        setTranslateX(prev => prev + dx);
        setTranslateY(prev => prev + dy);
        initialTouchMidX.current = currentMidX;
        initialTouchMidY.current = currentMidY;

        // Zooming with pinch gesture
        const currentDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        if (initialTouchDistance.current > 0) {
          const zoomFactor = currentDistance / initialTouchDistance.current;

          const canvasRect = canvasRef.current.getBoundingClientRect();
          const zoomCenterX = (initialTouchMidX.current - canvasRect.left - translateX) / scale;
          const zoomCenterY = (initialTouchMidY.current - canvasRect.top - translateY) / scale;

          const newScale = Math.max(0.1, Math.min(10, scale * zoomFactor));
          setScale(newScale);

          setTranslateX(prev => prev - (zoomCenterX * (newScale - scale)));
          setTranslateY(prev => prev - (zoomCenterY * (newScale - scale)));
        }
        initialTouchDistance.current = currentDistance;
        return; // Don't proceed with drawing logic for two touches
      } else {
        return; // Ignore other touch scenarios
      }
    }

    if (isDrawing) {
      const { x, y } = getTransformedCoords(clientX, clientY);
      setAllStrokes(prevStrokes => {
        const lastStroke = prevStrokes[prevStrokes.length - 1];
        if (lastStroke) {
          lastStroke.points.push({ x, y });
        }
        return [...prevStrokes];
      });
    } else if (isPanning) {
      const dx = clientX - lastMouseX.current;
      const dy = clientY - lastMouseY.current;
      setTranslateX(prev => prev + dx);
      setTranslateY(prev => prev + dy);
      lastMouseX.current = clientX;
      lastMouseY.current = clientY;
    }
  }, [isDrawing, isPanning, scale, translateX, translateY, getTransformedCoords]);


  const endDrawingOrPanning = useCallback(() => {
    setIsDrawing(false);
    setIsPanning(false);
    initialTouchDistance.current = 0; // Reset for next pinch gesture
  }, []);

  const handleWheel = useCallback((event: WheelEvent) => {
    // No event.preventDefault() here, will be handled by addEventListener
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scaleAmount = 1.1; // How much to zoom per wheel tick
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    // Calculate mouse position relative to the transformed canvas content
    const zoomCenterX = (mouseX - translateX) / scale;
    const zoomCenterY = (mouseY - translateY) / scale;

    let newScale = scale;
    if (event.deltaY < 0) {
      newScale = Math.min(10, scale * scaleAmount); // Zoom in, max 10x
    } else {
      newScale = Math.max(0.1, scale / scaleAmount); // Zoom out, min 0.1x
    }

    setScale(newScale);

    // Adjust translation to keep the zoom center fixed
    setTranslateX(translateX - (zoomCenterX * (newScale - scale)));
    setTranslateY(translateY - (zoomCenterY * (newScale - scale)));

  }, [scale, translateX, translateY]);

  // Manually attach event listeners with passive: false where needed
  useEffect(() => {
    const canvas = canvasRef.current;
    console.log("Canvas ref:", canvas);
    if (!canvas) return;

    // Mouse Events
    canvas.addEventListener('mousedown', startDrawingOrPanning as EventListener);
    canvas.addEventListener('mousemove', drawOrPan as EventListener);
    canvas.addEventListener('mouseup', endDrawingOrPanning);
    canvas.addEventListener('mouseleave', endDrawingOrPanning);

    // Touch Events with passive: false
    // touchstart, touchmove, touchend, touchcancel
    canvas.addEventListener('touchstart', startDrawingOrPanning as EventListener, { passive: false });
    canvas.addEventListener('touchmove', drawOrPan as EventListener, { passive: false });
    canvas.addEventListener('touchend', endDrawingOrPanning);
    canvas.addEventListener('touchcancel', endDrawingOrPanning);

    // Wheel Event with passive: false
    canvas.addEventListener('wheel', handleWheel as EventListener, { passive: false });


    // Cleanup function
    return () => {
      canvas.removeEventListener('mousedown', startDrawingOrPanning as EventListener);
      canvas.removeEventListener('mousemove', drawOrPan as EventListener);
      canvas.removeEventListener('mouseup', endDrawingOrPanning);
      canvas.removeEventListener('mouseleave', endDrawingOrPanning);

      canvas.removeEventListener('touchstart', startDrawingOrPanning as EventListener);
      canvas.removeEventListener('touchmove', drawOrPan as EventListener);
      canvas.removeEventListener('touchend', endDrawingOrPanning);
      canvas.removeEventListener('touchcancel', endDrawingOrPanning);

      canvas.removeEventListener('wheel', handleWheel as EventListener);
    };
  }, [startDrawingOrPanning, drawOrPan, endDrawingOrPanning, handleWheel]); // Dependencies for event listeners


  // Save drawing as PNG blob
  const handleSaveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    // Create a temporary offscreen canvas to render the final image without current transforms
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');

    if (!offscreenCtx || !uploadedImage) {
      console.error("Offscreen canvas context or uploaded image not available.");
      return;
    }

    // Set offscreen canvas dimensions to match the image or a reasonable default
    offscreenCanvas.width = uploadedImage.naturalWidth || canvas.width;
    offscreenCanvas.height = uploadedImage.naturalHeight || canvas.height;

    // Draw the uploaded image onto the offscreen canvas
    offscreenCtx.drawImage(uploadedImage, 0, 0, offscreenCanvas.width, offscreenCanvas.height);

    // Draw all strokes onto the offscreen canvas, scaled appropriately to fit the offscreen canvas dimensions
    const imageToCanvasScaleX = offscreenCanvas.width / uploadedImage.width;
    const imageToCanvasScaleY = offscreenCanvas.height / uploadedImage.height;

    allStrokes.forEach(stroke => {
      offscreenCtx.beginPath();
      offscreenCtx.strokeStyle = stroke.color;
      // Adjust thickness relative to the new scale for saving
      offscreenCtx.lineWidth = stroke.thickness * Math.min(imageToCanvasScaleX, imageToCanvasScaleY);
      offscreenCtx.lineJoin = 'round';
      offscreenCtx.lineCap = 'round';

      if (stroke.tool === 'eraser') {
        offscreenCtx.globalCompositeOperation = 'destination-out';
      } else {
        offscreenCtx.globalCompositeOperation = 'source-over';
      }

      if (stroke.points.length > 0) {
        offscreenCtx.moveTo(stroke.points[0].x * imageToCanvasScaleX, stroke.points[0].y * imageToCanvasScaleY);
        for (let i = 1; i < stroke.points.length; i++) {
          offscreenCtx.lineTo(stroke.points[i].x * imageToCanvasScaleX, stroke.points[i].y * imageToCanvasScaleY);
        }
      }
      offscreenCtx.stroke();
    });

    offscreenCtx.globalCompositeOperation = 'source-over'; // Reset blend mode

    // Convert offscreen canvas to blob
    offscreenCanvas.toBlob((blob) => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'my-coloring-book-art.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }, 'image/png');
  };

  // Undo last stroke
  const handleUndo = () => {
    setAllStrokes(prev => prev.slice(0, -1)); // Remove the last stroke
  };

  // Clear all strokes
  const handleClear = () => {
    setAllStrokes([]);
  };

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

        <IonToolbar>
          
          <div className="d-flex align-items-center imageSlider flex-nowrap overflow-auto py-1">
            
            {PRESET_IMAGES.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preset ${index + 1}`}
                className={`img-thumbnail rounded-3 me-2 cursor-pointer ${
                  selectedImageIndex === index ? 'border border-primary border-3' : 'border border-secondary'
                }`}
                style={{ width: '48px', height: '48px' }}
                onClick={() => setSelectedImageIndex(index)}
                title={`Image ${index + 1}`}
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevents infinite loop on error
                  e.currentTarget.src = `https://placehold.co/48x48/CCCCCC/000000?text=Error`; // Fallback placeholder
                }}
              />
            ))}
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent >
       <div className="d-flex flex-column  bg-light" style={{ height: '100%' }}> {/* Removed font-sans for pure Bootstrap */}


      {/* Canvas Area */}
      <div className="canvasWrapper flex-grow-1 d-flex align-items-center justify-content-center p-3 overflow-hidden position-relative">
        <canvas
          ref={canvasRef}
          // Removed all on* JSX props for event listeners
          
          className="border border-4 border-secondary rounded shadow bg-white"
          style={{
            touchAction: 'none',
             minWidth: '300px', // <-- Add this
            minHeight: '300px'  // Prevent browser default touch actions
          }}
        ></canvas>
        {!uploadedImage && (
            <div className="position-absolute top-50 start-50 translate-middle text-secondary text-center fs-5 pe-none">
                <p>No image loaded. Please select one from the presets.</p>
                <p className="fs-6 mt-1">
                    (Use mouse wheel or two-finger pinch to zoom, click/drag or two-finger drag to pan)
                </p>
            </div>
        )}
      </div>

    
    </div>
      </IonContent>
      <IonFooter>
      {/* Header/Controls */}
      <div className="d-flex footerTools flex-wrap align-items-center justify-content-center p-3 bg-white shadow-sm rounded-bottom">
        <div className="d-flex align-items-center mb-2 mb-md-0 me-md-4">
          {/* Preset Image Selection */}
          
        </div>

        <div className="d-flex align-items-center mt-2 mt-md-0">
          {/* Color Picker */}
          <div className="d-flex align-items-center me-3">
            <label htmlFor="color-picker" className="form-label text-secondary fw-bold me-2 mb-0">Color:</label>
            <input
              type="color"
              id="color-picker"
              value={currentColor}
              onChange={(e) => {
                setCurrentColor(e.target.value);
                setCurrentTool('pen'); // Switch to pen when color is chosen
              }}
              className="form-control form-control-color border border-secondary rounded-circle"
              style={{ width: '40px', height: '40px' }}
            />
          </div>

          {/* Line Thickness Slider */}
          <div className="d-flex align-items-center me-3">
            <label htmlFor="thickness-slider" className="form-label text-secondary fw-bold me-2 mb-0">Size:</label>
            <input
              type="range"
              id="thickness-slider"
              min="1"
              max="20"
              value={currentLineThickness}
              onChange={(e) => setCurrentLineThickness(Number(e.target.value))}
              className="form-range w-auto"
              style={{ minWidth: '100px' }}
            />
            <span className="text-secondary fw-bold ms-2">{currentLineThickness}</span>
          </div>
        </div>
        <div className="d-flex align-items-center me-3">
          {/* Pen Tool */}
          <button
            onClick={() => setCurrentTool('pen')}
            className={`btn btn-${currentTool === 'pen' ? 'primary' : 'outline-secondary'} rounded-pill me-2`}
          >
            Pen
          </button>

          {/* Eraser Tool */}
          <button
            onClick={() => setCurrentTool('eraser')}
            className={`btn btn-${currentTool === 'eraser' ? 'primary' : 'outline-secondary'} rounded-pill me-2`}
          >
            Eraser
          </button>

          {/* Undo Button */}
          <button
            onClick={handleUndo}
            className="btn btn-warning rounded-pill me-2"
          >
            Undo
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="btn btn-danger rounded-pill me-2"
          >
            Clear
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveDrawing}
            className="btn btn-success rounded-pill"
          >
            Save
          </button>
        </div>
      </div>
      </IonFooter>
    </IonPage>
  );
};

export default ColoringGemini;
