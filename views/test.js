var RecController = (function() {
  var recorder = null;
  var mediaStream = null;
  var REC_DURATION = 5 * 1000;
  var captureUserMedia = function(successCallback) {
    // Initializes getUserMedia
    var session = {
        audio: true,
        video: false
    };
    navigator.getUserMedia(session, successCallback, function(error) {
        alert('Unable to capture audio. Please abort experiment.');
        console.error(error);
    });
    // Public methods
    return {
      startRecording: function(onRecorderTimeout) {
        /*
        Creates a recorder and a stream, and starts recoridng
        Accepts a callback to execute on recorder timeout
         */
        this.captureUserMedia(function(stream) {
            // Initialize stream and recorder
            mediaStream = stream;
            recorder = RecordRTC(stream, {
              type: 'audio',
              recorderType: StereoAudioRecorder,
              mimeType: 'audio/wav'
            });
            // Set duration of recording
            recorder.setRecordingDuration(REC_DURATION).onRecordingStopped(onRecorderTimeout);
            // Start recorder
            recorder.startRecording();
        };
      }
    };
  };
})();

var DataModel = (function() {

  var getResponse = function() {
    // Returns the response as a Number
    return Number($("input[name='response']:checked").val());
  };
  var getItem = function() {
    // Returns the content of the item
    return currentItem.content;
  };
  var getRecordedItem = function(lie, response) {
    // Determines what the question was
    if (lie) {
      if (response === -2 || response === -1) {
        return currentItem.content;
      }
      else {
        return currentItem.inverted;
      }
    }
    else {
      if (response === -2 || response === -1) {
        return currentItem.inverted;
      }
      else {
        return currentItem.content;
      }
    }
  };
  return {
    getFormData: function(lie, recorder) {
      // Returns the form data for the ajax response

      // Extract data
      var data = new FormData();
      var response = this.getResponse();
      var item = this.getItem();
      var recorder getRecordedItem(lie, response)
      var blob = recorder.getBlob();

      // Append to form
      data.append('blob', blob);
      data.append('response', response);
      data.append('item', item);
      data.append('recorded', recorded);
      data.append('label', lie);

      return data;
    }
  };
})();

var controller = (function(UICtr, RecCtr, DataModel) {

  // Set references to the controllers
  var UIController = UICtr;
  var RecController = RecCtr;
  var DataModel = DataModel;

  var makeRequest = function(data) {
    /*
    A function to make an ajax requets to the server.
    It receives a single parameter being the form data
    */

    // Create a request instance
    var xhr = new XMLHttpRequest();
    // Send data to /upload route
    xhr.open('POST', '/upload');
    xhr.send(data);
    // Redirect to expriment again, or handle error
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Redirect
          window.location = '/experiment';
        }
        else {
          // handle error
          console.log("Responded with status 200");
        }
      }
    }
  }
  var onRecordingFinished = function() {
    // The function to pass to on recording finished

  };
  // --- Add listener to response button
  $("#response-trigger").on("click", function(){
    // Get value of checkbutton
    let val = Number($("input[name='response']:checked").val());
    // Check value
    if (val === 0) {
      // 1. Extract item and respnse
      // 2. Make a post to upload
      console.log("Nothing");
    }
    else if (val === 1 || val === -1) {
      if (Math.random() > 0.5) {
        // 1. Show and ask for recording
      }
      else {
        // 1. Extract item and respnse
        // 2. Make a post to upload
      }
    }
    else {
      // 1. Show and ask for recording
    }
  });

})(UIController, RecController, DataModel);
