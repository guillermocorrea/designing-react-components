import { createContext, Dispatch, SetStateAction, useContext } from "react";
import useSpeakerFilter from "../hooks/useSpeakerFilter";

type SpeakerFilterContextProps = {
  showSessions: boolean;
  setShowSessions: Dispatch<SetStateAction<boolean>>;
  eventYear: string;
  setEventYear: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  EVENT_YEARS: string[];
};
export const SpeakerFilterContext =
  createContext<SpeakerFilterContextProps | null>(null);

export const SpeakerFilterProvider: React.FC<{
  startingShowSessions?: boolean;
  startingEventYear?: string;
}> = ({
  startingShowSessions = false,
  startingEventYear = "2019",
  children,
}) => {
  const {
    showSessions,
    setShowSessions,
    eventYear,
    setEventYear,
    searchQuery,
    setSearchQuery,
    EVENT_YEARS,
  } = useSpeakerFilter(startingShowSessions, startingEventYear);

  return (
    <SpeakerFilterContext.Provider
      value={{
        showSessions,
        setShowSessions,
        eventYear,
        setEventYear,
        searchQuery,
        setSearchQuery,
        EVENT_YEARS,
      }}
    >
      {children}
    </SpeakerFilterContext.Provider>
  );
};

export const useSpeakerFilterContext = () => {
  const speakerFilterContext = useContext(SpeakerFilterContext);
  if (!speakerFilterContext) {
    throw new Error(
      "useSpeakerFilterContext must be used inside a SpeakerFilterProvider"
    );
  }
  return speakerFilterContext;
};
