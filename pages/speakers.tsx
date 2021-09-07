import withLoading from "../hoc/withLoading";

type SpeakersProps = {
  speakers: { imageSrc: string; name: string }[];
};

const Speakers: React.FC<SpeakersProps> = ({ speakers }) => {
  return (
    <div>
      {speakers.map(({ imageSrc, name }) => (
        <img src={`images/${imageSrc}.jpg`} alt={name} key={imageSrc} />
      ))}
    </div>
  );
};

function withData(Component: React.ComponentType<SpeakersProps>) {
  const speakers = [{ imageSrc: "speaker-1124", name: "Douglas Crockford" }];
  return function () {
    return <Component speakers={speakers}></Component>;
  };
}

const SpeakersWithData = withData(Speakers);

const WithLoading = withLoading(SpeakersWithData);
WithLoading.defaultProps = {
  loading: true,
};

export default WithLoading;
