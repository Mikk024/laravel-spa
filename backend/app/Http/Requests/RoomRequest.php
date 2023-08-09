<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'total_occupancy' => ['required', 'integer', 'between:1, 50'],
            'total_bedrooms' => ['required', 'integer', 'between:1, 10'],
            'total_bathrooms' => ['required', 'integer', 'between:1, 10'],
            'address' => ['required', 'string', 'present', 'max:25', Rule::notIn(['undefined'])],
            'has_tv' => ['required'],
            'has_kitchen' => ['required'],
            'has_air_con' => ['required'],
            'has_heating' => ['required'],
            'has_internet' => ['required'],
            'price' => ['required', 'integer', 'between:10, 2000'],
            'images' => [
                Rule::when(request()->isMethod('POST'), [
                    'required', 'array', 'between:6, 16'
                ])
            ],
            'images.*' => ['file', 'image', 'max:2048']
        ];
    }

    public function messages()
    {
        return [
            'images.between' => 'You have to upload at least :min images',
            'price.between' => 'Price must be between :min$ and :max$',
            '*.between' => ':attribute must be between :min and :max',
            'address.notIn' => 'Invalid value',
            'images.0.file' => ':attribute must be a file.',
            'images.*.image' => ':attribute must be a image',
            '*.required' => 'The :attribute is required',
            '*.integer' => ':attribute must be a integer'
        ];
    }
}
