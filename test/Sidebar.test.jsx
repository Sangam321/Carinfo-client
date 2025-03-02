import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const renderWithRouter = (ui) => {
    render(
        <Router>
            {ui}
        </Router>
    );
};

describe('Sidebar Component', () => {
    test('renders the Sidebar with links', () => {
        renderWithRouter(<Sidebar />);

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Cars')).toBeInTheDocument();
    });

    test('contains links to dashboard and cars', () => {
        renderWithRouter(<Sidebar />);

        const dashboardLink = screen.getByText('Dashboard');
        const carsLink = screen.getByText('Cars');

        expect(dashboardLink).toHaveAttribute('href', '/dashboard');
        expect(carsLink).toHaveAttribute('href', '/car');
    });
});
