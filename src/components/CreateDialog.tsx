import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { createPlant } from "@/actions/plant.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

export default function CreateDialog() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        species: "",
        potSize: "",
        origin: "",
        height: "",
        location: "",
        sunlight: "",
        humidityNeeds: "",
        soilType: "",
        fertilizerType: "",
        waterCycle: "",
        lastWatered: "",
        lastRepotted: "",
        notes: "",
        referenceLinks: "",
        isFavorite: false,
        isDead: false,
        imageUrl: "",
        userId: "",
    });

    const handleChange = (field: string, value: string | number | boolean) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.category || !formData.location || !formData.waterCycle) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const formatted = {
                ...formData,
                height: formData.height ? parseFloat(formData.height as string) : null,
                waterCycle: formData.waterCycle ? parseInt(formData.waterCycle as string) : null,
                lastWatered: formData.lastWatered ? new Date(formData.lastWatered) : null,
                lastRepotted: formData.lastRepotted ? new Date(formData.lastRepotted) : null,
                referenceLinks: formData.referenceLinks
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
            };
            const newPlant = await createPlant(formatted);
            console.log("plant created: ", newPlant);
            toast.success("Plant created successfully");
        } catch (error) {
            console.error("error creating plant", error);
            toast.error("Failed to create plant");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="default"
                    className="ml-auto font-bold flex items-center gap-2"
                    asChild
                >
                    <span>
                        <Sprout className="w-4 h-4" />
                        Add Plant
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add a Plant</AlertDialogTitle>
                    <AlertDialogDescription>
                        Fill out the form below to add a new plant to your inventory.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="category">Category *</Label>
                            <Combobox
                                value={formData.category}
                                onChange={(val) => handleChange("category", val)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="species">Species</Label>
                            <Input
                                id="species"
                                value={formData.species}
                                onChange={(e) => handleChange("species", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="potSize">Pot Size</Label>
                            <Input
                                id="potSize"
                                value={formData.potSize}
                                onChange={(e) => handleChange("potSize", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input
                                id="height"
                                type="number"
                                value={formData.height}
                                onChange={(e) => handleChange("height", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location *</Label>
                            <Input
                                id="location"
                                value={formData.location}
                                onChange={(e) => handleChange("location", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="sunlight">Sunlight</Label>
                            <Input
                                id="sunlight"
                                value={formData.sunlight}
                                onChange={(e) => handleChange("sunlight", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="humidityNeeds">Humidity</Label>
                            <Input
                                id="humidityNeeds"
                                value={formData.humidityNeeds}
                                onChange={(e) => handleChange("humidityNeeds", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="soilType">Soil Type</Label>
                            <Input
                                id="soilType"
                                value={formData.soilType}
                                onChange={(e) => handleChange("soilType", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="fertilizerType">Fertilizer</Label>
                            <Input
                                id="fertilizerType"
                                value={formData.fertilizerType}
                                onChange={(e) => handleChange("fertilizerType", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="waterCycle">Water Cycle (days) *</Label>
                            <Input
                                id="waterCycle"
                                type="number"
                                value={formData.waterCycle}
                                onChange={(e) => handleChange("waterCycle", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastWatered">Last Watered</Label>
                            <Input
                                id="lastWatered"
                                type="date"
                                value={formData.lastWatered}
                                onChange={(e) => handleChange("lastWatered", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastRepotted">Last Repotted</Label>
                            <Input
                                id="lastRepotted"
                                type="date"
                                value={formData.lastRepotted}
                                onChange={(e) => handleChange("lastRepotted", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="origin">Origin</Label>
                            <Input
                                id="origin"
                                value={formData.origin}
                                onChange={(e) => handleChange("origin", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="referenceLinks">Reference Links (comma-separated)</Label>
                            <Input
                                id="referenceLinks"
                                value={formData.referenceLinks}
                                onChange={(e) => handleChange("referenceLinks", e.target.value)}
                            />
                        </div>
                    </div>

                    <Label htmlFor="description" className="mt-4 block">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="Type your message here."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />

                    <Label htmlFor="notes" className="mt-4 block">
                        Notes
                    </Label>
                    <Textarea
                        id="notes"
                        placeholder="Additional notes"
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => handleChange("notes", e.target.value)}
                    />

                    {/*Image Upload*/}
                    <div className="py-5">
                        <ImageUpload
                            endpoint="postImage"
                            value={formData.imageUrl}
                            onChange={(url) => handleChange("imageUrl", url)}
                        />
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">Submit</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
