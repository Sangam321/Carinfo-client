// __tests__/Routes.test.js
import { store } from '@/app/store'; // assuming your Redux store is exported from app/store.js
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from '../components/ProtectedRoutes';

// Mocked component to test routing
const MockComponent = () => <div>Protected Content</div>;

const renderRoute = (routeComponent, storeState) => {
    render(
        <Provider store={{ ...store, getState: () => storeState }}>
            <Router>
                {routeComponent}
            </Router>
        </Provider>
    );
};

test('ProtectedRoute redirects to login if not authenticated', () => {
    const storeState = {
        auth: { isAuthenticated: false }
    };

    renderRoute(<ProtectedRoute><MockComponent /></ProtectedRoute>, storeState);

    // Check if the user is redirected to the login page
    expect(screen.queryByText(/Protected Content/)).not.toBeInTheDocument();
});

test('ProtectedRoute allows access if authenticated', () => {
    const storeState = {
        auth: { isAuthenticated: true }
    };

    renderRoute(<ProtectedRoute><MockComponent /></ProtectedRoute>, storeState);

    // Check if the protected content is displayed
    expect(screen.getByText(/Protected Content/)).toBeInTheDocument();
});

test('AuthenticatedUser redirects to home if authenticated', () => {
    const storeState = {
        auth: { isAuthenticated: true }
    };

    renderRoute(<AuthenticatedUser><MockComponent /></AuthenticatedUser>, storeState);

    // Check if the user is redirected to home (assuming home is the root)
    expect(screen.queryByText(/Protected Content/)).not.toBeInTheDocument();
});

test('AuthenticatedUser allows access if not authenticated', () => {
    const storeState = {
        auth: { isAuthenticated: false }
    };

    renderRoute(<AuthenticatedUser><MockComponent /></AuthenticatedUser>, storeState);

    // Check if the content is displayed since the user is not authenticated
    expect(screen.getByText(/Protected Content/)).toBeInTheDocument();
});

test('AdminRoute redirects to login if not authenticated', () => {
    const storeState = {
        auth: { isAuthenticated: false, user: null }
    };

    renderRoute(<AdminRoute><MockComponent /></AdminRoute>, storeState);

    // Check if the user is redirected to the login page
    expect(screen.queryByText(/Protected Content/)).not.toBeInTheDocument();
});

test('AdminRoute redirects to home if not an admin', () => {
    const storeState = {
        auth: { isAuthenticated: true, user: { role: 'user' } }
    };

    renderRoute(<AdminRoute><MockComponent /></AdminRoute>, storeState);

    // Check if the user is redirected to home (assuming home is the root)
    expect(screen.queryByText(/Protected Content/)).not.toBeInTheDocument();
});

test('AdminRoute allows access if an admin', () => {
    const storeState = {
        auth: { isAuthenticated: true, user: { role: 'admin' } }
    };

    renderRoute(<AdminRoute><MockComponent /></AdminRoute>, storeState);

    // Check if the content is displayed for an admin user
    expect(screen.getByText(/Protected Content/)).toBeInTheDocument();
});
