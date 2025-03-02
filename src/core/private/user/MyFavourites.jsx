import React from "react";
import { Link } from "react-router-dom"; // Assuming you might want to link to the car detail page

const MyFavourites = () => {
  // Retrieve the list of favorited cars from localStorage
  const favoriteCars = JSON.parse(localStorage.getItem("favoriteCars")) || [];

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY Favourites</h1>
      <div className="my-5">
        {favoriteCars.length === 0 ? (
          <p>You have not added any cars to your favourites.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favoriteCars.map((car, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <Link to={`/car/${car.carId}`} className="block">
                  {/* Car Thumbnail */}
                  <img
                    src={car.carThumbnail}
                    alt={car.carTitle}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h2 className="mt-2 text-lg font-semibold text-gray-800">{car.carTitle}</h2>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavourites;
