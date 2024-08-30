import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Pesantren } from '@/types';
import { User } from '@/types/user';
import { Program, Tingkat } from '@/types';
import MediaForm from '@/Components/form/media-form';
import ValidasiForm from '@/Components/form/validasi-form';
import StepsEdit from '@/Components/partial/steps-edit';
import GalleryForm from '@/Components/form/gallery-form';

export default function EditPhoto({ auth, pesantren }: PageProps & { pesantren: Pesantren }) {
    //console.log(pesantren)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Pesantren</h2>}
        >
            <Head title="Pesantren" />

            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Edit a Pesantren
                    </h1>
                    <p className="space-y-1 text-sm text-gray-700">
                        Use this form to edit a Pesantren.
                    </p>
                </div>
            </div>

            <StepsEdit pesantren={pesantren} />

            <GalleryForm pesantren={pesantren} />

        </AuthenticatedLayout>
    );
}
