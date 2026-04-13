<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PortfolioItem;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $portfolioItems = [
            // BILLBOARDS
            [
                'title' => 'Gentex Billboard Campaign',
                'category' => 'billboards',
                'description' => 'Strategic billboard placement along airport road for maximum visibility',
                'image_path' => 'images/portfolio/billboards/Gentex-Billboard along airport road.JPG',
                'image_url' => '/images/portfolio/billboards/Gentex-Billboard along airport road.JPG',
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'title' => 'Next Rides Billboard',
                'category' => 'billboards',
                'description' => 'High-traffic billboard placement in Bukoto area',
                'image_path' => 'images/portfolio/billboards/next_rides-billboard-bukoto.jpg',
                'image_url' => '/images/portfolio/billboards/next_rides-billboard-bukoto.jpg',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'title' => 'StarTimes Billboard Campaign',
                'category' => 'billboards',
                'description' => 'Premium billboard advertising along Entebbe road',
                'image_path' => 'images/portfolio/billboards/startimes-billboard-entebbe.JPG',
                'image_url' => '/images/portfolio/billboards/startimes-billboard-entebbe.JPG',
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'title' => 'Stanbic Bank Billboard',
                'category' => 'billboards',
                'description' => 'Premium billboard advertising along Entebbe road',
                'image_path' => 'images/portfolio/billboards/double_decker.jpg',
                'image_url' => '/images/portfolio/billboards/double_decker.jpg',
                'is_active' => true,
                'sort_order' => 4
            ],

            // LED SCREENS
            [
                'title' => 'LED Screen Installation',
                'category' => 'led-screens',
                'description' => 'Digital LED screen installation in Kamwokya commercial area',
                'image_path' => 'images/portfolio/led-screens/LED-screens-kamwokya.jpg',
                'image_url' => '/images/portfolio/led-screens/LED-screens-kamwokya.jpg',
                'is_active' => true,
                'sort_order' => 5
            ],

            // WALL BRANDING
            [
                'title' => 'MTN Service Center Branding',
                'category' => 'wall-branding',
                'description' => 'Complete wall branding for MTN service center',
                'image_path' => 'images/portfolio/wall-branding/mtn-service_center.jpg',
                'image_url' => '/images/portfolio/wall-branding/mtn-service_center.jpg',
                'is_active' => true,
                'sort_order' => 6
            ],
            [
                'title' => 'StarTimes Wall Branding',
                'category' => 'wall-branding',
                'description' => 'Large-scale wall branding installation for StarTimes',
                'image_path' => 'images/portfolio/wall-branding/startimes-wallbranding.jpg',
                'image_url' => '/images/portfolio/wall-branding/startimes-wallbranding.jpg',
                'is_active' => true,
                'sort_order' => 7
            ],
            [
                'title' => 'Lugogo MTN Wall Branding',
                'category' => 'wall-branding',
                'description' => 'Complete wall branding for the MTN wall, Lugogo',
                'image_path' => 'images/portfolio/wall-branding/mtn_wall_lugogo.jpg',
                'image_url' => '/images/portfolio/wall-branding/mtn_wall_lugogo.jpg',
                'is_active' => true,
                'sort_order' => 8
            ],

            // AUTOMOBILE BRANDING
            [
                'title' => 'Gentex Vehicle Branding',
                'category' => 'automobile-branding',
                'description' => 'Professional vehicle branding for Gentex automobile fleet',
                'image_path' => 'images/portfolio/automobile-branding/gentex_automobile.jpg',
                'image_url' => '/images/portfolio/automobile-branding/gentex_automobile.jpg',
                'is_active' => true,
                'sort_order' => 9
            ],
            [
                'title' => 'StarTimes Vehicle Branding',
                'category' => 'automobile-branding',
                'description' => 'Complete vehicle wrap for StarTimes mobile advertising',
                'image_path' => 'images/portfolio/automobile-branding/startimes_automobile.jpg',
                'image_url' => '/images/portfolio/automobile-branding/startimes_automobile.jpg',
                'is_active' => true,
                'sort_order' => 10
            ],
            [
                'title' => 'Vehicle Branding Campaign',
                'category' => 'automobile-branding',
                'description' => 'Professional automobile branding for enhanced mobile visibility',
                'image_path' => 'images/portfolio/automobile-branding/72_automobile.jpg',
                'image_url' => '/images/portfolio/automobile-branding/72_automobile.jpg',
                'is_active' => true,
                'sort_order' => 11
            ],

            // SIGNAGE
            [
                'title' => 'KCB Bank Signage',
                'category' => 'signage',
                'description' => 'Professional banking signage installation for KCB',
                'image_path' => 'images/portfolio/signage/KCB-signage.JPG',
                'image_url' => '/images/portfolio/signage/KCB-signage.JPG',
                'is_active' => true,
                'sort_order' => 12
            ],
            [
                'title' => 'Gentex Fountain Signage',
                'category' => 'signage',
                'description' => '3D fabricated signage for Gentex',
                'image_path' => 'images/portfolio/signage/fabrication.jpg',
                'image_url' => '/images/portfolio/signage/fabrication.jpg',
                'is_active' => true,
                'sort_order' => 13
            ],
            [
                'title' => 'Total Energies Signage',
                'category' => 'signage',
                'description' => 'Branded signage installation for Total Energies station',
                'image_path' => 'images/portfolio/signage/total-signage.jpg',
                'image_url' => '/images/portfolio/signage/total-signage.jpg',
                'is_active' => true,
                'sort_order' => 14
            ],
            [
                'title' => '72 Restaurant Signage',
                'category' => 'signage',
                'description' => 'Branded signage installation for 72 restaurant',
                'image_path' => 'images/portfolio/signage/72_signage.jpg',
                'image_url' => '/images/portfolio/signage/72_signage.jpg',
                'is_active' => true,
                'sort_order' => 15
            ],

            // STREET POLES
            [
                'title' => 'Street Pole Campaign - Lugogo',
                'category' => 'street-poles',
                'description' => 'Strategic street pole advertising in Lugogo bypass area',
                'image_path' => 'images/portfolio/street-poles/street-poles-lugogo.JPG',
                'image_url' => '/images/portfolio/street-poles/street-poles-lugogo.JPG',
                'is_active' => true,
                'sort_order' => 16
            ],
            [
                'title' => 'Street Pole Network',
                'category' => 'street-poles',
                'description' => 'Comprehensive street pole advertising network across Kampala',
                'image_path' => 'images/portfolio/street-poles/Street-poles.jpg',
                'image_url' => '/images/portfolio/street-poles/Street-poles.jpg',
                'is_active' => true,
                'sort_order' => 17
            ]
        ];

        foreach ($portfolioItems as $item) {
            PortfolioItem::create($item);
        }
    }
}