import { store } from '@/app/store';
import { useLoadUserQuery } from '@/features/api/authApi';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../components/Profile';

jest.mock('@/features/api/authApi', () => ({
    useLoadUserQuery: jest.fn(),
    useUpdateUserMutation: jest.fn(),
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

describe('Profile Component', () => {
    const mockUser = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        photoUrl: 'https://example.com/photo.jpg',
    };

    beforeEach(() => {
        useLoadUserQuery.mockReturnValue({ data: { user: mockUser }, isLoading: false, refetch: jest.fn() });
    });

    test('renders user profile details', () => {
        renderWithRouter(<Profile />);

        expect(screen.getByText(/Name:/)).toHaveTextContent(`Name: ${mockUser.name}`);
        expect(screen.getByText(/Email:/)).toHaveTextContent(`Email: ${mockUser.email}`);
        expect(screen.getByText(/Role:/)).toHaveTextContent(`Role: ${mockUser.role.toUpperCase()}`);
        expect(screen.getByAltText('@shadcn')).toHaveAttribute('src', mockUser.photoUrl);
    });

    test('opens edit profile dialog and updates profile', async () => {
        renderWithRouter(<Profile />);

        fireEvent.click(screen.getByText(/Edit Profile/));

        const nameInput = screen.getByPlaceholderText(/Name/);
        const fileInput = screen.getByLabelText(/Profile Photo/);

        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        fireEvent.change(fileInput, { target: { files: ['new-photo.jpg'] } });

        expect(nameInput.value).toBe('Jane Doe');
        expect(fileInput.files[0].name).toBe('new-photo.jpg');

        fireEvent.click(screen.getByText(/Save Changes/));

        await waitFor(() => expect(screen.getByText('Please wait')).toBeInTheDocument());
    });

    test('displays favorite cars if any are added', () => {
        localStorage.setItem('favoriteCars', JSON.stringify([
            { carId: 1, carTitle: 'Car 1', carThumbnail: 'car1-thumbnail.jpg' },
            { carId: 2, carTitle: 'Car 2', carThumbnail: 'car2-thumbnail.jpg' },
        ]));

        renderWithRouter(<Profile />);

        expect(screen.getByText('Cars you added as favourite')).toBeInTheDocument();
        expect(screen.getByText('Car 1')).toBeInTheDocument();
        expect(screen.getByText('Car 2')).toBeInTheDocument();
    });

    test('displays no favorite cars message if none are added', () => {
        localStorage.setItem('favoriteCars', JSON.stringify([]));

        renderWithRouter(<Profile />);

        expect(screen.getByText("You haven't added any favorite cars yet")).toBeInTheDocument();
    });
});
