// Initialize Firebase
const firebaseConfig = {
            apiKey: "AIzaSyB9E6ets_4WowvhKrZ_grtKB-oIiuNyw40Y",
            authDomain: "farmer-ac1f3.firebaseapp.com",
            databaseURL: "https://farmer-ac1f3-default-rtdb.firebaseio.comL",
            projectId: "farmer-ac1f3D",
            storageBucket: "farmer-ac1f3.appspot.com",
            messagingSenderId: "314173535251",
            appId: "1:314173535251:web:76069b7bba6a746063bbe6"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Google Maps
  let map;
  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 0, lng: 0 },
      zoom: 8,
    });
  
    // Get farmers' data from Firebase
    const farmersRef = firebase.database().ref("farmers");
    farmersRef.once("value")
      .then((snapshot) => {
        const farmers = snapshot.val();
        displayFarmersOnMap(farmers);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }
  
  // Function to display farmers on the map
  function displayFarmersOnMap(farmers) {
    for (const key in farmers) {
      if (farmers.hasOwnProperty(key)) {
        const farmer = farmers[key];
        const marker = new google.maps.Marker({
          position: { lat: farmer.latitude, lng: farmer.longitude },
          map: map,
          title: farmer.name,
        });
      }
    }
  }
  