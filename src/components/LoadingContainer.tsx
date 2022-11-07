import {colors} from '@theme/colors';
import React, {ReactNode} from 'react';
import {ActivityIndicator} from 'react-native';

interface LoadingContainerT {
  loading: boolean;
  children: ReactNode;
}

const LoadingContainer = ({loading, children}: LoadingContainerT) => {
  return (
    <>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.green} />
      ) : (
        children
      )}
    </>
  );
};

export default LoadingContainer;
