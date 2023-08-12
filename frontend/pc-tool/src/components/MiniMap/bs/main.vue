<template>
    <div class="mini-map-View " v-show="true">
        <minimapView :show-close="true" />
    </div>
</template>

<script setup lang="ts">
    import minimapView from '../index.vue';
    import { useInjectEditor ,useInjectState} from '../../../state';
    import { IControl } from '../type';
    import { useProvideControl } from '../useControl';

    let state = useInjectState();
    let { config } = state;

    let control: IControl = {
        needUpdate() {
            return !config.showCheckView;
        },
        close() {
            config.showClassView = false;
        },
        open() {
            config.showClassView = true;
        },
    };
    useProvideControl(control);
</script>

<style lang="less">
    .mini-map-View  {
        position: absolute;
        right: 0px;
        top: 10px;
        width: 400px;
        height: 400px;
        background: #1e1f234b;
        z-index: 4;
    }
</style>
