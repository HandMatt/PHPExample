//  Remove preloader when page loads
$(window).on('load', function() {
  if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function() {
      $(this).remove();
    });
  }
});

// Set up event handler for click event on countryCode button
$("#countryCodeRun").click(function() {

  // Run AJAX call to the PHP routine
  $.ajax({
    url: "php/getCountryCode.php",
    // Set the expected format
    type: 'POST',
    dataType: 'json',
    // Pass values of the two inputs as the parameters.
    data: {
      lat: $('#countryCodeLat').val(),
      long: $('#countryCodeLong').val()
    },
    success: function(result) {
      // PHP output is stored in the result object
      console.log(JSON.stringify(result));

      // If status of data returned is "ok"
      if (result.status.name == "ok") {
        // The data held in result is written into the HTML using jQuery functions
        $('#countryCodeResult').html(result['data']['countryCode']);
        $('#countryCodeName').html(result['data']['countryName']);
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText);
      console.log(errorThrown);
    }
  });

});

$("#oceanRun").click(function() {
  $.ajax({
    url: "php/getOcean.php",
    type: 'POST',
    dataType: 'json',
    data: {
      lat: $('#oceanLat').val(),
      long: $('#oceanLong').val()
    },
    success: function(result) {
      console.log(JSON.stringify(result));
      if (result.status.name == "ok") {
        $('#oceanResult').html(result['data']['name']);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText);
      console.log(errorThrown);
    }
  });
});

$("#earthquakesRun").click(function() {
  $.ajax({
    url: "php/getEarthquakes.php",
    type: 'POST',
    dataType: 'json',
    data: {
      north: $("#earthquakesNorth").val(),
      south: $("#earthquakesSouth").val(),
      east: $("#earthquakesEast").val(),
      west: $("#earthquakesWest").val()
    },
    success: function(result) {
      console.log(JSON.stringify(result));
      if (result.status.name == "ok") {
        $('#earthquakeDatetime').html(result['data'][0]['datetime']);
        $('#earthquakeLongitude').html(result['data'][0]['lng']);
        $('#earthquakeLatitude').html(result['data'][0]['lat']);
        $('#earthquakeDepth').html(result['data'][0]['depth']);
        $('#earthquakeMagnitude').html(result['data'][0]['magnitude']);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText);
      console.log(errorThrown);
    }
  });
});
