// Selecting the container div
let container = document.querySelector(".container");

// Getting the percentage btns
let tipPercentage = document.querySelector(".form--tip"),
  percentageBtns = tipPercentage.querySelectorAll(".btn");

// H1's to dispay results
let tipAPerPsn = document.querySelector(".tip_one");
let totalAPerPsn = document.querySelector(".total_one");

// Custom tip input
let customTipBtn = container.querySelector('input[name="custom tip"]');

// Reset btn
let resetBtn = document.querySelector(".reset");

customTipBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.value > 0) {
    calculateAll();
  }
});

resetBtn.addEventListener("click", () => resetAll());

percentageBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    customTipBtn.value = "";
    calculateAll(btn);
  });
});

const resetAll = () => {
  let totalBill = container.querySelector('input[name="bill"]'),
    noOfPeople = container.querySelector('input[name="people"]'),
    customTip = container.querySelector('input[name="custom tip"]');

  totalBill.value = "";
  noOfPeople.value = "";
  customTip.value = "";
  tipAPerPsn.textContent = "$0.00";
  totalAPerPsn.textContent = "$0.00";
};

const calculateAll = (btn) => {
  // Seleting the form inputs values
  let totalBill = container.querySelector('input[name="bill"]').value,
    noOfPeople = container.querySelector('input[name="people"]').value,
    customTip = container.querySelector('input[name="custom tip"]').value;
  let tipAmount;
  if (customTip > 0) {
    tipAmount = customTip;
  } else {
    tipAmount = Math.floor((parseInt(btn.textContent) / 100) * totalBill) + 1;
  }
  let tipPerPerson = tipAmount / noOfPeople;
  let totalPerPerson = tipPerPerson + totalBill / noOfPeople;

  tipAPerPsn.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAPerPsn.textContent = `$${totalPerPerson.toFixed(2)}`;

  setTimeout(() => {
    btn.style.background = "hsl(183, 100%, 15%)";
  }, 3000);

  btn.style.background = "hsl(172, 67%, 45%)";
  // btn.style.color = "#FFFFFF";

  if (noOfPeople <= 0) {
    container.querySelector(".form--people").classList.add("nopeople");
    tipAPerPsn.textContent = "$0.00";
    totalAPerPsn.textContent = "$0.00";
  } else {
    container.querySelector(".form--people").classList.remove("nopeople");
  }
  if (totalBill <= 0 && customTip <= 0) {
    tipAPerPsn.textContent = "$0.00";
    totalAPerPsn.textContent = "$0.00";
  }
};
