import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function ButtonStepsLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex justify-center px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' +
                (active
                    ? ' text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700'
                    : ' text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200' +
                    className
                )
            }
        >
            {children}
        </Link>
    )
}
