<template>
    <transition name="modal" appear>
    <div @touchmove.stop class="posf cover ofa vc lh tc z-max bg-semi modal-mask">
        <div class="dib m15 ofh vm bdrs6 f c modal"><slot></slot></div>
    </div>
    </transition>
</template>

<style scoped>

.modal-mask { transition: opacity .3s ease; }
.modal { transition: transform .3s ease; }

.modal-enter, .modal-leave-active { opacity: 0; }
.modal-enter .modal, .modal-leave-active .modal { transform: scale(0); }

</style>



























