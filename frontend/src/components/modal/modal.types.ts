export interface ModalCustomProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  title: string;
};