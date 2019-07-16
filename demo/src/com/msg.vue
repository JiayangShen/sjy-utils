<template>
    <transition name="cart-msg" appear
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div v-if="show" class="posf lh1 p4 pr10 c-w -bc2 -c2-a cart-msg">
        <img class="round vm avatar" :src="msg.avatar">
        {{msg.txt}}
    </div>
    </transition>
</template>

<script>

// 多人点餐消息提醒组件

export default {
    data()
    {
        return { show: false, showing: false, msg: { txt: '', avatar: '' } }
    },
    created()
    {
        this._mq = [];
        this.dequeue();
    },
    methods:
    {
        set(avatar, txt)
        {
            this.enqueue({avatar, txt});
        },
        dequeue()
        {
            if(this._mq.length)
            {
                this.msg = this._mq.shift();
                this.show = true;
            }
        },
        enqueue(msg)
        {
            this._mq.push(msg);
            if(!this.showing) this.dequeue();
        },
        beforeEnter (el)
        {
            this.showing = true;
        },
        afterEnter (el)
        {
            setTimeout(() => this.show = false, 1000)
        },
        afterLeave (el)
        {
            this.showing = false;
            this.dequeue();
        }
    }
}

</script>

<style scoped>
.cart-msg { left: 4px; bottom: 70px; z-index: 1000; border-radius: 18px; }
.cart-msg-enter-active, .cart-msg-leave-active { transition: all .3s; }
.cart-msg-enter, .cart-msg-leave-to { opacity: 0 }
.cart-msg-enter { transform: translateY(50px); }
.cart-msg-leave-to { transform: translateY(-50px) }
.cart-msg:after
{ content: ''; position: absolute; bottom: -8px; left: 32px;
  border: 6px solid; border-bottom: none; border-top-width: 8px;
  border-left-color: transparent; border-right-color: transparent;
}
.avatar { width: 28px; height: 28px; }

</style>