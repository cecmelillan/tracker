<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "4861097019-Av74gAjfHvHCZFoMEvqi8s3QOPGoolz5U68E4XG",
    'oauth_access_token_secret' => "ZFlFSf7O5cOkVZBQjhAlGbtS2dfV5xDpHwghnKXxHAW0i",
    'consumer_key' => "PHRFlL3CZAuSUJsoNFiiCsG4V",
    'consumer_secret' => "Td8ye1dycJXtNI70pI2bHAnq39O2q23uXgswaW8JGMYwKHUTuJ"
);


$num_tweets = 1;
$query = "tiempoarg";
       
        $url = 'https://api.twitter.com/1.1/search/tweets.json';
        $getfield = '?q='.$query.'&count='.$num_tweets;

        $requestMethod = 'GET';
        $twitter = new TwitterAPIExchange($settings);
        $json =  $twitter->setGetfield($getfield)
                     ->buildOauth($url, $requestMethod)
                     ->performRequest();
        print_r( $json );
