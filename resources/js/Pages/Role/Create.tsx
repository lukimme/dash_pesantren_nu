import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, Permission } from '@/types';
import RoleForm from '@/Components/form/role-form';
export default function Create({ auth, permissions }: PageProps & { permissions: Permission[] }) {
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Role</h2>}
            >
                <Head title="Dashboard" />

                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Create a Role
                        </h1>
                        <p className="space-y-1 text-sm text-gray-700">
                            Use this form to create a new Role.
                        </p>
                    </div>
                </div>

                <RoleForm permissions={permissions} />

            </AuthenticatedLayout>
        </div>
    )
}
