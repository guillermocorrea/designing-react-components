import { useState } from "react";

const EVENT_YEARS = new Array(12)
  .fill(0)
  .map((_, index) => (2008 + index).toString());

const useSpeakerFilter = (
  startingShowSessions: boolean,
  startingEventYear: string
) => {
  const [showSessions, setShowSessions] = useState(startingShowSessions);
  const [eventYear, setEventYear] = useState(startingEventYear);
  const [searchQuery, setSearchQuery] = useState("");

  return {
    showSessions,
    setShowSessions,
    eventYear,
    setEventYear,
    searchQuery,
    setSearchQuery,
    EVENT_YEARS,
  };
};

export default useSpeakerFilter;
