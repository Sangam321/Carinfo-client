import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetCarDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Heart, PlayCircle } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CarDetail = () => {
  const params = useParams();
  const carId = params.carId;
  const { data, isLoading, isError } = useGetCarDetailWithStatusQuery(carId);
  const [isFavorited, setIsFavorited] = useState(false);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !data || !data.car) return <h1>Failed to load car details</h1>;

  const { car } = data;

  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {car?.carTitle || "No Title Available"}
          </h1>
          <p className="text-base md:text-lg">Car Sub-title</p>
          <p>
            Created By {" "}
            <span className="text-[#C0C4FC] underline italic">
              {car?.creator?.name || "Unknown Creator"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {car?.createdAt?.split("T")[0] || "N/A"}</p>
          </div>
          <p>Users bought: {car?.purchasedUsers?.length || 0}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl md:text-2xl">Description</h1>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsFavorited(!isFavorited)}>
              <p className="text-sm font-medium">Add to favourite:</p>
              <Heart size={20} className={isFavorited ? "text-red-500 fill-red-500" : "text-gray-400"} />
            </div>
          </div>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: car?.description || "No description available." }}
          />
          <Card>
            <CardHeader>
              <CardTitle>Car Features</CardTitle>
              <CardDescription>{car?.features?.length || 0} features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {car?.features?.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    <PlayCircle size={14} />
                  </span>
                  <p>{feature?.featureTitle || "Untitled Feature"}</p>
                </div>
              )) || <p>No features available.</p>}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <img src={car?.carThumbnail} alt="Car Thumbnail" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default CarDetail;