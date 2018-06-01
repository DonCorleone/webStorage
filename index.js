// create needed constants
const rememberDiv = document.querySelector('.remember');
const forgetDiv = document.querySelector('.forget');
const form = document.querySelector('form');
const nameInput = document.querySelector('#entername');
const submitBtn = document.querySelector('#submitname');
const forgetBtn = document.querySelector('#forgetname');

const h1 = document.querySelector('h1');
const personalGreeting = document.querySelector('.personal-greeting');

// Stop the form from submitting when a button is pressed
form.addEventListener('submit', function (e) {
	e.preventDefault();
});
// run function when the 'Say hello' button is clicked
submitBtn.addEventListener('click', function () {
	// store the entered name in web storage
	localStorage.setItem('name', nameInput.value);
	// run nameDisplayCheck() to sort out displaying the
	// personalized greetings and updating the form display
	nameDisplayCheck();
});
// run function when the 'Forget' button is clicked
forgetBtn.addEventListener('click', function () {
	// Remove the stored name from web storage
	localStorage.removeItem('name');
	// run nameDisplayCheck() to sort out displaying the
	// generic greeting again and updating the form display
	nameDisplayCheck();
});

// define the nameDisplayCheck() function
function nameDisplayCheck() {
	if (storageAvailable('localStorage')) {
		// Yippee! We can use localStorage awesomeness
		// check whether the 'name' data item is stored in web Storage
		if (localStorage.getItem('name')) {
			// If it is, display personalized greeting
			let name = localStorage.getItem('name');
			h1.textContent = 'Welcome, ' + name;
			personalGreeting.textContent = 'Welcome to our website, ' + name + '! We hope you have fun while you are here.';
			// hide the 'remember' part of the form and show the 'forget' part
			forgetDiv.style.display = 'block';
			rememberDiv.style.display = 'none';
		} else {
			// if not, display generic greeting
			h1.textContent = 'Welcome to our website ';
			personalGreeting.textContent = 'Welcome to our website. We hope you have fun while you are here.';
			// hide the 'forget' part of the form and show the 'remember' part
			forgetDiv.style.display = 'none';
			rememberDiv.style.display = 'block';
		}
	}
	else {
		// Too bad, no localStorage for us
	}

}

function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch (e) {
		return e instanceof DOMException && (
			// everything except Firefox
			e.code === 22 ||
			// Firefox
			e.code === 1014 ||
			// test name field too, because code might not be present
			// everything except Firefox
			e.name === 'QuotaExceededError' ||
			// Firefox
			e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage.length !== 0;
	}
}

document.body.onload = nameDisplayCheck;