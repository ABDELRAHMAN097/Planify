import PropTypes from 'prop-types';

const ProgressBar = ({ progress }) => {
  const isComplete = progress >= 100;

  return (
    <div className="w-full">
     
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-purple-700">Progress</span>
        <span className={`text-sm font-semibold ${isComplete ? 'text-green-600' : 'text-purple-700'}`}>
          {isComplete ? '✔️ Done!' : `${progress}%`}
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-700 ease-in-out ${
            isComplete
              ? 'bg-gradient-to-r from-green-400 to-green-600'
              : 'bg-gradient-to-r from-purple-500 to-purple-700 animate-pulse'
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
