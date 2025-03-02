import {
  Card,
  CardContent
} from "@/components/ui/card";
import { useGetCarDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { motion } from "framer-motion";
import { BadgeInfo, BatteryCharging, Car, Cpu, Expand, Gauge, Heart, Network, RefreshCcw, Shield, Tablet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CarDetail = ({ onFavorite }) => {
  const params = useParams();
  const carId = params.carId;
  const { data, isLoading, isError } = useGetCarDetailWithStatusQuery(carId);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    if (data?.car) {
      setLikedCount(data.car.purchasedUsers?.length || 0);
      const storedFavorite = localStorage.getItem(`car_${carId}_favorite`);
      setIsFavorited(storedFavorite === 'true');
    }
  }, [data, carId]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !data || !data.car) return <h1>Failed to load car details</h1>;

  const { car } = data;

  const handleFavoriteClick = () => {
    const updatedFavoriteStatus = !isFavorited;
    setIsFavorited(updatedFavoriteStatus);

    const updatedLikedCount = updatedFavoriteStatus ? likedCount + 1 : likedCount - 1;
    setLikedCount(updatedLikedCount);

    localStorage.setItem(`car_${carId}_favorite`, updatedFavoriteStatus.toString());

    if (updatedFavoriteStatus) {
      const favoriteCars = JSON.parse(localStorage.getItem("favoriteCars")) || [];
      favoriteCars.push({
        carId,
        carTitle: car.carTitle,
        carThumbnail: car.carThumbnail,
        description: car.description,
        creator: car.creator?.name,
        createdAt: car.createdAt,
        purchasedUsers: car.purchasedUsers,
      });
      localStorage.setItem("favoriteCars", JSON.stringify(favoriteCars));
    } else {
      const favoriteCars = JSON.parse(localStorage.getItem("favoriteCars")) || [];
      const updatedFavoriteCars = favoriteCars.filter(
        (favoriteCar) => favoriteCar.carId !== carId
      );
      localStorage.setItem("favoriteCars", JSON.stringify(updatedFavoriteCars));
    }

    onFavorite(car);
  };



  const features = [
    { icon: BatteryCharging, text: "Long Range Battery" },
    { icon: Car, text: "Dual Motor All-Wheel Drive" },
    { icon: Cpu, text: "Autopilot & Full Self-Driving Capability" },
    { icon: Expand, text: "Spacious Interior with Panoramic Glass Roof" },
    { icon: Network, text: "Tesla Supercharging Network" },
    { icon: Tablet, text: "15-inch Touchscreen Interface" },
    { icon: Gauge, text: "Performance Mode (0-60 mph in 3.5 seconds)" },
    { icon: RefreshCcw, text: "Over-the-Air Software Updates" },
    { icon: Shield, text: "Enhanced Safety Features" },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
          <h1 className="font-bold text-2xl md:text-3xl">{car?.carTitle || "No Title Available"}</h1>
          <p>Created By <span className="text-[#C0C4FC] underline italic">{car?.creator?.name || "Unknown Creator"}</span></p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {car?.createdAt?.split("T")[0] || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl md:text-2xl">Car Features</h1>
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleFavoriteClick}>
              <p className="text-lg font-semibold ">Add to favourite:</p>
              <motion.div animate={{ scale: isFavorited ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
                <Heart size={30} className={isFavorited ? "text-red-500 fill-red-500" : "text-gray-400"} />
              </motion.div>
            </div>
          </div>
          <Card>
            <CardContent className="flex flex-col justify-end h-full pb-8">
              <ul className="space-y-3">
                {features.map(({ icon: Icon, text }, index) => (
                  <li key={index} className="flex items-center gap-3 text-lg font-semibold">
                    <Icon size={24} className="text-blue-500" />
                    {text}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

        </div>

        <div className="w-full lg:w-2/3 ml-4">
          <img src={car?.carThumbnail} alt="Car Thumbnail" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default CarDetail;