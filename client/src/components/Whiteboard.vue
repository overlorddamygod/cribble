<template>
    <div class="a" ref="parent">
        <div class="colors">
            <div 
                v-for="color in colors" 
                :key="color" 
                :style="{
                    background:color,
                    cursor:'pointer'
                    }" 
                class="color"
                @click="changeColor(color)"
            />
            <button @click="$socket.client.emit('clearCanvas',roomId)">X</button>
            <button @click="current.width=3">3</button>
            <button @click="current.width=7">7</button>
            <button @click="current.width=10">10</button>
            <button @click="current.width=13">13</button>
        </div>
        <canvas class="whiteboard" ref="whiteboard"></canvas>
    </div>
</template>

<script>
export default {
    mounted() {
        this.board=this.$refs.whiteboard
        this.context=this.board.getContext('2d')
        this.board.addEventListener('mousedown', this.onMouseDown, false);
        this.board.addEventListener('mouseup', this.onMouseUp, false);
        this.board.addEventListener('mouseout', this.onMouseUp, false);
        this.board.addEventListener('mousemove', this.throttle(this.onMouseMove,10), false);
        window.addEventListener('resize', this.onResize, false);
        this.onResize();

        // Todo : imagebase64
        // var image = new Image();
        // image.src = this.image64
        // console.log(this.image64);
        
        // this.context.drawImage(image, 0, 0);

    },
    data:()=>({
        drawing:false,
        board:'',
        current:{
            color:'black',
            x:'',
            y:'',
            width:3
        },
        context:'',
        colors:['black','red','white','green','pink','brown','yellow','blue']
    }),
    watch: {
        image64:function () {
            // var image = new Image();
            // image.src = this.image64
            // console.log(this.image64);
        
            // this.context.drawImage(image, 0, 0);
        }
    },
    props:['roomId','image64'],
    methods: {
        clearCanvas() {
            this.context.clearRect(0, 0, this.board.width, this.board.height);
        },
        onMouseDown(e){
            this.drawing = true;
            this.current.x = e.clientX-this.board.getBoundingClientRect().x
            this.current.y = e.clientY -this.board.getBoundingClientRect().y
        },
        onMouseUp(e){
            if (!this.drawing) { return; }
            this.drawing = false;
            this.drawLine(this.current.x, this.current.y,e.clientX-this.board.getBoundingClientRect().x, e.clientY -this.board.getBoundingClientRect().y,{color:this.current.color}, true);
        },
        onMouseMove(e){
            if (!this.drawing) { return; }
            this.drawLine(this.current.x, this.current.y,e.clientX-this.board.getBoundingClientRect().x, e.clientY -this.board.getBoundingClientRect().y,{color:this.current.color}, true);
            this.current.x = e.clientX-this.board.getBoundingClientRect().x
            this.current.y = e.clientY-this.board.getBoundingClientRect().y
        },
        changeColor(color){
            this.current.color = color
        },
        drawLine(x0, y0, x1, y1, {
            color,
            width
        }, emit){
            this.context.beginPath();
            this.context.moveTo(x0, y0);
            this.context.lineTo(x1, y1);
            this.context.strokeStyle = color;
            this.context.lineWidth = width? width: this.current.width;
            this.context.stroke();
            this.context.closePath();

            if (!emit) { return; }
            var w = this.board.width;
            var h = this.board.height;

            this.$socket.client.emit('drawing', {
                x0: x0 / w,
                y0: y0 / h,
                x1: x1 / w,
                y1: y1 / h,
                color: color,
                width:width? width: this.current.width,
                roomId:this.roomId,
                // image64:this.board.toDataURL("image/png")           
            });
        },
        throttle(callback, delay) {
            var previousCall = new Date().getTime();
            return function() {
            var time = new Date().getTime();

            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
            };
        },
        onDrawingEvent(data){
            var w = this.board.width;
            var h = this.board.height;
            this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, {
                color:data.color,
                width:data.width
            });
        },
        onResize() {
            this.board.width = this.$refs.parent.clientWidth;
            this.board.height = this.$refs.parent.clientHeight;
        }
    },
    sockets: {
        drawing(data) {
            this.onDrawingEvent(data)
        },
        clearCanvas() {
            this.clearCanvas()
        }
    }   
}
</script>

<style>
.whiteboard {
  height: 100%;
  width: 100%;
  position: absolute;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 1px solid red;
}
.a {
    position: relative;
    height:100%;
    border:2px yellow solid;
}
.colors {
  position: fixed;
  bottom:0
}

.color {
  display: inline-block;
  height: 48px;
  width: 48px;
}

.color.black { background-color: black; }
.color.red { background-color: red; }
.color.green { background-color: green; }
.color.blue { background-color: blue; }
.color.yellow { background-color: yellow; }
</style>
