<?php
  /* Initiate comprehensive error reporting.
  To access error report enter the full path as it appears on the web server. e.g "localhost/geonamesExample/libs/php/getCountryInfo.php?lang=en&country=GB" */
  ini_set('display_errors', 'On');
  error_reporting(E_ALL);

  $executionStartTime = microtime(true);

  // Contatenate the URL for the API call with the parameters
  $url = 'http://api.geonames.org/countryCodeJSON?formatted=true&lat=' . $_REQUEST['lat'] . '&lng=' . $_REQUEST['long'] . '&username=matthewhand&style=full';
  
  // Initiate the cURL object and sets some parameters
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_URL, $url);

  // Execute the cURL object and store the results to result
  $result = curl_exec($ch);
  
  curl_close($ch);

  // This API returns data as a JSON object, decode as an associative arry so that it can be appended to $output.  
  $decode = json_decode($result, true);

  $output['status']['code'] = "200";
  $output['status']['name'] = "ok";
  $output['status']['description'] = "success";
  $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";

  $output['data'] = $decode;

  header('Content-Type: application/json; charset=UTF-8');

  echo json_encode($output);

?>