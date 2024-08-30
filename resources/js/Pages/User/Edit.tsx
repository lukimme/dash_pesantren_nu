import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, Role } from '@/types';
import UserForm from '@/Components/form/user-form';
import { User } from '@/types/user';

export default function Edit({ auth, dataRole, user }: PageProps & { dataRole: Role[], user: User }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create User</h2>}
        >
            <Head title="Dashboard" />

            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Create a User
                    </h1>
                    <p className="space-y-1 text-sm text-gray-700">
                        Use this form to create a new User.
                    </p>
                </div>
            </div>

            <UserForm dataRole={dataRole} user={user} />

        </AuthenticatedLayout>
    );
}
