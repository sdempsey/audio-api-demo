audioController = (function($) {
	var context, source, soundSource, soundUrl,
		play, stop, pause, sound,
		win, doc, audioStatus,
		notSupported, canvas,
		analyser, stream, controls;

	function onDocumentReady() {
		win = $(window);
		doc = $(document);
		soundUrl = '//katiebaca.com/tutorial/odd-look.mp3';
		play = $(document.getElementById('play'));
		pause = $(document.getElementById('pause'));
		stop = $(document.getElementById('stop'));
		notSupported = document.getElementById('not-supported');
		audioStatus = document.getElementById('audio-status');
		controls = $(document.getElementById('controls'));
		canvas = document.getElementById('visualizer');
		canvasCtx = canvas.getContext('2d');



  		init();

  		win.on('load', function() {
  			play.on('click', function() {
  				playSound(sound);
  			});

  			stop.on("click", stopSound);
  			pause.on("click", pauseSound);
  		});
	}

	function init(callback) {
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
  			context = new AudioContext();
	    	analyser = context.createAnalyser();
			analyser.minDecibels = -90;
			analyser.maxDecibels = -10;	    
			analyser.smoothingTimeConstant = 0.85;
			loadSound(soundUrl);
			audioStatus.innerHTML = " Loading Audio ";
			audioStatus.className = "loading";
			controls.addClass("loading");

		} catch(e) {
			// API not supported
			notSupported.className = "not-supported";
    		notSupported.innerHTML = "Web Audio API is not supported in this browser";
		}

		if (callback) {
			callback();
		}
	}

	function loadSound(url) {
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';

		request.onload = function() {
			// request.response is encoded... so decode it now
			context.decodeAudioData(request.response, function(buffer) {
				sound = buffer;
				audioStatus.innerHTML = "Ready!";
				audioStatus.className = "ready";
				controls.removeClass("loading");
				setTimeout(function() {
					audioStatus.className = "";
				}, 1500);
			}, function(err) {
					notSupported.className = "not-supported";
    				notSupported.innerHTML = "Failed to Load Sound - Check the console";
				}
			);
		};

	  request.send();
	}

	function onWindowLoad() {
		play.on('click', function() {
			playSound(sound);
		});
	}

	function playSound(buffer) {
		if (audioStatus.innerHTML === "Paused") {
			audioStatus.innerHTML = "Playing";
			source.connect(analyser);
			return false;
		}

		if (audioStatus.innerHTML === "Playing") {
			return false;
		}
	    source = context.createBufferSource();
	    source.buffer = buffer;	
	    analyser.connect(context.destination);
		source.connect(analyser);
		source.start();
	    visualize();
	    audioStatus.innerHTML = "Playing";
	}

	function pauseSound() {
		if (audioStatus.innerHTML != "Paused") {
			audioStatus.innerHTML = "Paused";
			source.disconnect(analyser);
		}
		
	}

	function stopSound() {
		source.stop(0);
		audioStatus.innerHTML = "Stopped";
	}

	function visualize() {
		WIDTH = canvas.width;
		HEIGHT = canvas.height;

		analyser.fftSize = 2048;
		var bufferLength = analyser.frequencyBinCount; // half the FFT value
		var dataArray = new Uint8Array(bufferLength); // create an array to store the data

		canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

		function draw() {

			drawVisual = requestAnimationFrame(draw);

			analyser.getByteTimeDomainData(dataArray); // get waveform data and put it into the array created above

			canvasCtx.fillStyle = '#181818'; // draw wave with canvas
			canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

			canvasCtx.lineWidth = 2;
			canvasCtx.strokeStyle = '#3cfd2a';

			canvasCtx.beginPath();

			var sliceWidth = WIDTH * 1.0 / bufferLength;
			var x = 0;

			for(var i = 0; i < bufferLength; i++) {

				var v = dataArray[i] / 128.0;
				var y = v * HEIGHT/2;

				if(i === 0) {
					canvasCtx.moveTo(x, y);
				} else {
					canvasCtx.lineTo(x, y);
				}

				x += sliceWidth;
			}

			canvasCtx.lineTo(canvas.width, canvas.height/2);
			canvasCtx.stroke();
		}

		draw();  
	}

	$(onDocumentReady);
})(jQuery);