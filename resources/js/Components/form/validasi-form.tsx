import { Pesantren } from '@/types'
import { Link, useForm } from '@inertiajs/react'
import React from 'react'
import InputError from '../InputError'
import { Loader } from 'lucide-react'


export default function ValidasiForm({ pesantren }: { pesantren: Pesantren }) {
    const { data, setData, post, put, errors, reset, processing } = useForm({
        pesantren_id: pesantren.id,
        kemenag: null as File | null,
        rmi: null as File | null,
        _method: 'PUT',
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post(route('pesantren.validasi.update', pesantren.id))
    }

    return (
        <form className='space-y-6' onSubmit={submit}>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Kementerian Agama
                    </label>
                    <input
                        disabled={processing}
                        onChange={(e) => setData('kemenag', e.target.files ? e.target.files[0] : null)}
                        type="file"
                        id="kemenag"
                        accept='application/pdf'
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.kemenag ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.kemenag} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        RMI NU
                    </label>
                    <input
                        disabled={processing}
                        onChange={(e) => setData('rmi', e.target.files ? e.target.files[0] : null)}
                        type="file"
                        id="rmi"
                        accept='application/pdf'
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.rmi ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.rmi} />
                </div>
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
