
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

  document.getElementById("output").innerHTML = restuarantList;
}
xmlhttp.send();

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
