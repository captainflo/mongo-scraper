$(document).on("click", "#scrapeArticles", function() {
    // Empty the articles from the note section
    $("#articles").empty();
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/scraper"
    })
      // With that done, add the note information to the page
      .then(function(data) {
        alert("You have scraped " +data.length + " articles");
        console.log(data);
        for (let i = 0; i < data.length; i++) {
        // The title of the article
        $("#articles").append("<div id='card-"+i+"' class='card'><div class='card-header'><button data-id="+i+" type='submit' class='saved btn btn-outline-primary'>Saved Article!</button><a id='link-"+i+"' target='_blank' href='https://www.nytimes.com"+data[i].link+"'><h2  id='title-"+i+"'>"+ data[i].title + "</h2></a></div><div class='card-body'><blockquote class='blockquote mb-0'><footer id='text-"+i+"' class='text blockquote-footer'>"+data[i].text+"</footer></blockquote></div></div>");
        }
      });
  });
  // saved article
  $(document).on("click", '.saved', function(event) {
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    
    newArticle = {
        title: $('#title-' + thisId).text(),
        link: $('#link-' + thisId).attr("href"),
        text: $('#text-' + thisId).text(),
    }
    console.log(newArticle);
    $.ajax({
      method: "POST",
      url: "/saved/"+ thisId,
      data: newArticle
    })
      // With that done, add the note information to the page
      .then(function(data) {
        $('#card-' + thisId).remove();
        console.log(data);
      });
  });


  // Get all article saved
  $.ajax({
    method: "GET",
    url: "/saved"
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
      // The title of the article
      $("#articlesSaved").append("<div id='card-"+data[i]._id+"' class='card'><div class='card-header'><button data-id="+data[i]._id+" type='submit' class='Delete btn btn-outline-primary'>Delete Article</button><button type='button' class='note-show btn btn-primary' data-toggle='modal' data-target='#exampleModal' data-modal="+data[i]._id+">Article Note</button><a id='link-"+i+"' target='_blank' href='"+data[i].link+"'><h2  id='title-"+i+"'>"+ data[i].title + "</h2></a></div><div class='card-body'><blockquote class='blockquote mb-0'><footer id='text-"+i+"' class='text blockquote-footer'>"+data[i].text+"</footer></blockquote></div></div>");
      
      // Modal
      $("#showNote").append("</div><div class='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title' id='exampleModalLabel'>Note for Article "+data[i].title+"</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div id='list-note'></div></br><div><textarea id='text-note"+data[i]._id+"'></textarea></div></div><div class='modal-footer'><button data-note='"+data[i]._id+"' type='button' class='note btn btn-primary' data-dismiss='modal'>Save note!</button></div></div></div>");
      }
    });

  // saved Note
  $(document).on("click", '.note', function(event) {
    event.preventDefault();
    var thisId = $(this).attr("data-note");
    var body = $("#text-note"+ thisId).val();
    newNote = {
      body: body
    }
    console.log(newNote);
    $.ajax({
      method: "POST",
      url: "/saved/note/"+thisId,
      data: newNote
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
      });
  });

  // Show note
  $(document).on("click", '.note-show', function(event) {
    event.preventDefault();
    $("#list-note").empty();
    $.ajax({
      method: "GET",
      url: "/noteshow/",
    })
      // With that done, add the note information to the page
      .then(function(data) {
        for (let i = 0; i < data.length; i++) {
        $("#list-note").append("<div class='card notemodal-"+data[i]._id+"'><div class='card-body'><div>"+data[i].body+"<button data-deletenote="+data[i]._id+" type='button' class='delete-note btn btn-outline-danger'>Delete</button></div></div></div>")
        }
      });
  });

  // Delete note
  $(document).on("click", '.delete-note', function(event) {
    event.preventDefault();
    var thisId = $(this).attr("data-deletenote");
    $.ajax({
      method: "DELETE",
      url: "/deletenote/"+ thisId,
    })
      // With that done, add the note information to the page
      .then(function(data) {
        $('.notemodal-' + thisId).remove(),
        console.log("Note have been deleted");
      });
  });

  
  // Delete Article
  $(document).on("click", '.Delete', function(event) {
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "DELETE",
      url: "/delete/"+ thisId,
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        $('#card-' + thisId).remove(),
        console.log("Article have been deleted");
      });
  });
    

    