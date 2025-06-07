import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPlantById } from "@/actions/plant.action";

type Plant = Awaited<ReturnType<typeof getPlantById>>;

interface PlantCardProps {
    plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
    if (!plant) {
        return <div>Plant data is not available.</div>;
    }

    return (
        <Card className="max-w">
            <div className="flex flex-row">
                {/* Bild links */}
                <div className="basis-2/4">
                    <CardHeader>
                        {plant.imageUrl && (
                            <div className="rounded-lg overflow-hidden">
                                <img
                                    src={plant.imageUrl}
                                    alt={plant.name}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}
                    </CardHeader>
                </div>

                {/* Infos rechts */}
                <div className="basis-2/4 flex flex-col justify-between">
                    <CardContent className="mt-8 space-y-2">
                        <CardTitle className="text-4xl font-bold">{plant.name}</CardTitle>

                        {plant.nickname && (
                            <CardDescription>Nickname: {plant.nickname}</CardDescription>
                        )}

                        {plant.category && <Badge>{plant.category}</Badge>}

                        {plant.species && (
                            <CardDescription>Species: {plant.species}</CardDescription>
                        )}
                        {plant.potSize && (
                            <CardDescription>Pot Size: {plant.potSize}</CardDescription>
                        )}
                        {plant.height && (
                            <CardDescription>Height: {plant.height} cm</CardDescription>
                        )}
                        {plant.location && (
                            <CardDescription>Location: {plant.location}</CardDescription>
                        )}
                        {plant.sunlight && (
                            <CardDescription>Sunlight: {plant.sunlight}</CardDescription>
                        )}
                        {plant.humidityNeeds && (
                            <CardDescription>
                                Humidity: {plant.humidityNeeds}
                            </CardDescription>
                        )}
                        {plant.soilType && (
                            <CardDescription>Soil: {plant.soilType}</CardDescription>
                        )}
                        {plant.fertilizerType && (
                            <CardDescription>
                                Fertilizer: {plant.fertilizerType}
                            </CardDescription>
                        )}
                        {plant.waterCycle && (
                            <CardDescription>
                                Water every {plant.waterCycle} day(s)
                            </CardDescription>
                        )}
                        {plant.lastWatered && (
                            <CardDescription>
                                Last watered: {new Date(plant.lastWatered).toLocaleDateString()}
                            </CardDescription>
                        )}
                        {plant.lastRepotted && (
                            <CardDescription>
                                Last repotted:{" "}
                                {new Date(plant.lastRepotted).toLocaleDateString()}
                            </CardDescription>
                        )}
                        {plant.origin && (
                            <CardDescription>Origin: {plant.origin}</CardDescription>
                        )}

                        {plant.referenceLinks?.length > 0 && (
                            <CardDescription className="flex flex-col gap-1">
                                References:
                                {plant.referenceLinks.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link}
                                        className="text-blue-400 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </CardDescription>
                        )}

                        {plant.notes && (
                            <CardDescription>Notes: {plant.notes}</CardDescription>
                        )}
                    </CardContent>
                </div>
            </div>
        </Card>
    );
}
