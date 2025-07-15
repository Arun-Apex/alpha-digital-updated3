app.controller('MapCtrl', function($scope, $http) {
  $scope.players = [];

  function initMap() {
    const map = L.map('map').setView([13.7563, 100.5018], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    $http.get('/api/players').then(function(res) {
      $scope.players = res.data;

      $scope.players.forEach(player => {
        if (player.lat && player.lng) {
          L.marker([player.lat, player.lng])
            .addTo(map)
            .bindPopup(`<b>${player.name}</b><br>${player.group}`);
        }
      });
    });
  }

  setTimeout(initMap, 100); // DOM ready
});