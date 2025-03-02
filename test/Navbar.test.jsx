// __tests__/Navbar.test.js
import { store } from '@/app/store';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Mock the API hook
jest.mock('@/features/api/authApi', () => ({
    useLogoutUserMutation: jest.fn(),
}));

jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
    },
}));

const mockUser = {
    id: '1',
    role: 'user',
    photoUrl: 'https://example.com/avatar.jpg',
};

const mockAdminUser = {
    id: '2',
    role: 'admin',
    photoUrl: 'https://example.com/admin-avatar.jpg',
};

const renderNavbar = (user = null) => {
    render(
        <Provider store={store}>
            <Router>
                <Navbar />
            </Router>
        </Provider>
    );
};

test('renders Navbar for logged-in user', async () => {
    useLogoutUserMutation.mockReturnValue([jest.fn(), { isSuccess: false }]);

    renderNavbar(mockUser);

    // Ensure the user avatar is displayed
    expect(screen.getByRole('img')).toHaveAttribute('src', mockUser.photoUrl);
    // Ensure the dropdown contains the correct links
    expect(screen.getByText(/My Favourites/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Log out/i)).toBeInTheDocument();
});

test('renders Navbar for logged-out user', () => {
    renderNavbar();

    // Ensure Login and Signup buttons are rendered
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Signup/i)).toBeInTheDocument();
});

test('executes logout and redirects to login page', async () => {
    useLogoutUserMutation.mockReturnValue([jest.fn(), { isSuccess: true, data: { message: 'User log out.' } }]);

    renderNavbar(mockUser);

    // Trigger logout action
    fireEvent.click(screen.getByText(/Log out/i));

    await waitFor(() => {
        expect(useLogoutUserMutation).toHaveBeenCalledTimes(1);
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });
});

test('renders mobile navbar and toggles menu', () => {
    renderNavbar(mockUser);

    // Simulate clicking the mobile menu button
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));

    // Ensure that the mobile menu links are rendered
    expect(screen.getByText(/My Favourites/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
});

test('renders admin options in dropdown menu', () => {
    renderNavbar(mockAdminUser);

    // Ensure the "Dashboard" link is displayed for admin user
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});

test('dark mode button is present', () => {
    renderNavbar(mockUser);

    // Ensure the dark mode button is in the document
    expect(screen.getByText(/Dark Mode/i)).toBeInTheDocument();
});
