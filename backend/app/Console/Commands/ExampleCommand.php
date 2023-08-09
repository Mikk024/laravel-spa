<?php

namespace App\Console\Commands;

use App\Models\Image;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class ExampleCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'example:command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $image = Image::first();

        $imageExists = Storage::exists('app/' . $image->file_path);

        $this->info($imageExists);

        $this->info($image->file_path);

    }
}
