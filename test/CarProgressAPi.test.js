import { carProgressApi } from "@/features/api/carProgressApi";
import { setupApiStore } from "@reduxjs/toolkit/query/react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

// Test for successful car progress fetch
test("fetches car progress data successfully", async () => {
    const apiStore = setupApiStore(carProgressApi);

    const { result } = renderWithStore(<TestComponent />, apiStore);

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data).toBeDefined();
        expect(result.current.data.status).toBe("In Progress");
    });
});

// Test for car completion mutation
test("completes car successfully", async () => {
    const apiStore = setupApiStore(carProgressApi);

    const { result } = renderWithStore(<TestComponent />, apiStore);

    // Simulate completing the car
    await result.current.completeCar({ carId: "12345" });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data.status).toBe("Completed");
});

// Utility function for rendering components with the store
function renderWithStore(component, store) {
    return render(
        <Provider store={store}>
            {component}
        </Provider>
    );
}

const TestComponent = () => {
    const { data, isLoading, isError } = carProgressApi.useGetCarProgressQuery("12345");

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching progress</p>;

    return <p>{data?.status}</p>;
};
