import { useGetCarDetailWithStatusQuery } from "@/features/api/purchaseApi";

import { Navigate, useParams } from "react-router-dom";

const PurchaseCarProtectedRoute = ({ children }) => {
    const { carId } = useParams();
    const { data, isLoading } = useGetCarDetailWithStatusQuery(carId);

    if (isLoading) return <p>Loading...</p>

    return data?.purchased ? children : <Navigate to={`/car-detail/${carId}`} />
}
export default PurchaseCarProtectedRoute;