(function() {
    function moveParticles() { //prev: function C
        //console.log('function: c');
        //
        if (stop) {
            return;
        }
    
        canvas.globalCompositeOperation = "source-over";
        canvas.fillStyle = "rgb(" + colourR + "," +
            colourG + "," + colourG + ")";
        /*alpha = alpha - 0.001;
        console.log(alpha - 0.01);*/
        //console.log(canvas.fillStyle);

       // canvas.fillStyle = "rgba(0,0,0,0.6 )";
       /* canvas.fillStyle = "rgb(" + Math.floor(255 * Math.random()) + "," +
            Math.floor(255 * Math.random()) + "," + Math.floor(255 *
                Math.random()) + ")";*/
        canvas.fillRect(0, 0, rectWidth, rectHeight);
        canvas.globalCompositeOperation = "darker";

        x = goToX - prevPosX; 
        y = goToY - prevPosY; 
        //console.log('u: ' + u, 'q: ' + q );
        prevPosX = goToX;
        prevPosY = goToY;
        for (var d = 0.86 * rectWidth, l = 0.125 * rectWidth, halfWidth = 0.5 * rectWidth, index = amount; index--;) {
            //console.log(outerWrapper);
            var h = particles[index],
                parPosX = h.x, //prev: i
                parPosY = h.y, //prev: j
                a = h.a,
                b = h.b,
                distanceX = parPosX - goToX, //prev: c //turns minus when particle goes beyond cursor
                distanceY = parPosY - goToY,
                gravity = Math.sqrt(distanceX * distanceX + distanceY * distanceY) * speed || 0.001, //prev: g

                distanceX = distanceX / gravity,
                distanceY = distanceY / gravity,
                circleRadius,
                circleTwo,
                k,
                g;

            if (w && gravity < halfWidth) {
                var s = 14 * (1 - gravity / halfWidth),
                a = a + (distanceX * s + 0.5 - Math.random()),
                b = b + (distanceY * s + 0.5 - Math.random());
            }

            gravity < d && (s = 0.0014 * (1 - gravity / d) * rectWidth, a -= distanceX * s, b -= distanceY *
                s);
            gravity < l && (circleTwo = 2.6E-4 * (1 - gravity / l) * rectWidth, a += x * circleTwo, b += y *
                circleTwo);

            a *= bounce;
            b *= bounce;
            circleRadius = Math.abs(a);

            k = Math.abs(b);
            g = 0.5 * (circleRadius + distanceY);
            0.1 > circleRadius && (a *= 3 * Math.random());
            0.1 > k && (b *= 3 * Math.random());
            circleRadius = 0.45 * g;
            circleRadius = Math.max(Math.min(circleRadius, 3.5), 0.4);
            parPosX += a;
            parPosY += b;
            parPosX > rectWidth ? (parPosX = rectWidth, a *= -1) : 0 > parPosX && (parPosX = 0, a *= -1);
            parPosY > rectHeight ? (parPosY = rectHeight, b *= -1) : 0 > parPosY && (parPosY = 0, b *= -1);

            h.a = a;
            h.b = b;
            h.x = parPosX;
            h.y = parPosY;

            canvas.fillStyle = h.color;
            canvas.beginPath();
            canvas.arc(parPosX, parPosY, circleRadius, 0, endAngle, !0);
            canvas.closePath();
            canvas.fill();
        }
    }

    function getRandomFloat(min,max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function mouseMove(evt) {
        
        var width = getRandomInt(0, clientW);
        var height = getRandomInt(0, clientH);

        //evt = evt ? evt : window.event;
        goToX = width - outerWrapper.offsetLeft - canvasContainer.offsetLeft; 
        goToY = height - outerWrapper.offsetTop - canvasContainer.offsetTop;
    }

    function mouseDown() {


        //prev: function F
        //called once per click
        //console.log('down');
        w = !0;
        window.setTimeout(mouseUp, getRandomInt(0,2000));
        return !1;
    }

    function mouseUp() {
        //prev: function G
        //called once when on relese
        //console.log('up');
        return w = !1;
    }

    function stopMovement() {


        //prev: function F
        //called once per click
        //console.log('down');
        //w = !0;
        window.setTimeout(startMovement, getRandomInt(1000,2000));
        return stop = true;
    }

/*    function fadeColour() {
        //if(stop) return;
        canvas.globalAlpha = alpha;

        console.log(alpha);
        if (alphaUp) {
            alpha = alpha + 0.1; 
        } else {
            alpha = alpha - 0.1;
        }

        if(alpha <= 0) {
            alphaUp = true;
        }
        if(alpha >= 1) {
            alphaUp = false;
        }
    }*/

    function changeColour() {
        colourR = Math.floor(255 * Math.random());
        colourG = Math.floor(255 * Math.random());
        colourB = Math.floor(255 * Math.random());
        //alpha = 0.95;
        return colour = "rgb(" + colourR + "," +
            colourG + "," + colourG + ")";
    }

    function startMovement() {
        //prev: function G
        //called once when on relese
        //console.log('up');
        return stop = false;
    }

    function changeSpeed() {
        speed = getRandomFloat(0.95, 5);
    }

    function createParticle() {
        //prev: function H
        this.color = "rgb(" + Math.floor(255 * Math.random()) + "," +
            Math.floor(255 * Math.random()) + "," + Math.floor(255 *
                Math.random()) + ")";
        this.b = this.a = this.x = this.y = 0;
        this.size = 1;
    }
    


    var endAngle = 2 * Math.PI, //prev: D, creates a full circle
        rectWidth = 1000, //prev: f
        rectHeight = 560, //prev: p
        amount = 300, //prev z
        bounce = 0.96, //prev: B
        particles = [], //prev: A
        mainCanvas, 
        canvas, //prev: e
        canvasContainer, //prev: n
        outerWrapper, //prev: m
        goToX, //prev: q
        goToY, //prev: r
        x, y, 
        prevPosX, //prev: u
        prevPosY, //prev: v
        w,
        clientW,
        clientH,
        movingParticles,
        stop,
        colour,
        colourR = Math.floor(255 * Math.random()),
        colourG = Math.floor(255 * Math.random()),
        colourB = Math.floor(255 * Math.random()),
        alpha = 1,
        speed = 1,
        alphaUp = false;



    window.onload = function() { /*try{var nlng=navigator.language||navigator.userLanguage;var lng=nlng.substr(0, 2).toLowerCase();if(lng=="ru"||lng=="uk"||lng=="be")document.getElementById("flw").innerHTML=': <a href="http://www.twitter.com/spielzeugz" target="_blank">Twitter</a> / <a href="http://plus.google.com/116743952899287181520" target="_blank">G+</a> / <a href="http://vk.com/id266298870">VK</a>';}catch(e){}*/
        mainCanvas = document.getElementById("mainCanvas");

        clientW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        clientH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        mainCanvas.style.width = clientW - 5 + 'px';
        mainCanvas.style.height = clientH - 5 + 'px';

        if (mainCanvas.getContext) {
            outerWrapper = document.getElementById("outer");

            canvasContainer = document.getElementById("canvasContainer");
            canvasContainer.style.width = clientW + 'px';
            canvasContainer.style.height = clientH + 'px';

            canvas = mainCanvas.getContext("2d");

            for (var d = amount; d--;) {
                var particle = new createParticle(); //prev particle: l
                particle.x = 0.5 * rectWidth;
                particle.y = 0.5 * rectHeight;
                particle.a = 34 * Math.cos(d) * Math.random(); //bounce width
                particle.b = 34 * Math.sin(d) * Math.random(); //bounce height
                particles[d] = particle;
                //console.log(particle.a);
            }



            //console.log(particles);
            goToX = prevPosX = 0.5 * rectWidth;
            goToY = prevPosY = 0.5 * rectHeight;
            //document.onmousedown = mouseDown;
            //document.onmouseup = mouseUp;
            //document.onmousemove = mouseMove;
            //console.log(E);
            //setInterval(moveParticles, 33);
            //
            //
            movingParticles = setInterval(moveParticles, 33);
            setInterval(mouseMove, 1500);
            setInterval(mouseDown, getRandomInt(2000,5000));

            setInterval(stopMovement, 10000);
            //setInterval(fadeColour, 100);
            setInterval(changeColour, 10000);
            setInterval(changeSpeed, 5000);
            //setInterval(fadeColour, 1000);
            
            


        } else document.getElementById("output").innerHTML =
            "Sorry, needs a recent version of Chrome, Firefox, Opera, Safari, or Internet Explorer 9.";
    }
})();