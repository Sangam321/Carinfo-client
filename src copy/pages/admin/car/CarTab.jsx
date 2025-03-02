import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCarMutation,
  useGetCarByIdQuery,
  usePublishCarMutation,
} from "@/features/api/carApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CarTab = () => {

  const [input, setInput] = useState({
    carTitle: "",
    subTitle: "",
    description: "",
    category: "",
    carLevel: "",
    carPrice: "",
    carThumbnail: "",
  });

  const params = useParams();
  const carId = params.carId;
  const { data: carByIdData, isLoading: carByIdLoading, refetch } =
    useGetCarByIdQuery(carId);

  const [publishCar, { }] = usePublishCarMutation();

  useEffect(() => {
    if (carByIdData?.car) {
      const car = carByIdData?.car;
      setInput({
        carTitle: car.carTitle,
        subTitle: car.subTitle,
        description: car.description,
        category: car.category,
        carLevel: car.carLevel,
        carPrice: car.carPrice,
        carThumbnail: "",
      });
    }
  }, [carByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCar, { data, isLoading, isSuccess, error }] =
    useEditCarMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCarLevel = (value) => {
    setInput({ ...input, carLevel: value });
  };
  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, carThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCarHandler = async () => {
    const formData = new FormData();
    formData.append("carTitle", input.carTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("carLevel", input.carLevel);
    formData.append("carPrice", input.carPrice);
    formData.append("carThumbnail", input.carThumbnail);

    await editCar({ formData, carId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCar({ carId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish car");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Car update.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update car");
    }
  }, [isSuccess, error]);

  if (carByIdLoading) return <h1>Loading...</h1>

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Car Information</CardTitle>
          <CardDescription>
            Make changes to your cars here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            disabled={!carByIdData?.car}
            variant="outline"
            onClick={() => publishStatusHandler(carByIdData?.car.isPublished ? "false" : "true")}
          >
            {carByIdData?.car.isPublished ? "Unpublished" : "Publish"}
          </Button>

          <Button>Remove Car</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="carTitle"
              value={input.carTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select
                defaultValue={input.category}
                onValueChange={selectCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Coupe">Coupe</SelectItem>
                    <SelectItem value="Hatchback">Hatchback</SelectItem>
                    <SelectItem value="Convertible">Convertible</SelectItem>
                    <SelectItem value="Pickup Truck">Pickup Truck</SelectItem>
                    <SelectItem value="Minivan">Minivan</SelectItem>
                    <SelectItem value="Wagon">Wagon</SelectItem>
                    <SelectItem value="Crossover">Crossover</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Sport">Sport</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Car Type</Label>
              <Select
                defaultValue={input.carLevel}
                onValueChange={selectCarLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a car level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Car Type</SelectLabel>
                    <SelectItem value="Sport">Sport</SelectItem>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (NPR)</Label>
              <Input
                type="number"
                name="carPrice"
                value={input.carPrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Car Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="e-64 my-2"
                alt="Car Thumbnail"
              />
            )}
          </div>
          <div>
            <Button onClick={() => navigate("/admin/car")} variant="outline">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCarHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarTab;
