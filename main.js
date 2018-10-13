
  
  var yyy = document.getElementById('xxx')
  var context = yyy.getContext('2d');

  autoSetCanvasSize(yyy)

  listenToMouse(yyy)

  var eraserEnabled = false

  brush.onclick = function () {
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
    xxx.className="brush"
  }

  eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
    xxx.className="eraser"
  }

  var flag =false//有bug下次记得解决
  remove.onclick = function() {
    if(flag == false){
      flag = true
      context.clearRect(0, 0, yyy.clientWidth, yyy.clientHeight)
      remove.classList.add('click');
      setTimeout(() => {
          remove.classList.remove('click');
          flag = false
      }, 800);
    }

    
  }

  download.onclick = function(){
    var url = yyy.toDataURL("image/png")
    var a = document.createElement('a')
    
    document.body.appendChild(a)
    a.href = url
    a.download = 'myCanvas'
    a.target = '_blank'
    a.click()
  }

  red.onclick = function () {
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
  }

  green.onclick = function () {
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
  }

  blue.onclick = function () {
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
  }

  thin.onclick = function(){
     context.lineWidth = 2
  }

  middle.onclick = function () {
    context.lineWidth = 5
  }

   thick.onclick = function () {
     context.lineWidth = 10
   }

   

  //自定义工具函数

  //设置画布大小
  function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.setCanvasSize = function () {
      setCanvasSize()
    }

    function setCanvasSize() {
      var pageWidth = document.documentElement.clientWidth;
      var pageHeight = document.documentElement.clientHeight;

      canvas.width = pageWidth;
      canvas.height = pageHeight;
    }
  }


  //圆
  function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  //划线
  function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1) //起点
   
    context.lineTo(x2, y2) //终点
    context.stroke()
    context.closePath()
  }

  function listenToMouse(canvas) {
    var using = false;
    var lastPoint = {
      "x": undefined,
      "y": undefined
    }

    if (document.body.ontouchstart !== undefined) {
      //移动端
      canvas.ontouchstart = function (e) {
        console.log(e)
        var x = parseInt(e.touches[0].clientX)
        var y = parseInt(e.touches[0].clientY)
        console.log(x, y)
        using = true
        if (eraserEnabled) {
          context.clearRect(x - 10, y - 10, 20, 20)
        } else {
          lastPoint = {
            "x": x,
            "y": y
          }
        }
      }

      canvas.ontouchmove = function (e) {
        var x = parseInt(e.touches[0].clientX)
        var y = parseInt(e.touches[0].clientY)
        if (!using) {
          return
        }
        if (eraserEnabled) {
          context.clearRect(x - 10, y - 10, 20, 20)
        } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      }

      canvas.ontouchend = function () {
        using = false
      }
    } else {
      //pc端
      canvas.onmousedown = function (e) {
        var x = e.clientX+3
        var y = e.clientY+27
        using = true
        if (eraserEnabled) {
          context.clearRect(x - 10, y - 10, 20, 20)
        } else {
          lastPoint = {
            "x": x,
            "y": y
          }
        }
      }
      canvas.onmousemove = function (e) {
        var x = e.clientX+3
        var y = e.clientY+27
        if (!using) {
          return
        }
        if (eraserEnabled) {
          context.clearRect(x - 10, y - 10, 20, 20)
        } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      }
      canvas.onmouseup = function (e) {
        using = false
      }
    }
  }