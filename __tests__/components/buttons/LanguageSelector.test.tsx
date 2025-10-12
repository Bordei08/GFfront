import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LanguageSelector from '../../../src/components/buttons/LanguageToggle';

const mockDispatch = jest.fn();
const mockUseAppSelector = jest.fn();

jest.mock('../../../src/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (...args: any[]) => mockUseAppSelector(...args),
}));

const mockSetLang = jest.fn((code: 'en' | 'ro') => ({
  type: 'ui/setLang',
  payload: code,
}));
jest.mock('../../../src/store/slices/uiSlice', () => ({
  setLang: (code: 'en' | 'ro') => mockSetLang(code),
}));

jest.mock('../../../src/theme/useColorMode', () => ({
  useColorMode: () => 'light',
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('LanguageSelector', () => {
  it('renders both language buttons and marks EN as selected when current lang is EN', () => {
    mockUseAppSelector.mockReturnValue('en');

    const { getAllByRole, getByText } = render(<LanguageSelector />);

    expect(getByText('🇬🇧')).toBeTruthy();
    expect(getByText('🇷🇴')).toBeTruthy();

    const [enBtn, roBtn] = getAllByRole('button');
    expect(enBtn).toHaveAccessibilityState({ selected: true });
    expect(roBtn).toHaveAccessibilityState({ selected: false });
  });

  it('dispatches setLang("ro") when RO flag is pressed', () => {
    mockUseAppSelector.mockReturnValue('en');

    const { getAllByRole } = render(<LanguageSelector />);
    const [, roBtn] = getAllByRole('button');

    fireEvent.press(roBtn);

    expect(mockSetLang).toHaveBeenCalledWith('ro');
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'ui/setLang', payload: 'ro' });
  });

  it('marks RO as selected when current lang is RO', () => {
    mockUseAppSelector.mockReturnValue('ro');

    const { getAllByRole } = render(<LanguageSelector />);
    const [enBtn, roBtn] = getAllByRole('button');

    expect(enBtn).toHaveAccessibilityState({ selected: false });
    expect(roBtn).toHaveAccessibilityState({ selected: true });
  });

  it('dispatches setLang("en") when EN flag is pressed while RO is active', () => {
    mockUseAppSelector.mockReturnValue('ro');

    const { getAllByRole } = render(<LanguageSelector />);
    const [enBtn] = getAllByRole('button');

    fireEvent.press(enBtn);

    expect(mockSetLang).toHaveBeenCalledWith('en');
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'ui/setLang', payload: 'en' });
  });
});
