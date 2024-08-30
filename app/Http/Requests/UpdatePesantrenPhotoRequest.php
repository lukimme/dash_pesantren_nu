<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePesantrenPhotoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pesantren_id' => ['required', 'exists:pesantrens,id'],
            'photos' => ['nullable', 'array', 'max:10'],
            'photos.*' => ['nullable', 'image', 'max:10240'],
            'video_profil' => ['nullable', 'url'],
            '_method' => ['in:PUT'],
        ];
    }
}
