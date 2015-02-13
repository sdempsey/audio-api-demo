<?php get_header(); ?>

<div class="container">
  <header>
    <h1>Web Audio API (Sinewave)</h1>
    <h2>Music: Kavinsky ft. The Weekend - Odd Look</h2>
    <p id="not-supported"></p>
  </header>
  <canvas id="visualizer" width="956" height="100"></canvas>
  <section class="status">
    <span>Audio: </span><span id="audio-status"></span>
  </section>
  <section class="controls" id="controls">
    <a id="play" class="button"><i class="fa fa-play"></i></a>
    <a id="pause" class="button"><i class="fa fa-pause"></i></a>
    <a id="stop" class="button"><i class="fa fa-stop"></i></a>
  </section>
</div>

<?php get_footer(); ?>