<template>
    <div class="score-container">{{score}}</div>
</template>

<style scoped>
    .score-container {
        position: relative;
        float: right;
        background: #bbada0;
        padding: 15px 25px;
        font-size: 25px;
        height: 25px;
        line-height: 47px;
        font-weight: bold;
        border-radius: 3px;
        color: white;
        margin-top: 8px;
    }
    .score-container:after {
        position: absolute;
        width: 100%;
        top: 10px;
        left: 0;
        content: "Score";
        text-transform: uppercase;
        font-size: 13px;
        line-height: 13px;
        text-align: center;
        color: #eee4da;
    }
    .score-container .score-addition {
        position: absolute;
        right: 30px;
        color: red;
        font-size: 25px;
        line-height: 25px;
        font-weight: bold;
        color: rgba(119, 110, 101, 0.9);
        z-index: 100;
        -webkit-animation: move-up 600ms ease-in;
        -moz-animation: move-up 600ms ease-in;
        -webkit-animation-fill-mode: both;
        -moz-animation-fill-mode: both;
    }
</style>

<script>
    export default {
        computed: {
            score () {
                return this.$store.getters.score
            }
        }
    }
</script>