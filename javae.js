function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('show');
}

function showPage(pageId) {
    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase() === pageId) {
            link.classList.add('active');
        }
    });

    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });

    document.getElementById(pageId).classList.remove('hidden');

    if (pageId === 'calculator') {
        showSection('calculatorHome');
    }
    document.getElementById('navbar').classList.remove('show');
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

function calculateGrowthDecay() {
    const initialValue = parseFloat(document.getElementById('initialValue').value);
    const finalValue = parseFloat(document.getElementById('finalValue').value);
    const time = parseFloat(document.getElementById('time').value);
    const rate = parseFloat(document.getElementById('rate').value);

    let result, steps;

    try {
        if (isNaN(initialValue)) {
            result = finalValue / Math.exp(rate * time);
            steps = `Steps:\n1. Using P = P₀e^(kt), solve for P₀\n2. P₀ = P / e^(kt)\n3. P₀ = ${finalValue} / e^(${rate} * ${time})\n4. P₀ = ${result}`;
        } else if (isNaN(finalValue)) {
            result = initialValue * Math.exp(rate * time);
            steps = `Steps:\n1. Using P = P₀e^(kt), solve for P\n2. P = P₀ * e^(kt)\n3. P = ${initialValue} * e^(${rate} * ${time})\n4. P = ${result}`;
        } else if (isNaN(time)) {
            result = Math.log(finalValue / initialValue) / rate;
            steps = `Steps:\n1. Using P = P₀e^(kt), solve for t\n2. t = ln(P / P₀) / k\n3. t = ln(${finalValue} / ${initialValue}) / ${rate}\n4. t = ${result}`;
        } else if (isNaN(rate)) {
            result = Math.log(finalValue / initialValue) / time;
            steps = `Steps:\n1. Using P = P₀e^(kt), solve for k\n2. k = ln(P / P₀) / t\n3. k = ln(${finalValue} / ${initialValue}) / ${time}\n4. k = ${result}`;
        } else {
            throw new Error('Please leave one field empty to solve for its value.');
        }

        document.getElementById('growthResult').innerText = `Result: ${result}`;
        document.getElementById('growthSteps').innerText = steps;
    } catch (error) {
        alert('Error in calculation. Please check your inputs.');
    }
}

function calculateCoolingHeating() {
    const C = parseFloat(document.getElementById('initialDiff').value);
    const finalTemp = parseFloat(document.getElementById('finalTemp').value);
    const ambientTemp = parseFloat(document.getElementById('ambientTemp').value);
    const time = parseFloat(document.getElementById('coolingTime').value);
    const coolingRate = parseFloat(document.getElementById('coolingRate').value);

    let result, steps;

    try {
        if (isNaN(C)) {
            result = (finalTemp - ambientTemp)/Math.exp(coolingRate * time);
            steps = `Steps:\n1. Using T = Tₘ + Ce^(kt), solve for C\n2. T - Tₘ = Ce^(kt)\n3. C = (T - Tₘ)/e^(kt)\n4. C = (${finalTemp} - ${ambientTemp})/e^(${coolingRate} * ${time})\n5. C = ${result}`;
        } else if (isNaN(finalTemp)) {
            result = ambientTemp + C * Math.exp(coolingRate * time);
            steps = `Steps:\n1. Using T = Tₘ + Ce^(kt), solve for T\n2. T = Tₘ + Ce^(kt)\n3. T = ${ambientTemp} + ${C}*e^(${coolingRate} * ${time})\n4. T = ${result}`;
        } else if (isNaN(time)) {
            result = Math.log((finalTemp - ambientTemp)/C) / coolingRate;
            steps = `Steps:\n1. Using T = Tₘ + Ce^(kt), solve for t\n2. T - Tₘ = Ce^(kt)\n3. ln((T - Tₘ)/C) = kt\n4. t = ln((${finalTemp} - ${ambientTemp})/${C}) / ${coolingRate}\n5. t = ${result}`;
        } else if (isNaN(coolingRate)) {
            result = Math.log((finalTemp - ambientTemp)/C) / time;
            steps = `Steps:\n1. Using T = Tₘ + Ce^(kt), solve for k\n2. T - Tₘ = Ce^(kt)\n3. ln((T - Tₘ)/C) = kt\n4. k = ln((${finalTemp} - ${ambientTemp})/${C}) / ${time}\n5. k = ${result}`;
        } else if (isNaN(ambientTemp)) {
            result = finalTemp - C * Math.exp(coolingRate * time);
            steps = `Steps:\n1. Using T = Tₘ + Ce^(kt), solve for Tₘ\n2. Tₘ = T - Ce^(kt)\n3. Tₘ = ${finalTemp} - ${C}*e^(${coolingRate} * ${time})\n4. Tₘ = ${result}`;
        } else {
            throw new Error('Please leave one field empty to solve for its value.');
        }

        document.getElementById('coolingResult').innerText = `Result: ${result}`;
        document.getElementById('coolingSteps').innerText = steps;
    } catch (error) {
        alert('Error in calculation. Please check your inputs.');
    }
}

function resetForm(sectionId) {
    document.querySelectorAll(`#${sectionId} input[type="number"]`).forEach(input => {
        input.value = '';
    });
    document.querySelectorAll(`#${sectionId} select`).forEach(select => {
        select.selectedIndex = 0;
    });
    document.querySelectorAll(`#${sectionId} .result, #${sectionId} pre`).forEach(element => {
        element.innerHTML = '';
    });
}
showPage('home');
