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
import { EditIcon } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { editPlant, getPlantById } from "@/actions/plant.action";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ImageUpload";

type Plant = NonNullable<Awaited<ReturnType<typeof getPlantById>>>;

interface EditDialogProps {
    plant: Plant;
}

export default function EditDialog({ plant }: EditDialogProps) {
    const [formData, setFormData] = useState({
        name: plant.name || "",
        description: plant.description || "",
        category: plant.category || "",
        species: plant.species || "",
        potSize: plant.potSize || "",
        origin: plant.origin || "",
        height: plant.height?.toString() || "",
        location: plant.location || "",
        sunlight: plant.sunlight || "",
        humidityNeeds: plant.humidityNeeds || "",
        soilType: plant.soilType || "",
        fertilizerType: plant.fertilizerType || "",
        waterCycle: plant.waterCycle?.toString() || "",
        lastWatered: plant.lastWatered
            ? new Date(plant.lastWatered).toISOString().split("T")[0]
            : "",
        lastRepotted: plant.lastRepotted
            ? new Date(plant.lastRepotted).toISOString().split("T")[0]
            : "",
        notes: plant.notes || "",
        referenceLinks: plant.referenceLinks?.join(", ") || "",
        isFavorite: plant.isFavorite || false,
        isDead: plant.isDead || false,
        imageUrl: plant.imageUrl || "",
        userId: plant.userId || "",
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
            const updated = {
                ...formData,
                height: formData.height ? parseFloat(formData.height) : null,
                waterCycle: formData.waterCycle ? parseInt(formData.waterCycle) : null,
                lastWatered: formData.lastWatered ? new Date(formData.lastWatered) : null,
                lastRepotted: formData.lastRepotted ? new Date(formData.lastRepotted) : null,
                referenceLinks: formData.referenceLinks
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
            };

            const result = await editPlant(plant.id, updated);
            console.log("plant edited: ", result);
            toast.success("Plant updated successfully");
        } catch (error) {
            console.error("error updating plant", error);
            toast.error("Failed to update plant");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="secondary" className="ml-auto flex items-center gap-2 cursor-pointer" asChild>
          <span>
            <EditIcon className="w-4 h-4" />
            Edit Plant
          </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Plant</AlertDialogTitle>
                    <AlertDialogDescription>
                        Update the fields below to edit this plant.
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

                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />

                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                        id="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => handleChange("notes", e.target.value)}
                    />

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
