$("#call").on("click", function(){
  var title = $("#title").val();
  var plot = $("#plot").val();
  var responseType = $("#res").val();


$.ajax({
  url: 'https://www.omdbapi.com/?t='+title+'&y=&plot='+plot+'&r='+responseType,
  method: "GET",
  success: function(data) {
    console.log(data);
  }
});

});
