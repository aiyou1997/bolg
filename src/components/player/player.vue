<template>
    <div class="player" :style="style" ref="player">
        <p class="close" @click="closeControl">{{close}}</p>
        <div v-show="offClose" class="control">
            <img :src="imgUrl" />
            <div class="play" v-show="stop" @click="playControl"></div>
            <div class="stop" v-show="!stop" @click="playControl"></div>
            <div
                class="volume"
                ref="volume"
                @click.self="volumeControl"
                @mouseenter="volumeBarAppear($event)"
                @mouseout="volumeBarAppear($event)"
            >
                <div
                    class="volumeBar"
                    ref="volumeBar"
                    @mouseenter="volumeBarAppear($event)"
                    @mouseup="volumeBarAppear($event)"
                    @mousedown="volumeBarAppear($event)"
                    @mousemove="volumeBarAppear($event)"
                ></div>
                <span v-show="volumeZero" @click.self="volumeControl">/</span>
            </div>
            <div class="searchIcon" @click="searchControl"></div>
        </div>
        <search v-show="searchOpen" @getM4aUrl="getM4aUrl" />
        <audio :src="M4aUrl" ref="audio" autoplay loop></audio>
        <div
            class="seekBar"
            ref="seekBar"
            @mouseup="seekBarMove($event)"
            @mousedown="seekBarMove($event)"
            @mousemove="seekBarMove($event)"
        ></div>
        <div class="information" v-show="offClose">
            <span>{{(this.currentTime-this.currentTime%60)/60}}:{{Math.floor(this.currentTime%60)}}</span> /
            <span>{{(this.songTime-this.songTime%60)/60}}:{{Math.floor(this.songTime%60)}}</span>
            <br />
            <span class="songname">{{songName}}</span> -
            <span class="singer">{{singer}}</span>
        </div>
    </div>
</template>

<script>
import search from "./search/search.vue";

