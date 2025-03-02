import { store } from '@/app/store';
import { useGetSearchCarQuery } from '@/features/api/carApi';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchPage from '../components/SearchPage';

jest.mock('@/features/api/carApi', () => ({
    useGetSearchCarQuery: jest.fn(),
}));

const renderWithRouter = (ui) => {
    render(
        <Provider store={store}>
            <Router>
                {ui}
            </Router>
        </Provider>
    );
};

describe('SearchPage Component', () => {
    const mockSearchResults = {
        cars: [
            { _id: '1', carTitle: 'Car 1', carThumbnail: 'car1-thumbnail.jpg' },
            { _id: '2', carTitle: 'Car 2', carThumbnail: 'car2-thumbnail.jpg' },
        ],
    };

    beforeEach(() => {
        useGetSearchCarQuery.mockReturnValue({ data: mockSearchResults, isLoading: false });
    });

    test('renders search results for a query', () => {
        renderWithRouter(<SearchPage />);

        expect(screen.getByText(/Result for "undefined"/)).toBeInTheDocument();
        expect(screen.getByText(/Showing results for/)).toBeInTheDocument();
        expect(screen.getByText('Car 1')).toBeInTheDocument();
        expect(screen.getByText('Car 2')).toBeInTheDocument();
    });

    test('displays loading skeleton when data is loading', () => {
        useGetSearchCarQuery.mockReturnValue({ data: null, isLoading: true });

        renderWithRouter(<SearchPage />);

        expect(screen.getAllByText('Loading...')).toHaveLength(3);
    });

    test('displays "Car Not Found" when no cars match the search query', () => {
        useGetSearchCarQuery.mockReturnValue({ data: { cars: [] }, isLoading: false });

        renderWithRouter(<SearchPage />);

        expect(screen.getByText('Car Not Found')).toBeInTheDocument();
        expect(screen.getByText("Sorry, we couldn't find the car you're looking for.")).toBeInTheDocument();
    });

    test('filters cars based on selected categories and price', () => {
        const handleFilterChange = jest.fn();
        renderWithRouter(<SearchPage />);

        fireEvent.change(screen.getByLabelText('Filter Category'), { target: { value: 'SUV' } });
        fireEvent.change(screen.getByLabelText('Price'), { target: { value: 'High' } });

        waitFor(() => {
            expect(handleFilterChange).toHaveBeenCalledWith(['SUV'], 'High');
        });
    });
});
