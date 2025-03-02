import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/car/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

  return (
    <div className="relative bg-gradient-to-r from-purple-500 to bg-purple-900 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Dive Deep into the World of Cars
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover the Stories Behind Every Car, From Specs to Legacy
        </p>

        <form onSubmit={searchHandler} className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Cars"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button type="submit" className="bg-gray-600 dark:bg-gray-700 text-white px-6 py-3 rounded-r-full hover:bg-gray-700 dark:hover:bg-purple-800">Search</Button>
        </form>
        <Button onClick={() => navigate(`/car/search?query`)} className="bg-white dark:bg-gray-800 text-purple-600 rounded-full hover:bg-gray-200">Explore Cars</Button>
      </div>
    </div>
  );
};

export default HeroSection;
