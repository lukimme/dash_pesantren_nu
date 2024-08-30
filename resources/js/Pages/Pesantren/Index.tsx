import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps, PermissionsHandler, Pesantren } from '@/types';
import TablePesantren from '@/Components/table/pesantren/table-pesantren';
import { columns } from '@/Components/table/pesantren/column';

export default function Index({ auth, pesantrenData }: PageProps & { pesantrenData: Pesantren[] }) {
    const page: { props: { can: PermissionsHandler } } = usePage();
    const userPermissions = page.props.can

    const pesantrenDatawithUserPermissions = pesantrenData.map((pesantren) => ({
        ...pesantren,
        userPermissions
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Pesantren</h2>}
        >
            <Head title="Pesantren" />

            <div className="sm:flex sm:items-center">
                <div className="space-y-1 sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Pesantren List
                    </h1>
                    <p className="text-sm text-gray-700">
                        A list of all Pesantren.
                    </p>
                </div>

                {page.props.can.pesantren_create &&
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            href={route("pesantren.create")}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Add Pesantren
                        </Link>
                    </div>
                }
            </div>
            <div>
                <TablePesantren columns={columns} data={pesantrenDatawithUserPermissions} />
            </div>
        </AuthenticatedLayout>
    );
}
