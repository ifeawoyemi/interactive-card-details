// Select the form from the DOM
const form = document.querySelector(".form__container");

// Select the paragraph of identity card front from the DOM
const pCardNumber = document.getElementById("p__card__number");
const pCardholderName = document.getElementById("p__cardholder__name");
const pExpMonth = document.getElementById("p__exp__month");
const pExpYear = document.getElementById("p__exp__year");

// Select the paragraph of identity card back from the DOM
const pCvcNumber = document.getElementById("p__cvc__number");

// Select the input cardholder name and the error message from the DOM
const inputCardholderName = document.getElementById("input__cardholder__name");
const msgCardholderEmpty = document.getElementById(
  "cardholder__name__empty__msg"
);
const msgCardholderNameWrongFormat = document.getElementById(
  "cardholder__name__wrong__format__msg"
);

// Select the input card number from the DOM
const inputCardNumber = document.getElementById("input__card__number");
const msgCardNumberEmpty = document.getElementById(
  "card__number__empty__error__msg"
);
const msgWrongFormatCardNumber = document.getElementById(
  "card__number__error__msg"
);

// Select the input expired month of the card from the DOM
const inputExpMonth = document.getElementById("input__exp__month");
const msgExpMonthEmpty = document.getElementById("exp__month__empty__msg");
const msgGtTotalMonth = document.getElementById("gt__total__month__msg");

// Select the input expired year of the card from the DOM
const inputExpYear = document.getElementById("input__exp__year");
const msgLtCurrentYear = document.getElementById("lt__current__year__msg");

// Select the input cvc number of the card from the DOM
const inputCvc = document.getElementById("input__cvc");
const msgCvc = document.getElementById("cvc__error__msg");

// Select the confirm button from the DOM
const btnConfirm = document.getElementById("btn__confirm");

// Select the section complete state from the DOM
const completeState = document.querySelector(".complete__state__container");

// Variable that prevent alphabets using format regex
const preventAlphabets = /^[a-zA-Z]+$/;

// Variable that prevent numeric using format regex
const preventNumeric = /^[0-9]+$/;

// Input field of cardholder name Event
inputCardholderName.addEventListener("input", (e) => {
  if (e.target.value.length < 1) {
    pCardholderName.innerText = e.target.dataset.default;
    msgCardholderEmpty.style.display = "block";
    msgCardholderNameWrongFormat.style.display = "none";
  } else {
    msgCardholderEmpty.style.display = "none";
    pCardholderName.innerText = e.target.value;
    msgCardholderNameWrongFormat.style.display = "none";

    for (let i = 0; i < e.target.value.length; i++) {
      if (e.target.value[i].match(preventNumeric)) {
        msgCardholderNameWrongFormat.style.display = "block";
      } else {
        cardNumberStatusValid = true;
      }
    }
  }
});

// Input field of card number event
inputCardNumber.addEventListener("input", (e) => {
  let v = e.target.value.replaceAll(/[^0-9\a-z\A-Z]/g, ""),
    r = new RegExp(`.{1,${e.target.dataset.grouplength}}`, "g"),
    s = e.target.selectionStart,
    d = e.target.selectionEnd,
    fixCarret = d < e.target.value.length ? true : false;
  e.target.value = v.match(r)
    ? v
        .match(r)
        .slice(0, e.target.dataset.maxlength / e.target.dataset.grouplength)
        .join(" ")
    : "";

  if (fixCarret) e.target.setSelectionRange(s, d);
  pCardNumber.innerText = e.target.value;

  // Card number field is empty and display the error msg when user insert a alphabets.
  if (e.target.value.length < 1) {
    pCardNumber.innerText = e.target.dataset.default;
    msgWrongFormatCardNumber.style.display = "none";
    msgCardNumberEmpty.style.display = "block";
  } else {
    msgCardNumberEmpty.style.display = "none";
    msgWrongFormatCardNumber.style.display = "none";

    for (let i = 0; i < e.target.value.length; i++) {
      if (e.target.value[i].match(preventAlphabets)) {
        msgWrongFormatCardNumber.style.display = "block";
      }
    }
  }
});

