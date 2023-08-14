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
        $exampleContent = 'This is an example file content.';
        $exampleFileName = 'example.txt';

        $path = Storage::disk('gcs')->put($exampleFileName, $exampleContent);

        if ($path) {
            $this->info('Example file stored in Google Cloud Storage: ' . $path);
        } else {
            $this->error('Failed to store example file in Google Cloud Storage.');
        }
    }
}
