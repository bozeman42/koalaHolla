console.log( 'js' );

$( document ).ready(readyNow);

function readyNow(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();
  // add koala button click
  $( '#addButton' ).on( 'click', addButtonClick);
}

function addButtonClick(){
  console.log( 'in addButton on click' );
  var name = $('#nameIn').val();
  var age = $('#ageIn').val();
  var gender = $('#genderIn').val();
  var readyForTransfer = $('#readyForTransferIn').val();
  var notes = $('#notesIn').val();
  // get user input and put in an object
  // NOT WORKING YET :(
  // using a test object
  var objectToSend = {
    name: name,
    age: age,
    gender: gender,
    readyForTransfer: readyForTransfer,
    notes: notes
  }
   // call saveKoala with the new obejct
   saveKoala( objectToSend );
}

// GET AJAX call to server to get koalas
function getKoalas(){
  console.log( 'in getKoalas' );
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).done(function(response){
    console.log( 'got some koalas: ', response );
    //Append to dom function
  appendToDom(response);
  }).fail(function(error){
    console.log('GET failed:', error);
  })
}

// POST AJAX call to server to add new Koala
function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala
  }).done(function(response){
    console.log('Success:', response);
    getKoalas();
  }).fail(function(error){
    console.log('Failed:',error);
  })
}

function appendToDom(koalas) {
  for(var i=0; i<koalas.length; i++){
    $('#viewKoalas').append('<tr><td>' + koalas[i].name + '</td><td>' + koalas[i].age + '</td><td>' + koalas[i].gender + '</td><td>' + koalas[i].readyfortransfer + '</td><td>' + koalas[i].notes + '</td></tr>');
  }
}