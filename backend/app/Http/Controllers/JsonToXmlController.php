<?php

namespace App\Http\Controllers;

use App\Models\NonConsumerProduct;
use App\Models\ConsumerProduct;
use Illuminate\Http\Response;

class JsonToXmlController extends Controller
{
    public function convertConsumerProducts()
    {
        $consumerProducts = ConsumerProduct::all();
        $dataArray = $consumerProducts->toArray();
        $xmlData = $this->arrayToXml($dataArray, 'ProduktyKonsumpcyjne');
        $response = new Response($xmlData, 200);
        $response->header('Content-Type', 'application/xml');
        return $response;
    }

    public function convertNonConsumerProducts()
    {
        $nonConsumerProducts = NonConsumerProduct::all();
        $dataArray = $nonConsumerProducts->toArray();
        $xmlData = $this->arrayToXml($dataArray, 'ProduktyNiekonsumpcyjne');
        $response = new Response($xmlData, 200);
        $response->header('Content-Type', 'application/xml');
        return $response;
    }
    public function getCombinedXmlData()
    {
        $consumerProducts = ConsumerProduct::all();
        $nonConsumerProducts = NonConsumerProduct::all();
        
        $combinedData = [
            'ProduktyKonsumpcyjne' => $consumerProducts->toArray(),
            'ProduktyNiekonsumpcyjne' => $nonConsumerProducts->toArray(),
        ];
        
        $xmlData = $this->arrayToXml($combinedData, 'Produkty');
        
        $response = new Response($xmlData, 200);
        $response->header('Content-Type', 'application/xml');
        
        return $response;
    }

    private function arrayToXml($data, $rootNodeName)
{
    $xml = new \SimpleXMLElement("<?xml version=\"1.0\" encoding=\"UTF-8\"?><$rootNodeName></$rootNodeName>");

    $arrayToXml = function ($data, &$xml) use (&$arrayToXml) {
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                if (!is_numeric($key)) {
                    $subnode = $xml->addChild(str_replace(' ', '_', $key));
                    $arrayToXml($value, $subnode);
                } else {
                    $subnode = $xml->addChild("item$key");
                    $arrayToXml($value, $subnode);
                }
            } else {
                $xml->addChild(str_replace(' ', '_', $key), htmlspecialchars("$value"));
            }
        }
    };

    $arrayToXml($data, $xml);

    return $xml->asXML();
}
}
