import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const VisualInputEscondido = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const InputDeUpload = ({ onUpload }: { onUpload: (file: File) => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    console.log(file?.name)
    setSelectedFile(file);
    
    if(selectedFile) {
        onUpload(selectedFile);
    }
  };

  return (
    <Button
      fullWidth
      component="label"
      variant="contained"
    >
      Upload
      <VisualInputEscondido type="file" onChange={handleFileChange} />
    </Button>
  );
};
