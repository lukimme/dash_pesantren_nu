import React from 'react'
import InputError from '../InputError'
import { Link, useForm } from '@inertiajs/react'
import { Role } from '@/types'
import { User } from '@/types/user'

export default function UserForm({ dataRole, user }: { dataRole: Role[], user?: User }) {
    const selectedRoles = user?.roles.map((role) => {
        return role.id
    });
    const { data, setData, post, put, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        status: user?.status || 'active',
        roles: selectedRoles || [] as String[],
    })

    const handleSelectRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPermissions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value, 10))
        setData('roles', selectedPermissions)
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (user) {
            put(route('user.update', user.id))
        } else {
            post(route('user.store'))
        }
    }

    return (
        <form className='space-y-6' onSubmit={submit}>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        type="text"
                        id="name"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        E-mail
                    </label>
                    <input
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        type="email"
                        id="email"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.email} />
                </div>
            </div>

            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        id="password"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Confirm Password
                    </label>
                    <input
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        id="password_confirmation"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.password_confirmation} />
                </div>
            </div>

            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Status
                    </label>
                    <select
                        defaultValue={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        id="status"
                        name="status"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.status ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <InputError message={errors.status} />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Role
                    </label>
                    <select
                        defaultValue={selectedRoles?.map((role) => role.toString())}
                        multiple
                        onChange={handleSelectRole}
                        id="roles"
                        name="roles"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.roles ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    >
                        {dataRole.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>

                    <InputError message={errors.roles} />
                </div>
            </div>
            <div className="px-4 py-3 text-right sm:px-6">
                <Link
                    href={route('role.index')}
                    className="inline-flex items-center px-4 py-2 mr-4 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </div>
        </form>
    )
}
