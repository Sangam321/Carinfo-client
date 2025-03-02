import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CarTab from "./CarTab";

const EditCar = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding car
        </h1>
        <Link to="lecture">
          <Button className="hover:text-blue-600" variant="link">Go to Cars page</Button>
        </Link>
      </div>
      <CarTab />
    </div>
  );
};

export default EditCar;
