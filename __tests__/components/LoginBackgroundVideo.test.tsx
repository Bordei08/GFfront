import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import * as RN from 'react-native';
import LoginBackgroundVideo from '../../src/components/LoginBackgroundVideo';


jest.mock('react-native-video', () => {
  const ReactMock = require('react');
  const RNMock = require('react-native');
  return ({ onReadyForDisplay, onLoad, ...props }: any) => {
    const { width, height } = RNMock.useWindowDimensions();
    const isLandscape = width > height;

    if (isLandscape) {
      return null;
    }

    if (typeof onReadyForDisplay === 'function') onReadyForDisplay();
    if (typeof onLoad === 'function') onLoad({});
    return ReactMock.createElement('VideoMock', { testID: 'video-mock', ...props });
  };
});

jest.mock('../../src/theme/useColorMode', () => ({
  useColorMode: () => 'light',
}));

const mockDims = (w: number, h: number) => {
  jest.spyOn(RN, 'useWindowDimensions').mockReturnValue({
    width: w,
    height: h,
    scale: 1,
    fontScale: 1,
  });
};

describe('LoginBackgroundVideo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children and starts fade-in animation in portrait', () => {
    // Portrait
    mockDims(400, 800);

    const timingSpy = jest.spyOn(RN.Animated, 'timing');

    const { getByText, queryByTestId } = render(
      <LoginBackgroundVideo>
        <Text>Welcome</Text>
      </LoginBackgroundVideo>
    );

    expect(getByText('Welcome')).toBeTruthy();

    expect(queryByTestId('video-mock')).toBeTruthy();

    expect(timingSpy).toHaveBeenCalled();
    const [, cfg] = timingSpy.mock.calls[0];
    expect(cfg).toEqual(
      expect.objectContaining({
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      })
    );
    expect(cfg!.easing).toBeDefined();
  });

   
});
