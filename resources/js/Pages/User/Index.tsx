import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { User } from '@/types/user';
import TableUser from '@/Components/table/user/table-user';
import { columns } from '@/Components/table/user/columns';

export default function Index({ auth, users }: PageProps & { users: { data: User[] } }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">User</h2>}
        >
            <Head title="User" />

            <div className="sm:flex sm:items-center">
                <div className="space-y-1 sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                        User List
                    </h1>
                    <p className="text-sm text-gray-700">
                        A list of all Users.
                    </p>
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link
                        href={route("user.create")}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add User
                    </Link>
                </div>
            </div>
            <div>
                <TableUser columns={columns} data={users.data} />
            </div>
        </AuthenticatedLayout>
    );
}
