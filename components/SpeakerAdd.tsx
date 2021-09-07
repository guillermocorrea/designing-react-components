import { SpeakerType } from "../models/speaker";

type Props = {
  eventYear: string;
  insertRecord: (record: SpeakerType, doneCallback?: () => void) => void;
};

const getFirstLast = (): string[] => {
  const firstLast = window.prompt("Enter first and last name:", "");
  if (!firstLast) {
    return getFirstLast();
  }
  const firstLastArray = firstLast.split(" ");
  return firstLastArray;
};

const SpeakerAdd: React.FC<Props> = ({ eventYear, insertRecord }) => {
  return (
    <a href="#" className="addSes">
      <i
        onClick={(e) => {
          e.preventDefault();
          const firstLastArray = getFirstLast();
          insertRecord({
            id: "99999",
            first: firstLastArray[0],
            last: firstLastArray[1],
            bio: "Bio not entered yet",
            sessions: [
              {
                id: "88888",
                title: `New Session For ${firstLastArray[0]}`,
                room: {
                  name: "Main Ball Room",
                },
                eventYear,
              },
            ],
          });
        }}
      >
        +
      </i>
    </a>
  );
};

export default SpeakerAdd;
