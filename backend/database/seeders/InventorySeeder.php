<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Inventory;

class InventorySeeder extends Seeder
{
    public function run()
    {
        $inventoryData = [
            [
                'location' => 'Kampala Road',
                'size' => '10x12m',
                'traffic_level' => 'High Traffic',
                'status' => 'Available'
            ],
            [
                'location' => 'Jinja Road',
                'size' => '8x10m',
                'traffic_level' => 'High Traffic',
                'status' => 'Booked'
            ],
            [
                'location' => 'Entebbe Road',
                'size' => '12x8m',
                'traffic_level' => 'High Traffic',
                'status' => 'Available'
            ],
            [
                'location' => 'Mbarara Road',
                'size' => '10x10m',
                'traffic_level' => 'Medium Traffic',
                'status' => 'Available'
            ],
            [
                'location' => 'Gulu Highway',
                'size' => '8x12m',
                'traffic_level' => 'Medium Traffic',
                'status' => 'Booked'
            ]
        ];

        foreach ($inventoryData as $item) {
            Inventory::create($item);
        }
    }
}