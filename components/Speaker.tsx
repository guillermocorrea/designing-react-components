import React, { memo, useState } from "react";
import SpeakerProvider, { useSpeakerContext } from "../context/SpeakerContext";
import { useSpeakerFilterContext } from "../context/SpeakerFilterContext";
import { SpeakerType } from "../models/speaker";
import SpeakerDelete from "./SpeakerDelete";

type SessionProps = {
  title: string;
  room: string;
};
const Session = ({ title, room }: SessionProps) => {
  return (
    <span className="session w-100">
      {title} <strong>Room: {room}</strong>
    </span>
  );
};

const Sessions = () => {
  const { eventYear } = useSpeakerFilterContext();
  const {
    speaker: { sessions },
  } = useSpeakerContext();
  return (
    <div className="sessionBox card h-250">
      {sessions
        .filter((session) => session.eventYear === eventYear)
        .map(({ title, room, id }) => (
          <Session title={title} room={room.name} key={id} />
        ))}
    </div>
  );
};

const SpeakerFavorite = () => {
  const { speaker, updateRecord } = useSpeakerContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const { favorite } = speaker;

  function doneCallback() {
    setIsUpdating(false);
  }

  return (
    <div className="action padB1">
      <span
        onClick={() => {
          setIsUpdating(true);
          updateRecord({ ...speaker, favorite: !favorite }, doneCallback);
        }}
      >
        <i
          className={
            favorite === true ? "fa fa-star orange" : "fa fa-star-o orange"
          }
        />{" "}
        Favorite{" "}
        {isUpdating ? (
          <span className="fas fa-circle-notch fa-spin"></span>
        ) : null}
      </span>
    </div>
  );
};

const SpeakerInfo = () => {
  const {
    speaker: { first, last, bio, company, twitterHandle, favorite },
  } = useSpeakerContext();
  return (
    <div className="speaker-info">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-truncate w-200">
          {first} {last}
        </h3>
      </div>
      <SpeakerFavorite />
      <div>
        <p className="card-description">{bio}</p>
        <div className="social d-flex flex-row mt-4">
          <div className="company">
            <h5>Company</h5>
            <h6>{company}</h6>
          </div>
          <div className="twitter">
            <h5>Twitter</h5>
            <h6>{twitterHandle}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageWithFallback = ({ src, ...props }) => {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  function onError() {
    if (!error) {
      setImgSrc("/images/speaker-99999.jpg");
      setError(true);
    }
  }

  return <img src={imgSrc} {...props} onError={onError} />;
};

const SpeakerImage = () => {
  const {
    speaker: { id, first, last },
  } = useSpeakerContext();
  return (
    <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
      <ImageWithFallback
        className="contain-fit"
        src={`/images/speaker-${id}.jpg`}
        width="300"
        alt={`${first} ${last}`}
      />
    </div>
  );
};

type SpeakerProps = { speaker: SpeakerType } & {
  updateRecord: (recordUpdated: SpeakerType, doneCallback?: () => void) => void;
  insertRecord: (recordUpdated: SpeakerType, doneCallback?: () => void) => void;
  deleteRecord: (recordUpdated: SpeakerType, doneCallback?: () => void) => void;
};

const Speaker = memo(function Speaker({
  speaker,
  updateRecord,
  insertRecord,
  deleteRecord,
}: SpeakerProps) {
  const { showSessions } = useSpeakerFilterContext();

  return (
    <SpeakerProvider
      speaker={speaker}
      updateRecord={updateRecord}
      insertRecord={insertRecord}
      deleteRecord={deleteRecord}
    >
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">
          <SpeakerImage />
          <SpeakerInfo />
        </div>
        {showSessions && <Sessions />}
        <SpeakerDelete />
      </div>
    </SpeakerProvider>
  );
},
areEqual);

function areEqual(prev: SpeakerProps, next: SpeakerProps) {
  return prev.speaker.favorite === next.speaker.favorite;
}

export default Speaker;
