<template>
    <div class="container">
        <div class="heading">
            <h1 class="title">2048</h1>
            <score></score>
        </div>
        <overlay v-if="gameOver || gameWon"></overlay>
        <board></board>
    </div>
</template>

<script>
    import Board from './components/Board.vue'
    import Score from './components/Score.vue'
    import Overlay from './components/Overlay.vue'

    export default {
        name: 'app',
        computed: {
            gameOver() {
                return this.$store.getters.gameOver;
            },
            gameWon() {
                return this.$store.getters.gameWon;
            }
        },
        methods: {
        },
        components: {
            Board,
            Score,
            Overlay
        }
    }
</script>

<style>
    html, body {
        margin: 0;
        padding: 0;
        background: #faf8ef;
        color: #776E65;
        font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
        font-size: 18px;
    }

    body {
        margin: 80px 0;
    }

    .heading:after {
        content: "";
        display: block;
        clear: both;
    }

    h1.title {
        font-size: 80px;
        font-weight: bold;
        margin: 0;
        display: block;
        float: left;
    }

    .container {
        width: 500px;
        margin: 0 auto;
    }

    .game-container {
        margin-top: 40px;
        position: relative;
        padding: 15px;
        cursor: default;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        background: #bbada0;
        border-radius: 6px;
        width: 500px;
        height: 500px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    @-webkit-keyframes $animation-name {
        0% {
            opacity: 0;
            -webkit-transform: scale(0);
            -moz-transform: scale(0);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
        }
    }
    @-moz-keyframes $animation-name {
        0% {
            opacity: 0;
            -webkit-transform: scale(0);
            -moz-transform: scale(0);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
        }
    }
    @keyframes $animation-name {
        0% {
            opacity: 0;
            -webkit-transform: scale(0);
            -moz-transform: scale(0);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
        }
    }
    .tile-new {
        -webkit-animation: appear 200ms ease 100ms;
        -moz-animation: appear 200ms ease 100ms;
        -webkit-animation-fill-mode: both;
        -moz-animation-fill-mode: both;
    }

    @-webkit-keyframes $animation-name {
        0% {
            -webkit-transform: scale(0);
            -moz-transform: scale(0);
        }
        50% {
            -webkit-transform: scale(1.2);
            -moz-transform: scale(1.2);
        }
        100% {
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
        }
    }
    @-moz-keyframes $animation-name {
        0% {
            -webkit-transform: scale(0);
            -moz-transform: scale(0);
        }
        50% {
            -webkit-transform: scale(1.2);
            -moz-transform: scale(1.2);
        }
        100% {
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
        }
    }
    @keyframes $animation-name {
        0% {
            -webkit-transform: scale(0);
            -moz-transform: scale(0);
        }
        50% {
            -webkit-transform: scale(1.2);
            -moz-transform: scale(1.2);
        }
        100% {
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
        }
    }
</style>
