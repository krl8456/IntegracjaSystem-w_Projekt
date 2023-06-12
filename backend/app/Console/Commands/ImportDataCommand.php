<?php

namespace App\Console\Commands;

use App\Models\ConsumerProduct;
use App\Models\NonConsumerProduct;
use App\Models\Event;

use Illuminate\Console\Command;

class ImportDataCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'data:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import data from JSON file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $filePathToConsumer = storage_path('app/data_consumer_products.json');
        $jsonStringWithConsumer = file_get_contents($filePathToConsumer);
        $consumerData = json_decode($jsonStringWithConsumer, true);

        $filePathToNonConsumer = storage_path('app/data_non_consumer_products.json');
        $jsonStringWithNonConsumer = file_get_contents($filePathToNonConsumer);
        $nonConsumerData = json_decode($jsonStringWithNonConsumer, true);

        $filePathToEvents = storage_path('app/events.json');
        $jsonStringWithEvents = file_get_contents($filePathToEvents);
        $eventData = json_decode($jsonStringWithEvents, true);

        foreach ($consumerData as $item) {
            ConsumerProduct::create([
                'Zmienna' => $item['Zmienna'],
                'Typ informacji' => $item['Typ informacji'],
                'Towary żywnościowe' => $item['Towary żywnościowe'],
                'Jednostka terytorialna' => $item['Jednostka terytorialna'],
                '2021 M01' => $item['2021 M01'],
                '2021 M02' => $item['2021 M02'],
                '2021 M03' => $item['2021 M03'],
                '2021 M04' => $item['2021 M04'],
                '2021 M05' => $item['2021 M05'],
                '2021 M06' => $item['2021 M06'],
                '2021 M07' => $item['2021 M07'],
                '2021 M08' => $item['2021 M08'],
                '2021 M09' => $item['2021 M09'],
                '2021 M10' => $item['2021 M10'],
                '2021 M11' => $item['2021 M11'],
                '2021 M12' => $item['2021 M12'],
                '2022 M01' => $item['2022 M01'],
                '2022 M02' => $item['2022 M02'],
                '2022 M03' => $item['2022 M03'],
                '2022 M04' => $item['2022 M04'],
                '2022 M05' => $item['2022 M05'],
                '2022 M06' => $item['2022 M06'],
                '2022 M07' => $item['2022 M07'],
                '2022 M08' => $item['2022 M08'],
                '2022 M09' => $item['2022 M09'],
                '2022 M10' => $item['2022 M10'],
                '2022 M11' => $item['2022 M11'],
                '2022 M12' => $item['2022 M12'],
                '2023 M01' => $item['2023 M01'],
                '2023 M02' => $item['2023 M02'],
                '2023 M03' => $item['2023 M03'],
                '2023 M04' => $item['2023 M04'],
            ]);
        }


        foreach ($nonConsumerData as $item) {
            NonConsumerProduct::create([
                'Zmienna' => $item['Zmienna'],
                'Typ informacji' => $item['Typ informacji'],
                'Towary nieżywnościowe i usługi konsumpcyjne' => $item['Towary nieżywnościowe i usługi konsumpcyjne'],
                'Jednostka terytorialna' => $item['Jednostka terytorialna'],
                '2021 M01' => $item['2021 M01'],
                '2021 M02' => $item['2021 M02'],
                '2021 M03' => $item['2021 M03'],
                '2021 M04' => $item['2021 M04'],
                '2021 M05' => $item['2021 M05'],
                '2021 M06' => $item['2021 M06'],
                '2021 M07' => $item['2021 M07'],
                '2021 M08' => $item['2021 M08'],
                '2021 M09' => $item['2021 M09'],
                '2021 M10' => $item['2021 M10'],
                '2021 M11' => $item['2021 M11'],
                '2021 M12' => $item['2021 M12'],
                '2022 M01' => $item['2022 M01'],
                '2022 M02' => $item['2022 M02'],
                '2022 M03' => $item['2022 M03'],
                '2022 M04' => $item['2022 M04'],
                '2022 M05' => $item['2022 M05'],
                '2022 M06' => $item['2022 M06'],
                '2022 M07' => $item['2022 M07'],
                '2022 M08' => $item['2022 M08'],
                '2022 M09' => $item['2022 M09'],
                '2022 M10' => $item['2022 M10'],
                '2022 M11' => $item['2022 M11'],
                '2022 M12' => $item['2022 M12'],
                '2023 M01' => $item['2023 M01'],
                '2023 M02' => $item['2023 M02'],
                '2023 M03' => $item['2023 M03'],
                '2023 M04' => $item['2023 M04'],
            ]);
        }

        foreach ($eventData as $item) {
            Event::create([
                'data' => $item['data'],
                'wydarzenia' => json_encode($item['wydarzenia'], JSON_UNESCAPED_UNICODE),
            ]);
        }

        $this->info('Data imported successfully!');
    }
}