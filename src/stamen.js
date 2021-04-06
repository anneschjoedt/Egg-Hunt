var map = new L.Map("mapid", {
  center: new L.LatLng(55.676098, 12.568337),
  zoom: 13,
});
// select between terrain, watercolor, toner
L.tileLayer("https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png", {
  attribution: "",
  maxZoom: 18,
}).addTo(map);

// making a class
var ClassIcon = L.Icon.extend({
  options: {
    iconSize: [50, 50],
    iconAnchor: [40, 40],
    popupAnchor: [0, 0],
  },
});

var dataMessages = [
  "<ul> <li>Javascript set variable</li><li>Sne i april sang Prince</li><li>Allan Randrup Thomsen</li><li>Hvor mange må man være sammen?</li><li> Indefrosne feriepenge</li><li> Varme hveder hvorfor</li><li>Corona test brain scrape</li><li>How does airdrop work?</li><li>Lovechild 1979 sale</li></ul>",
  "<ul> <li>Paw patrol data</li><li>Ugly helmet</li><li>Ankarsrum pizza</li><li>Dag svanæs</li><li>Her velo</li><li>Bumble</li><li>Anastasia beverly hills brow gel</li><li>How does Brexit affect Mexico?</li><li>Little women</li><li>Oysters and grill</li></ul>",
  "<ul> <li>Cute map of copenhagen</li><li>Is there a spell to become a mermaid that actually works</li><li>Bearnaise</li><li>Funny noises</li><li>How many days in march?</li><li>Cheap gifts for your girlfriend</li><li>How can I be a Pokemon go coach?</li><li>Tine Lindhardt</li><li>Dengue</li><li>Furry slippers</li></ul>",
];

// make objects from the class
var ufoIcon = new ClassIcon({
    iconUrl: "img/chicken.svg",
  }),
  ufo1Icon = new ClassIcon({
    iconUrl: "img/ufo1.png",
  });

ufo3Icon = new ClassIcon({
  iconUrl: "img/ufo3.png",
});

var easterEgg = new ClassIcon({
  iconUrl: "img/easter_egg.svg",
});

// mangler at indsætte chicken legg
var locationEgg = new ClassIcon({
  iconUrl: "img/leg.svg",
});

// variable containg a marker that can be dragged
var Chicken = L.marker([55.676098, 12.568337], {
  draggable: true,
  autoPan: true,
  icon: ufoIcon,
})
  .addTo(map)
  .bindPopup("This is you!");

// array
var markerArray = [];

//finds current location of the device
map.locate({
  watch: true,
  enableHighAccuracy: true,
  setView: false,
  maxZoom: 18,
});

var myId = "abc"; // My user id

// locationEgg - ved ikke om det virker hehe
var marker = {
  abc: L.marker([51.441767, 5.470247], {
    draggable: true,
    autoPan: false,
    icon: locationEgg,
  }).addTo(map),
};

//when the location is found, run the function "onLocationFound"
map.on("locationfound", function (e) {
  // find the range of event (e) and create a radius:
  var radius = e.accuracy * 20;

  if (marker.length != 0) {
    map.removeLayer(marker[myId]);
    console.log("layer is removed");
  }
  marker[myId] = L.marker(e.latlng, {
    draggable: true,
    autoPan: false,
    icon: locationEgg,
  })
    .addTo(map)
    .bindPopup("You are here!");

  circles.forEach(function (circle) {
    // distance d in meters between the current position of the marker and the center of the circle
    var d = map.distance(e.latlng, circle.getLatLng());
    console.log("d :", d);
    // the marker is inside the circle when the distance is less than the radius
    var isInside = d < circle.getRadius() + 50;
    console.log(circle.getRadius());

    if (isInside) {
      openPopup(e);
      L.marker(circle.getLatLng(), {
        icon: easterEgg,
        autoPan: true,
      })
        .addTo(map)
        .bindPopup(dataMessages[getRandomInt(0, 3)]);
    }
  });
});
//if there is a location error, run "onLocationError"
map.on("locationerror", onLocationError);

function onLocationError(e) {
  alert(e.message);
}

// array called circles
var circles = [];
// add a cicrcle to place 0 in the array
circles[0] = L.circle([55.696326, 12.506818], {
  color: "red",
  fillColor: "transparent",
  //fillOpacity: 0.5,
  radius: 200,
}).addTo(map);
// add a cicrcle to place 1 in the array
circles[1] = L.circle([55.536326, 12.446818], {
  color: "transparent",
  fillColor: "transparent",
  //fillOpacity: 0.5,
  radius: 250,
}).addTo(map);
// add a cicrcle to place 2 in the array
circles[2] = L.circle([55.70084, 12.5443], {
  color: "transparent",
  fillColor: "transparent",
  //fillOpacity: 0.5,
  radius: 200,
}).addTo(map);
// add a cicrcle to place 3 in the array
circles[3] = L.circle([55.66323, 12.57472], {
  color: "red",
  fillColor: "red",
  //fillOpacity: 0.5,
  radius: 200,
}).addTo(map);

function openPopup(e) {
  var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(
      "<h2>EGGCITING NEWS! YOU'VE FOUND AN EGG</h2><p>Click on the egg to reveal it's secret</p>"
    )
    .openOn(map);
}

// returns a random integer between the specified values
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  number = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  console.log(number);
  return number;
}

// check for each circle in circles array if a fenceMarker has ben dragged into it
// and color it green if it has
Chicken.on("drag", function (e) {
  circles.forEach(function (circle) {
    // distance d in meters between the current position of the marker and the center of the circle
    var d = map.distance(e.latlng, circle.getLatLng());
    console.log("d :", d);
    // the marker is inside the circle when the distance is less than the radius
    var isInside = d < circle.getRadius() + 50;
    console.log(circle.getRadius());

    if (isInside) {
      openPopup(e);
      L.marker(circle.getLatLng(), {
        icon: easterEgg,
        autoPan: true,
      })
        .addTo(map)
        .bindPopup(dataMessages[getRandomInt(0, 3)]);
    }
  });
});

function pickAnAvatar(pickedAvatar) {
  avatar = pickedAvatar;
  console.log(avatar);
  sessionStorage.setItem("avatar", avatar);
}
