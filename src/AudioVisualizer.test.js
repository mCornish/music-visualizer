import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AudioVisualizer from './AudioVisualizer';

window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };

describe('AudioVisualizer', () => {
  test('loads', async () => {
    render(<AudioVisualizer />);
    await waitFor(() => screen.getByRole('main'));
    expect(screen.getByRole('main')).toBeDefined();
  });

  test('play button toggles', async () => {
    const audio = { preview: '', artist: { name: 'Test Name' }, title: 'Test Title'};

    render(<AudioVisualizer audio={audio} />);
    
    await waitFor(() => screen.getByRole('main'));
    const button = screen.getAllByRole('button')[0];
    expect(button).toHaveTextContent('Stop');
    fireEvent.click(button);
    expect(button).toHaveTextContent('Play');
  });
});
