// __tests__/BuyCarButton.test.js
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest, server, setupServer } from 'msw/node';
import { toast } from 'sonner';
import BuyCarButton from '../components/BuyCarButton';

// Mock the API call with MSW
const mockCarId = "123";
const mockCheckoutUrl = "https://checkout.stripe.com/session/abc";

// Mock useCreateCheckoutSessionMutation hook
jest.mock('@/features/api/purchaseApi', () => ({
    useCreateCheckoutSessionMutation: jest.fn(),
}));

// Mock toast notifications
jest.mock('sonner', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

// Set up MSW server to mock API responses
const server = setupServer(
    rest.post('/api/purchase', (req, res, ctx) => {
        return res(
            ctx.json({ url: mockCheckoutUrl })
        );
    }),
    rest.post('/api/purchase', (req, res, ctx) => {
        return res(
            ctx.status(500),
            ctx.json({ message: "Failed to create checkout session" })
        );
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => jest.clearAllMocks());

test('renders button and handles loading state', async () => {
    useCreateCheckoutSessionMutation.mockReturnValue([
        jest.fn(),
        { isLoading: true },
    ]);

    render(<BuyCarButton carId={mockCarId} />);

    expect(screen.getByText(/Please wait/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
});

test('renders button and initiates purchase flow successfully', async () => {
    useCreateCheckoutSessionMutation.mockReturnValue([
        jest.fn(() => Promise.resolve({ url: mockCheckoutUrl })),
        { isLoading: false, isSuccess: true, data: { url: mockCheckoutUrl } },
    ]);

    render(<BuyCarButton carId={mockCarId} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(window.location.href).toBe(mockCheckoutUrl));
});

test('displays error message when purchase fails', async () => {
    useCreateCheckoutSessionMutation.mockReturnValue([
        jest.fn(() => Promise.reject({ message: "Failed to create checkout session" })),
        { isLoading: false, isError: true, error: { data: { message: "Failed to create checkout session" } } },
    ]);

    render(<BuyCarButton carId={mockCarId} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Failed to create checkout session"));
});
