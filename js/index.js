var fleche = document.querySelector('.menu-ouvrir');
var menu = document.querySelector('.menu');

fleche.addEventListener('click', function() {
  menu.classList.toggle('menu-ouvert');
});

var imagesDeFond = document.querySelectorAll('.slide');
var nbImagesDeFond = imagesDeFond.length;
var imageDeFondActuelle = Math.floor(Math.random() * nbImagesDeFond);

var slider = document.querySelector('.slides');
var projets = document.querySelectorAll('.Projet');
var controlDroit = document.querySelector('.controls-droite');
var controlGauche = document.querySelector('.controls-gauche');
var titreMenu = document.querySelector('#nomprojet');
if (titreMenu) {
  var ancienTitreMenu = titreMenu.innerText;
}

if (controlDroit) {
  controlDroit.addEventListener('click', droite);
  controlGauche.addEventListener('click', gauche);
}

init();
function droite() {
  if (imageDeFondActuelle !== nbImagesDeFond - 1) {
    imageDeFondActuelle += 1;
  } else {
    imageDeFondActuelle = 0;
  }
  deplacer('droite');
}

function gauche() {
  if (imageDeFondActuelle === 0) {
    imageDeFondActuelle = nbImagesDeFond - 1;
  } else {
    imageDeFondActuelle -= 1;
  }
  deplacer('gauche');
}

function deplacer(direction) {
  if (direction === 'droite' && imageDeFondActuelle === 0) {
      slider.style.transition = 'none';
      slider.style.transform = 'translate3d(0,0,0)';
  }
  if (direction === 'gauche' && imageDeFondActuelle === nbImagesDeFond - 1) {
      slider.style.transition = 'none';
      slider.style.transform = 'translate3d(-'+ ((nbImagesDeFond * 100) + 100) +'%,0,0)';
  }
  setTimeout(function(){
    slider.style.transition = 'transform .5s';
    slider.style.transform = 'translate3d(-'+ ((imageDeFondActuelle * 100) + 100) +'%,0,0)';
  }, 0);
}

if (projets) {
  Array.from(projets).forEach(function(p) {
    var t = p.querySelector('h3');
    if (t) {
      var titre = t.innerText;
    }
    if (t) {
      p.addEventListener('mouseenter', function(e) {
        titreMenu.innerText = titre;
        document.body.style.background = p.getAttribute('data-couleur');
      });
      p.addEventListener('mouseleave', function(e) {
        titreMenu.innerText = ancienTitreMenu;
        document.body.style.background = 'white';
      });
    }
  });
}

function init() {
  var a = Array.from(imagesDeFond);
  if(slider) {
    slider.style.transform = 'translate3d(-'+ ((imageDeFondActuelle * 100) + 100) +'%,0,0)';
    slider.appendChild(a[0].cloneNode());
    slider.prepend(a[a.length - 1].cloneNode());
    imagesDeFond = document.querySelectorAll('.slide');
    a = Array.from(imagesDeFond);
    a.forEach(function(image, index) {
      image.style.position = 'absolute';
      image.style.top = 0;
      image.style.left = index * 100 + '%';
    });
  }
}
