"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Search, X} from "lucide-react";
import {useState} from "react";
import {Combobox} from "@/components/ui/combo-box";
import {getPlants} from "@/actions/plant.action";
import { useRouter } from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton";
import CreateDialog from "@/components/CreateDialog";
import EditDialog from "@/components/EditDialog";
import DeleteDialog from "@/components/DeleteDialog";

type Plants = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
    plants: Plants;
}

export default function InventoryTable({ plants }: InventoryTableProps) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPlants = plants?.userPlants?.filter((plant) => {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
            plant.name?.toLowerCase().includes(term) ||
            plant.nickname?.toLowerCase().includes(term) ||
            plant.potSize?.toLowerCase().includes(term) ||
            plant.location?.toLowerCase().includes(term) ||
            (plant.height !== null && plant.height?.toString().includes(term));

        const matchesCategory =
            selectedCategory === "" || plant.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (!plants) {
        return (
            <div className="w-full space-y-4">
                <div className="flex items-center gap-2 py-4">
                    <Skeleton className="h-10 w-full max-w-sm" />
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                            <TableHead className="text-right">
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 py-4">
                <div className="relative max-w-sm w-full">
                    <Input
                        placeholder="Filter plants..."
                        className="pl-10 pr-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />

                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => setSearchTerm("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
                            aria-label="Clear search">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <Combobox value={selectedCategory} onChange={value => setSelectedCategory(value)} />
                <CreateDialog />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Spitzname</TableHead>
                        <TableHead>Topfgröße</TableHead>
                        <TableHead>Standort</TableHead>
                        <TableHead>Höhe (cm)</TableHead>
                        <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPlants?.map((plant) => {
                        const slugifiedName = plant.name.toLowerCase().replace(/\s+/g, "-");
                        const slug = `${plant.id}--${slugifiedName}`;
                        const plantUrl = `/plants/${slug}`;

                        return (
                            <TableRow key={plant.id} onClick={() => router.push(plantUrl)}
                              className="cursor-pointer hover:bg-muted/40 transition-colors">
                                <TableCell>{plant.name}</TableCell>
                                <TableCell>{plant.nickname ?? "—"}</TableCell>
                                <TableCell>{plant.potSize ?? "—"}</TableCell>
                                <TableCell>{plant.location ?? "—"}</TableCell>
                                <TableCell>{plant.height ?? "—"}</TableCell>
                                <TableCell className="text-right">
                                    <div
                                        className="flex justify-end space-x-4"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <EditDialog plant={plant} />
                                        <DeleteDialog plant={plant} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
