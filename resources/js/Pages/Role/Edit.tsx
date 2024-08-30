import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, Permission, Role } from '@/types';
import RoleForm from '@/Components/form/role-form';
export default function Edit({ auth, permissions, role }: PageProps & { permissions: Permission[], role: Role }) {
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Update Role</h2>}
            >
                <Head title="Dashboard" />

                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Update a Role
                        </h1>
                        <p className="space-y-1 text-sm text-gray-700">
                            Use this form to update a new Role.
                        </p>
                    </div>
                </div>

                <RoleForm permissions={permissions} role={role} />

            </AuthenticatedLayout>
        </div>
    )
}
