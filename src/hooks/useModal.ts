import { useState } from 'react';

export function useModal(show = false) {
  const [modalOpen, setModalOpen] = useState(show);
  const [modalState, setModalState] = useState({} as any);
  return [modalOpen, setModalOpen, modalState, setModalState];
}
