document.addEventListener("DOMContentLoaded", function(){

	document.getElementById("login_button").onclick = function() {
		document.getElementById("login_form_div").style.display = "block";
		document.getElementById("signup_form_div").style.display = "none";
	};

	document.getElementById("signup_button").onclick = function() {
		document.getElementById("signup_form_div").style.display = "block";
		document.getElementById("login_form_div").style.display = "none";
	};

	document.getElementById("login_submit").onclick = function() {
		var uname = document.getElementById('login_emailId').value;
		var pass = document.getElementById('login_password').value;
		// alert(uname+" "+pass);
		checkValidity(uname,pass);

	};

	document.getElementById("signup_submit").onclick = function() {

		var uname = document.getElementById('signup_emailId').value;
		var pass = document.getElementById('signup_password').value;
		var key = getvalidkey(uname);
		var user_param = [key, pass];
		chrome.storage.sync.set({"loggedinuser":user_param}, function() {
				document.getElementById("yet_to_login").style.display = "none";
				document.getElementById("loggedin").style.display = "block";
				var url = "chrome-extension://"+chrome.runtime.id+"/home.html";
				chrome.tabs.create({url: url});
			});
	};
});