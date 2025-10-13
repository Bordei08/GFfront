import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ThemeSelector from '../../../src/components/buttons/ThemeSelector';

const mockDispatch = jest.fn();
const mockUseAppSelector = jest.fn();

jest.mock('../../../src/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (...args: any[]) => mockUseAppSelector(...args),
}));

const mockSetThemeMode = jest.fn((code: 'system' | 'light' | 'dark') => ({
  type: 'ui/setThemeMode',
  payload: code,
}));
jest.mock('../../../src/store/slices/uiSlice', () => ({
  setThemeMode: (code: 'system' | 'light' | 'dark') => mockSetThemeMode(code),
}));

jest.mock('../../../src/theme/useColorMode', () => ({
  useColorMode: () => 'light',
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ThemeSelector', () => {
  it('renders all theme options with emojis and i18n labels', () => {
    mockUseAppSelector.mockReturnValue('light');

    const { getByText } = render(<ThemeSelector />);

    // emojis
    expect(getByText('🖥️')).toBeTruthy();
    expect(getByText('🌞')).toBeTruthy();
    expect(getByText('🌙')).toBeTruthy();

    expect(getByText('theme_system')).toBeTruthy();
    expect(getByText('theme_light')).toBeTruthy();
    expect(getByText('theme_dark')).toBeTruthy();
  });

  it('marks the current theme as selected via accessibility state', () => {
    mockUseAppSelector.mockReturnValue('light');

    const { getAllByRole } = render(<ThemeSelector />);
    const buttons = getAllByRole('button'); // order: system, light, dark

    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveAccessibilityState({ selected: false }); // system
    expect(buttons[1]).toHaveAccessibilityState({ selected: true });  // light
    expect(buttons[2]).toHaveAccessibilityState({ selected: false }); // dark
  });

  it('dispatches setThemeMode("dark") when dark chip is pressed', () => {
    mockUseAppSelector.mockReturnValue('light');

    const { getAllByRole } = render(<ThemeSelector />);
    const buttons = getAllByRole('button'); // [system, light, dark]

    fireEvent.press(buttons[2]); // dark

    expect(mockSetThemeMode).toHaveBeenCalledWith('dark');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ui/setThemeMode',
      payload: 'dark',
    });
  });

  it('dispatches setThemeMode("system") when system chip is pressed', () => {
    mockUseAppSelector.mockReturnValue('dark');

    const { getAllByRole } = render(<ThemeSelector />);
    const buttons = getAllByRole('button'); // [system, light, dark]

    fireEvent.press(buttons[0]); // system

    expect(mockSetThemeMode).toHaveBeenCalledWith('system');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ui/setThemeMode',
      payload: 'system',
    });
  });

  it('updates selected state when current theme is dark', () => {
    mockUseAppSelector.mockReturnValue('dark');

    const { getAllByRole } = render(<ThemeSelector />);
    const buttons = getAllByRole('button'); // order: system, light, dark

    expect(buttons[0]).toHaveAccessibilityState({ selected: false }); // system
    expect(buttons[1]).toHaveAccessibilityState({ selected: false }); // light
    expect(buttons[2]).toHaveAccessibilityState({ selected: true });  // dark
  });

  it('exposes accessible names using i18n labels', () => {
    mockUseAppSelector.mockReturnValue('system');

    const { getByRole } = render(<ThemeSelector />);

    expect(getByRole('button', { name: 'theme_system' })).toBeTruthy();
    expect(getByRole('button', { name: 'theme_light' })).toBeTruthy();
    expect(getByRole('button', { name: 'theme_dark' })).toBeTruthy();
  });
});
