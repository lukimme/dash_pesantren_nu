import { PesantrenWithUserPermissions } from "@/types";
import { Link, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";

function deletePesantren(id: string) {
    if (confirm("Are you sure you want to delete this Pesantren?")) {
        router.delete(route("pesantren.destroy", id), {
            preserveScroll: true
        });
    }
}

export const columns: ColumnDef<PesantrenWithUserPermissions>[] = [
    {
        accessorKey: "id",
        header: "No",
        cell: ({ row }) => row.index + 1,

    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "alamat",
        header: "Alamat",
    },
    {
        accessorKey: "kecamatan",
        header: "Kecamatan",
    },
    {
        accessorKey: "programs",
        header: "Program",
        cell: ({ row }) => {
            return (
                <div className="flex flex-wrap gap-2">
                    {row.original.programs.map((program) => (
                        <div key={program.id} className="p-1 rounded-md bg-slate-200 w-fit">
                            {program.name}
                        </div>
                    ))}
                </div>
            );
        }
    },
    {
        accessorKey: "tingkats",
        header: "Tingkat",
        cell: ({ row }) => {
            return (
                <div className="flex flex-wrap gap-2">
                    {row.original.tingkats.map((tingkat) => (
                        <div key={tingkat.id} className="p-1 rounded-md bg-slate-200 w-fit">
                            {tingkat.name}
                        </div>
                    ))}
                </div>
            );
        }
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const id = row.original.id;
            const userPermissions = row.original.userPermissions;
            return (
                <div className="flex items-center justify-center gap-2">
                    {userPermissions.pesantren_show &&
                        <Link
                            href={route("pesantren.show", id)}
                            className="inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-green-400 border border-transparent rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 sm:w-auto"
                        >
                            <Eye className="w-4 h-4" />
                        </Link>
                    }
                    {userPermissions.pesantren_edit &&
                        <Link
                            href={route("pesantren.edit", id)}
                            className="inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-yellow-400 border border-transparent rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 sm:w-auto"
                        >
                            <Pencil className="w-4 h-4" />
                        </Link>
                    }
                    {userPermissions.pesantren_delete &&
                        <button
                            onClick={() => deletePesantren(id)}
                            className="inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    }
                </div>
            );
        },
    }
]