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
      $("#articlesSaved").append("<div id='card-"+data[i]._id+"' class='card'><div class='card-header'><button data-id="+data[i]._id+" type='submit' class='Delete btn btn-outline-primary'>Delete Article</button><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>Article Note</button><a id='link-"+i+"' target='_blank' href='"+data[i].link+"'><h2  id='title-"+i+"'>"+ data[i].title + "</h2></a></div><div class='card-body'><blockquote class='blockquote mb-0'><footer id='text-"+i+"' class='text blockquote-footer'>"+data[i].text+"</footer></blockquote></div></div>");
      // Modal
      $("#showNote").append("</div><div class='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title' id='exampleModalLabel'>Note for Article "+data[i].title+"</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'>Here My List NOTE<div><textarea id='text-note"+data[i]._id+"'></textarea></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button><button data-note='"+data[i]._id+"' type='button' class='note btn btn-primary'>Save changes</button></div></div></div>");
      }
    });

  // saved Note
  $(document).on("click", '.note', function(event) {
    event.preventDefault();
    var thisId = $(this).attr("data-note");
    console.log(thisId);
    var body = $("#text-note"+ thisId).val();
    newNote = {
      body: body
    }
    console.log(newNote);
    $.ajax({
      method: "POST",
      url: "/saved/note/",
      data: newNote
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
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

  // </div><div class='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title' id='exampleModalLabel'>Note for Article "+data[i].title+"</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'>Here My NOTE</div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary'>Save changes</button></div></div></div>
    

    