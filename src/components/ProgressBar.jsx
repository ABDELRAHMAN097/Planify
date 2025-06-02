




import PropTypes from 'prop-types';

const ProgressBar = ({ progress }) => {
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, // أو أي نوع آخر يناسب حالتك
};

export default ProgressBar;
