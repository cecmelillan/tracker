<?php 

ini_set('display_errors', 1);
require_once('../src/lib/TwitterAPIExchange.php');

$objDatos = json_decode(file_get_contents("php://input"));

if($objDatos->accion == "get")
	obtenerLista($objDatos);

function obtenerLista($objDatos) {
	$data = null;
//	$where = procesarFiltro($objDatos->filtro);
	try{
// -----------------------------------------------------------------------------------
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "4861097019-Av74gAjfHvHCZFoMEvqi8s3QOPGoolz5U68E4XG",
    'oauth_access_token_secret' => "ZFlFSf7O5cOkVZBQjhAlGbtS2dfV5xDpHwghnKXxHAW0i",
    'consumer_key' => "PHRFlL3CZAuSUJsoNFiiCsG4V",
    'consumer_secret' => "Td8ye1dycJXtNI70pI2bHAnq39O2q23uXgswaW8JGMYwKHUTuJ"
);


$num_tweets = 100;
$query = "newenweichan"; //"tiempoarg";
       
        $url = 'https://api.twitter.com/1.1/search/tweets.json';
//		$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
        $getfield = '?q='.$query.'&since=2016-07-04&until=2016-07-05&count='.$num_tweets;
//		$getfield = '?screen_name='.$query.'&count='.$num_tweets;

        $requestMethod = 'GET';
        $twitter = new TwitterAPIExchange($settings);
        $data =  $twitter->setGetfield($getfield)
                     ->buildOauth($url, $requestMethod)
                     ->performRequest();
// -----------------------------------------------------------------------------------
	}catch(PDOException $e){
		echo "ERROR: " . $e->getMessage();
	}
	
	//echo json_encode($data);
	echo ( $data );
}

