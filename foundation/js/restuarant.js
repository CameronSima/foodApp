
let requestURL = "https://data.delaware.gov/resource/5b4w-wqwv.json";
let jsonString;
let restuarantList = new Array();
let restAddEntry;
let id = 1;

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", requestURL);

xmlhttp.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200)
	{
		jsonString = JSON.parse(this.responseText);
    for(var i = 0;i  < jsonString.length; i++)
    {
      if(jsonString[i].pepcity === "WILMINGTON")
      {
        let restAddEntry = new Restaurant(jsonString[i].pepname, jsonString[i].pepaddress,
        jsonString[i].pepcity, jsonString[i].pepzip, id);
        restuarantList.push(restAddEntry);
        id++;
      }
    }
	}

  //document.getElementById("output").innerHTML = restuarantList;
}
xmlhttp.send();

var dropdown = document.getElementById('restaurantDropdown');

function updateSuggestion() {
  dropdown.innerHTML = ""
var text = document.getElementById('location_input').value;

restuarantList.forEach(function(el)
{
  if (el.name.substring(0, text.length) == text)
   {
     dropdown.innerHTML += "<option id={el.id}>" + el.name + ": " + el.address + "</option>"
    }
  })

}

function GetLocation() {
  var selected = document.getElementById('restaurantDropdown')
  var address  = selected.options[selected.selectedIndex].text.split(':')[1]
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    alert("Latitude: " + latitude + "\nLongitude: " + longitude);
                } else {
                    alert("Request failed.")
                }
            });
        };


class Restaurant
{
  constructor(name, address, city, zip, id)
  {
    this.name = name;
    this.address = address;
    this.city = city;
    this.zip = zip;
    this.id = id;
  }

  toString()
  {
    return this.id + " " + this.name + " " + this.address + " " + this.city + "<br>";
  }
}
