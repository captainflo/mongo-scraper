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
      $("#articlesSaved").append("<div id='card-"+data[i]._id+"' class='card'><div class='card-header'><button data-id="+data[i]._id+" type='submit' class='Delete btn btn-outline-primary'>Delete Article</button><button type='button' class=' note-show btn btn-primary' data-toggle='modal' data-target='#exampleModal' data-modal="+data[i]._id+">Note</button><a id='link-"+i+"' target='_blank' href='"+data[i].link+"'><h2  id='title-"+i+"'>"+ data[i].title + "</h2></a></div><div class='card-body'><blockquote class='blockquote mb-0'><footer id='text-"+i+"' class='text blockquote-footer'>"+data[i].text+"</footer></blockquote></div></div>");
      }
    });

  // Show note
  $(document).on("click", '.note-show', function(event) {
    event.preventDefault();
    var thisId = $(this).attr("data-modal");
    console.log(thisId);
    $("#list-note").empty();
    $.ajax({
      method: "GET",
      url: "/saved/"+ thisId,
    })
      // With that done, add the note information to the page
      .then(function(data) {
        $("#exampleModalLabel").text(data.title);
        $(".note").attr("id", data._id)
          for (let i = 0; i < data.note.length; i++) {
            $("#list-note").append("<div class='card notemodal-"+data.note[i]._id+"'><div class='card-body'><div>"+data.note[i].body+"<button data-note="+data.note[i]._id+" type='button' class='delete-note btn btn-outline-danger'>Delete</button></div></div></div>")
          }
      });
  });

    // saved Note
    $(document).on("click", '.note', function(event) {
      event.preventDefault();
      var thisId = $(".note").attr("id");
      var body = $("#note-text").val();
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
          $("#note-text").val('');
  
        });
    });

  // Delete note
  $(document).on("click", '.delete-note', function(event) {
    event.preventDefault();
    var thisId = $(this).attr("data-note");
    console.log(thisId);
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
    

    