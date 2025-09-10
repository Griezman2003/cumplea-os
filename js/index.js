
window.onload = function () {
  var merrywrap = document.getElementById("merrywrap");
  var box = merrywrap.getElementsByClassName("giftbox")[0];
  var step = 1;
  var stepMinutes = [2000, 2000, 1000, 1000];
  function init() {
    box.addEventListener("click", openBox, false);
  }
  function stepClass(step) {
    merrywrap.className = 'merrywrap';
    merrywrap.className = 'merrywrap step-' + step;
  }
  function openBox() {
    if (step === 1) {
      box.removeEventListener("click", openBox, false);
    }
    stepClass(step);
    if (step === 3) {
    }
    if (step === 4) {
      reveal();
      return;
    }
    setTimeout(openBox, stepMinutes[step - 1]);
    step++;
  }

  init();

};

function reveal() {
  document.querySelector('.merrywrap').style.backgroundColor = 'transparent';

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const width = canvas.width;
  const height = canvas.height;

  const numStars = 600;
  let stars = [];
  for(let i = 0; i < numStars; i++){
    stars.push({
      x: Math.random() * width - width/2,
      y: Math.random() * height - height/2,
      z: Math.random() * width,
      pX: 0,
      pY: 0,
      size: Math.random() * 2 + 0.5
    });
  }

  let frames = 0;
  function updateStars(){
    for(let star of stars){
      star.pX = star.x / (star.z / width);
      star.pY = star.y / (star.z / width);

      star.z -= 5;
      if(star.z <= 0){
        star.x = Math.random() * width - width/2;
        star.y = Math.random() * height - height/2;
        star.z = width;
        star.pX = 0;
        star.pY = 0;
        star.size = Math.random() * 2 + 0.5;
      }
    }
  }

  function drawStars(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, width, height);

    for(let star of stars){
      let x = star.x / (star.z / width) + width/2;
      let y = star.y / (star.z / width) + height/2;

      ctx.strokeStyle = `rgba(255,255,255,${1 - star.z/width})`;
      ctx.lineWidth = star.size;
      ctx.beginPath();
      ctx.moveTo(star.pX + width/2, star.pY + height/2);
      ctx.lineTo(x, y);
      ctx.stroke();

      star.pX = x - width/2;
      star.pY = y - height/2;
    }
  }

  function loop(){
    frames++;
    updateStars();
    drawStars();
    requestAnimationFrame(loop);

    // Después de cierta cantidad de frames, mostramos la carta
    if(frames === 600){ // ajusta el número para durar más o menos
      showLetter();
    }
  }

  loop();
}

function showLetter() {
  const letter = document.getElementById('letter'); // id correcto
  letter.classList.add('show');
}


