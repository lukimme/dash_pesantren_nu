import { Pesantren } from '@/types'
import { Link, useForm } from '@inertiajs/react'
import React, { SetStateAction } from 'react'
import InputError from '../InputError'
import { Loader } from 'lucide-react'


export default function GalleryForm({ pesantren }: { pesantren: Pesantren }) {
    const [previewImages, setPreviewImages] = React.useState<File[]>([])
    const maxFiles = 10

    const { data, setData, post, put, errors, reset, processing } = useForm({
        pesantren_id: pesantren.id,
        photos: null as File[] | null,
        video_profil: '',
        _method: 'PUT',
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > maxFiles) {
            alert(`You can only upload up to ${maxFiles} files.`)
            e.target.value = ''
            setData('photos', null)
            setPreviewImages([])
            return
        }

        const newFiles = Array.from(files || [])
        setData('photos', newFiles)

        const promises = []
        for (let file of files || []) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            promises.push(new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result)
            }))
        }

        Promise.all(promises).then(result => {
            setPreviewImages(result as SetStateAction<File[]>)
        })

    }
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post(route('pesantren.photo.update', pesantren.id))
    }
    return (
        <form className='space-y-6' onSubmit={submit}>
            <div className='flex flex-wrap justify-center gap-2 max-w-3/4'>
                {previewImages.map((image, index) => (
                    <img
                        key={index}
                        src={image instanceof File ? URL.createObjectURL(image) : image}
                        alt={`Preview ${index + 1}`}
                        className='h-32'
                    />
                ))}
            </div>
            <div className='flex justify-center'>

                <div className="w-full sm:w-1/2">
                    <label
                        className="block text-sm font-medium text-center text-gray-700"
                    >
                        Foto-foto Pesantren <span className='text-xs text-gray-400'>(Max 10 Foto, dengan ukuran max 10Mb per Foto)</span>
                    </label>
                    <input
                        disabled={processing}
                        multiple
                        onChange={handleFileChange}
                        type="file"
                        id="photos"
                        accept='image/*'
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.photos ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />

                    <InputError message={errors.photos} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-full sm:w-1/2">
                    <label
                        className="block text-sm font-medium text-center text-gray-700"
                    >
                        Link Video Profil
                    </label>
                    <input
                        disabled={processing}
                        value={data.video_profil}
                        onChange={(e) => setData('video_profil', e.target.value)}
                        type="text"
                        id="video_profil"
                        placeholder=""
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.video_profil ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.video_profil} />
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
                        : 'Save'}
                </button>
            </div>
        </form>
    )
}
