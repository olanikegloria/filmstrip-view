import { useEffect, useState } from 'react';
import ThumbnailStrip from './components/ThumbnailStrip';
import MainImage from './components/MainImage';
import './App.css';

function App() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentStart, setCurrentStart] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const thumbnailsPerPage = 4;

  useEffect(() => {
    fetch('http://localhost:5000/api/templates')
      .then(response => response.json())
      .then(data => {
        setTemplates(data);
        setSelectedTemplate(data[0]);
        setAnimationClass('fly-in');
      })
      .catch(error => console.error('Error fetching templates:', error));
  }, []);

  const selectTemplate = (template, index) => {
    setSelectedTemplate(template);
    const animations = ['fly-in', 'spin', 'fade-in'];
    setAnimationClass(animations[index % animations.length]);
  };

  const handlePrevious = () => {
    if (currentStart > 0) {
      setCurrentStart(currentStart - thumbnailsPerPage);
    }
  };

  const handleNext = () => {
    if (currentStart + thumbnailsPerPage < templates.length) {
      setCurrentStart(currentStart + thumbnailsPerPage);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
      <div className="content max-w-6xl mx-auto p-4 flex flex-col items-center">
        {selectedTemplate && (
          <MainImage selectedTemplate={selectedTemplate} animationClass={animationClass} />
        )}
        <ThumbnailStrip
          templates={templates}
          currentStart={currentStart}
          thumbnailsPerPage={thumbnailsPerPage}
          selectTemplate={selectTemplate}
          selectedTemplate={selectedTemplate}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
}

export default App;

