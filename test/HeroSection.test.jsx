import { store } from '@/app/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const renderWithRouter = (ui) => {
    render(
        <Provider store={store}>
            <Router>
                {ui}
            </Router>
        </Provider>
    );
};

test('renders HeroSection', () => {
    renderWithRouter(<HeroSection />);

    expect(screen.getByText(/Dive Deep into the World of Cars/)).toBeInTheDocument();
    expect(screen.getByText(/Discover the Stories Behind Every Car, From Specs to Legacy/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search Cars/)).toBeInTheDocument();
    expect(screen.getByText(/Search/)).toBeInTheDocument();
    expect(screen.getByText(/Explore Cars/)).toBeInTheDocument();
});

test('searches for cars on submit', () => {
    renderWithRouter(<HeroSection />);

    const input = screen.getByPlaceholderText(/Search Cars/);
    const submitButton = screen.getByText(/Search/);

    fireEvent.change(input, { target: { value: 'Tesla' } });
    fireEvent.click(submitButton);

    expect(window.location.pathname).toBe('/car/search');
    expect(window.location.search).toBe('?query=Tesla');
});

test('explore cars button navigates to explore page', () => {
    renderWithRouter(<HeroSection />);

    const exploreButton = screen.getByText(/Explore Cars/);
    fireEvent.click(exploreButton);

    expect(window.location.pathname).toBe('/car/search');
    expect(window.location.search).toBe('?query');
});
