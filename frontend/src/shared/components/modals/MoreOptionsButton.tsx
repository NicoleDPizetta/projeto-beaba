import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const MoreOptionsButton: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const [open, setModalOpen] = useState(false);
  const openModal = () => {setModalOpen(true)};
  const closeModal = () => {setModalOpen(false)};

  return (
    <>
      <IconButton onClick={openModal}>
        <MoreHorizIcon />
      </IconButton>

      <Dialog open={open} onClose={closeModal}>
        <Box position={"relative"} padding={2} display={"inline-flex"}>
          <DialogContent>
            {children}
          </DialogContent>

            <Box position={"absolute"} right={8} top={8}>
              <IconButton onClick={closeModal}>
                <HighlightOffIcon />
              </IconButton>
            </Box>
        </Box>
      </Dialog>
    </>
  );
};
