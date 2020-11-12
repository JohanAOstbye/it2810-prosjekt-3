import React from 'react';
import { render } from '@testing-library/react';
import WelcomeComponent from '../../src/body/WelcomeComponent';

test('renders welcome text', () => {
    const { getByText } = render(<WelcomeComponent />);
    const linkElement = getByText(/Click on a Pokémon to learn more about it. You can also filter by searching for a specific one./i);
    expect(linkElement).toBeInTheDocument();
  });