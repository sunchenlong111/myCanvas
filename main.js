  var yyy = document.getElementById('xxx')
  var context = yyy.getContext('2d');

  autoSetCanvasSize(yyy)

  listenToMouse(yyy)

  var eraserEnabled = false

  eraser.onclick = function () {
    eraserEnabled = true
    actions.className = "actions x"
  }

  brush.onclick = function () {
    eraserEnabled = false
    actions.className = "actions"
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
    context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  //划线
  function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1, y1) //起点
    context.lineWidth = 5
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
        console.log('开始摸我了')
      }

      canvas.ontouchmove = function (e) {
        console.log('边摸边动')
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
        console.log('摸完了')
        using = false
      }
    } else {
      //pc端
      canvas.onmousedown = function (e) {
        var x = e.clientX
        var y = e.clientY
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
        var x = e.clientX
        var y = e.clientY
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