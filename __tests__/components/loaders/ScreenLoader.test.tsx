import React from 'react';
import { View, Image } from 'react-native';
import { render } from '@testing-library/react-native';
import ScreenLoader from '../../../src/components/loaders/ScreenLoader';


const flatten = (styles: any) =>
  Array.isArray(styles) ? Object.assign({}, ...styles) : styles;

describe('ScreenLoader', () => {
  it('returns null when visible is false', () => {
    const { toJSON } = render(<ScreenLoader visible={false} />);
    expect(toJSON()).toBeNull();
  });

  it('renders overlay and logo with default props when visible is true', () => {
    const { UNSAFE_getAllByType } = render(<ScreenLoader visible />);

    const views = UNSAFE_getAllByType(View);
    expect(views.length).toBeGreaterThan(0);
    const overlay = views[0];

    const overlayStyle = flatten(overlay.props.style);
    expect(overlayStyle.justifyContent).toBe('center');
    expect(overlayStyle.alignItems).toBe('center');
    expect(overlayStyle.top).toBe(0);
    expect(overlayStyle.left).toBe(0);
    expect(overlayStyle.right).toBe(0);
    expect(overlayStyle.bottom).toBe(0);
    // defaults
    expect(overlayStyle.backgroundColor).toBe('#000');
    expect(overlayStyle.zIndex).toBe(100);

    const images = UNSAFE_getAllByType(Image);
    expect(images.length).toBe(1);
    const logo = images[0];
    const logoStyle = flatten(logo.props.style);
    expect(logoStyle.width).toBe(206);
    expect(logoStyle.height).toBe(206);
    expect(logoStyle.resizeMode).toBe('contain');
  });

  it('applies custom logo, size, backgroundColor and zIndex', () => {
    const customLogo = { uri: 'https://example.com/logo.png' };
    const { UNSAFE_getAllByType } = render(
      <ScreenLoader
        visible
        logo={customLogo}
        size={120}
        backgroundColor="#123456"
        zIndex={5}
      />
    );

    const overlay = UNSAFE_getAllByType(View)[0];
    const overlayStyle = flatten(overlay.props.style);
    expect(overlayStyle.backgroundColor).toBe('#123456');
    expect(overlayStyle.zIndex).toBe(5);

    const img = UNSAFE_getAllByType(Image)[0];
    expect(img.props.source).toEqual(customLogo);

    const imgStyle = flatten(img.props.style);
    expect(imgStyle.width).toBe(120);
    expect(imgStyle.height).toBe(120);
  });
});
