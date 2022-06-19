import { useContext, createContext, useState } from "react";

type SampleContextType = {
  state: any;
  setState: (state: any) => void;
};

export const SampleContext = createContext<SampleContextType>(null);

export const SampleProvider = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <SampleContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </SampleContext.Provider>
  );
};

export const useSample = () => {
  const context = useContext(SampleContext);

  const { state, setState } = context;

  return {
    state,
    setState,
  };
};
