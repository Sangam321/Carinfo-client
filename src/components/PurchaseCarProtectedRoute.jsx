import { Navigate, useParams } from "react-router-dom";

const PurchaseCarProtectedRoute = ({ children }) => {
    const { carId } = useParams();

    // Replace the `purchased` status with a mock value or any state management logic
    const purchased = false;  // Update this as per your frontend state or logic

    return purchased ? children : <Navigate to={`/car-detail/${carId}`} />
}

export default PurchaseCarProtectedRoute;
