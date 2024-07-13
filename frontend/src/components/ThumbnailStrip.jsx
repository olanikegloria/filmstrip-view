import PropTypes from 'prop-types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../App.css';

const ThumbnailStrip = ({
  templates,
  currentStart,
  thumbnailsPerPage,
  selectTemplate,
  selectedTemplate,
  handlePrevious,
  handleNext,
}) => {
  return (
    <div id="thumbnail-strip" className="flex justify-center items-center mt-4">
      <button
        className={`arrow ${currentStart === 0 ? 'disabled' : ''}`}
        onClick={handlePrevious}
        disabled={currentStart === 0}
      >
        <FiChevronLeft className="h-10 w-10" />
      </button>
      <div className="thumbnail-container flex">
        {templates
          .slice(currentStart, currentStart + thumbnailsPerPage)
          .map((template, index) => (
            <img
              key={template.id}
              src={`http://localhost:5000/images/thumbnails/${template.thumbnail}`}
              alt={template.description}
              className={`object-cover w-32 h-32 cursor-pointer transition-transform duration-300 ${
                selectedTemplate && selectedTemplate.id === template.id
                  ? 'selected'
                  : ''
              }`}
              onClick={() => selectTemplate(template, index)}
            />
          ))}
      </div>
      <button
        className={`arrow ${
          currentStart + thumbnailsPerPage >= templates.length ? 'disabled' : ''
        }`}
        onClick={handleNext}
        disabled={currentStart + thumbnailsPerPage >= templates.length}
      >
        <FiChevronRight className="h-10 w-10" />
      </button>
    </div>
  );
};

ThumbnailStrip.propTypes = {
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      cost: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentStart: PropTypes.number.isRequired,
  thumbnailsPerPage: PropTypes.number.isRequired,
  selectTemplate: PropTypes.func.isRequired,
  selectedTemplate: PropTypes.shape({
    id: PropTypes.string,
    cost: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    image: PropTypes.string,
  }),
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default ThumbnailStrip;
