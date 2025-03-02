// __tests__/Login.test.js
import { store } from '@/app/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Login from '../components/Login';

const renderWithRouter = (ui) => {
    const history = createMemoryHistory();
    render(
        <Provider store={store}>
            <Router location={history.location} navigator={history}>
                {ui}
            </Router>
        </Provider>
    );
};

test('renders login and signup tabs', () => {
    renderWithRouter(<Login />);

    // Check if both tabs are rendered
    expect(screen.getByText(/Signup/)).toBeInTheDocument();
    expect(screen.getByText(/Login/)).toBeInTheDocument();
});

test('signup form submission', async () => {
    renderWithRouter(<Login />);

    // Switch to the signup tab
    fireEvent.click(screen.getByText(/Signup/));

    // Fill the signup form
    fireEvent.change(screen.getByPlaceholderText('Eg. ram bahadur'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Eg. ram@gmail.com'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Eg. xyz'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Signup/));

    // Wait for the toast message or loading spinner to be removed (based on your success handling)
    await waitFor(() => {
        expect(screen.getByText(/Please wait/)).toBeInTheDocument();
    });

    // Test if success toast is shown
    await waitFor(() => {
        expect(screen.queryByText(/Please wait/)).not.toBeInTheDocument();
        expect(screen.getByText(/Signup successful/)).toBeInTheDocument();
    });
});

test('login form submission', async () => {
    renderWithRouter(<Login />);

    // Switch to the login tab
    fireEvent.click(screen.getByText(/Login/));

    // Fill the login form
    fireEvent.change(screen.getByPlaceholderText('Eg. ram@gmail.com'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Eg. xyz'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Login/));

    // Wait for the toast message or loading spinner to be removed (based on your success handling)
    await waitFor(() => {
        expect(screen.getByText(/Please wait/)).toBeInTheDocument();
    });

    // Test if success toast is shown
    await waitFor(() => {
        expect(screen.queryByText(/Please wait/)).not.toBeInTheDocument();
        expect(screen.getByText(/Login successful/)).toBeInTheDocument();
    });
});

test('switches between signup and login tabs', () => {
    renderWithRouter(<Login />);

    // Initially, the signup tab should be selected
    expect(screen.getByText(/Signup/).closest('button')).toHaveClass('data-state="active"');
    expect(screen.getByText(/Login/).closest('button')).not.toHaveClass('data-state="active"');

    // Switch to the login tab
    fireEvent.click(screen.getByText(/Login/));

    // Now, the login tab should be active
    expect(screen.getByText(/Login/).closest('button')).toHaveClass('data-state="active"');
    expect(screen.getByText(/Signup/).closest('button')).not.toHaveClass('data-state="active"');
});

test('handles loading state during registration and login', async () => {
    renderWithRouter(<Login />);

    // Switch to the signup tab
    fireEvent.click(screen.getByText(/Signup/));

    // Start filling the form
    fireEvent.change(screen.getByPlaceholderText('Eg. ram bahadur'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Eg. ram@gmail.com'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Eg. xyz'), { target: { value: 'password123' } });

    // Submit the form and expect a loading spinner
    fireEvent.click(screen.getByText(/Signup/));
    expect(screen.getByText(/Please wait/)).toBeInTheDocument();


});
