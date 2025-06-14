import { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      style={{
        width: "100%",
        height: showDrop ? "150px" : 0,
        border: "2px dashed #ccc",
        borderRadius: "12px",
        backgroundColor: showDrop ? "#f9f9f9" : "transparent",
        opacity: showDrop ? 1 : 0,
        transition:
          "opacity 0.3s ease-in-out, background-color 0.3s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Drop Here
    </section>
  );
};

export default DropArea;
