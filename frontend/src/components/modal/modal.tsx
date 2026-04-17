// Libraries
import React from 'react';

// Types
import type { ModalCustomProps } from './modal.types.ts';

// Styles
import { StyledModal } from './modal.style.ts';

const ModalCustom: React.FC<ModalCustomProps> = ({ open, onClose, title, children }) => {
  return (
    <StyledModal
      open={open}
      onCancel={onClose}
      footer={null}
      title={title}
      styles={{
        mask: {
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {children}
    </StyledModal>
  );
};

export default ModalCustom;