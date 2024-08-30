import { Role } from "@/types/role";
import { Link, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

function deleteRole(id: number) {
    if (confirm("Are you sure you want to delete this role?")) {
        router.delete(route("role.destroy", id), {
            preserveScroll: true
        });
    }
}

export const columns: ColumnDef<Role>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "permissions",
        header: "Permissions",
        cell: ({ row }) => {
            return (
                <div className="flex flex-wrap gap-2">
                    {row.original.permissions.map((permission) => (
                        <div key={permission.id} className="p-1 rounded-md bg-slate-200 w-fit">
                            {permission.name}
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
            return (
                <div className="flex items-center justify-center gap-2">
                    <Link
                        href={route("role.edit", { id })}
                        className="inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-yellow-400 border border-transparent rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 sm:w-auto"
                    >
                        <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={() => deleteRole(id)}
                        className="inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            );
        },
    }
];


