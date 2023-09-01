let lat;
let lng;
let resultAddress;

const url = "https://maps.googleapis.com/maps/api/geocode/json";
const apiKey = "API_KEY";
const adress = "R. Amadeu Gamberini, 283 - São Miguel Paulista, São Paulo - SP";

function geocode() {
  // chamada para geocoding transformar o endereço em coodernada
  axios
    .get(url, {
      params: {
        address: adress,
        key: apiKey,
      },
    })
    .then(function (response) {
      lat = response.data.results[0].geometry.location.lat;
      lng = response.data.results[0].geometry.location.lng;
      resultAddress = response.data.results[0].formatted_address;
    })
    .catch(function (error) {
      console.log("deu errado", error);
    });
}

geocode();

const showMaps = () => {
  const success = (position) => {
    const coordinates = document.getElementById("position");
    const { latitude, longitude } = position.coords; // pega as suas coordenadas locais

    coordinates.innerHTML = `latitude: ${lat || latitude} | longitude: ${
      lng || longitude
    } | adress: ${resultAddress || "Address not found"}`;

    let map;

    async function initMap() {
      // função para pegas as coordenadas e renderizar o mapa
      const position = { lat: lat || latitude, lng: lng || longitude }; // se a função geocode não funcionar, substitui pelas coordenadas locais

      const { Map } = await google.maps.importLibrary("maps");

      map = new Map(document.getElementById("map"), {
        zoom: 14,
        center: position,
        mapId: "DEMO_MAP_ID",
      });

      new google.maps.Marker({
        position,
        map,
        title: resultAddress || "Você está aqui!",
      });
    }

    initMap();
  };

  const errorPosition = (error) => {
    const coordinates = document.getElementById("position");
    coordinates.innerHTML = `Erro ao obter localização:<br> Error ${error.code}: ${error.message}`;
  };

  navigator.geolocation.getCurrentPosition(success, errorPosition);
};

const checkGeo = () => {
  if (!navigator.geolocation) {
    const coordinates = document.getElementById("position");
    coordinates.innerHTML = "localização não suportada pelo navegador";
    return;
  }
};

showMaps();
