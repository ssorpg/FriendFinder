$("#submit").on("click", function (event) {
    event.preventDefault();

    if ($("#name").val() === "" || $("#photoURL").val() === "" || $("input:checked").length < 10) {

        alert("Ensure all forms are filled our before continuing.");
        return;
    }

    let newScores = [];

    const radios = $("input:checked");

    for (let i = 0; i < radios.length; i++) {
        newScores.push($(radios[i]).val());
    }

    const newSurvey = {
        name: $("#name").val().trim(),
        photo: $("#photoURL").val().trim(),
        scores: newScores
    }

    $.post("/api/friends", newSurvey, (data) => {
        const imageMatch = "<img src=" + data.photo + " class='ml-2' width='250'>";
        const nameMatch = '<h2 class="name text-center">' + data.name + '</h2>';

        $("#modal-body").empty();
        $("#modal-body").append(imageMatch, nameMatch);
        $("#modalMatch").modal();
    });
});