import { Pesantren } from '@/types'
import { Link } from '@inertiajs/react'
import React from 'react'
import ButtonStepsLink from '../ui/button-steps-link'

export default function StepsEdit({ pesantren }: { pesantren: Pesantren }) {
    return (
        <div className='flex items-center justify-center w-full gap-4'>
            <ButtonStepsLink
                href={route('pesantren.edit', pesantren.id)}
                active={route().current('pesantren.edit')}
            >
                Informasi Umum
            </ButtonStepsLink>
            <ButtonStepsLink
                href={route('pesantren.deskripsi.edit', pesantren.id)}
                active={route().current('pesantren.deskripsi.edit')}
            >
                Deskripsi
            </ButtonStepsLink>
            <ButtonStepsLink
                href={route('pesantren.media.edit', pesantren.id)}
                active={route().current('pesantren.media.edit')}
            >
                Sosial Media
            </ButtonStepsLink>
            <ButtonStepsLink
                href={route('pesantren.validasi.edit', pesantren.id)}
                active={route().current('pesantren.validasi.edit')}
            >
                Validasi
            </ButtonStepsLink>
            <ButtonStepsLink
                href={route('pesantren.photo.edit', pesantren.id)}
                active={route().current('pesantren.photo.edit')}
            >
                Galeri
            </ButtonStepsLink>
        </div>
    )
}
