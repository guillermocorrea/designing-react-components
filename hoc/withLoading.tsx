import React from "react";

type WithLoadingProps = {
  loading: boolean;
};

const withLoading = <P extends object>(Component: React.FC<P>) => {
  const WithLoading: React.FC<P & WithLoadingProps> = (props) => {
    const { loading, ...rest } = props;
    if (loading) {
      return <div>Loading...</div>;
    }
    return <Component {...(rest as P)} />;
  };
  WithLoading.displayName = `WithLoading(${
    Component.displayName || Component.name || "Component"
  })`;
  return WithLoading;
};

export default withLoading;
