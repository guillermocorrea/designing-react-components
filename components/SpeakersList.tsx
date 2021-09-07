import { data } from "../SpeakerData";

import Speaker from "./Speaker";
import ReactPlaceholder from "react-placeholder/lib";
import { useSpeakerFilterContext } from "../context/SpeakerFilterContext";
import React from "react";
import SpeakerAdd from "./SpeakerAdd";
import { RequestStatus, useRequestRest } from "../hooks/useRequestRest";

const SpeakersList = () => {
  const { searchQuery, eventYear } = useSpeakerFilterContext();

  const {
    error,
    requestStatus,
    data: speakersData,
    updateRecord,
    insertRecord,
    deleteRecord,
  } = useRequestRest();

  if (requestStatus === RequestStatus.Failure) {
    return (
      <div className="text-danger">
        ERROR: <b>loading Speaker data failed {error}</b>
      </div>
    );
  }

  return (
    <div className="container speakers-list">
      <ReactPlaceholder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === RequestStatus.Success}
      >
        <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
        <div className="row">
          {speakersData
            .filter(
              (speaker) =>
                speaker.first.toLowerCase().includes(searchQuery) ||
                speaker.last.toLowerCase().includes(searchQuery)
            )
            .filter((speaker) =>
              speaker.sessions.find(
                (session) => session.eventYear === eventYear
              )
            )
            .map(function (speaker) {
              const { id } = speaker;
              return (
                <Speaker
                  speaker={speaker}
                  key={id}
                  updateRecord={updateRecord}
                  insertRecord={insertRecord}
                  deleteRecord={deleteRecord}
                />
              );
            })}
        </div>
      </ReactPlaceholder>
    </div>
  );
};

export default SpeakersList;
