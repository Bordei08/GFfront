import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import AddFishingTripButton from '../../../src/components/buttons/AddFishingTripButton';

jest.mock('../../../src/theme/useColorMode', () => ({
  useColorMode: () => 'light',
}));

describe('AddFishingTripButton', () => {
  it('renders default i18n label when `label` is not provided', () => {
    const onPress = jest.fn();
    const { getByText } = render(<AddFishingTripButton onPress={onPress} />);
    expect(getByText('Add a new fishing trip')).toBeTruthy();
  });

  it('renders custom label when `label` is provided', () => {
    const { getByText } = render(
      <AddFishingTripButton onPress={() => {}} label="Add trip" />
    );
    expect(getByText('Add trip')).toBeTruthy();
  });

  it('does NOT render text in compact mode', () => {
    const { queryByText } = render(
      <AddFishingTripButton onPress={() => {}} compact />
    );
    expect(queryByText('Add a new fishing trip')).toBeNull();
  });

  it('calls onPress when button is enabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <AddFishingTripButton onPress={onPress} testID="btn" />
    );
    fireEvent.press(getByTestId('btn'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when loading=true and sets a11y busy', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <AddFishingTripButton onPress={onPress} loading testID="btn" />
    );
    const btn = getByTestId('btn');
    expect(btn).toHaveAccessibilityState({ busy: true });
    fireEvent.press(btn);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does NOT call onPress when disabled=true and sets a11y disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <AddFishingTripButton onPress={onPress} disabled testID="btn" />
    );
    const btn = getByTestId('btn');
    expect(btn).toHaveAccessibilityState({ disabled: true });
    fireEvent.press(btn);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('respects accessibility: role and custom accessibilityLabel', () => {
    const { getByRole } = render(
      <AddFishingTripButton
        onPress={() => {}}
        accessibilityLabel="Create new trip"
      />
    );
    const node = getByRole('button', { name: 'Create new trip' });
    expect(node).toBeTruthy();
  });

  it('accepts a custom icon node', () => {
    const CustomIcon = <Text testID="custom-icon">+</Text>;
    const { getByTestId } = render(
      <AddFishingTripButton onPress={() => {}} icon={CustomIcon} />
    );
    expect(getByTestId('custom-icon')).toBeTruthy();
  });

  it('works with iconPosition="right" and keeps the label', () => {
    const { getByText } = render(
      <AddFishingTripButton onPress={() => {}} iconPosition="right" />
    );
    expect(getByText('Add a new fishing trip')).toBeTruthy();
  });

  it('matches snapshot (md, non-compact)', () => {
    const tree = render(<AddFishingTripButton onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
