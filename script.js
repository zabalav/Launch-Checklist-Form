window.addEventListener('load', function(){
   let form = document.getElementById("launchForm");
	form.addEventListener("submit", function(event) {
		event.preventDefault();
      
      const pilotName = document.getElementById("pilotName");
      const copilotName = document.getElementById("copilotName");
      const fuelLevel = document.getElementById("fuelLevel");
      const cargoMass = document.getElementById("cargoMass");
      const launchStatusUpdate = document.getElementById("launchStatus"); 
      const fuelStatusUpdate = document.getElementById("fuelStatus");
      const cargoStatusUpdate = document.getElementById("cargoStatus");

      document.getElementById("faultyItems").style.visibility = "visible"; 
      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} is ready for launch.`;
      document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName.value} is ready for launch.`;
      
      if (fuelLevel.value < 10000){
         fuelStatusUpdate.innerHTML = "Fuel level is too low for launch (10000 min).";
         launchStatusUpdate.style.color = "red";
         launchStatusUpdate.innerHTML = "Not ready for launch.";
      } 
      if (cargoMass.value > 10000) {
         cargoStatusUpdate.innerHTML = "Cargo Mass is too heavy for launch (10000 max).";
         launchStatusUpdate.style.color = "red";
         launchStatusUpdate.innerHTML = "Not ready for launch.";
      } 
      if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
         launchStatusUpdate.style.color = "green";
         launchStatusUpdate.innerHTML = "Ready for launch.";
         fuelStatusUpdate.innerHTML = "Fuel level is high enough for launch.";
         cargoStatusUpdate.innerHTML = "Cargo Mass is low enough for launch.";
         fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            response.json().then( function(json) {
               const div = document.getElementById("missionTarget");
               const randomPlanet = json[Math.floor(Math.random()*json.length)];
               div.innerHTML = `
                  <h2>Mission Destination</h2>
                  <ol style=color:red>
                     <li style=color:red>Name: ${randomPlanet.name}</li>
                     <li style=color:red>Diameter: ${randomPlanet.diameter}</li>
                     <li style=color:red>Star: ${randomPlanet.star}</li>
                     <li style=color:red>Distance from Earth: ${randomPlanet.distance}</li>
                     <li style=color:red>Number of Moons: ${randomPlanet.moons}</li>
                  </ol>
                  <img src="${randomPlanet.image}">
                  `;
            });
         });
      };
   });
}); 


