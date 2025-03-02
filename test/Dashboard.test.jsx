import { store } from '@/store';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const renderWithProviders = (ui) => {
    render(
        <Provider store={store}>
            <MockedProvider mocks={[]} addTypename={false}>
                <Router>{ui}</Router>
            </MockedProvider>
        </Provider>
    );
};

describe('Dashboard Component', () => {
    test('renders total sales and total revenue correctly', () => {

        const mockData = {
            purchasedcar: [
                { carId: { carTitle: 'Car 1', carPrice: 500000 }, amount: 500000 },
                { carId: { carTitle: 'Car 2', carPrice: 600000 }, amount: 600000 },
            ],
        };

        jest.spyOn(require('@/features/api/purchaseApi'), 'useGetPurchasedcarsQuery').mockReturnValue({
            data: mockData,
            isLoading: false,
            isSuccess: true,
            isError: false,
        });

        renderWithProviders(<Dashboard />);


        expect(screen.getByText('Total Sales')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument(); // Based on the mock data
        expect(screen.getByText('Total Revenue')).toBeInTheDocument();
        expect(screen.getByText('₹1100000')).toBeInTheDocument(); // Total revenue is sum of amounts
    });

    test('renders car price chart', () => {
        const mockData = {
            purchasedcar: [
                { carId: { carTitle: 'Car 1', carPrice: 500000 }, amount: 500000 },
                { carId: { carTitle: 'Car 2', carPrice: 600000 }, amount: 600000 },
            ],
        };

        jest.spyOn(require('@/features/api/purchaseApi'), 'useGetPurchasedcarsQuery').mockReturnValue({
            data: mockData,
            isLoading: false,
            isSuccess: true,
            isError: false,
        });

        renderWithProviders(<Dashboard />);


        const chart = screen.getByTestId('line-chart');
        expect(chart).toBeInTheDocument();
    });

    test('shows loading state', () => {
        jest.spyOn(require('@/features/api/purchaseApi'), 'useGetPurchasedcarsQuery').mockReturnValue({
            data: null,
            isLoading: true,
            isSuccess: false,
            isError: false,
        });

        renderWithProviders(<Dashboard />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('shows error state', () => {
        jest.spyOn(require('@/features/api/purchaseApi'), 'useGetPurchasedcarsQuery').mockReturnValue({
            data: null,
            isLoading: false,
            isSuccess: false,
            isError: true,
            error: { message: 'Failed to fetch data' },
        });

        renderWithProviders(<Dashboard />);

        expect(screen.getByText('Failed to get purchased car')).toBeInTheDocument();
    });
});