export default {
    name: "player",
    data() {
        return {
            style: {
                top: "346px",
                right: "-1px"
            },
            y: 0,
            //控制台信息
            close: "-",
            offClose: true,
            stop: true,
            volumeZero: false,
            searchOpen: false,
            volume: 0.2,
            //歌曲信息
            M4aUrl: [],
            imgUrl: "",
            songName: "",
            singer: "",
            songTime: 0,
            canMove: false,
            currentTime: 0
        };
    },
    methods: {
        keepPosition() {
            this.y = window.scrollY;
            this.style = {
                top: 346 + this.y + "px",
                right: "-1px"
            };
        },
        getM4aUrl(M4aUrl, name, pmid, singer) {
            this.stop = false;
            this.songName = name;
            this.imgUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${pmid}.jpg?max_age=2592000`;
            this.singer = singer;
            return (this.M4aUrl = M4aUrl);
        },
        closeControl() {
            if (this.close === "-") {
                this.offClose = !this.offClose;
                this.$refs.player.style.width = 0;
                this.searchOpen = false;
                return (this.close = "+");
            } else {
                this.offClose = !this.offClose;
                this.$refs.player.style.width = "240px";
                return (this.close = "-");
            }
        },
        playControl() {
            if (this.stop) {
                this.$refs.audio.play().then(() => {
                    return (this.stop = false);
                });
            } else {
                this.$refs.audio.pause();
                return (this.stop = true);
            }
        },
        volumeControl() {
            if (this.$refs.audio.volume === 0) {
                this.$refs.audio.volume = this.volume;
                this.volumeZero = false;
            } else {
                this.$refs.audio.volume = 0;
                this.volumeZero = true;
            }
        },
        volumeBarAppear(event) {
            switch (event.type) {
                case "mouseenter":
                    this.$refs.volumeBar.style.display = "block";
                    break;
                case "mouseout":
                    this.$refs.volumeBar.style.display = "none";
                    this.canMove = false;
                    break;
                case "mousedown":
                    this.canMove = true;
                    break;
                case "mousemove":
                    if (this.canMove) {
                        this.volume = (120-event.offsetY) / 120;
                    }
                    break;
                case "mouseup":
                    this.canMove = false;
                    this.volume = (120-event.offsetY) / 120;
                    break;
            }
        },
        searchControl() {
            return (this.searchOpen = !this.searchOpen);
        },
        seekBarMove(event) {
            switch (event.type) {
                case "mousedown":
                    this.canMove = true;
                    break;
                case "mousemove":
                    if (this.canMove) {
                        this.currentTime =
                            (event.offsetX / 226) * this.songTime;
                        this.$refs.audio.currentTime = this.currentTime;
                    }
                    break;
                case "mouseup":
                    this.canMove = false;
                    this.currentTime = (event.offsetX / 226) * this.songTime;
                    this.$refs.audio.currentTime = this.currentTime;
                    break;
            }
        }
    },
    components: {
        search
    },
    watch: {
        volume() {
			this.$refs.volumeBar.style.background = `linear-gradient(to top,skyblue ${this.volume*100}%,white ${this.volume*100}%)`;
			this.$refs.audio.volume = this.volume;
            if (this.volume === 0) {
                return this.volumeZero = true;
            }else{
				return this.volumeZero = false;
			}
        }
    },
    mounted() {
        this.$refs.audio.volume = 0.2;
        window.addEventListener("scroll", this.keepPosition);
        // window.addEventListener("error", function(event) {
        //     console.log(event);
        //     alert("此歌曲没有版权 QAQ");
        // });
        this.$refs.audio.addEventListener("play", () => {
            this.songTime = this.$refs.audio.duration;
        });
        this.$refs.audio.addEventListener("timeupdate", () => {
            this.currentTime = this.$refs.audio.currentTime;
            this.$refs.seekBar.style.background = `linear-gradient(to right, rgb(243, 49, 49) ${(this
                .currentTime *
                100) /
                this.songTime}%, #aaa ${(this.currentTime * 100) /
                this.songTime}%)`;
        });
    }
};
</script>

<style lang='scss' scoped>
.player {
    position: absolute;
    width: 240px;
    height: 118px;
    border: 1px black solid;
    background-color: #fff;
    transform: translateX(-2px);
    .close {
        position: absolute;
        width: 16px;
        height: 16px;
        border: 1px black solid;
        border-radius: 16px 16px;
        top: -11px;
        right: 2px;
        font-size: 12px;
        user-select: none;
    }
    .control {
        height: 60px;
        img {
            display: inline-block;
            width: 60px;
            height: 60px;
        }
        div {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 30px 30px;
            border: 1px black solid;
            margin: 14px 14px;
            transform: translateX(-6px);
        }
        .play {
            background: url(../../common/images/play.jpg) no-repeat;
            background-size: 120%;
            background-position: center;
        }
        .stop {
            background: url(../../common/images/stop.jpg) no-repeat;
            background-size: 80%;
            background-position: center;
        }
        .volume {
            background: url(../../common/images/volume.jpg) no-repeat;
            background-size: 80%;
            background-position: center;
            .volumeBar {
                display: none;
                position: absolute;
                width: 8px;
                height: 120px;
                background: linear-gradient(to top, skyblue 20%, white 20%);
                bottom: 15px;
                right: -10px;
				z-index: 100;
            }
            span {
                position: absolute;
                font-size: 40px;
                user-select: none;
                transform: translateX(-3px) translateY(-5px);
                color: black;
				z-index: -1;
            }
        }
        .searchIcon {
            background: url(../../common/images/search.jpg) no-repeat;
            background-size: 80%;
            background-position: center;
        }
    }
    .seekBar {
        position: absolute;
        width: 94%;
        height: 4px;
        margin: 7px 0 7px 0;
        right: -1px;
        background: linear-gradient(to right, rgb(243, 49, 49) 0, #aaa 0);
        transform: translateX(-7px);
    }
    .information {
        position: absolute;
        width: 100%;
        height: 40px;
        bottom: 0;
        span {
            margin: 0 3px;
        }
    }
}
</style>