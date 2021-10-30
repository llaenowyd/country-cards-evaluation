import React from 'react';
// @ts-ignore
import { fireEvent, render } from '@testing-library/react';
import Countries from '../Countries';

describe('Countries', () => {
  it('sorts its country cards by name by default', () => {
    const screen = render(<Countries />);

    const cards = screen.getAllByRole('listitem');

    expect(cards[0]?.textContent).toEqual('Afghanistan');
    expect(cards[1]?.textContent).toEqual('Åland Islands');
    expect(cards[2]?.textContent).toEqual('Albania');
  });

  it('sorts its country cards on user action', () => {
    const screen = render(<Countries />);

    const sortSelect = screen.getByRole('listbox');

    fireEvent.change(sortSelect, { target: { value: 'pop-asc' } });

    let cards = screen.getAllByRole('listitem');

    expect(cards[0]?.textContent).toEqual('Heard Island and McDonald Islands');
    expect(cards[1]?.textContent).toEqual('Bouvet Island');
    expect(cards[2]?.textContent).toEqual('South Georgia');

    fireEvent.change(sortSelect, { target: { value: 'pop-desc' } });

    cards = screen.getAllByRole('listitem');

    expect(cards[0]?.textContent).toEqual('China');
    expect(cards[1]?.textContent).toEqual('India');
    expect(cards[2]?.textContent).toEqual('United States');

    fireEvent.change(sortSelect, { target: { value: 'Name' } });

    cards = screen.getAllByRole('listitem');

    expect(cards[0]?.textContent).toEqual('Afghanistan');
    expect(cards[1]?.textContent).toEqual('Åland Islands');
    expect(cards[2]?.textContent).toEqual('Albania');
  });

  it('filters its country cards on user action', () => {
    const screen = render(<Countries />);

    const filterEntry = screen.getByRole('textbox');

    fireEvent.change(filterEntry, { target: { value: 'usa' } });

    let cards = screen.getAllByRole('listitem');

    expect(cards.length).toEqual(1);

    expect(screen.getByText('United States')).toBeInTheDocument();

    fireEvent.change(filterEntry, { target: { value: 'Canada' } });

    cards = screen.getAllByRole('listitem');

    expect(cards.length).toEqual(1);

    expect(screen.queryByText('United States')).toBeNull();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });
});
