import { createContext, useContext } from "react";
import { SpeakerType } from "../models/speaker";

type SpeakerContextProps = {
  speaker: SpeakerType;
  updateRecord: (record: SpeakerType, doneCallback?: () => void) => void;
  insertRecord: (record: SpeakerType, doneCallback?: () => void) => void;
  deleteRecord: (record: SpeakerType, doneCallback?: () => void) => void;
};
export const SpeakerContext = createContext<SpeakerContextProps | null>(null);

export const useSpeakerContext = () => {
  const speakerContext = useContext(SpeakerContext);
  if (!speakerContext) {
    throw new Error("useSpeakerContext must be used inside SpeakerProvider");
  }
  return speakerContext;
};

type SpeakerProvider = SpeakerContextProps;
const SpeakerProvider: React.FC<SpeakerProvider> = ({
  speaker,
  updateRecord,
  insertRecord,
  deleteRecord,
  children,
}) => {
  return (
    <SpeakerContext.Provider
      value={{ speaker, updateRecord, insertRecord, deleteRecord }}
    >
      {children}
    </SpeakerContext.Provider>
  );
};

export default SpeakerProvider;
