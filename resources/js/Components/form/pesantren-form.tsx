import { Link, router, useForm, usePage } from "@inertiajs/react";
import InputError from "../InputError";
import { useEffect } from "react";
import slugify from "slugify";
import { User } from "@/types/user";
import { Kecamatan } from "@/Helper/kecamtan";
import { PermissionsHandler, Pesantren, Program, Tingkat } from '@/types';
import { Loader } from "lucide-react";

export default function PesantrenForm({ pesantren, users, program, tingkat }: { pesantren?: Pesantren, users: User[], program: Program[], tingkat: Tingkat[] }) {
    const page: { props: { can: PermissionsHandler } } = usePage();

    const selectedProgram = pesantren?.programs.map(program => program.id)
    const selectedTingkat = pesantren?.tingkats.map(tingkat => tingkat.id)
    function extractDate(datetimeString: Date) {
        const date = new Date(datetimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth()
            + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;

    }
    const { data, setData, post, put, errors, reset, processing } = useForm({
        user_id: pesantren?.user.id || '',
        name: pesantren?.name || '',
        slug: pesantren?.slug || '',
        alamat: pesantren?.alamat || '',
        kecamatan: pesantren?.kecamatan || '',
        pendiri: pesantren?.pendiri || '',
        pengasuh: pesantren?.pengasuh || '',
        tanggal_berdiri: pesantren ? extractDate(pesantren.tanggal_berdiri as Date) : '',
        jumlah_santri: pesantren?.jumlah_santri || '',
        gender: pesantren?.gender || '',
        program: selectedProgram || [] as String[],
        tingkat: selectedTingkat || [] as String[],
        program_unggulan: pesantren?.program_unggulan || '',
        contact: pesantren?.contact || '',
        logo: null as File | null,
        foto_sampul: null as File | null,
        _method: pesantren ? 'PUT' : 'POST',
    })
    useEffect(() => {
        const generateSlug = slugify(data.name, {
            lower: true,
            strict: true
        })
        setData('slug', generateSlug)
    }, [data.name])

    const handleSelectProgram = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProgram = Array.from(e.target.selectedOptions).map(option => option.value)
        setData('program', selectedProgram)
    }

    const handleSelectTingkat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTingkat = Array.from(e.target.selectedOptions).map(option => option.value)
        setData('tingkat', selectedTingkat)
    }


    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const formattedValue = value.startsWith('0') ? `62${value.substring(1)}` : value;
        setData('contact', formattedValue);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (pesantren) {
            post(route('pesantren.update', pesantren.id))
        } else {
            post(route('pesantren.store'))
        }
    }

    return (
        <form className="space-y-6" onSubmit={submit}>
            {page.props.can.user_set_pesantren &&
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label
                            className="block text-sm font-medium text-gray-700"
                        >
                            User
                        </label>
                        <select
                            disabled={processing}
                            id="user_id"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.user_id ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                        >
                            <option value="">Pilih user</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}

                        </select>
                        <InputError message={errors.user_id} />
                    </div>
                </div>
            }
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nama Pesantren
                    </label>
                    <input
                        disabled={processing}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        type="text"
                        id="name"
                        placeholder="Pesantren RMI NU Kota Malang"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Slug <span className='text-xs text-gray-400'>(tergenerate secara otomatis)</span>
                    </label>
                    <input
                        disabled={processing}
                        value={data.slug}
                        onChange={(e) => setData('slug', e.target.value)}
                        type="text"
                        id="slug"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.slug ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.slug} />
                </div>
            </div>

            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Alamat Lengkap
                    </label>
                    <input
                        disabled={processing}
                        value={data.alamat}
                        onChange={(e) => setData('alamat', e.target.value)}
                        type="text"
                        id="alamat"
                        placeholder="Jl. K.H. Hasyim Ashari No.21, Kauman, Kec. Klojen, Kota Malang, Jawa Timur, 65119"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.alamat ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.alamat} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Kecamatan
                    </label>
                    <select
                        disabled={processing}
                        id="kecamatan"
                        value={data.kecamatan}
                        onChange={(e) => setData('kecamatan', e.target.value)}
                        className={`block w-full px-3 capitalize py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.kecamatan ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    >
                        <option value="">Pilih Kecamatan</option>
                        {
                            Kecamatan.map((kecamatan) => (
                                <option key={kecamatan} value={kecamatan}>
                                    {kecamatan}
                                </option>
                            ))
                        }
                    </select>
                    <InputError message={errors.kecamatan} />
                </div>
            </div>

            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Pendiri <span className='text-xs text-gray-400'>(pisahkan dengan koma jika lebih dari satu)</span>
                    </label>
                    <textarea
                        disabled={processing}
                        value={data.pendiri}
                        onChange={(e) => setData('pendiri', e.target.value)}
                        id="pendiri"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.pendiri ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.pendiri} />
                </div>
                <div className="col-span-6 sm:col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Pengasuh <span className='text-xs text-gray-400'>(pisahkan dengan koma jika lebih dari satu)</span>
                    </label>
                    <textarea
                        disabled={processing}
                        value={data.pengasuh}
                        onChange={(e) => setData('pengasuh', e.target.value)}
                        id="pengasuh"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.pengasuh ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.pengasuh} />
                </div>
                <div className="col-span-6 sm:col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Tanggal Berdiri
                    </label>
                    <input
                        disabled={processing}
                        type="date"
                        value={data.tanggal_berdiri}
                        onChange={(e) => setData('tanggal_berdiri', e.target.value)}
                        id="tanggal_berdiri"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.tanggal_berdiri ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.tanggal_berdiri} />

                </div>
            </div>

            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Program Unggulan
                    </label>
                    <input
                        disabled={processing}
                        value={data.program_unggulan}
                        onChange={(e) => setData('program_unggulan', e.target.value)}
                        id="program_unggulan"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.program_unggulan ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.program_unggulan} />
                </div>
                <div className="col-span-6 sm:col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Jumlah Santri <span className='text-xs text-gray-400'>(Rata-rata dalam satu tahun)</span>
                    </label>
                    <input
                        disabled={processing}
                        value={data.jumlah_santri}
                        type="number"
                        onChange={(e) => setData('jumlah_santri', e.target.value)}
                        id="jumlah_santri"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.jumlah_santri ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.jumlah_santri} />
                </div>
                <div className="col-span-6 sm:col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Kontak yang dapat dihubungi
                    </label>
                    <input
                        disabled={processing}
                        type="number"
                        value={data.contact}
                        onChange={handleContactChange}
                        id="contact"
                        placeholder="6281234567890"
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.contact ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.contact} />
                </div>
            </div>

            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Gender
                    </label>
                    <select
                        disabled={processing}
                        id="gender"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.gender ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    >
                        <option value="">Pilih Gender</option>
                        <option value="putra">Putra</option>
                        <option value="putri">Putri</option>
                        <option value="putra_putri">Putra & Putri</option>
                    </select>
                    <InputError message={errors.gender} />
                </div>

                <div className="col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Program <span className='text-xs text-gray-400'>(Tahan tombol ctrl/cmd utnuk memilih lebih dari 1)</span>
                    </label>
                    <select
                        disabled={processing}
                        id="program"
                        defaultValue={selectedProgram?.map((program) => program.toString())}
                        multiple
                        onChange={handleSelectProgram}
                        className={`block w-full h-16 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.program ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    >
                        {program.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}

                    </select>
                    <InputError message={errors.program} />
                </div>

                <div className="col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Tingkat <span className='text-xs text-gray-400'>(Tahan tombol ctrl/cmd utnuk memilih lebih dari 1)</span>
                    </label>
                    <select
                        disabled={processing}
                        id="tingkat"
                        multiple
                        defaultValue={selectedTingkat?.map((tingkat) => tingkat.toString())}
                        onChange={handleSelectTingkat}
                        className={`block w-full h-24 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.tingkat ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    >
                        {tingkat.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}

                    </select>
                    <InputError message={errors.gender} />
                </div>
            </div>

            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Logo <span className='text-xs text-gray-400'>(berlatar belakang transparan dan berformat .png)</span>
                    </label>
                    <input
                        disabled={processing}
                        type="file"
                        id="logo"
                        accept=".png"
                        onChange={(e) => setData('logo', e.target.files ? e.target.files[0] : null)}
                        className={`block w-full px-3 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.logo ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.logo} />

                </div>
                <div className="col-span-3">
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        Foto Sampul <span className='text-xs text-gray-400'>(Disarankan foto bangunan atau kegiatan terbaik)</span>
                    </label>
                    <input
                        disabled={processing}
                        type="file"
                        id="foto_sampul"
                        accept="image/*"
                        onChange={(e) => setData('foto_sampul', e.target.files ? e.target.files[0] : null)}
                        className={`block w-full px-3 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.foto_sampul ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <InputError message={errors.foto_sampul} />
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
                        : pesantren ? 'Next' : 'Create'}
                </button>
            </div>
        </form>
    )
}
