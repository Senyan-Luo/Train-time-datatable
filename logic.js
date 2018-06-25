var database = firebase.database()

$("#add-train-btn").on("click", function () {
    event.preventDefault() //Prevent a submit button from automatically submitting to the browser

    var trainName = $("#train-name-input").val().trim()
    var destination = $("#destination-input").val().trim()
    var traintime = $("#time-input").val().trim()
    var frequency = $("#frequency-input").val().trim()



var newTrain = {
    name: trainName,
    location: destination,
    time: traintime,
    howOften: frequency
}

database.ref().push(newTrain)

alert("New train info successfully uploaded!")

$("#train-name-input").val("")
$("#destination-input").val("")
$("#time-input").val("")
$("#frequency-input").val("")

})

database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    var name = childSnapshot.val().name
    var destination = childSnapshot.val().location
    var time = childSnapshot.val().time
    var frequency = childSnapshot.val().howOften

    var timeConverted = moment(time, "HH:mm").subtract(1, "years")
    moment(moment()).format("hh:mm")
    var diffTime = moment().diff(moment(timeConverted), "minutes")
    var tRemainder = diffTime % frequency
    var tMinutesTillTrain = frequency - tRemainder
    var nextTrain = moment().add(tMinutesTillTrain, "minutes")
    var timePretty = moment(nextTrain).format("hh:mm A") 

    $("#timetable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + timePretty + "</td><td>" + tMinutesTillTrain + "</td></tr>");
})
