// Pixel's game state is kept in one object so every action updates the same pet.
var pet_info = { name: "Pixel", weight: 28, happiness: 72, cleanliness: 65 };

$(function () {
  checkAndUpdatePetInfoInHtml();
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".groom-button").click(clickedGroomButton);
});

function clickedTreatButton() {
  pet_info.happiness += 8;
  pet_info.weight += 2;
  pet_info.cleanliness -= 2;
  updateAfterAction("Yum! That biscuit was tail-waggingly good.");
}

function clickedPlayButton() {
  pet_info.happiness += 12;
  pet_info.weight -= 1;
  pet_info.cleanliness -= 6;
  updateAfterAction("Best. Fetch. Ever! Can we throw it again?");
}

function clickedExerciseButton() {
  pet_info.happiness -= 3;
  pet_info.weight -= 2;
  pet_info.cleanliness -= 8;
  updateAfterAction("Whew! Pixel is fitter, even if a little tired.");
}

// The new Groom action restores the additional cleanliness stat.
function clickedGroomButton() {
  pet_info.cleanliness += 20;
  pet_info.happiness += 3;
  updateAfterAction("So fresh and fluffy! Pixel feels fabulous.");
}

function updateAfterAction(message) {
  checkAndUpdatePetInfoInHtml();
  showPetMessage(message);
}

function checkAndUpdatePetInfoInHtml() {
  checkPetValuesBeforeUpdating();
  updatePetInfoInHtml();
}

// Protects all numeric values from negative numbers and keeps mood meters meaningful.
function checkPetValuesBeforeUpdating() {
  pet_info.weight = Math.max(0, pet_info.weight);
  pet_info.happiness = Math.max(0, Math.min(100, pet_info.happiness));
  pet_info.cleanliness = Math.max(0, Math.min(100, pet_info.cleanliness));
}

function updatePetInfoInHtml() {
  $(".name").text(pet_info.name);
  $(".weight").text(pet_info.weight);
  $(".happiness").text(pet_info.happiness);
  $(".cleanliness").text(pet_info.cleanliness);
}

function showPetMessage(message) {
  var $message = $(".pet-message");
  $message.text(message);
  // jQuery .stop(true, true) clears animation queued by rapid clicks so the newest comment appears immediately.
  $message.stop(true, true).hide().fadeIn(250);
  // jQuery .addClass() applies the short CSS hop; removing it permits the animation to replay next click.
  $(".pet-image").addClass("excited");
  window.setTimeout(function () { $(".pet-image").removeClass("excited"); }, 450);
}
  
