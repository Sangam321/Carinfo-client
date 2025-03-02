import authReducer, { userLoggedIn, userLoggedOut } from "@/features/auth/authSlice";

describe("authSlice", () => {
    const initialState = {
        user: null,
        isAuthenticated: false,
    };

    it("should handle userLoggedIn", () => {
        const user = { name: "John Doe", email: "john.doe@example.com" };
        const action = userLoggedIn({ user });
        const newState = authReducer(initialState, action);

        expect(newState.user).toEqual(user);
        expect(newState.isAuthenticated).toBe(true);
    });

    it("should handle userLoggedOut", () => {
        const state = { user: { name: "John Doe", email: "john.doe@example.com" }, isAuthenticated: true };
        const action = userLoggedOut();
        const newState = authReducer(state, action);

        expect(newState.user).toBeNull();
        expect(newState.isAuthenticated).toBe(false);
    });
});
