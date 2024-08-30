import { PermissionsHandler } from "./permissions-handler";
import { Program } from "./program";
import { SocialMedia } from "./social-media";
import { Tingkat } from "./tingkat";
import { User } from "./user";
import { Validasi } from "./validasi";

export interface Pesantren {
    user_id: User
    id: string;
    name: string;
    slug: string;
    alamat: string | null;
    kecamatan: string | null;
    pendiri: string | null;
    pengasuh: string | null;
    tanggal_berdiri: Date | null;
    deskripsi: string | null;
    jumlah_santri: number | null;
    program_unggulan: string | null;
    logo: string | null | File;
    contact: number | null;
    gender: 'putra' | 'putri' | 'putra_putri' | null;
    video_profil: string | null;
    foto_sampul: string | null | File;
    user: User;
    programs: Program[];
    tingkats: Tingkat[];
    media: SocialMedia;
    validasi: Validasi[];
}

export interface PesantrenWithUserPermissions extends Pesantren {
    userPermissions: PermissionsHandler;
}