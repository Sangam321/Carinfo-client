import PropTypes from 'prop-types';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const RichTextEditor = ({ input, setInput }) => {
  const handleChange = (content) => {
    // Simply update the 'description' field in the input object
    setInput({ ...input, description: content });
  }

  return (
    <ReactQuill
      theme="snow"
      value={input.description}
      onChange={handleChange}
    />
  );
}

// Prop validation
RichTextEditor.propTypes = {
  input: PropTypes.shape({
    description: PropTypes.string
  }).isRequired,
  setInput: PropTypes.func.isRequired
};

export default RichTextEditor;
