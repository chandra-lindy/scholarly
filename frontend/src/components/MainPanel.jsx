import PropTypes from "prop-types";

const MainPanel = ({ selectedFile }) => {
  return (
    <div className="w-4/5 bg-brand-paper text-lg text-brand-main px-4 pb-4 overflow-y-auto h-[calc(100vh-3.75rem)]">
      {selectedFile.file ? (
        <iframe
          src={URL.createObjectURL(selectedFile.file)}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="PDF Viewer"
        />
      ) : null}
    </div>
  );
};

MainPanel.propTypes = {
  selectedFile: PropTypes.object,
};

export default MainPanel;
