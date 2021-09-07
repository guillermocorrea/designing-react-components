export type SessionType = {
  id: string;
  title: string;
  eventYear: string;
  room: {
    name: string;
    capacity?: number;
  };
};

export type SpeakerType = {
  id: string;
  first: string;
  last: string;
  company?: string;
  bio: string;
  twitterHandle?: string;
  favorite?: boolean;
  sessions: SessionType[];
};
