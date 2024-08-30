import { Pesantren } from '@/types'
import { Link, useForm } from '@inertiajs/react'
import React from 'react'
import InputError from '../InputError'
import { Loader } from 'lucide-react'

export default function MediaForm({ pesantren }: { pesantren: Pesantren }) {
    const { data, setData, put, errors, reset, processing } = useForm({
        pesantren_id: pesantren.id,
        facebook: pesantren.media?.facebook || '',
        instagram: pesantren.media?.instaram || '',
        youtube: pesantren.media?.youtube || '',
        tiktok: pesantren.media?.tiktok || '',
        twitter: pesantren.media?.twitter || '',
        website: pesantren.media?.website || '',
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        put(route('pesantren.media.update', pesantren.id))
    }

    return (
        <form className='space-y-6' onSubmit={submit}>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Facebook
                    </label>
                    <input
                        disabled={processing}
                        value={data.facebook}
                        onChange={(e) => setData('facebook', e.target.value)}
                        type="text"
                        id="facebook"
                        placeholder=""
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.facebook ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.facebook} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Instagram
                    </label>
                    <input
                        disabled={processing}
                        value={data.instagram}
                        onChange={(e) => setData('instagram', e.target.value)}
                        type="text"
                        id="instagram"
                        placeholder=""
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.instagram ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.instagram} />
                </div>
            </div>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Youtube
                    </label>
                    <input
                        disabled={processing}
                        value={data.youtube}
                        onChange={(e) => setData('youtube', e.target.value)}
                        type="text"
                        id="youtube"
                        placeholder=""
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.youtube ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.youtube} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Tiktok
                    </label>
                    <input
                        disabled={processing}
                        value={data.tiktok}
                        onChange={(e) => setData('tiktok', e.target.value)}
                        type="text"
                        id="tiktok"
                        placeholder=""
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.tiktok ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.tiktok} />
                </div>
            </div>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Twitter
                    </label>
                    <input
                        disabled={processing}
                        value={data.twitter}
                        onChange={(e) => setData('twitter', e.target.value)}
                        type="text"
                        id="twitter"
                        placeholder=""
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.twitter ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.twitter} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Website
                    </label>
                    <input
                        disabled={processing}
                        value={data.website}
                        onChange={(e) => setData('website', e.target.value)}
                        type="text"
                        id="website"
                        placeholder=""
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.website ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.website} />
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
