import { PermissionsHandler, Pesantren } from '@/types'
import { Link, useForm, usePage } from '@inertiajs/react';
import React from 'react'
import Tiptap from '../editor/Tiptap';
import { Loader, LoaderCircle } from 'lucide-react';

export default function PesantrenDeskripsiForm({ pesantren }: { pesantren: Pesantren }) {

    const { data, setData, put, errors, reset, processing } = useForm({
        pesantren_id: pesantren.id,
        deskripsi: pesantren.deskripsi || '',
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        put(route('pesantren.deskripsi.update', pesantren.id))
    }

    return (
        <form className='space-y-6' onSubmit={submit}>

            <div className="w-full">
                <Tiptap content={pesantren.deskripsi || ''} onChange={(richText) => setData('deskripsi', richText)} />
            </div>

            <div className="px-4 py-3 text-right sm:px-6">
                <button>
                    <Link
                        disabled={processing}
                        href={route('pesantren.index')}
                        className={`inline-flex items-center px-4 py-2 mr-4 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${processing ? "opacity-25 cursor-not-allowed" : ""}`}
                    >
                        Cancel
                    </Link>
                </button>
                <button
                    disabled={processing}
                    type="submit"
                    className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center ${processing ? "opacity-25 cursor-not-allowed" : ""}`}
                >
                    {processing
                        ? <>
                            <Loader className='w-3 h-3 mr-2 animate-spin' /> Loading...
                        </>
                        : 'Next'}
                </button>
            </div>
        </form>
    )
}