// Input field of expired month card event
inputExpMonth.addEventListener("input", (e) => {
  let v = e.target.value.replaceAll(/[^0-9]/g, ""),
    r = new RegExp(`.{1,${e.target.dataset.grouplength}}`, "g"),
    s = e.target.selectionStart,
    d = e.target.selectionEnd,
    fixCarret = d < e.target.value.length ? true : false;
  e.target.value = v.match(r)
    ? v
        .match(r)
        .slice(0, e.target.dataset.maxlength / e.target.dataset.grouplength)
        .join(" ")
    : "";

  if (fixCarret) e.target.setSelectionRange(s, d);

  if (e.target.value.length < 1) {
    pExpMonth.innerText = `${e.target.dataset.default}`;
    msgExpMonthEmpty.style.display = "block";
    msgGtTotalMonth.style.display = "none";
  } else if (e.target.value.length === 1) {
    msgExpMonthEmpty.style.display = "none";
    msgGtTotalMonth.style.display = "none";
    pExpMonth.innerText = `0${e.target.value} /`;
  } else if (e.target.value.length > 1) {
    msgExpMonthEmpty.style.display = "none";

    if (e.target.value > e.target.dataset.maxmonth) {
      msgGtTotalMonth.style.display = "block";
    } else {
      msgGtTotalMonth.style.display = "none";
      pExpMonth.innerText = `${e.target.value} /`;
    }
  }
});

// Input field of expired year card event
inputExpYear.addEventListener("input", (e) => {
  let v = e.target.value.replaceAll(/[^0-9]/g, ""),
    r = new RegExp(`.{1,${e.target.dataset.grouplength}}`, "g"),
    s = e.target.selectionStart,
    d = e.target.selectionEnd,
    fixCarret = d < e.target.value.length ? true : false;
  e.target.value = v.match(r)
    ? v
        .match(r)
        .slice(0, e.target.dataset.maxlength / e.target.dataset.grouplength)
        .join(" ")
    : "";

  if (fixCarret) e.target.setSelectionRange(s, d);

  if (e.target.value.length < 1) {
    pExpYear.innerText = `${e.target.dataset.default}`;
    msgExpMonthEmpty.style.display = "block";
    msgLtCurrentYear.style.display = "none";
  } else {
    msgExpMonthEmpty.style.display = "none";

    if (e.target.value.length === 2) {
      if (e.target.value < e.target.dataset.minmonth) {
        msgLtCurrentYear.style.display = "block";
        msgLtCurrentYear.style.top = "5.2rem";
        btnConfirm.style.marginBlock = "2rem";
      } else {
        btnConfirm.style.marginBlock = ".558rem";
        msgLtCurrentYear.style.display = "none";
        pExpYear.innerText = `${e.target.value}`;
      }
    }
  }
});

// Input field of CVC event
inputCvc.addEventListener("input", (e) => {
  let v = e.target.value.replaceAll(/[^0-9]/g, ""),
    r = new RegExp(`.{1,${e.target.dataset.grouplength}}`, "g"),
    s = e.target.selectionStart,
    d = e.target.selectionEnd,
    fixCarret = d < e.target.value.length ? true : false;
  e.target.value = v.match(r)
    ? v
        .match(r)
        .slice(0, e.target.dataset.maxlength / e.target.dataset.grouplength)
        .join(" ")
    : "";

  if (fixCarret) e.target.setSelectionRange(s, d);

  if (e.target.value.length < 1) {
    pCvcNumber.innerText = `${e.target.dataset.default}`;
    msgCvc.style.display = "block";
  } else {
    pCvcNumber.innerText = `${e.target.value}`;
    msgCvc.style.display = "none";
  }
});

// Confirm button event
btnConfirm.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputCardholderName.value !== "" &&
    msgCardholderNameWrongFormat.style.display === "none" &&
    inputCardNumber.value !== "" &&
    msgWrongFormatCardNumber.style.display === "none" &&
    inputExpMonth.value !== "" &&
    msgGtTotalMonth.style.display === "none" &&
    inputExpYear.value !== "" &&
    msgLtCurrentYear.style.display === "none" &&
    inputCvc.value !== 0 &&
    msgCvc.style.display === "none"
  ) {
    form.style.display = "none";
    completeState.style.display = "flex";
  } else {
    alert(
      "Please fill all the inputs field first and make sure all datas is correct!"
    );
  }
});