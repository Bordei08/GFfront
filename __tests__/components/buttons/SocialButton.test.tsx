import React from 'react';
import { Image } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import * as RN from 'react-native';
import SocialButton from '../../../src/components/buttons/SocialButton';

const LIGHT_BG = '#ffffff';
const DARK_BG = '#111111';
const LIGHT_TEXT = '#222222';
const DARK_TEXT = '#eeeeee';

const iconSource = { uri: 'test-icon.png' };

const flatten = (styles: any) =>
  Array.isArray(styles) ? Object.assign({}, ...styles) : styles;

const findNodeWithStyle = (
  node: ReactTestInstance,
  predicate: (style: Record<string, any>) => boolean
): ReactTestInstance | null => {
  const style = node.props?.style;
  const flat = style ? flatten(style) : undefined;
  if (flat && predicate(flat)) return node;

  for (const child of node.children) {
    if (typeof child === 'string') continue;
    const found = findNodeWithStyle(child as ReactTestInstance, predicate);
    if (found) return found;
  }
  return null;
};

describe('SocialButton', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const mockScheme = (scheme: 'light' | 'dark') => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue(scheme);
  };

  it('renders text and icon', () => {
    mockScheme('light');
    const { getByText, UNSAFE_getByType } = render(
      <SocialButton
        icon={iconSource}
        text="Continue with Google"
        onPress={jest.fn()}
        backgroundColorLight={LIGHT_BG}
        backgroundColorDark={DARK_BG}
        textColorLight={LIGHT_TEXT}
        textColorDark={DARK_TEXT}
      />
    );

    expect(getByText('Continue with Google')).toBeTruthy();
    const img = UNSAFE_getByType(Image);
    expect(img.props.source).toEqual(iconSource);
  });

  it('calls onPress when pressed', () => {
    mockScheme('light');
    const onPress = jest.fn();

    const { getByText } = render(
      <SocialButton
        icon={iconSource}
        text="Sign in"
        onPress={onPress}
        backgroundColorLight={LIGHT_BG}
        backgroundColorDark={DARK_BG}
        textColorLight={LIGHT_TEXT}
        textColorDark={DARK_TEXT}
      />
    );

    fireEvent.press(getByText('Sign in'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies light colors when scheme is light', () => {
    mockScheme('light');

    const { getByText } = render(
      <SocialButton
        icon={iconSource}
        text="Light Mode"
        backgroundColorLight={LIGHT_BG}
        backgroundColorDark={DARK_BG}
        textColorLight={LIGHT_TEXT}
        textColorDark={DARK_TEXT}
      />
    );

    const textNode: any = getByText('Light Mode');
    const textStyle = flatten(textNode.props.style);
    expect(textStyle.color).toBe(LIGHT_TEXT);

    let renderer!: TestRenderer.ReactTestRenderer; // definite assignment
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <SocialButton
          icon={iconSource}
          text="Light Mode"
          backgroundColorLight={LIGHT_BG}
          backgroundColorDark={DARK_BG}
          textColorLight={LIGHT_TEXT}
          textColorDark={DARK_TEXT}
        />
      );
    });
    const root = renderer.root;
    const bgNode = findNodeWithStyle(root, (s) => s.backgroundColor === LIGHT_BG);
    expect(bgNode).not.toBeNull();
  });

  it('applies dark colors when scheme is dark', () => {
    mockScheme('dark');

    const { getByText } = render(
      <SocialButton
        icon={iconSource}
        text="Dark Mode"
        backgroundColorLight={LIGHT_BG}
        backgroundColorDark={DARK_BG}
        textColorLight={LIGHT_TEXT}
        textColorDark={DARK_TEXT}
      />
    );

    const textNode: any = getByText('Dark Mode');
    const textStyle = flatten(textNode.props.style);
    expect(textStyle.color).toBe(DARK_TEXT);

    let renderer!: TestRenderer.ReactTestRenderer; // definite assignment
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <SocialButton
          icon={iconSource}
          text="Dark Mode"
          backgroundColorLight={LIGHT_BG}
          backgroundColorDark={DARK_BG}
          textColorLight={LIGHT_TEXT}
          textColorDark={DARK_TEXT}
        />
      );
    });
    const root = renderer.root;
    const bgNode = findNodeWithStyle(root, (s) => s.backgroundColor === DARK_BG);
    expect(bgNode).not.toBeNull();
  });

  it('merges custom style prop into container (marginTop)', () => {
    mockScheme('light');
    const custom = { marginTop: 24 };

    let renderer!: TestRenderer.ReactTestRenderer; // definite assignment
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <SocialButton
          icon={iconSource}
          text="With Style"
          backgroundColorLight={LIGHT_BG}
          backgroundColorDark={DARK_BG}
          textColorLight={LIGHT_TEXT}
          textColorDark={DARK_TEXT}
          style={custom}
        />
      );
    });
    const root = renderer.root;
    const styleNode = findNodeWithStyle(root, (s) => s.marginTop === 24);
    expect(styleNode).not.toBeNull();
  });
});
