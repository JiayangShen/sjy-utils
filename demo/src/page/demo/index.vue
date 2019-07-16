<template>
    <div class="page">
        123
    </div>
</template>

<script>

import Spin from 'com/spin'
import session from 'util/session'
import storage from 'util/storage'
import Alert from 'com/alert'
import Confirm from 'com/confirm'
import Tip from 'com/tip'

import map from 'util/map'
import wx from 'lib/wx'
import AreaPicker from 'com/area-picker'

export default {
    title: 'demo',
    data ()
    {
        return {
        }
    },
    components: { Spin, Alert, Confirm, Tip },
    created ()
    {
        G.info('hehe')
    },
    mounted()
    {
        
    },
    methods:
    {
        
    }
}

</script>

<style scoped>



</style>
