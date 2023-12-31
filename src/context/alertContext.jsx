import { createContext, useContext, useState } from 'react';

const AlertContext = createContext(undefined);

export const AlertProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    type: 'success',
    message: '',
    duration:2000,
  });

  return (
    <AlertContext.Provider
      value={{
        ...state,
        onOpen: ({type, message, duration=2000}) => setState({ isOpen: true, type, message, duration }),
        onClose: () => setState({ isOpen: false, type: '', message: '', duration:200 }),
      }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);