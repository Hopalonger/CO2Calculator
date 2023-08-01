// CO2 emissions per gallon of different fuel types
const fuelTypes = {
    diesel: 10.19,
    propane: 5.75,
    gasoline: 8.78
};

// CO2 emissions for manufacturing batteries
const batteryEmissions = 0.0735;

// Conversion factor from miles to kilometers
const milesToKm = 1.60934;

// Conversion factor from kWh to Wh
const kWhToWh = 1000;

// CO2 emissions per KW
const Co2PerKW = 0.855;

// Flag to track whether units are in miles or kilometers
let isKm = false;

document.getElementById('convert-units').addEventListener('click', function () {
    isKm = !isKm;
    const unit = isKm ? 'KMH' : 'Miles';
    document.querySelectorAll('label').forEach(function (label) {
        const textNode = label.childNodes[0];
        textNode.textContent = textNode.textContent.replace(/KMH|Miles/g, unit);
    });
});

document.getElementById('calculate').addEventListener('click', function () {
    const mpg = Number(document.getElementById('mpg').value);
    const fuelType = document.getElementById('fuel-type').value;
    const batterySize = Number(document.getElementById('battery-size').value);
    const charges = Number(document.getElementById('charges').value);
    const milesPerCharge = Number(document.getElementById('miles-per-charge').value);
    const Co2PerKW = Number(document.getElementById('KG-CO2-Per-Kw').value);

    // Calculate CO2 emissions for gas vehicle
    const gasCo2 = isKm ? (fuelTypes[fuelType] / (mpg * milesToKm)) : (fuelTypes[fuelType] / mpg);
    document.getElementById('gas-co2').textContent = `Gas Vehicle: ${gasCo2.toFixed(4)} KG of CO2 Produced per ${isKm ? 'KM' : 'Mile'} Driven`;

    // Calculate CO2 Emissions Per Mile Driven
    const ElectricalCo2 = batterySize / 1000 * Co2PerKW / milesPerCharge;

    // Calculate CO2 emissions for electric vehicle
    const batteryCo2 = ((batterySize * batteryEmissions / charges) / milesPerCharge + ElectricalCo2) * (isKm ? milesToKm : 1);
    document.getElementById('electric-co2').textContent = `Electric Vehicle: ${batteryCo2.toFixed(4)} KG of CO2 Produced per ${isKm ? 'KM' : 'Mile'} Driven`;
});