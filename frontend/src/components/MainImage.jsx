import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import '../App.css';

const MainImage = ({ selectedTemplate, animationClass }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timeout);
  }, [selectedTemplate, animationClass]);

  return (
    <div id="main-image" className="relative overflow-hidden h-[400px] w-full max-w-4xl mx-auto mt-16 flex justify-center items-center rounded-lg shadow-lg">
      <img
        src={`http://localhost:5000/images/large/${selectedTemplate.image}`}
        alt={selectedTemplate.description}
        className={`object-cover w-full h-full rounded-lg transition-transform duration-1000 ${animate ? animationClass : ''}`}
      />
      <div className="meta-data absolute bottom-0 left-0 right-0 bg-black/85 p-4 text-white border-t border-gray-700 shadow-lg rounded-b-lg">
        <p><strong>ID:</strong> {selectedTemplate.id}</p>
        <p><strong>Cost:</strong> ${selectedTemplate.cost}</p>
        <p><strong>Main image file name:</strong> {selectedTemplate.image}</p>
        <p><strong>Thumbnail file name:</strong> {selectedTemplate.thumbnail}</p>
        <p><strong>Description:</strong> {selectedTemplate.description}</p>
      </div>
    </div>
  );
};

MainImage.propTypes = {
  selectedTemplate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  animationClass: PropTypes.string.isRequired,
};

export default MainImage;
