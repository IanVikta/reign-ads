<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use App\Models\ProjectCategory;
use App\Models\Project;
use App\Models\Client;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@reignads.co.ug',
            'password' => Hash::make('password'),
        ]);

        // Services
        $services = [
            ['name' => 'Out-of-Home Advertising', 'slug' => 'ooh-advertising', 'description' => 'Spectacular billboards and street poles across East Africa.'],
            ['name' => 'Branding', 'slug' => 'branding', 'description' => 'Automobile, wall, and office branding solutions for maximum visibility.'],
            ['name' => 'Fabrication', 'slug' => 'fabrication', 'description' => '3D signage and spectacular billboard structures.'],
            ['name' => 'Printing', 'slug' => 'printing', 'description' => 'High-quality large format printing for all corporate needs.'],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        // Project Categories
        $cat1 = ProjectCategory::create(['name' => 'Billboards', 'slug' => 'billboards']);
        $cat2 = ProjectCategory::create(['name' => 'Signage', 'slug' => 'signage']);

        // Projects
        Project::create([
            'title' => 'Kampala Road Spectacular',
            'slug' => 'kampala-road-spectacular',
            'description' => 'Innovative LED billboard at the heart of Kampala.',
            'project_category_id' => $cat1->id,
            'is_featured' => true
        ]);

        // Clients
        Client::create([
            'name' => 'MTN Uganda',
            'logo_path' => '/assets/clients/mtn.png',
            'is_featured' => true
        ]);
    }
}
