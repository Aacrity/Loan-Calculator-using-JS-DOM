// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  //  hide results
  // document.getElementById("results").style.display = "none";

  // Show loader when calculate is clicked
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});
// Calculate result
function calculateResults() {
  console.log("Calculating..");

  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");

  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedMonths = parseFloat(years.value) * 12;

  const modifiedInterest = Math.pow(1 + calculatedInterest, calculatedMonths);
  const monthly =
    (principal * calculatedInterest * modifiedInterest) /
    (modifiedInterest - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedMonths).toFixed(2);
    totalInterest.value = (monthly * calculatedMonths - principal).toFixed(2);

    // show results which is hidden
    document.getElementById("results").style.display = "block";

    // hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Check your numbers and try again");
  }
  function showError(error) {
    // hide loader
    document.getElementById("loading").style.display = "none";
    //  creating new div
    const errorDiv = document.createElement("div");
    // add class with red danger
    errorDiv.className = "alert alert-danger";

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // get elements according to which u want to display error msg i.e in whole div above heading
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    // time for error show
    setTimeout(clearError, 3000);

    //
    function clearError() {
      document.querySelector(".alert").remove();
    }
  }
  // to check for console
  console.log(totalPayment.value);
  console.log(totalInterest.value);
}
