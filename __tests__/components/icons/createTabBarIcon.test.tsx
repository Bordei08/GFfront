import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { createTabBarIcon } from '../../../src/components/icons/createTabBarIcon';

const MockSvg = (props: any) => React.createElement('SvgMock', { testID: 'svg', ...props });

const flatten = (styles: any) =>
  Array.isArray(styles) ? Object.assign({}, ...styles) : styles;

describe('createTabBarIcon', () => {
  it('renders SVG with correct size and color; shows underline only when focused', () => {
    const fixedSize = 24;
    const opts = { underlineWidthPct: 0.85, underlineHeight: 3, underlineOffset: 6, rounded: true };
    const Icon = createTabBarIcon(MockSvg as any, fixedSize, opts);

    const { getByTestId, UNSAFE_getAllByType, rerender, UNSAFE_queryAllByType } = render(
      <Icon focused color="#123456" size={fixedSize} />
    );

    const svg = getByTestId('svg');
    expect(svg.props.width).toBe(fixedSize);
    expect(svg.props.height).toBe(fixedSize);
    expect(svg.props.fill).toBe('#123456');
    expect(svg.props.stroke).toBe('#123456');
    expect(svg.props.accessibilityRole).toBe('image');

    const viewsFocused = UNSAFE_getAllByType(View);
    const container = viewsFocused.find((v: any) => v.props.pointerEvents === 'none');
    expect(container).toBeTruthy();
    const containerStyle = flatten(container!.props.style);
    expect(container!.props.pointerEvents).toBe('none');
    expect(containerStyle.width).toBe(fixedSize);
    expect(containerStyle.height).toBe(fixedSize + opts.underlineOffset + opts.underlineHeight);

    const underlineWidth = Math.max(8, Math.round(fixedSize * opts.underlineWidthPct));
    const underlineCandidate = viewsFocused.find((v: any) => {
      const s = flatten(v.props.style);
      return s && s.height === opts.underlineHeight && s.marginTop === opts.underlineOffset;
    });
    expect(underlineCandidate).toBeTruthy();
    const underlineStyle = flatten(underlineCandidate!.props.style);
    expect(underlineStyle.width).toBe(underlineWidth);
    expect(underlineStyle.height).toBe(opts.underlineHeight);
    expect(underlineStyle.marginTop).toBe(opts.underlineOffset);
    expect(underlineStyle.backgroundColor).toBe('#123456');
    expect(underlineStyle.borderRadius).toBe(opts.rounded ? opts.underlineHeight : 0);

    // Focused = false → underline absent
    rerender(<Icon focused={false} color="#123456" size={fixedSize} />);
    const viewsUnfocused = UNSAFE_queryAllByType(View);
    const underlineViews = viewsUnfocused.filter((v: any) => {
      const s = flatten(v.props.style);
      return s && typeof s.marginTop !== 'undefined' && s.height === opts.underlineHeight;
    });
    expect(underlineViews.length).toBe(0);
  });

  it('respects custom underline options including min width and non-rounded underline', () => {
    const fixedSize = 10; // small to trigger min-width 8
    const opts = { underlineWidthPct: 0.3, underlineHeight: 4, underlineOffset: 5, rounded: false };
    const Icon = createTabBarIcon(MockSvg as any, fixedSize, opts);

    const { UNSAFE_getAllByType } = render(<Icon focused color="#ff00aa" size={fixedSize} />);

    const underlineWidth = Math.max(8, Math.round(fixedSize * opts.underlineWidthPct));
    expect(underlineWidth).toBe(8);

    const allViews = UNSAFE_getAllByType(View);
    const underline = allViews.find((v: any) => {
      const s = flatten(v.props.style);
      return s && s.height === opts.underlineHeight && s.marginTop === opts.underlineOffset;
    });
    expect(underline).toBeTruthy();

    const s = flatten(underline!.props.style);
    expect(s.width).toBe(underlineWidth);
    expect(s.height).toBe(opts.underlineHeight);
    expect(s.marginTop).toBe(opts.underlineOffset);
    expect(s.backgroundColor).toBe('#ff00aa');
    expect(s.borderRadius).toBe(0); // rounded=false
  });
});
