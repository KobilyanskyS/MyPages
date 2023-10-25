$(document).ready(function () {
    $("#sendBtn").click(
        function () {
            var dateValue = { date: $('#date').val() };
            $.ajax({
                url: "http://127.0.0.1:8000/postdata",
                type: "POST",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(dateValue),
                success: function (dataResult) {
                    console.log(dataResult);
                }
            });
        });
});